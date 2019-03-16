// auth.js Page
import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "next/router";
import { compose } from "redux";
import { withStyles } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withFirebase, withFirestore } from "react-redux-firebase";
import withNavBar from "../lib/withNavBar";
import LoginForm from "../components/loginForm";
import SignupForm from "../components/signupForm";
import SwitchComponent from "../components/switchComponent";

const styles = {
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  textField: {
    width: 400
  }
};

class Auth extends React.Component {
  // Create our initial state
  state = {
    email: "",
    password: ""
  };

  // Handle changes from text fields
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  // Validate that the data entered for logging in is okay
  validateLoginData = () => {
    const { name, email, password } = this.state;
    return (
      name !== null &&
      name !== "" &&
      email !== null &&
      email !== "" &&
      password !== null &&
      password !== ""
    );
  };

  // Create user's business in their business list
  addBusinessInfoToUserProfile = () => {
    const { firebase, firestore } = this.props;
    const { businessAddress, businessName } = this.state;
    // Add business info to their profile
    const { uid } = firebase.auth().currentUser;
    return firestore
      .collection("users")
      .doc(uid)
      .collection("businesses")
      .add({
        name: businessName,
        address: businessAddress
      });
  };

  onSubmit = async () => {
    const {
      router: {
        query: { action }
      },
      router,
      firebase,
      firestore
    } = this.props;
    const { name, email, password } = this.state;

    if (action === "login") {
      // Validate the fields before trying to submit them
      if (!this.validateLoginData()) {
        this.setState({
          error: "Please enter an email and password."
        });
        return;
      }

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
        this.setState({
          error: "There is something wrong with your email or password."
        });
      }
    } else if (action === "signup") {
      // Validate fields before trying to signup
      if (!this.validateLoginData()) {
        this.setState({
          error: "Please enter correct Account and Business details."
        });
        return;
      }

      // Create user
      firebase.createUser({ email, password }, { email, name }).then(ref => {});

      // Succesful login go back to home screen
      router.push("/");
    }
  };

  render() {
    // Parse out action telling us whether we should login or signup
    // from props
    const {
      router: {
        query: { action }
      },
      classes
    } = this.props;
    const { name, email, password, error } = this.state;

    // Make sure users can't just enter whatever action they want
    if (action !== "login" && action !== "signup") {
      return <p>Invalid action</p>;
    }

    return (
      <div className={classes.root}>
        <SwitchComponent show={action === "login"}>
          <LoginForm
            {...{
              state: this.state,
              handleChange: this.handleChange,
              onSubmit: this.onSubmit
            }}
          />
        </SwitchComponent>
        <SwitchComponent show={action === "signup"}>
          <SignupForm
            {...{
              state: this.state,
              handleChange: this.handleChange,
              onSubmit: this.onSubmit
            }}
          />
        </SwitchComponent>
      </div>
    );
  }
}

Auth.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired
  })
};
// Composes functions from right to left
export default compose(
  withNavBar(),
  withRouter,
  withFirebase,
  withFirestore,
  withStyles(styles)
)(Auth);
