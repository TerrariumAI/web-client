const express = require("express");
const next = require("next");
var enforce = require("express-sslify");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const app = express();

    if (process.env.NODE_ENV === "production") {
      app.use((req, res, next) => {
        if (req.header("x-forwarded-proto") !== "https") {
          res.redirect("https://" + req.hostname + req.url);
        } else {
          next();
        }
      });
    }

    app.get("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(port, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
