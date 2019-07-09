import React from "react";
import { compose } from "redux";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import SignIn from "../components/signin";
import withNavbar from "../src/withNavbar";
import { withFirebase } from "react-redux-firebase";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

let Auth = ({ firebase, router }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    error: ""
  });

  let loginWithEmailAndPassword = async (email, password) => {
    // Attempt to login
    try {
      // Attempt to login, throws error if unsuccesful
      await firebase.login({
        email,
        password
      });

      // Succesful login go back to home screen
      router.push("/");
    } catch (error) {
      setValues({
        ...values,
        error: "There is something wrong with your email or password."
      });
      console.log(error);
    }
    console.log(email, password);
  };

  return (
    <Grid container>
      <Container component="main" maxWidth="xs">
        <SignIn onSubmit={loginWithEmailAndPassword} />
      </Container>
    </Grid>
  );
};

Auth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withNavbar(),
  withRouter,
  withFirebase
)(Auth);
