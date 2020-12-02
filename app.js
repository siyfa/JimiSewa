const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const debug = require("debug")("app");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");

const app = express();

require("dotenv").config({
  path: path.join(__dirname, "/.env")
});
// ----------- Views Config ---------------
app.set("view engine", "ejs");
app.set("views", "./scr/views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// ----------- Mongoose Config ------------------
mongoose
  .connect("mongodb://localhost:27017/jimisewa", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => debug("Connected to MongoDB"))
  .catch((err) => debug(err));

//------------ Express session Configuration ------------//
app.use(
  require("express-session")({
    secret: "EndPoliceBrutalityInNigeria",
    resave: false,
    saveUninitialized: false,
  })
);

// --------- Bootstrap Config ------------//
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
    }
    res.locals.loggedInUser = await User.findById(userId); next();
  } else {
    next();
  }
});

// ------------Routers Config------------------ //
app.use("/admin", require("./scr/router/adminRoute"));
app.use("/blog", require("./scr/router/blogRoute"));
app.use("/book", require("./scr/router/bookRoute"));
app.use('/category', require('./scr/router/categoryRoute'));
app.use('/quote', require('./scr/router/quoteRoute'));

app.use(require('./scr/router/authRoute'));


app.get("/", (req, res) => {
  res.render("index");
});

module.exports = app;
