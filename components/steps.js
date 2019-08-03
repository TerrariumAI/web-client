import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Paper } from "@material-ui/core";
import Create from "@material-ui/icons/Create";
import SettingsInputAntenna from "@material-ui/icons/SettingsInputAntenna";
import { palette } from "@material-ui/system";
import Person from "@material-ui/icons/Person";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: 600,
    backgroundColor: theme.palette.help.light
  },
  body: {
    paddingLeft: theme.spacing(2)
  }
}));

let Steps = props => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">Steps to using Terrarium</Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        This panel will show up often and acts as a tool to help you get started
        with Terrarium.
      </Typography>

      <Typography className={classes.body} variant="h6" color="textSecondary">
        1. Create a new Remote Model
      </Typography>

      <Typography className={classes.body} variant="h6" color="textSecondary">
        2. Connect to the Remote Model from Python
      </Typography>

      <Typography className={classes.body} variant="h6" color="textSecondary">
        3. Spawn new agents in the environment
      </Typography>
    </Paper>
  );
};

export default Steps;
