import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Link from "next/link";
import { withFirebase, firestoreConnect } from "react-redux-firebase";
import {
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core";
import withNavbar from "../src/withNavbar";
import SimpleEnvObs from "../components/simpleEnvObs";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  header: {
    paddingBottom: theme.spacing(6)
  },
  bigBody: {
    fontSize: 25
  },
  watchNow: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
    backgroundColor: "white"
  },
  infoCardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}));

const Index = ({ users }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      <Grid item xs={10} className={classes.header}>
        <Typography variant="h2" align="center" gutterBottom>
          A persistant, online environment for AI
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Terrarium AI simulates simple life and enables developers to truly push the 
        limits of AI with an online, persistent environment. Models are forced to compete 
        for survival by using sensors for observation, and simple actions such as movement, 
        consumption, rest, communication and combat.
        </Typography>

        <Grid container spacing={2} justify="center">
          <Grid item>
            <Link href="/signup">
              <Button variant="contained" color="primary">
                Get started
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button href="https://docs.terrarium.ai" variant="outlined" color="primary">
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        xs={12}
        className={classes.watchNow}
      >
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom>
            Watch Now
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
            gutterBottom
          >
            Observe the environment live from your browser!
            <br />
            Use the arrow keys ↑↓→← to explore
          </Typography>
        </Grid>

        <SimpleEnvObs />
      </Grid>

      <Container className={classes.infoCardGrid} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Learn
                </Typography>
                <Typography>
                  Use Terrarium to learn how to develop your own RL models
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small" color="primary">
                  Learn More
                </Button> */}
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Compete
                </Typography>
                <Typography>
                  Use Terrarium to learn how to develop your own RL models
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small" color="primary">
                  Learn More
                </Button> */}
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Watch
                </Typography>
                <Typography>
                  Use Terrarium to learn how to develop your own RL models
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small" color="primary">
                  Learn More
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};
export default compose(
  withNavbar(),
  withFirebase
  // firestoreConnect(["users"]), // or { collection: 'todos' }
  // connect((state, props) => ({
  //   users: state.firestore.ordered.users
  // }))
)(Index);
