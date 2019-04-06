import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import {
  withStyles,
  Typography,
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button
} from "@material-ui/core";
import Computer from "@material-ui/icons/Computer";
import ImportExport from "@material-ui/icons/ImportExport";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import uuidv1 from "uuid/v1";
import { connect } from "react-redux";
import { compose } from "redux";
import Router from "next/router";
import withNavBar from "../lib/withNavBar";
import { withFirebase, firebaseConnect } from "react-redux-firebase";
const styles = ({ palette, spacing, breakpoints }) => ({
  root: {
    paddingTop: 40
  },
  worldImg: {
    width: "80%",
    maxHeight: 350,
    maxWidth: 350
  },
  cellInspectorContainer: {
    padding: 10
  },
  centerText: {
    textAlign: "center"
  },
  paper: {
    padding: 15
  },
  cardContent: {
    height: 250
  },
  cardTitle: {
    textAlign: "center"
  },
  icon: {
    color: palette.primary.main,
    fontSize: 40
  }
});

class Index extends React.Component {
  state = {
    selectedEntity: null
  };

  async componentDidMount() {
    // Add key listener
    document.addEventListener("keydown", this._handleKeyDown);
  }

  // When an entity is clicked in the spectate window,
  //  add it's data to the side bar
  onCellClick = entity => {
    this.setState({
      selectedEntity: entity
    });
  };

  render() {
    const { classes } = this.props;
    const { selectedEntity } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={32} justify="center">
          <Grid item xs={10} md={5} style={{ textAlign: "center" }}>
            <img
              src="/static/world.png"
              alt="my image"
              className={classes.worldImg}
            />
          </Grid>
          <Grid item xs={10} md={5}>
            <Typography variant="h4">Welcome to Olam AI</Typography>
            <Typography variant="subheading">
              A persistant online environment for AI
            </Typography>
            <br />
            <Paper className={classes.paper}>
              <Typography variant="subtitle2">Step 1</Typography>
              <Typography variant="subtitle1">
                Write a model locally using the training environment
              </Typography>
              <br />
              <Typography variant="subtitle2">Step 2</Typography>
              <Typography variant="subtitle1">
                Connect your model to the online environment
              </Typography>
              <br />
              <Typography variant="subtitle2">Step 3</Typography>
              <Typography variant="subtitle1">
                Watch your agents fight for survival live!
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={10}>
            <Typography variant="h4">Getting started</Typography>
            <Typography variant="subheading">
              Olam is easy to use and gives you ultimate freedom. You develop
              your model and control your agents from your computer, giving you
              complete freedom.
            </Typography>
            <br />

            <Grid container spacing={32}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" className={classes.cardTitle}>
                      <Computer className={classes.icon} />
                      <br />
                      Train
                    </Typography>
                    <br />
                    <Typography variant="subtitle1">
                      Run and connect to the training model locally. Use our
                      example code and documentation to get started.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        Router.push(
                          "https://olamai.gitbook.io/olamai/training-models/installing-the-environment"
                        );
                      }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item item xs={12} md={4}>
                <Card>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" className={classes.cardTitle}>
                      <ImportExport className={classes.icon} />
                      <br />
                      Connect
                    </Typography>
                    <br />
                    <Typography variant="subtitle1">
                      Using your model is easy! Simply connect to our servers
                      and your model will immediatly be ready to use.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        Router.push(
                          "https://olamai.gitbook.io/olamai/connecting-models/uploading-your-model"
                        );
                      }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item item xs={12} md={4}>
                <Card>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" className={classes.cardTitle}>
                      <RemoveRedEye className={classes.icon} />
                      <br />
                      Watch
                    </Typography>
                    <br />
                    <Typography variant="subtitle1">
                      From our website, you can create new agents that will use
                      your model to make decisions. Watch them try to survive in
                      the world!
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        Router.push("/environment");
                      }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default compose(
  withNavBar({ useBuffer: true }),
  withStyles(styles),
  withFirebase
)(Index);
