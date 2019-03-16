// navBar.js - Component
import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import { Hidden, IconButton, Drawer } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import classNames from "classnames";
import { withFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import Router from "next/router";

import Logo from "../logo";
import ButtonsMenu from "./buttonsMenu";
import AuthMenu from "./authMenu";
import DrawerContent from "./drawerContent";

const drawerWidth = 240;

const styles = theme => ({
  // Class specific to just the drawer
  drawerPaper: {
    position: "fixed",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class NavBar extends React.Component {
  state = {
    isDrawerOpen: false
  };

  /**
   * Render the menu buttons when the user is signed in
   */
  renderOnlyWhenAuthenticated(component) {
    const { auth } = this.props;
    // Don't show anything if auth hasn't loaded yet
    if (!isLoaded(auth) || isEmpty(auth)) {
      return null;
    }

    return component;
  }

  changePage = page => {
    this.handleDrawerClose();
    Router.push(page);
  };

  handleDrawerOpen = () => {
    this.setState(() => ({ isDrawerOpen: true }));
  };

  handleDrawerClose = () => {
    this.setState(() => ({ isDrawerOpen: false }));
  };

  render() {
    // Styles are passed as props.classes when we export using 'withStyles'
    const { isDrawerOpen } = this.state;
    const { classes, auth } = this.props;
    const isSignedIn = isLoaded(auth) && !isEmpty(auth);

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* On large devices, show the buttons menu */}
          <Hidden smDown>
            <Logo shouldGrow />
            <ButtonsMenu smUp isSignedIn={isSignedIn} />
          </Hidden>

          {/* On small devices, show a hamburger menu and open a drawer */}
          <Hidden mdUp>
            {/* <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, isDrawerOpen && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton> */}
            <Logo shouldGrow />
          </Hidden>

          <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden implementation="css">
              <Drawer
                container={this.props.container}
                anchor="left"
                open={isDrawerOpen}
                onClose={this.handleDrawerClose}
                classes={{
                  paper: classNames(
                    classes.drawerPaper,
                    classes.drawerWidthOpen,
                    !isDrawerOpen && classes.drawerWidthClosed
                  )
                }}
              >
                <DrawerContent
                  changePage={this.changePage}
                  isSignedIn={isSignedIn}
                  handleDrawerClose={this.handleDrawerClose}
                />
              </Drawer>
            </Hidden>
          </nav>

          {<AuthMenu />}
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  })
};

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth })),
  withStyles(styles)
)(NavBar);
