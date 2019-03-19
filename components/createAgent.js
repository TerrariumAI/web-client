import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import { ServerAddress } from "../lib/constants";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { withFirebase, firestoreConnect } from "react-redux-firebase";

const {
  CreateAgentRequest,
  Entity
} = require("../pkg/api/v1/simulation-service_pb");
const {
  SimulationServiceClient
} = require("../pkg/api/v1/simulation-service_grpc_web_pb");

const API_VERSION = "v1";

const styles = theme => ({
  paper: {
    padding: 10
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  select: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class CreateAgent extends React.Component {
  state = {
    x: 0,
    y: 0,
    model: ""
  };

  componentDidMount() {
    this.simService = new SimulationServiceClient(ServerAddress, null, null);
  }

  createAgent = async () => {
    const { firebase } = this.props;
    const { x, y, model } = this.state;

    // Get current user's auth token
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(token => {
        var request = new CreateAgentRequest();
        request.setX(x);
        request.setY(y);
        request.setModelname(model);
        request.setApi(API_VERSION);
        var metadata = { "auth-token": token };
        const call = this.simService.createAgent(
          request,
          metadata,
          (err, resp) => {
            console.log("Sub response: ", resp);
          }
        );
        call.on("status", status => {
          console.log("Create agent status: ", status);
        });
      })
      .catch(err => {
        console.error("Error refreshing id token", err);
        return false;
      });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes, remoteModels } = this.props;
    console.log(remoteModels);
    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography>
            <b>Create Agent</b>
          </Typography>
          <form className={classes.root} autoComplete="off">
            <TextField
              id="x"
              label="X Position"
              value={this.state.x}
              onChange={this.handleChange("x")}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
            <TextField
              id="x"
              label="Y Position"
              value={this.state.y}
              onChange={this.handleChange("y")}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
            <FormControl className={classes.select}>
              <InputLabel htmlFor="model">Model</InputLabel>
              <Select
                value={this.state.model}
                onChange={this.handleChange("model")}
                inputProps={{
                  name: "model",
                  id: "model"
                }}
              >
                {remoteModels
                  ? remoteModels.map(model => (
                      <MenuItem value={model.name}>{model.name}</MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </form>
          <br />
          <Button color="primary" onClick={this.createAgent}>
            Create
          </Button>
        </Paper>
      </Grid>
    );
  }
}

CreateAgent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withFirebase,
  connect(({ firestore: { ordered }, firebase: { auth } }) => ({
    auth,
    remoteModels: ordered.remoteModels
  })),
  firestoreConnect(({ auth }) => [
    { collection: "remoteModels", where: ["user", "==", auth.uid || ""] }
  ])
)(CreateAgent);
