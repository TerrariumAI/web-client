import { makeStyles } from "@material-ui/core/styles";
import { Container, CircularProgress, Typography, Link } from "@material-ui/core";
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
  Paper,
  IconButton
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
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

let RemoteModelsList = ({ remoteModels, firestore }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  // Delete an RM when this button is clicked
  let onDelete = (key) => {
    firestore.delete({ collection: 'remoteModels', doc: key })
  }

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
          <Typography variant="h6" color="textSecondary">
            You don't have any Remote Models! :(
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            This is your first step to using Terrarium! Click the green button below to create your first RM.
            <br />
            <Link href={"https://docs.terrarium.ai/training-models/creating-a-remote-model"}>Lost? Here's our getting started guide and documentation!</Link> 
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
                  <IconButton onClick={() => onDelete(key)} aria-label="delete" className={classes.margin}>
                    <Delete fontSize="medium" />
                  </IconButton>
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
  withFirestore,
)(RemoteModelsList);
