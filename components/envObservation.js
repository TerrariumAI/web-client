import EnvRender from "../components/konva/envRender";
import { withFirebase, withFirestore } from "react-redux-firebase";
import { compose } from "redux";
import { withStyles } from "@material-ui/core";
import { GetEntitiesInRegion } from "../lib/environmentApi";
import update from 'immutability-helper';

const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;

const DEFAULT_TARGET_POS = {x: 0, y: 0}
const CELLS_IN_REGION = 10;

let unsubscribeAuthStateListener = null;

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
    // Add key event listener
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    if (unsubscribeAuthStateListener) {
      unsubscribeAuthStateListener();
    }
    // Unbind event listener
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  getIndexForPosition(p) {
    return `${p.x}.${p.y}`
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
    console.log("TODO: SUB TO REGION")
  }

  unsubscribeFromRegion(regionIndex) {
    console.log("TODO: UNSUB FROM REGION")
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
        entities: {[e.id]: {$set: {x: e.x, y: e.y}}},
      });
    }
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
    // Get state and subscribe to all new regions
    allRegions.map(region => {
      const regionIndex = this.getIndexForPosition(region)
      if (!this.regionSubs[this.getIndexForPosition(region)]) {
        // Put the region in the sub list
        newRegionSubs[regionIndex] = region
        // Get region state ASYNCHRONOUSLY
        GetEntitiesInRegion(idToken, region.x, region.y).then(this.onReceiveRegionState)
        // Subscribe to region
        this.subscribeToRegion(regionIndex)
      }
    })
    // Set current region in state
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
    return (
      <EnvRender entities={entities} effects={effects} targetPos={targetPos} />
    )
  }
}

export default compose(
  withFirebase, 
  withFirestore,
  withStyles(styles),
)(EnvObservation);