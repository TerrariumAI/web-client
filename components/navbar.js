import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  withStyles,
  Grid
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  marginRight: 15
};

let Navbar = props => {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          justify="space-between" // Add it here :)
          container
          spacing={24}
        >
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              Terrarium.ai
            </Typography>
          </Grid>

          <Grid item>
            <Link href="/auth">
              <Button color="inherit">Login</Button>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Navbar);
