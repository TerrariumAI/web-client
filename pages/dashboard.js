import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Grid, FormControl, InputLabel, Select, CircularProgress } from "@material-ui/core";
import withNavbar from "../src/withNavbar";
import { compose } from "redux";
import RemoteModelsList from "../components/remoteModelsList";
import NewRemoteModelDialog from "../components/newRemoteModelDialog";
import { CreateEntity } from "../lib/environmentApi";
import SimpleEnvObs from "../components/simpleEnvObs";
import { withFirebase, withFirestore, firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
const useStyles = makeStyles(theme => ({
  marginRight: 15
}));

let selectedCell = null

let Dashboard = props => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});
  const [selectedRMId, setSelectedRMId] = React.useState("");
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
    if (!selectedRMId) {
      console.log("ERROR: Invalid remote model id")
      return
    }
    console.log("Spawning entity with rm id:", selectedRMId)

    if (!selectedCell) {
      console.log("ERROR: Invalid selected position")
      return
    }
    console.log("POsition: ", selectedCell.x, selectedCell.y)
    
    props.firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.getIdToken().then(function(idToken) {
          CreateEntity(idToken, selectedRMId, selectedCell.x, selectedCell.y)
        });
      }
    });
  }

  function handleRMChange(event) {
    console.log(event)
    setSelectedRMId(event.target.value)
  };

  function SpawnEntity() {
    if (!isLoaded(props.remoteModels)) {
      return <CircularProgress />
    }
    if (isEmpty(props.remoteModels)) {
      return <Typography>You need to create an RM first!</Typography>
    }

    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Age</InputLabel>
          <Select
            native
            value={selectedRMId}
            onChange={handleRMChange}
            inputProps={{
              name: 'selectedRM',
              id: 'age-native-simple',
            }}
          >
            <option value="">
              Choose an RM
            </option>
            {Object.keys(props.remoteModels).map(remoteModelID => (
              <option value={remoteModelID} key={remoteModelID}>{props.remoteModels[remoteModelID].name}</option>
            ))}
          </Select>
        </FormControl>

          <Button onClick={spawnEntity}>Spawn Entity</Button>
      </div>
    )
  }

  return (
    <div>
      <Container>
        <Typography variant="h3">Remote Models</Typography>
        <Typography variant="h6" color="textSecondary">
          A remote model is the brain for your agents. This is where you can
          manage your RMs.
        </Typography>
        <RemoteModelsList remoteModels={props.remoteModels} />
        <br />
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Create New Remote Model
        </Button>

        <NewRemoteModelDialog open={open} onClose={handleClose} />
      </Container>
      <Grid container>
        <SimpleEnvObs onCellClick={onCellClick} />
        <Grid item>
          <SpawnEntity />
        </Grid>
        
      </Grid>
    </div>
  );
};

export default compose(
  withNavbar(), 
  withFirebase,
  withFirestore,
  connect(({ firestore, firebase: { auth } }, props) => ({
    remoteModels: firestore.data.myRemoteModels,
    auth
  })),
  firestoreConnect(({ firebase, auth }) => [
    {
      collection: "remoteModels",
      where: [["ownerUID", "==", auth.uid || ""]],
      storeAs: "myRemoteModels"
    }
  ])
  )(Dashboard);
