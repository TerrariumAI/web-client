import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { compose } from "redux";
import withNavBar from "../src/withNavBar";

const useStyles = makeStyles(theme => ({
  marginRight: 15
}));

let Help = props => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  return <Container> Help </Container>;
};

export default compose(withNavBar())(Help);
