import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Link } from "@material-ui/core";
import { compose } from "redux";
import withNavbar from "../src/withNavbar";
import Steps from "../components/steps";

const useStyles = makeStyles(theme => ({
  marginRight: 15
}));

let Help = props => {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  return (
    <Container>
      <Typography variant="h4">How to use Terrarium</Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        You will see this panel around the website. These are the basic steps to
        using Terrarium. This page will explain each step in detail and will
        help you get agents living in the Terrarium in no time!
      </Typography>

      <br />
      <Steps />
      <br />

      <Typography variant="h4">1. Create a new Remote Model</Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        The first step is to create a Remote Model in your
        <Link href={"/dashboard"}>Dashboard</Link>.
      </Typography>
    </Container>
  );
};

export default compose(withNavbar())(Help);
