import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { EnvironmentClient } from "../api/environment_grpc_web_pb";
import {
  GetEntityRequest,
  CreateEntityRequest,
  Entity
} from "../api/environment_pb";
import { withFirebase, firestoreConnect } from "react-redux-firebase";
import { Typography, Container, Button, Grid } from "@material-ui/core";
import withNavbar from "../src/withNavbar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  bigBody: {
    fontSize: 25
  }
}));

const Index = ({ users }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      <Grid item xs={10}>
        <Typography variant="h2" align="center" gutterBottom>
          A persistant, online environment for AI
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Terrarium.AI is focused on creating a community around learning,
          developing and further researching Reinforcemnt Learning AI. Our goal
          is to create an environment that simulates simple life and will enable
          developers to truly push the limits of AI. Through simple actions such
          as movement, consumption, rest, communication and combat, the
          possibilities are endless.
        </Typography>
      </Grid>
    </Grid>
  );
};
export default compose(
  withNavbar(),
  withFirebase
  // firestoreConnect(["users"]), // or { collection: 'todos' }
  // connect((state, props) => ({
  //   users: state.firestore.ordered.users
  // }))
)(Index);
