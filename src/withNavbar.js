// withNavbar.js - HOC
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import NavBar from "../components/navBar";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  buffer: theme.mixins.toolbar
});

export default options => Page => {
  class PageWithNavBar extends React.Component {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <NavBar />
          {!options ||
          options.useBuffer === null ||
          options.useBuffer === true ? (
            <div className={classes.buffer} />
          ) : null}
          <Page {...this.props} />
        </div>
      );
    }
  }

  return withStyles(styles)(PageWithNavBar);
};

// export default withStyles(styles)(WithNavbarHOC);
