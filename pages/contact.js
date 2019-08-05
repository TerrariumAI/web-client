import React from "react";
import { compose } from "redux";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Typography } from "@material-ui/core";
import withNavbar from "../src/withNavbar";
import { withFirebase } from "react-redux-firebase";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

let Contact = ({ firebase, router }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    error: ""
  });

  return (
    <Grid container>
      <Container component="main">
        <Typography variant="h3">Contact us!</Typography>
        <Typography variant="h6" color="textSecondary">If you have any feedback, questions, or just want to talk feel free to message on any of these platforms!</Typography>
        <br />
        <Typography variant="h6">Email</Typography>
        <Typography variant="h6" color="textSecondary">zacharyholland@gmail.com</Typography>
        <Typography variant="h6">Twitter</Typography>
        <Typography variant="h6" color="textSecondary">@terrariumai <br /> @zollandd</Typography>
      </Container>
    </Grid>
  );
};

Contact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withNavbar(),
  withRouter,
  withFirebase
)(Contact);
