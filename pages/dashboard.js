import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import withNavbar from "../src/withNavbar";
import { compose } from "redux";
import RemoteModelsList from "../components/remoteModelsList";
import NewRemoteModelDialog from "../components/newRemoteModelDialog";
import { CreateEntity } from "../lib/environmentApi";
import SimpleEnvObs from "../components/simpleEnvObs";
import { withFirebase } from "react-redux-firebase";
const useStyles = makeStyles(theme => ({
  marginRight: 15
}));

let selectedCell = null

let Dashboard = props => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  };

  // When a cell is clicked, set its position to the selected position
  function onCellClick(position) {
    selectedCell = position
  }

  function spawnEntity() {
    props.firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.getIdToken().then(function(idToken) {
          CreateEntity(idToken, selectedCell.x, selectedCell.y)
        });
      }
    });
  }

  return (
    <div>
      <Container>
        <Typography variant="h3">Remote Models</Typography>
        <Typography variant="h6" color="textSecondary">
          A remote model is the brain for your agents. This is where you can
          manage your RMs.
        </Typography>
        <RemoteModelsList />
        <br />
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Create New Remote Model
        </Button>

        <NewRemoteModelDialog open={open} onClose={handleClose} />
      </Container>
      <Container>
        <SimpleEnvObs onCellClick={onCellClick} />
        <Button onClick={spawnEntity}>Spawn Entity</Button>
      </Container>
    </div>
  );
};

export default compose(withNavbar(), withFirebase)(Dashboard);
