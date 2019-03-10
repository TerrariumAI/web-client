import React from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import { withStyles } from "@material-ui/core/styles";
import { Stage, Layer, Rect, Text } from "react-konva";
import {
  CreateAgentRequest,
  CreateSpectatorRequest,
  SubscribeSpectatorToRegionRequest,
  Region,
  Agent
} from "../pkg/api/v1/simulation-service_pb";
import { SimulationServiceClient } from "../pkg/api/v1/simulation-service_grpc_web_pb";
import { Grid, Paper, Typography } from "@material-ui/core";

const API_VERSION = "v1";

const CELLS_IN_REGION = 10;
const CELL_SIZE = 20;
const WORLD_CENTER_OFFSET = CELLS_IN_REGION * CELL_SIZE;
const CANVAS_SIZE = CELLS_IN_REGION * 2 * CELL_SIZE;

const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;

const styles = theme => ({
  root: {
    display: "flex"
  },
  stagePaperContainer: {
    padding: 25
  },
  errorText: {
    color: "red"
  }
});

class Spectate extends React.Component {
  state = {
    cells: {},
    error: ""
  };

  async componentDidMount() {
    // TODO - Change this to the user id
    this.clientId = uuidv1();
    // Create client
    var simService = new SimulationServiceClient(
      "http://127.0.0.1:9091",
      null,
      null
    );
    this.simService = simService;
    this.targetRegion = {
      x: 1,
      y: 1
    };
    // Create spectator
    var request = new CreateSpectatorRequest();
    request.setApi(API_VERSION);
    request.setId(this.clientId);
    var metadata = {};
    var stream = simService.createSpectator(request, metadata);
    stream.on("data", this.onData);
    stream.on("status", this.onStatus);
    stream.on("end", this.onEnd);
    // Subscribe to initial regions
    this.subscribeToInitialRegions();
  }

  // Subscribe to a specific region
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
        if (err) {
          console.error("Error subscribing to region: ", err);
          this.setState({
            error: "Error sending subscribing to region call: " + err.message
          });
        }
      }
    );
    call.on("status", status => {
      if (status.code !== 0) {
        console.error("Error subscribing to region: ", status);
        this.setState({
          error: "Error subscribing to region: " + status.message
        });
      }
    });
  };

  // Initial regions to subscribe to
  subscribeToInitialRegions = () => {
    this.subscribeToRegion(1, 1);
    this.subscribeToRegion(-1, 1);
    this.subscribeToRegion(1, -1);
    this.subscribeToRegion(-1, -1);
  };

  // On stream status change
  onStatus = status => {
    console.log("Status code: ", status.code);
    console.log("Status details: ", status.details);
    console.log("Status MD: ", status.metadata);
  };

  // On data received from stream
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

  // On stream ended
  onEnd = end => {
    console.log("Stream ended!");
  };

  render() {
    const { classes } = this.props;
    const { cells, error } = this.state;
    return (
      <Grid container justify="center">
        <Typography className={classes.errorText} variant="subtitle1">
          {error}
        </Typography>
        <Grid item>
          <Paper className={classes.stagePaperContainer}>
            <Typography variant="subtitle1">World View</Typography>

            {/* <button onClick={this.subscribeToRegion_TEST}>Spectate</button> */}
            {/* <button onClick={this.createAgent}>Create Agent</button> */}
            {/* <button onClick={this.spawnAgent}>Spawn Agent</button>
        <button onClick={this.agentAction("RIGHT")}>Agent Action Right</button> */}
            {/* <button onClick={this.subscribeToInitialRegions}>Spectate</button> */}
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
                      key={"" + c.x + c.y}
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
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Spectate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Spectate);
