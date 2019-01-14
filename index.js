const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const logger = require("./logger/logger");
const auth = require("./auth/middleware-auth");
const bodyParser = require("body-parser");
//routes
const configuration = require("./routes/config-router");
const accountRouter = require("./routes/accounts-router");
const operationsRouter = require("./routes/operations-router");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/BankApplication",
  { useNewUrlParser: true }
);
//protocol schema mongodb
//server host name mongoDB://localhost
//route to the spesific schema : / BankApplication

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);

app.use((req, res, next) => {
  logger.debug(req.url);
  next();
});

app.use("/operations", operationsRouter);
app.use("/accounts", accountRouter);
app.use("/config", configuration);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send(error);
});
const port = process.env.PORT || 3200;

app.listen(port);
