import Layout from "../components/MyLayout.js";
import Link from "next/link";
import { EnvironmentClient } from "../api/environment_grpc_web_pb";
import { GetEntityRequest, Entity } from "../api/environment_pb";

const addr = "localhost:9091";

class Index extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, sf: {} };
  }

  componentDidMount() {}

  // componentDidMount() {
  //   var service = new EnvironmentClient(addr, null, null);
  //   var request = new GetEntityRequest();
  //   request.setId("0");
  //   var metadata = {};
  //   service.getEntity(request, metadata, (err, resp) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(resp);
  //   });
  // }

  render() {
    return (
      <Layout>
        <h1>Batman TV Shows</h1>
      </Layout>
    );
  }
}

export default Index;
