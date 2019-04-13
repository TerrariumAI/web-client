const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

function ensureSecure(req, res, next) {
  if (req.secure) {
    // OK, continue
    return next();
  }
  // handle port numbers if you need non defaults
  // res.redirect('https://' + req.host + req.url); // express 3.x
  res.redirect("https://" + req.hostname + req.url); // express 4.x
}

app
  .prepare()
  .then(() => {
    const app = express();

    if (process.env.NODE_ENV == "production") {
      app.all("*", ensureSecure);
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
