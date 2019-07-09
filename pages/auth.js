import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import SignIn from "../components/signin";

const styles = theme => ({});

class Auth extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Container component="main" maxWidth="xs">
          <SignIn />
        </Container>
      </Grid>
    );
  }
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Auth);
