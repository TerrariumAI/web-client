import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  marginRight: 15
}));

const addr = "http://35.222.3.192";

let Testing = props => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  let sendEntity = () => {
    this.props.firebase
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

export default Testing;
