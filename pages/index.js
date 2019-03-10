import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import { withStyles, Typography, Grid, Paper } from "@material-ui/core";
import uuidv1 from "uuid/v1";
import { connect } from "react-redux";
import { compose } from "redux";
import Spectate from "../components/spectate";
import withNavBar from "../lib/withNavBar";
import { withFirebase, firebaseConnect } from "react-redux-firebase";

const styles = ({ palette, spacing, breakpoints }) => ({
  root: {
    flexGrow: 1
  },
  cellInspectorContainer: {
    padding: 10
  }
});

const {
  CreateAgentRequest,
  CreateSpectatorRequest,
  SubscribeSpectatorToRegionRequest,
  Region,
  Agent
} = require("../pkg/api/v1/simulation-service_pb");
const {
  SimulationServiceClient
} = require("../pkg/api/v1/simulation-service_grpc_web_pb");

const API_VERSION = "v1";

const CELLS_IN_REGION = 10;
const CELL_SIZE = 20;
const WORLD_CENTER_OFFSET = CELLS_IN_REGION * CELL_SIZE;
const CANVAS_SIZE = CELLS_IN_REGION * 2 * CELL_SIZE;

const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;

class Index extends React.Component {
  state = {
    selectedEntity: null
  };

  async componentDidMount() {
    // Initialize service
    var simService = new SimulationServiceClient(
      "http://127.0.0.1:9091",
      null,
      null
    );
    this.simService = simService;

    // Add key listener
    document.addEventListener("keydown", this._handleKeyDown);
  }

  createAgent = async () => {
    const { firebase } = this.props;
    const { simService } = this;
    const TEST_POS = 0;
    // Get current user's auth token
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(token => {
        // Create the new agent
        var agent = new Agent();
        agent.setX(TEST_POS);
        agent.setY(TEST_POS);
        var request = new CreateAgentRequest();
        request.setApi(API_VERSION);
        request.setAgent(agent);
        var metadata = { "auth-token": token };
        const call = simService.createAgent(request, metadata, (err, resp) => {
          console.log("Sub response: ", resp);
        });
        call.on("status", status => {
          console.log("Create agent status: ", status);
        });
      })
      .catch(err => {
        console.error("Error refreshing id token", err);
        return false;
      });
  };

  // When an entity is clicked in the spectate window,
  //  add it's data to the side bar
  onEntityClick = entity => {
    this.setState({
      selectedEntity: entity
    });
  };

  render() {
    const { classes } = this.props;
    const { selectedEntity } = this.state;
    return (
      <div>
        <Grid container spacing={32} justify="center">
          <Grid item xs={12}>
            <Typography variant="h4">Hello Twitch!</Typography>
          </Grid>
          <Grid item>
            <Spectate onEntityClick={this.onEntityClick} />
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.cellInspectorContainer}>
              <Typography>
                <b>Cell Inspector</b>
              </Typography>
              {selectedEntity ? (
                <Typography>
                  <b>Id: </b> {selectedEntity.id}
                  <br />
                  <b>Class: </b> {selectedEntity.class}
                </Typography>
              ) : null}
            </Paper>
          </Grid>
        </Grid>

        <button onClick={this.createAgent}>Create Agent</button>
      </div>
    );
  }
}

export default compose(
  withNavBar({ useBuffer: true }),
  withStyles(styles),
  withFirebase
)(Index);
