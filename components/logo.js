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
  },
  logoImg: {
    height: 40,
    paddingRight: 10
  }
});

const Logo = ({ classes, shouldGrow }) => (
  <div className={shouldGrow ? classes.grow : ""}>
    <img
      src="/static/logoV1.png"
      className={classes.logoImg}
      style={{ float: "left" }}
    />
    <Typography
      onClick={() => Router.push("/")}
      variant="h6"
      color="inherit"
      className={shouldGrow ? classes.grow : ""}
      style={{ float: "left", paddingTop: 4 }}
    >
      <div className={classes.logo}>Terrarium.AI</div>
    </Typography>
  </div>

  // <div>
  //   <img src="/static/logoV1.png" className={classes.logoImg} />
  // </div>
);

Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Logo);
