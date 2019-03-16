import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormControl,
  FormHelperText,
  Button,
  Typography,
  Divider
} from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  textField: {
    width: 400
  }
};

const SignupForm = ({ classes, state, handleChange, onSubmit }) => (
  <FormControl className={classes.formControl} error={state.error !== null}>
    <Typography align="left" variant="subtitle1">
      Account Info
    </Typography>
    <Divider />
    <TextField
      id="standard-name"
      variant="outlined"
      label="Full Name"
      className={classes.textField}
      value={state.name}
      onChange={handleChange("name")}
      margin="normal"
    />
    <br />
    <TextField
      id="standard-name"
      variant="outlined"
      label="Email"
      className={classes.textField}
      value={state.email}
      onChange={handleChange("email")}
      margin="normal"
    />
    <br />
    <TextField
      id="standard-name"
      variant="outlined"
      label="Password"
      type="password"
      className={classes.textField}
      value={state.password}
      onChange={handleChange("password")}
      margin="normal"
    />

    <br />
    <FormHelperText id="component-error-text">{state.error}</FormHelperText>

    <Button onClick={onSubmit} variant="contained" color="primary">
      Signup
    </Button>
  </FormControl>
);

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupForm);
