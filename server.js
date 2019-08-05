const express = require("express");
const next = require("next");
var sslRedirect = require('heroku-ssl-redirect');

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const app = express();
    
    // enable ssl redirect
    app.use(sslRedirect());

    app.get("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });