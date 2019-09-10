import {useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Grid, FormControl, InputLabel, Paper, Select, CircularProgress, MenuItem } from "@material-ui/core";
import withNavbar from "../src/withNavbar";
import { compose } from "redux";
import RemoteModelsList from "../components/remoteModelsList";
import NewRemoteModelDialog from "../components/newRemoteModelDialog";
import { CreateEntity, DeleteEntity, SpawnFood } from "../lib/environmentApi";
import EnvObservation from "../components/envObservation";
import { withFirebase, withFirestore, firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import TopEntitiesTable from "../components/topEntitiesTable";
import Router from 'next/router'

const useStyles = makeStyles(theme => ({
  modelFormControl: {
    minWidth: 100
  },
  paper: {
    padding: theme.spacing(3, 2),
  },
  env: {
    paddingRight: theme.spacing(4)
  }
}));

let idToken = "";

let Dashboard = props => {
  const classes = useStyles();

  const [selectedCell, setSelectedCell] = React.useState({});
  const [selectedRMId, setSelectedRMId] = React.useState("");
  const [selectedEntity, setSelectedEntity] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  if (isLoaded(props.auth) && isEmpty(props.auth)) {
    Router.push('/signup')
  }

  // componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!idToken) {
      props.firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user.getIdToken().then(function(_idToken) {
            idToken = _idToken
          });
        }
      });
    }
  }, []);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  };

  const handleDeleteEntity = () => {
    if (selectedCell.entity) {
      DeleteEntity(idToken, selectedCell.entity.id)
    }
  }

  // When a cell is clicked, set its position to the selected position
  function onCellClick(pos, entity) {
    setSelectedCell({pos, entity})
  }

  function spawnEntity() {
    if (!selectedRMId) {
      console.log("ERROR: Invalid remote model id")
      return
    }

    if (!selectedCell.pos) {
      console.log("ERROR: Invalid selected position")
      return
    }
    
    CreateEntity(idToken, selectedRMId, selectedCell.pos.x, selectedCell.pos.y)
  }

  function handleRMChange(event) {
    setSelectedRMId(event.target.value)
  };

  function SpawnEntity() {
    if (!isLoaded(props.remoteModels) || isEmpty(props.remoteModels)) {
      return <Paper className={classes.paper}>
        <CircularProgress />
      </Paper>
    }
    let canSpawn = !!selectedRMId && !!selectedCell && !!selectedCell.pos
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5">Spawn</Typography>

        <FormControl variant="filled" className={classes.modelFormControl}>
          <InputLabel htmlFor="filled-model-simple">Model</InputLabel>
          <Select
            value={selectedRMId}
            onChange={handleRMChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.keys(props.remoteModels).map(remoteModelID => {
              return (<MenuItem value={remoteModelID} key={remoteModelID}>{props.remoteModels[remoteModelID].name}</MenuItem>)
            })}
          </Select>
        </FormControl>

        <br /><br />

        {!!selectedCell.pos ? 
          <Typography>Selected Position: ({ selectedCell.pos.x}, {selectedCell.pos.y})</Typography>
        :
          <Typography><i>Select a cell on the environment</i></Typography>
        }

        <br />

        <Button disabled={!canSpawn} variant="contained" color="secondary" onClick={spawnEntity}>Spawn Entity</Button>
      </Paper>
    )
  }

  function EntityInspector() {
    let classToString = classId => {
      switch (classId) {
        case 1:
          return "Agent"
        case 2:
          return "Rock"
        case 3:
          return "Food"
      }
    }
    // If no entity is selected, display info on how to select an entity
    if (!selectedCell.entity) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h5">Entity Inspector</Typography>
          <Typography><i>Select an entity in the environment</i></Typography>
        </Paper>
      )
    }
    // If an entity is selected, display info and action buttons
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5">Entity Inspector</Typography>
        {Object.keys(selectedCell.entity).map(key => {
          if (key == "class") {
            return (
              <div key={selectedCell.entity.id + key}>
                <Typography><b>{key}</b>: {classToString(selectedCell.entity[key])}</Typography>
              </div>
            )
          }
          return (
            <div key={selectedCell.entity.id + key}>
              <Typography><b>{key}</b>: {selectedCell.entity[key]}</Typography>
            </div>
          )
        })}
        <Button variant="contained" onClick={handleDeleteEntity}>
          Delete
        </Button>
      </Paper>
    )
  }

  function AdminControls() {
    const {profile} = props;
    if (isLoaded(profile) && profile.isAdmin) {
      return (
        <Button onClick={() => SpawnFood(idToken)}>Spawn Food</Button>
      )
    } else {
      return null
    }
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

        <br /> <br />

        <Typography variant="h3">Environment</Typography>
        <Typography variant="h6" color="textSecondary">
          Interract with the environment by using the control and info boxes to the right of the environment.
        </Typography>

        <Grid container>
          <Grid item className={classes.env}>
            <EnvObservation selectedEntity={selectedEntity} onCellClick={onCellClick} />
          </Grid>
          <Grid item>
            <SpawnEntity />
            <br />
            <EntityInspector />
          </Grid>
        </Grid>

        <br /> <br />

        <Grid container>
          <Grid item>
            <Typography variant="h3">Oldest Agents</Typography>
            <TopEntitiesTable onSelectEntity={(entity) => setSelectedEntity(entity)} />
          </Grid>
        </Grid>

        <AdminControls />
      </Container>

      
      
    </div>
  );
};

export default compose(
  withNavbar(), 
  withFirebase,
  withFirestore,
  connect(({ firestore, firebase: { auth, profile } }, props) => ({
    remoteModels: firestore.data.myRemoteModels,
    auth,
    profile
  })),
  firestoreConnect(({ firebase, auth }) => [
    {
      collection: "remoteModels",
      where: [["ownerUID", "==", auth.uid || ""]],
      storeAs: "myRemoteModels"
    }
  ])
  )(Dashboard);
