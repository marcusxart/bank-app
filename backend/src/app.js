const express = require("express");
const errorMiddleware = require("./middlewares/error.middleware");
const cors = require("cors");

// require("./controllers/processors.controller");

const app = express();

// // Enable CORS
app.use(cors(["http://localhost:5173"]));

// use json
app.use(express.json());

// root route
app.use("/", require("./routes"));

// error middleware
app.use(errorMiddleware);

module.exports = app;
