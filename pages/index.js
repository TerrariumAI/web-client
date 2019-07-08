import Layout from "../components/MyLayout.js";
import Link from "next/link";
import { EnvironmentClient } from "../api/environment_grpc_web_pb";
import { GetEntityRequest, Entity } from "../api/environment_pb";
// import fetch from "isomorphic-unfetch";
import { db } from "../lib/db";

const addr = "localhost:9091";

class Index extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, sf: {} };
  }

  componentDidMount() {
    console.log(db);
    var docRef = db.collection("cities").doc("SF");

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.setState(() => ({ loading: false, sf }));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

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
