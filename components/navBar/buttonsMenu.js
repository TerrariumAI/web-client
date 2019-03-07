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
    <Button
      onClick={() => {
        Router.push('/');
      }}
      color="inherit"
    >
      Home
    </Button>

    <Button
      onClick={() => {
        Router.push('/howItWorks');
      }}
      color="inherit"
    >
      How It Works
    </Button>

    <Button
      onClick={() => {
        Router.push('/information');
      }}
      color="inherit"
    >
      Information
    </Button>

    <Button
      onClick={() => {
        Router.push('/contact');
      }}
      color="inherit"
    >
      Contact Us
    </Button>
    <SwitchComponent show={isSignedIn}>
      <Button
        onClick={() => {
          Router.push('/campaigns');
        }}
        color="inherit"
        className={classes.myCampaignsButton}
      >
        My Campaigns
      </Button>
    </SwitchComponent>
  </div>
);

export default withStyles(styles)(ButtonsMenu);
