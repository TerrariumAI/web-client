import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Link from "next/link";
import classNames from "classnames";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { withFirebase, firestoreConnect } from "react-redux-firebase";
import {
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core";
import withNavbar from "../src/withNavbar";
import EnvObservation from "../components/envObservation";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  header: {
    paddingBottom: theme.spacing(6)
  },
  bigBody: {
    fontSize: 25
  },
  watchNow: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  white: {
    backgroundColor: "white",
  },
  infoCardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}));

const Index = ({ users }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      <Grid item xs={10} className={classes.header}>
        <Typography variant="h2" align="center" gutterBottom>
          A persistent, online environment for AI
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Terrarium AI simulates simple life and enables developers to truly push the 
        limits of AI with an online, persistent environment. Models are forced to compete 
        for survival by using sensors for observation, and simple actions such as movement, 
        consumption, rest, communication and combat.
        </Typography>

        <Grid container spacing={2} justify="center">
          <Grid item>
            <Link href="/signup">
              <Button variant="contained" color="primary">
                Get started
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button href="https://docs.terrarium.ai" variant="outlined" color="primary">
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        xs={12}
        className={classNames(classes.white, classes.watchNow)}
      >
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom>
            Watch Now
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
            gutterBottom
          >
            Observe the environment live from your browser!
            <br />
            Use the arrow keys ↑↓→← to explore
          </Typography>
        </Grid>

        <EnvObservation />
      </Grid>

      <Container className={classes.infoCardGrid} maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom>Creating your Remote Model</Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom paragraph>
          The first step to using Terrarium.ai is to create a new Remote Model in your dashboard. 
          <br />
          <br />
          You will be able to give it some metadata such as a name and description that other users can see.
          The Dashboard will also be where you interact with the environment using your Remote Models.
        </Typography>
        <Link href="/dashboard">
          <Button variant="contained" color="primary">
            Go to dashboard
          </Button>
        </Link>
      </Container>

      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        xs={12}
        className={classes.white}
      >
        <Container className={classes.infoCardGrid} maxWidth="md">
          <Typography variant="h2" align="center" gutterBottom>Getting started in Python3</Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom paragraph>
            Our goal is to be <i>as simple as possible.</i> 
            <br />
            <br />
            Once you have created a Remote Model in your dashboard, simply install our pip package:
            <SyntaxHighlighter language='python' style={dark}>{"pip install terrariumai"}</SyntaxHighlighter>
            Create a simple model function
            <SyntaxHighlighter language='python' style={dark}>{modelStr}</SyntaxHighlighter>
            Connect to your remote model
            <SyntaxHighlighter language='python' style={dark}>{connectModelStr}</SyntaxHighlighter>
            It's that easy!
            <br />
            <br />
            Now you can interract with the live environment from the dashboard. The agents you spawn will
            be using the code running on your local machine!
          </Typography>
        </Container>
      </Grid>

      <Container className={classes.infoCardGrid} maxWidth="md">
        <Grid container>
          <Grid item xs={12} >
            <Typography variant="h2" align="center" gutterBottom>Train Your Model</Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom paragraph>
              After messing around with the live environment, you will most likely want to train your model on something quicker.
              This can be done with our training environment that runs locally on your computer. It is kept
              up to date with the live server and has zero delay.

              <br />
              <br />
              First, download the correct binary for your machine.
            </Typography>
            <Button href="https://github.com/TerrariumAI/simulation/releases" variant="contained" color="primary">
              Download
            </Button>
            <br /> <br />
            <Typography variant="h5" color="textSecondary" gutterBottom paragraph>
              Now run the binary
              <SyntaxHighlighter language='' style={dark}>{"./training-osx-<version>.sh"}</SyntaxHighlighter>
              or
              <SyntaxHighlighter language='' style={dark}>{"./training-osx-<version>.sh"}</SyntaxHighlighter>
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom paragraph>
              Now connect to it by specifying an address when you connect your function.
              <SyntaxHighlighter language='python' style={dark}>{connectModelTrainingStr}</SyntaxHighlighter>
            </Typography>
          </Grid>
        </Grid>
      </Container>
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


const modelStr = `import random
from terrariumai import connectRemoteModel, createAction

def randomAction():
    return random.randint(0, 1)
def randomDirection():
    return random.randint(0, 3)

def modelFunc(obsv):
  if obsv.isAlive:
    action = createAction(obsv.id, randomAction(), randomDirection())
    return action
  if not obsv.isAlive:
    print("Entity died :(")`

const connectModelStr = `connectRemoteModel(
  secret='<model-secret>', 
  modelFunc=modelFunc
)`

const connectModelTrainingStr = `connectRemoteModel(
  secret='<model-secret>', 
  modelFunc=modelFunc,
  addr='localhost:9090'
)`

let dark = {
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "padding": "0.5em",
    "background": "#444",
    "color": "#ddd"
  },
  "hljs-keyword": {
    "color": "white",
    "fontWeight": "bold"
  },
  "hljs-selector-tag": {
    "color": "white",
    "fontWeight": "bold"
  },
  "hljs-literal": {
    "color": "white",
    "fontWeight": "bold"
  },
  "hljs-section": {
    "color": "white",
    "fontWeight": "bold"
  },
  "hljs-link": {
    "color": "white"
  },
  "hljs-subst": {
    "color": "#ddd"
  },
  "hljs-string": {
    "color": "#d88"
  },
  "hljs-title": {
    "color": "#d88",
    "fontWeight": "bold"
  },
  "hljs-name": {
    "color": "#d88",
    "fontWeight": "bold"
  },
  "hljs-type": {
    "color": "#d88",
    "fontWeight": "bold"
  },
  "hljs-attribute": {
    "color": "#d88"
  },
  "hljs-symbol": {
    "color": "#d88"
  },
  "hljs-bullet": {
    "color": "#d88"
  },
  "hljs-built_in": {
    "color": "#d88"
  },
  "hljs-addition": {
    "color": "#d88"
  },
  "hljs-variable": {
    "color": "#d88"
  },
  "hljs-template-tag": {
    "color": "#d88"
  },
  "hljs-template-variable": {
    "color": "#d88"
  },
  "hljs-comment": {
    "color": "#777"
  },
  "hljs-quote": {
    "color": "#777"
  },
  "hljs-deletion": {
    "color": "#777"
  },
  "hljs-meta": {
    "color": "#777"
  },
  "hljs-doctag": {
    "fontWeight": "bold"
  },
  "hljs-strong": {
    "fontWeight": "bold"
  },
  "hljs-emphasis": {
    "fontStyle": "italic"
  }
};