import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";

const {
  SpectateRequest,
  SubscribeToRegionRequest,
  SpawnAgentRequest,
  AgentActionRequest,
  EntityUpdate
} = require("../lib/proto/simulation_pb");
const { SimulationClient } = require("../lib/proto/simulation_grpc_web_pb");

const world_center_offset = 400;

const client_id = "test_id";

class Index extends React.Component {
  state = {
    cells: {}
  };

  async componentDidMount() {
    var simService = new SimulationClient(
      "http://" + window.location.hostname + ":8080",
      null,
      null
    );
    this.simService = simService;

    var request = new SpectateRequest();
    request.setId(client_id);
    var metadata = {};
    var stream = simService.spectate(request, metadata);

    stream.on("data", this.onData);

    stream.on("status", function(status) {
      console.log(status.code);
      console.log(status.details);
      console.log(status.metadata);
    });
    stream.on("end", function(end) {
      // stream end signal
    });
  }

  spectateRegion = (x, y) => {
    if (x === null || y === null) {
      console.log("spectateRegion(): NULL VALUES");
      return;
    }
    const { simService } = this;
    // Subscribe to region
    var request = new SubscribeToRegionRequest();
    request.setId(client_id);
    request.setX(x);
    request.setY(y);
    var metadata = {};
    const call = simService.subscribeToRegion(
      request,
      metadata,
      (err, resp) => {
        console.log(resp);
      }
    );
    call.on("status", status => {
      console.log(status);
    });
  };

  spectateRegion_TEST = () => {
    console.log("SPEC GTEST");
    this.spectateRegion(1, 1);
    this.spectateRegion(-1, 1);
    this.spectateRegion(1, -1);
    this.spectateRegion(-1, -1);
  };

  onData = response => {
    // Parse the data
    const cellUpdate = {
      x: response.getX(),
      y: response.getY(),
      occupant: response.getOccupant()
    };
    console.log("Cell update: ", cellUpdate);
    if (cellUpdate.occupant === "WORLD_RESET") {
      this.setState({ cells: {} });
    }
    console.log("Response: ", response);
    console.log("CellUpdate: ", cellUpdate);
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

  // agentAction = action => () => {
  //   const { simService, currentAgentId } = this.state;
  //   var req = new AgentActionRequest();
  //   req.setId(currentAgentId);
  //   req.setAction(action);
  //   simService.agentAction(req, {}, (err, response) => {
  //     console.log(err);
  //     console.log(response);
  //   });
  // };

  render() {
    const { cells } = this.state;
    console.log(cells);
    return (
      <div>
        <p>Hello Next.js</p>
        <button onClick={this.spectateRegion_TEST}>Spectate</button>
        {/* <button onClick={this.spawnAgent}>Spawn Agent</button>
        <button onClick={this.agentAction("RIGHT")}>Agent Action Right</button> */}
        <Stage width={500} height={500}>
          <Layer>
            {Object.keys(cells).map(id => {
              const c = cells[id];
              let fill = "white";
              if (c.occupant === "AGENT") {
                fill = "blue";
              } else if (c.occupant === "FOOD") {
                fill = "green";
              }

              return (
                <Rect
                  x={world_center_offset + c.x * 10}
                  y={world_center_offset + -c.y * 10}
                  width={10}
                  height={10}
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

export default Index;
