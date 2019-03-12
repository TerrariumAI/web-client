import React from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import { withStyles } from "@material-ui/core/styles";
import { Stage, Layer, Rect, Text } from "react-konva";
import EntityRect from "./konva/entityRect";
import { ServerAddress } from "../lib/constants";
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

const CANVAS_SIZE = 400;
const CELLS_IN_REGION = 10;
const CELL_SIZE = CANVAS_SIZE / (CELLS_IN_REGION * 3); // 3 because the user looks at center with 2 each side, 3 regions
const WORLD_CENTER_OFFSET =
  (CELLS_IN_REGION + CELLS_IN_REGION / 2) * CELL_SIZE - CELL_SIZE / 2;
console.log(CANVAS_SIZE);
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
    var simService = new SimulationServiceClient(ServerAddress, null, null);
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
      action: response.getAction(),
      entity: response.getEntity()
    };
    // Handle action occupants
    //  These are cells who come in as an update rather than an actual cell
    if (cellUpdate.action === "RESET") {
      this.setState({ posEntityMap: {} });
      return;
    }
    // If entity is null then this is an empty cell
    if (!cellUpdate.entity) {
      const posEntityMap = { ...this.state.posEntityMap };
      posEntityMap[`${cellUpdate.x}.${cellUpdate.y}`] = {
        x: cellUpdate.x,
        y: cellUpdate.y,
        class: "EMPTY"
      };
      this.setState({
        posEntityMap
      });
      return;
    }
    cellUpdate.entity.id = cellUpdate.entity.getId();
    cellUpdate.entity.x = cellUpdate.entity.getX();
    cellUpdate.entity.y = cellUpdate.entity.getY();
    cellUpdate.entity.class = cellUpdate.entity.getClass();
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
    const { onEntityClick } = this.props;
    this.setState({
      selectedEntityId: e.id
    });
    if (onEntityClick) {
      onEntityClick(e);
    }
  };

  render() {
    const { classes, onEntityClick } = this.props;
    const { posEntityMap, error, selectedEntityId } = this.state;
    return (
      <div>
        <Typography className={classes.errorText} variant="subtitle1">
          {error}
        </Typography>
        <Paper className={classes.stagePaperContainer}>
          <Typography variant="subtitle1">World View</Typography>
          <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
            <Layer
              offsetX={-WORLD_CENTER_OFFSET}
              offsetY={-WORLD_CENTER_OFFSET}
            >
              <Rect
                x={-WORLD_CENTER_OFFSET}
                y={-WORLD_CENTER_OFFSET}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                fill={"#32ff7e"}
              />

              {Object.keys(posEntityMap).map(position => {
                const e = posEntityMap[position];
                let fill = "white";
                if (e.class === "AGENT") {
                  fill = "#18dcff";
                } else if (e.class === "FOOD") {
                  fill = "#3ae374";
                } else if (e.class === "EMPTY") {
                  fill = "#32ff7e";
                }

                return (
                  <EntityRect
                    entity={e}
                    key={"" + e.x + e.y}
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
      </div>
    );
  }
}

Spectate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Spectate);
