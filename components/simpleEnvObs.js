import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import World from "./konva/world";
import { GetEntitiesInRegion } from "../lib/environmentApi";
import { withFirebase, isLoaded, isEmpty, withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import update from 'immutability-helper';
import { compose } from "redux";
import PubNub from "pubnub";
var _ = require("lodash");

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

const pubnub = new PubNub({
  publishKey : 'pub-c-83ed11c2-81e1-4d7f-8e94-0abff2b85825',
  subscribeKey : 'sub-c-b4ba4e28-a647-11e9-ad2c-6ad2737329fc'
})

let idToken = "";
let listening = false

class EnvObservation extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          posEntityMap: {},
          idPosMap: {},
          regionSubs: []
      };
  }

  onMessage = ({message: {Events}, channel}) => {
    let newState = this.state
    Events.forEach(({eventName,entityData}) => {
      var e = JSON.parse(entityData)
      e.x = e.x || 0
      e.y = e.y || 0
      if (eventName == "createEntity") {
        newState = update(newState, {
            idPosMap: {[e.id]: {$set: `${e.x}.${e.y}`}},
            posEntityMap: {[`${e.x}.${e.y}`]: {$set: e}}
        });
      } else if (eventName == "updateEntity") {
        const lastPos = newState.idPosMap[e.id]
        const curPos = `${e.x}.${e.y}`;
        if (lastPos == curPos) { // If the entity didn't move
          // Update the state, but don't worry about his last position
          newState = update(newState, {
            posEntityMap: {[curPos]: {$set: e} }
          });
        } else { // If the entity did move
          // Update the state AND delete the data for the entities last position
          newState = update(newState, {
            idPosMap: {[e.id]: {$set: curPos}},
            posEntityMap: {[curPos]: {$set: e}, [lastPos]: {$set: undefined} }
          });
        }
      } else if (eventName == "deleteEntity") {
        newState = update(this.state, {
          idPosMap: {[e.id]: {$set: undefined}},
          posEntityMap: {[`${e.x}.${e.y}`]: {$set: undefined}}
        });
      }
    })
    this.setState(newState);
  }

  listener = {
    message: this.onMessage,
    presence: function(presenceEvent) {
        // handle presence
    }
  }

  onRegionChange = async (region) => {
    const {regionSubs} = this.state
    let newRegionSubs = getRegionsAroundInclusive(region);
    let regionsToUnsubFrom = regionSubs.filter(
      r => !_.find(newRegionSubs, r)
    );
    let regionsToSubTo = newRegionSubs.filter(r => !_.find(regionSubs, r));
    regionsToSubTo.forEach(region => {
      this.subscribeToRegion(region);
    });
    regionsToUnsubFrom.forEach(region => {
      this.unsubscribeFromRegion(region.x, region.y);
    });
  };
  
  componentWillMount() {
    if (!listening) {
      console.log("INFO: adding listener")
      pubnub.addListener(this.listener)
      listening = true
    }
    
    if (!idToken) {
      this.props.firebase.auth().onAuthStateChanged(user => {
        if (user) {
          user.getIdToken().then(_idToken => {
            idToken = _idToken
            this.onRegionChange({x: 0, y: 0});
          });
        }
      });
    } else {
      this.onRegionChange({x: 0, y: 0});
    }
  }

  componentDidUpdate() {
    const {auth} = this.props
    if (isLoaded(auth) && isEmpty(auth)) {
      this.props.firebase.auth().signInAnonymously().catch(function(error) {
        console.error("ERROR ANON SIGNIN: ", error);
      });
    }
  }

  componentWillUnmount() {
    pubnub.removeListener(this.listener) 
    listening = false;
    console.log("INFO: removing listener")
  }

  // When regionState is received from api, put it into the map
  onReceiveRegionState = ({data: {entities}}) => {
    let entityPosMapTemp = {}
    let idPosMapTemp = {}
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
      // add to the temp object
      const newState = update(this.state, {
        idPosMap: {[e.id]: {$set: `${e.x}.${e.y}`}},
        posEntityMap: {[`${e.x}.${e.y}`]: {$set: e}}
      });
      this.setState(newState);
    }
  };

  // Subscribe to a region
  subscribeToRegion = async ({x, y}) => {
    const {regionSubs} = this.state
    // Make sure x and y exist!
    if (x === null || y === null || x < 0 || y < 0) {
      console.warn("subscribeToRegion(): X or Y is null or negative");
      return;
    }
    // Check if we are already subbed to this region, exit if so
    if (_.find(regionSubs, { x, y })) {
      console.warn("subscribeToRegion(): Already subbed to this region");
      return;
    }

    // Get the initial data for the region
    try {
      const regionState = await GetEntitiesInRegion(idToken, x, y);
      this.onReceiveRegionState(regionState)
    }
    catch (error) {
      console.log("Error fetching entities in region: ", error)
    }

    // Add this region to the regionsubs list
    const newState = update(this.state, {
      regionSubs: {$push: [{x, y}] },
    });
    this.setState(newState);

    // Subscribe to the region
    pubnub.subscribe({
      channels: [`${x}.${y}`] 
    });
  }

  // Unsub from a region
  unsubscribeFromRegion = ({x, y}) => {
    const {regionSubs} = this.state
    // Make sure x and y exist!
    if (x === null || y === null) {
      console.error("ubsubscribeFromRegion(): X or Y is null");
      return;
    }
    // Remove this region from the region subs array
    let regionSubsTemp = regionSubs.filter(r => !_.isEqual(r, { x, y }));
    const newState = update(this.state, {
      regionSubs: {$set: regionSubsTemp},
    });
    this.setState(newState);
    // Unsubscribe from the region
    pubnub.unsubscribe({
      channels: [`${x}.${y}`] 
    });
  }

  // Return entity at given position
  getEntityByPos = ({x, y}) => {
    if (x < 1 || y < 1) {
      return {class: "ROCK"}
    }
    let e = this.state.posEntityMap[`${x}.${y}`]
    return e;
  };

  onCellClick = (position, entity) => {
    if (this.props.onCellClick) {
      this.props.onCellClick(position, entity)
    }
  };
    
  render() {
    const { classes } = this.props;
    const {posEntityMap} = this.state;

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
            {Object.keys(posEntityMap).length == 0 ? <CircularProgress /> :
            <World
            onRegionChange={this.onRegionChange}
            getEntityByPos={this.getEntityByPos}
            onCellClick={this.onCellClick}
          />
          }
            
          </Grid>
        </Grid>
      </div>
    );
  }
}

/**
 * getRegionsAroundInclusive - return the regions around another region
 *   INCLUDING the region provided
 */
const getRegionsAroundInclusive = region => {
  let regions = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      regions.push({ x: x + region.x, y: y + region.y });
    }
  }
  return regions;
};

export default compose(
  withFirebase, 
  withFirestore,
  withStyles(styles),
  connect(({ firestore, firebase: { auth } }, props) => ({
    auth,
  })),
)(EnvObservation);
