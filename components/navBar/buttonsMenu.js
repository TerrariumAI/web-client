import React from "react";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import Divider from "@material-ui/core/Divider";
import { Typography, withStyles } from "@material-ui/core";
import SwitchComponent from "../switchComponent";

const styles = theme => ({
  button: {
    float: "left"
  },
  myCampaignsButton: {
    // color: theme.palette.secondary.light
  }
});

const ButtonsMenu = ({ classes, isSignedIn }) => (
  <div style={{ display: "inline-block" }}>
    <div className={classes.button}>
      <Button
        onClick={() => {
          Router.push("/");
        }}
        color="inherit"
      >
        Home
      </Button>
    </div>
    <div className={classes.button}>
      <Button
        onClick={() => {
          Router.push("https://olamai.gitbook.io/olamai/");
        }}
        color="inherit"
      >
        Docs
      </Button>
    </div>
    <div className={classes.button}>
      <Button
        onClick={() => {
          Router.push("/environment");
        }}
        color="inherit"
      >
        Environment
      </Button>
    </div>
  </div>
);

export default withStyles(styles)(ButtonsMenu);
