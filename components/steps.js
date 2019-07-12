import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  marginRight: 15
}));

let Steps = props => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  return (
    <Paper>
      <Typography>Steps to using Terrarium</Typography>
    </Paper>
  );
};

export default Steps;
