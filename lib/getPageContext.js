/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from "jss";
import {
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    // primary: {
    //   light: '#fff',
    //   main: '#42a5f5',
    //   contrastText: '#333'
    // },
    primary: {
      light: "#2195f2",
      main: "#0984e3",
      dark: "#0068bf",
      contrastText: "#fafafa",
      text: "yellow"
    },
    // secondary: {
    //   main: '#6f23fe'
    // }
    secondary: {
      light: "#66bb6a",
      main: "#98ee99",
      dark: "#338a3e",
      contrastText: "#000"
    },
    error: {
      light: red[300],
      main: red[500],
      dark: red[700],
      contrastText: red[50]
    },
    custom: {
      adsocialPlue: "#6829fb"
    }
  },
  overrides: {
    MuiButton: {
      raisedSecondary: {
        color: "white"
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
