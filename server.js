const http = require("http");
const debug = require("debug")("app");
const chalk = require("chalk");
const morgan = require("morgan");
const app = require("./app");

const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.set("port", port);
const server = http.createServer(app);

server.listen(port);

debug("Listening on port " + chalk.green(port));
