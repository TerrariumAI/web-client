import EnvRender from "../components/konva/envRender";
import { withFirebase, withFirestore } from "react-redux-firebase";
import { compose } from "redux";
import { withStyles, Grid, CircularProgress } from "@material-ui/core";
import PubNub from "pubnub";
import { GetEntitiesInRegion } from "../lib/environmentApi";
import update from 'immutability-helper';

const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;

const DEFAULT_TARGET_POS = {x: 0, y: 0}
const CELLS_IN_REGION = 10;

let unsubscribeAuthStateListener = null;

const pubnub = new PubNub({
  subscribeKey : 'sub-c-b4ba4e28-a647-11e9-ad2c-6ad2737329fc'
})

const styles = theme => ({
  obsPanel: {
    width: 600,
    height: 600,
    backgroundColor: "lightgreen"
  },
  comingSoonContainer: {
    height: "100%"
  },
  worldContainer: {
    width: "100%"
  }
});

class EnvObservation extends React.Component {
  state = {
    entities: {},
    effects: {},
    targetPos: DEFAULT_TARGET_POS,
    currentRegion: null,
    idToken: null,
    user: null,
  }
  regionSubs = {} // Object where we only care about keys, formatted like this {index: region}

  listener = {
    message: this.onPubnubMessage,
    presence: function(presenceEvent) {
        // handle presence
    }
  }
  listening = false

