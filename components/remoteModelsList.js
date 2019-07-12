import { makeStyles } from "@material-ui/core/styles";
import { Container, CircularProgress, Typography } from "@material-ui/core";
import {
  firestoreConnect,
  isLoaded,
  isEmpty,
  withFirestore
} from "react-redux-firebase";
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
import Delete from "@material-ui/icons/Delete";
import Steps from "../components/steps";

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
            You don't have any Remote Models!
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            This is the first step towards using Terrarium! Here's a reminder of
            what the steps are.
          </Typography>
          <Steps />
        </Container>
      </Paper>
    );
  }

  console.log(remoteModels);

  // LIST
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Secret Key</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(remoteModels).map(key => {
            const remoteModel = remoteModels[key];
            return (
              <TableRow key={remoteModel.name}>
                <TableCell component="th" scope="row">
                  {remoteModel.name}
                </TableCell>
                <TableCell align="left">{remoteModel.secretKey}</TableCell>
                <TableCell align="left">
                  {remoteModel.connectCount > 0 ? "Connected" : "Disconnected"}
                </TableCell>
                <TableCell align="right">
                  <Delete />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default compose(
  withFirebase,
  withFirestore,
  connect(({ firestore, firebase: { auth } }, props) => ({
    remoteModels: firestore.data.myRemoteModels,
    auth
  })),
  firestoreConnect(({ firebase, auth }) => [
    {
      collection: "remoteModels",
      where: [["ownerUID", "==", auth.uid || ""]],
      storeAs: "myRemoteModels"
    }
  ])
)(RemoteModelsList);
