import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import { withStyles, Typography } from "@material-ui/core";
import uuidv1 from "uuid/v1";
import { connect } from "react-redux";
import { compose } from "redux";
import withNavBar from "../lib/withNavBar";
import { withFirebase, firebaseConnect } from "react-redux-firebase";

const styles = ({ palette, spacing, breakpoints }) => ({
  root: {
    flexGrow: 1
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
    cells: {}
  };

  async componentDidMount() {
    // TODO - Change this to the user id
    this.clientId = uuidv1();

    // console.log("CLIENT ID: ", this.clientId);

    var simService = new SimulationServiceClient(
      "http://127.0.0.1:9091",
      null,
      null
    );

    // Create spectator
    this.simService = simService;
    this.targetRegion = {
      x: 1,
      y: 1
    };

    var request = new CreateSpectatorRequest();
    request.setApi(API_VERSION);
    request.setId(this.clientId);
    var metadata = {};
    var stream = simService.createSpectator(request, metadata);

    stream.on("data", this.onData);

    stream.on("status", function(status) {
      console.log(status.code);
      console.log(status.details);
      console.log(status.metadata);
    });
    stream.on("end", function(end) {
      // stream end signal
    });

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

  _handleKeyDown = event => {
    switch (event.keyCode) {
      case LEFT_KEY_CODE:
        this.state.activePopover.hide();
        break;
      default:
        break;
    }
  };

  subscribeToRegion = async (x, y) => {
    const { simService } = this;
    // Sub to region call
    if (x === null || y === null) {
      console.log("spectateRegion(): NULL VALUES");
      return;
    }
    // Subscribe to region
    var region = new Region();
    region.setX(x);
    region.setY(y);
    var request = new SubscribeSpectatorToRegionRequest();
    request.setApi(API_VERSION);
    request.setId(this.clientId);
    request.setRegion(region);
    var metadata = {};
    const call = simService.subscribeSpectatorToRegion(
      request,
      metadata,
      (err, resp) => {
        console.log("Sub response: ", resp);
      }
    );
    call.on("status", status => {
      console.log(status);
    });
  };

  subscribeToRegion_TEST = () => {
    this.subscribeToRegion(1, 1);
    this.subscribeToRegion(-1, 1);
    this.subscribeToRegion(1, -1);
    this.subscribeToRegion(-1, -1);
  };

  onData = response => {
    // Parse the data
    const cellUpdate = {
      x: response.getX(),
      y: response.getY(),
      occupant: response.getOccupant()
    };
    if (cellUpdate.occupant === "WORLD_RESET") {
      this.setState({ cells: {} });
    }
    console.log(
      `[CellUpdate] X: ${cellUpdate.x} Y: ${cellUpdate.y} Occ: ${
        cellUpdate.occupant
      } `
    );
    // update state
    const cells = { ...this.state.cells };
    cells[`${cellUpdate.x}.${cellUpdate.y}`] = cellUpdate;
    this.setState({
      cells
    });
  };

  // spawnAgent = () => {
  //   const { simService } = this.state;

  //   var req = new SpawnAgentRequest();
  //   simService.spawnAgent(req, {}, (err, response) => {
  //     console.log(err);
  //     console.log(response);
  //     this.setState({
  //       currentAgentId: response.getId()
  //     });
  //   });
  // };

  handleKeyPress = event => {
    console.log(event.key);
  };

  render() {
    const { cells } = this.state;
    console.log(cells);
    return (
      <div>
        <Typography variant="h4">Hello Twitch!</Typography>
        <button onClick={this.subscribeToRegion_TEST}>Spectate</button>
        <button onClick={this.createAgent}>Create Agent</button>
        {/* <button onClick={this.spawnAgent}>Spawn Agent</button>
        <button onClick={this.agentAction("RIGHT")}>Agent Action Right</button> */}
        <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
          <Layer>
            <Rect
              x={0}
              y={0}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              fill={"#32ff7e"}
            />

            {Object.keys(cells).map(id => {
              const c = cells[id];
              let fill = "white";
              if (c.occupant === "AGENT") {
                fill = "#18dcff";
              } else if (c.occupant === "FOOD") {
                fill = "#3ae374";
              } else if (c.occupant === "EMPTY") {
                fill = "rgba(0, 0, 0, 0)";
              }

              return (
                <Rect
                  x={WORLD_CENTER_OFFSET + c.x * CELL_SIZE}
                  y={WORLD_CENTER_OFFSET + -c.y * CELL_SIZE}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  fill={fill}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default compose(
  withNavBar({ useBuffer: true }),
  withStyles(styles),
  withFirebase
)(Index);
