import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Collapse, IconButton, Grid } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { compose } from 'redux';
import { isLoaded } from 'react-redux-firebase';
import Logo from '../logo';
import SwitchComponent from '../switchComponent';

const listItemHeight = 60;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  listItem: {
    height: listItemHeight
  },
  grow: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar
});

const DrawerContent = props => {
  const { classes, page, changePage, isSignedIn } = props;

  return (
    <div>
      <List>
        <SwitchComponent show={isSignedIn}>
          <ListItem
            onClick={() => changePage('/campaigns')}
            selected={page === 'setup'}
            button
            key="campaigns"
            className={classes.listItem}
          >
            <ListItemText primary="My Campaigns" />
          </ListItem>
        </SwitchComponent>

        <ListItem
          onClick={() => changePage('/')}
          selected={page === 'setup'}
          button
          key="home"
          className={classes.listItem}
        >
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          onClick={() => changePage('/howItWorks')}
          selected={page === 'howItWorks'}
          button
          key="howItWorks"
          className={classes.listItem}
        >
          <ListItemText primary="How It Works" />
        </ListItem>

        <ListItem
          onClick={() => changePage('/information')}
          selected={page === 'information'}
          button
          key="information"
          className={classes.listItem}
        >
          <ListItemText primary="Information" />
        </ListItem>

        <ListItem
          onClick={() => changePage('/contact')}
          selected={page === 'contact'}
          button
          key="contact"
          className={classes.listItem}
        >
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </div>
  );
};

DrawerContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withRouter
)(DrawerContent);
