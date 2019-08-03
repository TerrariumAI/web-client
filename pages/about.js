import React from "react";
import { compose } from "redux";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Typography, Avatar } from "@material-ui/core";
import withNavbar from "../src/withNavbar";
import { withFirebase } from "react-redux-firebase";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  avatar: {
    width: 200,
    height: 200,
    marginRight: theme.spacing(5)
  },
  body: {
    maxWidth: 600
  }
}));

let About = ({ firebase, router }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    error: ""
  });

  return (
    <Grid container>
      <Container component="main">
        <Typography variant="h3">Who's behind Terrarium.ai?</Typography>
        <br /> <br />
        <Grid container direction="horizontal" alignItems="center">
          <Avatar alt="Zac Holland" src="https://i.imgur.com/nYiaZCi.jpg" className={classes.avatar} />
          <Grid>
            <Typography variant="h5"><b>Zac Holland</b></Typography>
            <Typography variant="h6" color="textSecondary" className={classes.body}>
              At the moment, just me and this camel I met! I recently graduated from the University of Denver and am working at PubNub in San Francisco.
              Terrarium.ai is a passion project for me and I am the only person working on the project. Let me know if you'd like to help!
            </Typography>
          </Grid>
          
        </Grid>
        
      </Container>
    </Grid>
  );
};

About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withNavbar(),
  withRouter,
  withFirebase
)(About);
