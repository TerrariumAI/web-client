import { withStyles } from "@material-ui/core/styles";
import { withFirebase, withFirestore, firestoreConnect, isLoaded, isEmpty, populate } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Table, TableHead, TableCell, TableBody, TableRow, Paper, CircularProgress } from "@material-ui/core";

const populates = [{ child: 'model', root: 'remoteModels' }]

const styles = theme => ({
  spacer: {
    flexGrow: 1
  },
  divider: {
    borderLeft: '0.1em solid white', padding: '0.5em'
  }
});

class TopEntitiesTable extends React.Component {

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { classes, entities } = this.props;
    if (!isLoaded(entities)) {
      return <CircularProgress></CircularProgress>
    }
    if (isEmpty(entities)) {
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
            <TableRow key={"no-agents"}>
                <TableCell component="th" scope="row">
                  <i>No agents alive at right now</i>
                </TableCell>
              </TableRow>
          </TableBody>
          </Table>
        </Paper>
        
      ) // TODO
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
              const createdAt = entity.createdAt.toDate()
              const now = new Date()
              let delta = Math.floor((now - (createdAt) )/1000)
              const hours = Math.floor(delta / 3600) % 24
              delta -= hours * 3600
              const minutes = Math.floor(delta/60) % 60;
              delta -= minutes * 60
              const seconds = delta % 60
              return (<TableRow key={id}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{entity.model.name || ""}</TableCell>
                <TableCell align="right">{hours}:{minutes}:{seconds}</TableCell>
              </TableRow>)
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default compose(
  withStyles(styles),
  withFirebase,
  withFirestore,
  connect(({ firestore, firebase: { auth, profile } }, props) => ({
    entities: populate(firestore, "entities", populates),
    auth,
    profile
  })),
  firestoreConnect(({ firebase, auth }) => [
    {
      collection: "entities",
      orderBy: [
        ['createdAt', 'asc']
      ],
      limit: 10,
      populates,
    }
  ])
  )(TopEntitiesTable);