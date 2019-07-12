import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import withNavbar from "../src/withNavbar";
import RemoteModelsList from "../components/remoteModelsList";

const useStyles = makeStyles(theme => ({
  marginRight: 15
}));

let Dashboard = props => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  return (
    <Container>
      <Typography variant="h3">Remote Models</Typography>
      <Typography variant="h6" color="textSecondary">
        A remote model is the brain for your agents. This is where you can
        manage your RMs.
      </Typography>
      <RemoteModelsList />
    </Container>
  );
};

export default withNavbar()(Dashboard);
