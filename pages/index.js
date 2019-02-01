import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";

const {
  ObserveRequestMessage,
  EntityUpdateMessage,
  SpawnAgentMessage
} = require("../lib/proto/simulation_pb");
const { SimulationClient } = require("../lib/proto/simulation_grpc_web_pb");

// if (!process.browser) {
// }

class Index extends React.Component {
  state = {
    entities: {}
  };

  async componentDidMount() {
    var simService = new SimulationClient(
      "http://" + window.location.hostname + ":8080",
      null,
      null
    );

    // add service to state
    this.setState({
      simService
    });

    var request = new ObserveRequestMessage();
    var metadata = {};
    var stream = simService.observe(request, metadata);

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

  onData = response => {
    // Parse the data
    const id = response.getId();
    const entity = {
      class: response.getClass(),
      x: response.getX(),
      y: response.getY()
    };

    // update state
    const entities = { ...this.state.entities };
    entities[id] = entity;
    this.setState({
      entities
    });
  };

  spawnAgent = () => {
    const { simService } = this.state;

    var req = new SpawnAgentMessage();
    simService.spawnAgent(req, {}, function(err, response) {
      console.log(err);
      console.log(response);
    });
  };

  render() {
    const { entities } = this.state;
    return (
      <div>
        <p>Hello Next.js</p>
        <button onClick={this.spawnAgent}>Spawn Agent</button>
        <Stage width={500} height={500}>
          <Layer>
            {Object.keys(entities).map(id => {
              const e = entities[id];
              return (
                <Rect x={e.x} y={e.y} width={25} height={25} fill={"green"} />
              );
            })}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Index;
