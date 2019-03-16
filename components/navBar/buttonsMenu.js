import React from 'react';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Divider from '@material-ui/core/Divider';
import { Typography, withStyles } from '@material-ui/core';
import SwitchComponent from '../switchComponent';

const styles = theme => ({
  buttonStart: {
    // borderLeft: '0.05em solid white'
  },
  myCampaignsButton: {
    // color: theme.palette.secondary.light
  }
});

const ButtonsMenu = ({ classes, isSignedIn }) => (
  <div style={{ display: 'inline-block' }}>

  </div>
);

export default withStyles(styles)(ButtonsMenu);
