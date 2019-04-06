import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Router from "next/router";

const styles = theme => ({
  root: {
    display: "flex"
  },
  logo: {
    cursor: "pointer",
    width: 150,
    fontFamily: "Comfortaa",
    color: theme.palette.custom.logo
  },
  grow: {
    flexGrow: 1
  }
});

const Logo = ({ classes, shouldGrow }) => (
  <Typography
    onClick={() => Router.push("/")}
    variant="h6"
    color="inherit"
    className={shouldGrow ? classes.grow : ""}
  >
    <div className={classes.logo}>Neural Matrix</div>
  </Typography>
);

Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Logo);
