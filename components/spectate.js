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
import World from "./konva/world";

const API_VERSION = "v1";

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
    // Any errors that come up
    error: ""
  };

  async componentDidMount() {
    // TODO - Change this to the user id
    this.clientId = uuidv1();
    // Create client
    var simService = new SimulationServiceClient(ServerAddress, null, null);
    this.simService = simService;
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

  posToEntityId = pos => {
    return `${pos.x}.${pos.y}`;
  };

  setCellToEntity = (x, y, entity) => {
    const posEntityMap = { ...this.state.posEntityMap };
    const id = this.posToEntityId({ x, y });
    posEntityMap[id] = entity;
    this.setState({
      posEntityMap
    });
  };

  setCellToEmpty = (x, y) => {
    const posEntityMap = { ...this.state.posEntityMap };
    const id = this.posToEntityId({ x, y });
    delete posEntityMap[id];
    this.setState({
      posEntityMap
    });
  };

  handleCellUpdate = cellUpdate => {
    const x = cellUpdate.getX();
    const y = cellUpdate.getY();
    // Check if the update has an Entity
    if (cellUpdate.hasEntity()) {
      const cellUpdateEntity = cellUpdate.getEntity();
      const entity = {
        id: cellUpdateEntity.getId(),
        class: cellUpdateEntity.getClass(),
        x,
        y
      };
      this.setCellToEntity(x, y, entity);
    } else {
      // It is telling us this cell is empty now
      this.setCellToEmpty(x, y);
    }
  };

  handleServerAction = serverAction => {
    let { posEntityMap } = this.state;
    const action = serverAction.getAction();
    if (action === "RESET") {
      posEntityMap = {};
      this.setState({ posEntityMap });
    }
  };

  // On data received from stream
  onData = response => {
    if (response.hasCellupdate()) {
      this.handleCellUpdate(response.getCellupdate());
    } else if (response.hasServeraction()) {
      this.handleServerAction(response.getServeraction());
    }
  };

  // On stream ended
  onEnd = end => {
    console.log("Stream ended!");
  };

  /**
   * onCellClick - When a cell is clicked, get the entity for this cell then
   *   pass it up to the parent.
   * @param pos {x, y} - the position that was clicked
   */
  onCellClick = pos => {
    const { onCellClick } = this.props;
    if (onCellClick) {
      const entity = this.getEntityByPos(pos);
      onCellClick(entity);
    }
  };

  getEntityByPos = pos => {
    const { posEntityMap } = this.state;
    const id = this.posToEntityId(pos);
    return posEntityMap[id];
  };

  render() {
    const { classes } = this.props;
    const { error } = this.state;
    return (
      <div>
        <Typography className={classes.errorText} variant="subtitle1">
          {error}
        </Typography>
        <Paper className={classes.stagePaperContainer}>
          <World
            getEntityByPos={this.getEntityByPos}
            onCellClick={this.onCellClick}
          />
        </Paper>
      </div>
    );
  }
}

Spectate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Spectate);
