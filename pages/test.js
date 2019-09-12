import { Typography, withStyles } from "@material-ui/core";
import EnvObservation from "../components/envObservation";
import { isLoaded, isEmpty, withFirestore, withFirebase } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

const ENTITIES = {
  test_id: {x: 1, y: 1}
}
const EFFECTS = {
  test_id_2: {x: 2, y: 2, timestamp: (new Date((new Date()).getTime() - 1000)).getTime()/1000, decay: 1.1}
}

class MyApp extends React.Component {
  render() {
    const { auth } = this.props;
    if (isLoaded(auth) && !isEmpty(auth)) {
      return (
        <EnvObservation />
      );
    } else {
      return null
    }
  }
}

export default compose(
  withFirebase, 
  withFirestore,
  connect(({ firestore, firebase: { auth } }, props) => ({
    auth,
  })),
)(MyApp);