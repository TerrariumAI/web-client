import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  obsPanel: {
    width: 600,
    height: 600,
    backgroundColor: "lightgreen"
  },
  comingSoonContainer: {
    height: "100%"
  }
}));

let SimpleEnvObs = props => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  return (
    <div className={classes.obsPanel}>
      <Grid
        container
        spacing={0}
        align="center"
        justify="center"
        direction="column"
        className={classes.comingSoonContainer}
      >
        <Grid item>
          <Typography variant="h3" color="textSecondary">
            Coming soon!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default SimpleEnvObs;
