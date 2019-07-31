import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#17c0eb",
      contrastText: "white"
    },
    secondary: {
      main: "#32ff7e",
      lightL: "#32ff7e"
    },
    help: {
      main: "#ffaf40",
      light: "#ffba59"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#f9f9f9"
    },
  }
});

export default theme;
