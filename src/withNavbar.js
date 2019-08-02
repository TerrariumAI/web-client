// withNavbar.js - HOC
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "../components/navbar";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  buffer: theme.mixins.toolbar
});

export default options => Page => {
  class PageWithNavbar extends React.Component {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Navbar />
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

  return withStyles(styles)(PageWithNavbar);
};

// export default withStyles(styles)(WithNavbarHOC);
