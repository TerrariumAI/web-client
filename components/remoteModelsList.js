import { makeStyles } from "@material-ui/core/styles";
import { Container, CircularProgress, Typography } from "@material-ui/core";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import LocalFlorist from "@material-ui/icons/LocalFlorist";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  emptyContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

let RemoteModelsList = ({ remoteModels }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  // LOADING
  if (!isLoaded(remoteModels)) {
    return (
      <Paper className={classes.root}>
        <CircularProgress />
      </Paper>
    );
  }

  // EMPTY
  if (isEmpty(remoteModels)) {
    return (
      <Paper className={classes.root}>
        <Container className={classes.emptyContainer}>
          <Typography variant="h5">
            <LocalFlorist />
            You don't have any Remote Models!
          </Typography>
          <Typography variant="h6" color="textSecondary">
            This is the first step towards using the Terrarium. <br />
            Click the "Create Remote Model" button to get started!
          </Typography>
        </Container>
      </Paper>
    );
  }

  // LIST
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Secret Key</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {remoteModels.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.secretKey}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default compose(
  withFirebase,
  firestoreConnect(({ firebase }) => [
    {
      collection: "remoteModels",
      where: [["ownerUID", "==", firebase.auth.uid || ""]],
      storeAs: "myRemoteModels"
    }
  ]),
  connect((state, props) => ({
    remoteModels: state.firestore.ordered.myRemoteModels
  }))
)(RemoteModelsList);
