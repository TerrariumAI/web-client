import { compose } from "redux";
import { connect } from "react-redux";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileNavbarMenu from "./profileNavbarMenu";
import { isLoaded, isEmpty, withFirebase } from "react-redux-firebase";

const useStyles = makeStyles(theme => ({
  spacer: {
    flexGrow: 1
  }
}));

let Navbar = ({ firebase, auth }) => {
  const classes = useStyles();

  // AuthBtns decides which buttons to render depending on the auth status
  let AuthBtns = () => {
    // If loading or unauthorized, show the entry auth buttons
    if (!isLoaded(auth) || isEmpty(auth)) {
      return (
        <div>
          <Link href="/login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link href="/signup">
            <Button color="inherit">Signup</Button>
          </Link>
        </div>

      );
    }
    // If the user is signed in, show a profile menu
    return <ProfileNavbarMenu />;
  };

  let MenuItems = () => {
    if (!isLoaded(auth) || isEmpty(auth)) {
      return null;
    }

    return (
      <Link href="/dashboard">
        <Button color="inherit">Dashboard</Button>
      </Link>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Button color="inherit"><Typography variant="h6">Terrarium.ai</Typography></Button>
        </Link>

        <div className={classes.spacer} />
        <Button href="https://docs.terrarium.ai/" color="inherit">Help</Button>
        <MenuItems />
        <AuthBtns />
      </Toolbar>
    </AppBar>
  );
};

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth }))
)(Navbar);
