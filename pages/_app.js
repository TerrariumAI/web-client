import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import withReduxStore from "../src/with-redux-store";
import { Provider } from "react-redux";
// Material ui
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <title>Terrarium AI</title>
        </Head>

        <Provider store={reduxStore}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