  async componentDidMount() {
    const { firebase } = this.props;
    // Get id token
    if (!unsubscribeAuthStateListener) {
      unsubscribeAuthStateListener = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          user.getIdToken().then(idToken => {
            this.setState({idToken, user})
            this.changeTargetPos(DEFAULT_TARGET_POS)
          });
        }
      });
    }
    // Add pubnub listener
    if (!this.listening) {
      console.log("INFO: adding listener")
      pubnub.addListener(this.listener)
      this.listening = true
    }
    // Add key event listener
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    if (unsubscribeAuthStateListener) {
      unsubscribeAuthStateListener();
    }
    // Unbind event listener
    document.removeEventListener("keydown", this._handleKeyDown);
    // Remove pubnub listener
    pubnub.removeListener(this.listener) 
    this.listening = false;
    console.log("INFO: removing pubnub listener")
  }

  getIndexForPosition(p) {
    return `${p.x}-${p.y}`
  }

  // Returns the region that a given position is in
  getRegionForPos(p) {
    let x = p.x;
    let y = p.y;
    return {
      x: Math.floor(x / CELLS_IN_REGION),
      y: Math.floor(y / CELLS_IN_REGION)
    };
  }

  /**
   * getRegionsAroundInclusive - return the regions around another region
   *   INCLUDING the region provided
   */
  getRegionsAroundInclusive = region => {
    let regions = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        let regionX = x + region.x;
        let regionY = y + region.y;
        if (regionX < 0 || regionY < 0) {
          continue
        }
        regions.push({ x: regionX, y: regionY });
      }
    }
    return regions;
  };

  subscribeToRegion(regionIndex) {
    // Subscribe to the region
    pubnub.subscribe({
      channels: [regionIndex] 
    });
  }

  unsubscribeFromRegion(regionIndex) {
    // Unsubscribe from the region
    pubnub.subscribe({
      channels: [regionIndex] 
    });
  }

  onReceiveRegionState = ({data: {entities}}) => {
    let newState = this.state;
    // Empty region
    if (!entities) {
      return
    }
    // Populated region
    for (let i = 0; i < entities.length; i++) { 
      let e = entities[i]
      // Make sure these values exist
      e.x = e.x || 0
      e.y = e.y || 0
      // update state
      newState = update(newState, {
        entities: {[e.id]: {$set: {...e}}},
      });
    }
    this.setState(newState);
  }

  onPubnubMessage = ({message: {Events}, channel}) => {
    let newState = this.state
    Events.forEach(({eventName,entityData}) => {
      var e = JSON.parse(entityData)
      e.x = e.x || 0
      e.y = e.y || 0
      if (eventName == "createEntity") {
        newState = update(newState, {
            posEntityMap: {[`${e.x}.${e.y}`]: {$set: e}}
        });
      } else if (eventName == "updateEntity") {
        // Convert last pos to index
        lastPos = `${lastPos.x}.${lastPos.y}`
        const curPos = `${e.x}.${e.y}`;
        if (lastPos == curPos) { // If the entity didn't move
          // Update the state, but don't worry about his last position
          newState = update(newState, {
            posEntityMap: {[curPos]: {$set: e} }
          });
        } else { // If the entity did move
          // Update the state AND delete the data for the entities last position
          newState = update(newState, {
            posEntityMap: {[curPos]: {$set: e}, [lastPos]: {$set: undefined} }
          });
        }
      } else if (eventName == "deleteEntity") {
        newState = update(this.state, {
          posEntityMap: {[`${e.x}.${e.y}`]: {$set: undefined}}
        });
      } else if (eventName == "createEffect") {
        newState = update(newState, {
            posEffectMap: {[`${e.x}.${e.y}`]: {$set: e}}
        });
      } else if (eventName == "deleteEffect") {
        newState = update(this.state, {
          posEffectMap: {[`${e.x}.${e.y}`]: {$set: undefined}}
        });
      }
    })
    this.setState(newState);
  }

  changeTargetPos(newPos) {
    const { currentRegion } = this.state;
    // TODO: limit
    // Check if we have changed regions
    const region = this.getRegionForPos(newPos);
    if (!currentRegion || region.x != currentRegion.x || region.y != currentRegion.y) {
      this.changeRegion(region)
    }
    // Update current position
    this.setState({targetPos: newPos})
  }

  async changeRegion(newRegion) {
    const { firebase } = this.props;
    const { idToken } = this.state;
    let newRegionSubs = {}
    // Get current region, and all regions around it
    const allRegions = this.getRegionsAroundInclusive(newRegion);
    // For any new regions
    // Get state and subscribe
    allRegions.map(region => {
      const regionIndex = this.getIndexForPosition(region)
      // Put the region in the sub list
      newRegionSubs[regionIndex] = region
      if (this.regionSubs[regionIndex] == null) { // If this new region isn't already in sub list
        // Get region state ASYNCHRONOUSLY
        GetEntitiesInRegion(idToken, region.x, region.y).then(this.onReceiveRegionState)
        // Subscribe to region
        this.subscribeToRegion(regionIndex)
      }
    })
    // For any regions we aren't looking at anymore, unsub
    Object.keys(this.regionSubs).map(regionIndex => {
      if (newRegionSubs[regionIndex] == null) {
        this.unsubscribeFromRegion(regionIndex);
      }
    })
    // Set current region in state
    this.regionSubs = newRegionSubs
    this.setState({currentRegion: newRegion})
  }

    /**
   * _handleKeyDown - Detect any key down events and move the center pos
   *   accordingly.
   */
  _handleKeyDown = event => {
    let { targetPos } = this.state;
    switch (event.keyCode) {
      case UP_KEY_CODE:
        targetPos.y += 1;
        this.changeTargetPos(targetPos);
        event.preventDefault();
        break;
      case DOWN_KEY_CODE:
        if (targetPos.y < 0) {
          break;
        }
        targetPos.y -= 1;
        this.changeTargetPos(targetPos);
        event.preventDefault();
        break;
      case LEFT_KEY_CODE:
          if (targetPos.x < 0) {
            break;
          }
        targetPos.x -= 1;
        this.changeTargetPos(targetPos);
        event.preventDefault();
        break;
      case RIGHT_KEY_CODE:
        targetPos.x += 1;
        this.changeTargetPos(targetPos);
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  render() {
    const {entities, effects, targetPos} = this.state;
    const {classes} = this.props;
    return (
      <div className={classes.obsPanel}>
        <Grid
          container
          spacing={0}
          align="center"
          justify="center"
          direction="column"
          className={classes.comingSoonContainer}
        >
          <Grid item className={classes.worldContainer}>
            {Object.keys(entities).length == 0 ? <CircularProgress /> :
            <EnvRender entities={entities} effects={effects} targetPos={targetPos} />
          }
          </Grid>
        </Grid>
      </div>
      
    )
  }
}

export default compose(
  withFirebase, 
  withFirestore,
  withStyles(styles),
)(EnvObservation);