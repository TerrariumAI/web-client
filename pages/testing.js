import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import { withFirebase } from "react-redux-firebase";

import { EnvironmentClient } from "../api/environment_grpc_web_pb";
import {
  GetEntityRequest,
  CreateEntityRequest,
  Entity
} from "../api/environment_pb";

const useStyles = makeStyles(theme => ({
  marginRight: 15
}));

const addr = "http://104.198.204.211";

let Testing = ({ firebase }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  let sendEntity = () => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function(idToken) {
        var service = new EnvironmentClient(addr, null, null);
        var request = new CreateEntityRequest();
        var metadata = {
          authorization: `Bearer ${idToken}`
        };
        console.log(idToken);
        service.createEntity(request, metadata, (err, resp) => {
          if (err) {
            console.log("Got error: ", err);
          }
          console.log("Resp: ", resp);
        });
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
