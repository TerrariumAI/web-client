import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormControl, FormHelperText, Button } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  textField: {
    width: 400
  }
};

const LoginForm = ({ classes, state, handleChange, onSubmit }) => (
  <FormControl className={classes.formControl} error={state.error !== null}>
    <TextField
      id="standard-name"
      label="Email"
      className={classes.textField}
      value={state.email}
      onChange={handleChange('email')}
      margin="normal"
    />
    <br />
    <TextField
      id="standard-name"
      label="Password"
      type="password"
      className={classes.textField}
      value={state.password}
      onChange={handleChange('password')}
      margin="normal"
    />

    <br />
    <FormHelperText id="component-error-text">{state.error}</FormHelperText>
    <br />

    <Button onClick={onSubmit} variant="contained" color="primary">
      Login
    </Button>
  </FormControl>
);

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
