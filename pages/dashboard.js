import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import withNavbar from "../src/withNavbar";
import RemoteModelsList from "../components/remoteModelsList";
import NewRemoteModelDialog from "../components/newRemoteModelDialog";

const useStyles = makeStyles(theme => ({
  marginRight: 15
}));

let Dashboard = props => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <div>
      <Container>
        <Typography variant="h3">Remote Models</Typography>
        <Typography variant="h6" color="textSecondary">
          A remote model is the brain for your agents. This is where you can
          manage your RMs.
        </Typography>
        <RemoteModelsList />
        <br />
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Create New Remote Model
        </Button>

        <NewRemoteModelDialog open={open} onClose={handleClose} />
      </Container>
    </div>
  );
};

export default withNavbar()(Dashboard);
