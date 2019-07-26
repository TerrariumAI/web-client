import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import World from "./konva/world";
import { GetEntitiesInRegion } from "../lib/environmentApi";
import { withFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import PubNub from "pubnub";

const useStyles = makeStyles(theme => ({
  obsPanel: {
    width: 600,
    height: 600,
    backgroundColor: "lightgreen"
  },
  comingSoonContainer: {
    height: "100%"
  }
}));

const pubnub = new PubNub({
  publishKey : 'pub-c-83ed11c2-81e1-4d7f-8e94-0abff2b85825',
  subscribeKey : 'sub-c-b4ba4e28-a647-11e9-ad2c-6ad2737329fc'
})

let idToken = "";
let listening = false

let SimpleEnvObs = (props) => {
  const classes = useStyles();

  const [posEntityMap, setPosEntityMap] = useState({});
  const [idPosMap, setIdPosMap] = useState({});
  const [regionSubs, setRegionSubs] = useState([]);
  
  function onMessage({message: {eventName, entityData}, channel}) {
    var e = JSON.parse(entityData)
    e.x = e.x || 0
    e.y = e.y || 0
    if (eventName == "createEntity") {
      setIdPosMap({...idPosMap, [e.id]: `${e.x}.${e.y}` })
      setPosEntityMap({...posEntityMap, [`${e.x}.${e.y}`]: e })
    } else if (eventName == "updateEntity") {
      const lastPos = idPosMap[e.id]
      setIdPosMap({...idPosMap, [e.id]: `${e.x}.${e.y}` })
      setPosEntityMap({...posEntityMap, [lastPos]: undefined, [`${e.x}.${e.y}`]: e })
    } else if (eventName == "deleteEntity") {
      const lastPos = idPosMap[e.id]
      setIdPosMap({...idPosMap, [e.id]: undefined })
      setPosEntityMap({...posEntityMap, [lastPos]: undefined})
    }
  }
  const listener = {
    message: onMessage,
    presence: function(presenceEvent) {
        // handle presence
    }
  }

  // componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!listening) {
      console.log("INFO: adding listener")
      pubnub.addListener(listener)
      listening = true
    }
    
    if (!idToken) {
      props.firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user.getIdToken().then(function(_idToken) {
            idToken = _idToken
            onRegionChange({x: 0, y: 0});
          });
        }
      });
    }

    return () => {
      pubnub.removeListener(listener) 
      console.log("INFO: removing listener")
    }
  }, []);

  // When regionState is received from api, put it into the map
  let onReceiveRegionState = ({data: {entities}}) => {
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
      entityPosMapTemp[`${e.x}.${e.y}`] = e
      idPosMapTemp[e.id] = `${e.x}.${e.y}`
    }
    setIdPosMap({...idPosMap, ...idPosMapTemp })
    setPosEntityMap({...posEntityMap, ...entityPosMapTemp })
  };

  // Subscribe to a region
  let subscribeToRegion = async ({x, y}) => {
    // Make sure x and y exist!
    if (x === null || y === null || x < 0 || y < 0) {
      console.error("subscribeToRegion(): X or Y is null or negative");
      return;
    }
    // Check if we are already subbed to this region, exit if so
    if (_.find(regionSubs, { x, y })) {
      console.error("subscribeToRegion(): Already subbed to this region");
      return;
    }

    // Get the initial data for the region
    try {
      const regionState = await GetEntitiesInRegion(idToken, x, y);
      onReceiveRegionState(regionState)
    }
    catch (error) {
      console.log("Error fetching entities in region: ", error)
    }

    // Add this region to the regionsubs list
    setRegionSubs([
      ...regionSubs,
      {x, y}
    ]);

    // Subscribe to the region
    pubnub.subscribe({
      channels: [`${x}.${y}`] 
    });
  }

  // Unsub from a region
  let unsubscribeFromRegion = ({x, y}) => {
    // Make sure x and y exist!
    if (x === null || y === null) {
      console.error("ubsubscribeFromRegion(): X or Y is null");
      return;
    }
    // Remove this region from the region subs array
    let regionSubsTemp = regionSubs.filter(r => !_.isEqual(r, { x, y }));
    setRegionSubs(regionSubsTemp)
    // Unsubscribe from the region
    pubnub.unsubscribe({
      channels: [`${x}.${y}`] 
    });
  }

  // Return entity at given position
  let getEntityByPos = ({x, y}) => {
    if (x < 1 || y < 1) {
      return {class: "ROCK"}
    }
    let e = posEntityMap[`${x}.${y}`]
    return e;
  };

  let onRegionChange = (region) => {
    let newRegionSubs = getRegionsAroundInclusive(region);
    let regionsToUnsubFrom = regionSubs.filter(
      r => !_.find(newRegionSubs, r)
    );
    let regionsToSubTo = newRegionSubs.filter(r => !_.find(regionSubs, r));
    regionsToSubTo.forEach(region => {
      subscribeToRegion(region);
    });
    regionsToUnsubFrom.forEach(region => {
      unsubscribeFromRegion(region.x, region.y);
    });
  };

  let onCellClick = (position, entity) => {
    if (props.onCellClick) {
      props.onCellClick(position, entity)
    }
  };

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
        <Grid item>
          <Typography variant="h3" color="textSecondary">
            Coming soon!
          </Typography>
        </Grid>
        <Grid item>
          <World
            onRegionChange={onRegionChange}
            getEntityByPos={getEntityByPos}
            onCellClick={onCellClick}
          />
        </Grid>
      </Grid>
    </div>
  );
};

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

function mapStateToProps(state) {
  return {
    auth: state.firebase.auth
  };
}

export default compose(withFirebase)(SimpleEnvObs);
