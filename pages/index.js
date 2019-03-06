import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import uuidv1 from "uuid/v1";
import axios from "axios";

// const {
//   CreateRequest,
//   Create
// } = require("../pkg/api/v1/simulation/todo-service_pb");
const {
  CreateRequest,
  Create,
  ToDo
} = require("../pkg/api/v1/todo-service_pb");
const { ToDoServiceClient } = require("../pkg/api/v1/todo-service_grpc_web_pb");

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

    var todoService = new ToDoServiceClient(
      "http://192.168.99.100:30224",
      null,
      null
    );

    console.log(todoService);

    var todo = new ToDo();
    todo.setTitle("JS Created ToDo");
    todo.setDescription("This todo was created with JS client");
    var createRequest = new CreateRequest();
    createRequest.setApi("v1");
    createRequest.setTodo(todo);

    var response = await todoService.create(
      createRequest,
      {},
      (err, response) => {
        if (err) {
          console.log(err.code);
          console.log(err.message);
        } else {
          console.log(response);
        }
      }
    );

    // console.log(response);

    // this.simService = simService;
    // this.targetRegion = {
    //   x: 1,
    //   y: 1
    // };

    // var spectator = new Spectator();
    // spectator.setId(this.clientId);
    // var request = new CreateSpectatorRequest();
    // request.setSpectator(spectator);
    // var metadata = {};
    // var stream = simService.createSpectator(request, metadata);

    // stream.on("data", this.onData);

    // stream.on("status", function(status) {
    //   console.log(status.code);
    //   console.log(status.details);
    //   console.log(status.metadata);
    // });
    // stream.on("end", function(end) {
    //   // stream end signal
    // });

    // Add key listener
    document.addEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown = event => {
    switch (event.keyCode) {
      case LEFT_KEY_CODE:
        this.state.activePopover.hide();
        break;
      default:
        break;
    }
  };

  subscribeToRegion = (x, y) => {
    if (x === null || y === null) {
      console.log("spectateRegion(): NULL VALUES");
      return;
    }
    const { simService } = this;
    // Subscribe to region
    var request = new SubscribeSpectatorRequest();
    request.setSpectator(this.clientId);
    var region = new Region();
    region.setX(x);
    region.setY(y);
    request.setRegion(region);
    var metadata = {};
    const call = simService.subscribeSpectator(
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
    // var req = new SpawnAgentRequest();
    // req.setX(0);
    // req.setY(0);
    // this.simService.spawnAgent(req, {}, (err, response) => {
    //   console.log(err);
    //   console.log(response);
    //   this.setState({
    //     currentAgentId: response.getId()
    //   });
    // });
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
    console.log(`[CellUpdate] X: ${cellUpdate.x} Y: ${cellUpdate.y} `);
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
        <p>Hello Next.js</p>
        <button onClick={this.subscribeToRegion_TEST}>Spectate</button>
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

export default Index;
