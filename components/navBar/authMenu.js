import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase';
import { IconButton, Menu, MenuItem, Link, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Router from 'next/router';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  secondaryColor: {
    color: theme.palette.secondary.main
  }
});

/**
 * Renders auth buttons depending on user's auth state.
 * When the user isn't signed in show login and sign up buttons.
 * When the user is logged in, show a logout button
 */
class AuthMenu extends React.Component {
  state = {
    anchorEl: null
  };

  /**
   * HandleMenu
   * opens the menu on click
   */
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * HandleClose - Curried function
   * Call the first function and pass a callback, returns a function that
   * closes the ui and then calls the callback
   */
  handleClose = callback => () => {
    this.setState({ anchorEl: null });
    if (callback) {
      callback();
    }
  };

  render() {
    const { classes, firebase, auth } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    // Don't show anything if auth hasn't loaded yet
    if (!isLoaded(auth)) {
      return null;
    }

    // Show login/sign up buttons if auth is loaded but empty
    if (isEmpty(auth)) {
      return (
        <div>
          <Button color="inherit" href="/auth?action=login">
            Login
          </Button>
          <Button color="inherit" href="/auth?action=signup">
            Sign Up
          </Button>
        </div>
      );
    }

    // Show profile icon if user is authenticated
    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={this.handleClose()}
        >
          <MenuItem onClick={this.handleClose(() => Router.push('/account'))}>Account</MenuItem>
          <MenuItem onClick={this.handleClose(firebase.logout)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

AuthMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
  withStyles(styles)
)(AuthMenu);
