import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import withNavBar from "../lib/withNavBar";
import { withFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import {
  Grid,
  Paper,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  TextField,
  Button
} from "@material-ui/core";
const styles = theme => ({
  root: {
    marginTop: 40
  },
  cardContent: {
    textAlign: "center",
    alignItems: "center"
  },
  avatar: {
    alignSelf: "center",
    width: 140,
    height: 140,
    marginBottom: "2em"
  },
  paper: {
    padding: 15
  },
  secretKeyField: {
    width: 350
  }
});

class Account extends React.Component {
  state = {
    showSecret: false
  };

  toggleSecret = () => {
    this.setState({
      showSecret: !this.state.showSecret
    });
  };

  render() {
    const { classes, profile } = this.props;
    const { showSecret } = this.state;

    if (!isLoaded(profile) || isEmpty(profile)) {
      return (
        <div className={classes.root}>
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        </div>
      );
    }
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <Grid container spacing={32}>
              <Grid item xs={3}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Grid container justify="center">
                      <Grid item>
                        <Avatar className={classes.avatar} />
                      </Grid>
                    </Grid>

                    <Typography variant="subtitle1">{profile.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={9}>
                <Paper className={classes.paper}>
                  <Typography variant="h6">Secret Key</Typography>
                  <Typography gutterBottom variant="subtitle1">
                    This is the key you use to connect your models to our
                    servers.
                  </Typography>
                  <Divider />
                  <TextField
                    className={classes.secretKeyField}
                    type={showSecret ? "text" : "password"}
                    margin="normal"
                    value={profile.secret}
                    variant="outlined"
                    disabled
                  />
                  <br />
                  <Button color="primary" onClick={this.toggleSecret}>
                    {showSecret ? "Hide" : "Show"}
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withNavBar({ useBuffer: true }),
  withStyles(styles),
  connect(({ firebase: { profile } }) => ({
    profile
  }))
)(Account);
