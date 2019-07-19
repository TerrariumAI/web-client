import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import { withFirebase } from "react-redux-firebase";
import axios from "axios";
import { EnvironmentClient } from "../api/environment_grpc_web_pb";
import {
  GetEntityRequest,
  CreateEntityRequest,
  GetEntitiesInRegionRequest,
  Entity
} from "../api/environment_pb";

const useStyles = makeStyles(theme => ({
  marginRight: 15
}));

let Testing = ({ firebase }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  let sendEntity = () => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function(idToken) {
        const instance = axios.create({
          baseURL:
            "http://35.244.188.173/endpoints.terrariumai.environment.Environment",
          timeout: 1000,
          headers: { authorization: `Bearer ${idToken}` }
        });

        instance
          .post("/CreateEntity", {
            entity: {
              x: 5,
              y: 0
            }
            // x: 0,
            // y: 0
          })
          .then(function(response) {
            // handle success
            console.log(response);
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          })
          .finally(function() {
            // always executed
          });

        // var service = new EnvironmentClient("http://34.67.238.242", null, null);
        // var entity = new Entity();
        // entity.setX(0);
        // entity.setY(0);
        // var request = new GetEntitiesInRegionRequest();
        // request.setX(0);
        // request.setY(0);
        // var metadata = {
        //   authorization: `Bearer ${idToken}`
        // };
        // console.log(idToken);
        // let call = service.getEntitiesInRegion(
        //   request,
        //   metadata,
        //   (err, resp) => {
        //     if (err) {
        //       console.log("Got error: ", err);
        //     }
        //     console.log("Resp: ", resp);
        //   }
        // );
        // call.on("status", function(status) {
        //   console.log("Status: ", status.code);
        //   console.log("Details: ", status.details);
        //   console.log("Meta: ", status.metadata);
        // });
      })
      .catch(function(error) {
        // Handle error
        console.log("Error: ", error);
      });
  };

  return (
    <Container>
      <Button onClick={sendEntity}>Send Create Entity Request</Button>
    </Container>
  );
};

export default withFirebase(Testing);
