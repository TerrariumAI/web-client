import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import World from "./konva/world";
import { GetEntitiesInRegion } from "../lib/environmentApi";
import { withFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

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

let SimpleEnvObs = ({ firebase }) => {
  const classes = useStyles();

  const [posEntityMap, setPosEntityMap] = useState({});

  let onReceiveRegionState = response => {
    console.log(response);
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.getIdToken().then(function(idToken) {
          GetEntitiesInRegion(idToken, 0, 0, onReceiveRegionState);
        });
      }
    });
  });

  let getEntityByPos = pos => {
    const { x, y } = pos;
    if (x == 0 && y == 0) {
      return {
        id: "asdf",
        x: 0,
        y: 0
      };
    }
    // const { posEntityMap } = this.state;
    // const id = this.posToEntityId(pos);
    return null;
  };

  let onRegionChange = () => {
    console.log("change region");
  };

  let onCellClick = () => {
    console.log("cell click");
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

function mapStateToProps(state) {
  return {
    auth: state.firebase.auth
  };
}

export default compose(withFirebase)(SimpleEnvObs);
