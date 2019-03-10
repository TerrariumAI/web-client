import React from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import { withStyles } from "@material-ui/core/styles";
import { Stage, Layer, Rect, Text } from "react-konva";
import EntityRect from "./konva/entityRect";
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
    // Map from pos -> entity
    posEntityMap: {},
    // Map from id -> entity
    entities: {},
    // Currently selected entity
    selectedEntityId: null,
    // Any errors that come up
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
      entity: {
        id: response.getEntity().getId(),
        x: response.getEntity().getX(),
        y: response.getEntity().getY(),
        class: response.getEntity().getClass()
      }
    };
    // Handle action occupants
    //  These are cells who come in as an update rather than an actual cell
    if (cellUpdate.occupant === "WORLD_RESET") {
      this.setState({ posEntityMap: {} });
    }
    console.log(
      `[CellUpdate] X: ${cellUpdate.x} Y: ${cellUpdate.y} Occ: ${
        cellUpdate.entity
      } `
    );
    // update state
    const posEntityMap = { ...this.state.posEntityMap };
    posEntityMap[`${cellUpdate.x}.${cellUpdate.y}`] = cellUpdate.entity;
    this.setState({
      posEntityMap
    });
  };

  getCellPositionID(cell) {
    return `${cell.x}.${cell.y}`;
  }

  // On stream ended
  onEnd = end => {
    console.log("Stream ended!");
  };

  onEntityClick = e => {
    console.log(e);
    this.setState({
      selectedEntityId: e.id
    });
  };

  render() {
    const { classes, onEntityClick } = this.props;
    const { posEntityMap, error, selectedEntityId } = this.state;
    return (
      <Grid container justify="center">
        <Typography className={classes.errorText} variant="subtitle1">
          {error}
        </Typography>
        <Grid item>
          <Paper className={classes.stagePaperContainer}>
            <Typography variant="subtitle1">World View</Typography>
            <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
              <Layer>
                <Rect
                  x={0}
                  y={0}
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  fill={"#32ff7e"}
                />

                {Object.keys(posEntityMap).map(position => {
                  const e = posEntityMap[position];
                  let fill = "white";
                  console.log(e);
                  if (e.class === "AGENT") {
                    fill = "#18dcff";
                  } else if (e.class === "FOOD") {
                    fill = "#3ae374";
                  } else if (e.class === "EMPTY") {
                    fill = "rgba(0, 0, 0, 0)";
                  }

                  console.log("Selected enttiy id: ", selectedEntityId);
                  console.log("Enttiy id: ", e.id);

                  return (
                    <EntityRect
                      entity={e}
                      key={"" + e.x + e.y}
                      x={WORLD_CENTER_OFFSET + e.x * CELL_SIZE}
                      y={WORLD_CENTER_OFFSET + -e.y * CELL_SIZE}
                      w={CELL_SIZE}
                      h={CELL_SIZE}
                      fill={fill}
                      selected={selectedEntityId === e.id}
                      onClick={this.onEntityClick}
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
