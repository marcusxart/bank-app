const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/error.middleware");
const { AlLOWED_ORIGINS } = require("./config/constants");
const credentials = require("./middlewares/credentials.middleware");

const app = express();

app.set("view engine", "ejs");

// handle options credentials check - before ch6ors
app.use(credentials);

// Enable CORS
app.use(
  cors({
    origin: AlLOWED_ORIGINS,
    optionsSuccessStatus: 200,
  })
);

// use json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// root route
app.use("/", require("./routes"));

// error middleware
app.use(errorMiddleware);

module.exports = app;
