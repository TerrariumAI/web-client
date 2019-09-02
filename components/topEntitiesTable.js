import { makeStyles } from "@material-ui/core/styles";
import { withFirebase, withFirestore, firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Table, TableHead, TableCell, TableBody, TableRow, Paper, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  spacer: {
    flexGrow: 1
  },
  divider: {
    borderLeft: '0.1em solid white', padding: '0.5em'
  }
}));

let TopEntitiesTable = ({ firebase, auth, entities }) => {
  const classes = useStyles();
  if (!isLoaded(entities)) {
    return <CircularProgress></CircularProgress>
  }
  if (isEmpty(entities)) {
    return null // TODO
  }
  return (
    <Paper>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Model</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(entities).map(id => {
            const entity = entities[id]
            return (<TableRow key={id}>
              <TableCell component="th" scope="row">
                {id}
              </TableCell>
              <TableCell align="right">{entity.ModelID}</TableCell>
              <TableCell align="right">{entity.CreatedAt}</TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default compose(
  withFirebase,
  withFirestore,
  connect(({ firestore, firebase: { auth, profile } }, props) => ({
    entities: firestore.data.topEntities,
    auth,
    profile
  })),
  firestoreConnect(({ firebase, auth }) => [
    {
      collection: "entities",
      orderBy: [
        ['CreatedAt', 'asc']
      ],
      limit: 10,
      storeAs: "topEntities",
    }
  ])
  )(TopEntitiesTable);