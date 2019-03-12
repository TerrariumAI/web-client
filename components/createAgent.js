import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import { ServerAddress } from "../lib/constants";
import { Grid, Typography, Paper, TextField, Button } from "@material-ui/core";

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
  }
});

class CreateAgent extends React.Component {
  state = {
    x: 0,
    y: 0
  };

  componentDidMount() {
    this.simService = new SimulationServiceClient(ServerAddress, null, null);
  }

  createAgent = async () => {
    const { firebase } = this.props;
    const { x, y } = this.state;

    // Get current user's auth token
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(token => {
        // Create the new agent
        var agent = new Entity();
        agent.setX(x);
        agent.setY(y);
        var request = new CreateAgentRequest();
        request.setApi(API_VERSION);
        request.setAgent(agent);
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

  // Create a new agent with a testing
  createAgent_test = async () => {
    const { x, y } = this.state;
    // Create the new agent
    var agent = new Entity();
    agent.setX(x);
    agent.setY(y);
    var request = new CreateAgentRequest();
    request.setApi(API_VERSION);
    request.setAgent(agent);
    var metadata = { "auth-token": "TEST-ID-TOKEN" };
    const call = this.simService.createAgent(request, metadata, (err, resp) => {
      console.log("Sub response: ", resp);
    });
    call.on("status", status => {
      console.log("Create agent status: ", status);
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography>
            <b>Create Agent</b>
          </Typography>
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
          <Button color="primary" onClick={this.createAgent_test}>
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
  connect(state => {
    console.log(state);
  })
)(CreateAgent);
