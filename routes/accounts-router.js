const express = require("express");
const router = express.Router();
const data = require("../model/data");
const logger = require("../logger/logger");
const fs = require("fs");
const accountModel = require("../db/models/account-model");
const mongoose = require("mongoose");
const accountController = require("../controllers/accountController");

router.use((req, res, next) => {
  logger.debug("middle accounts");
  next();
});

router.get("/all", async (req, res, next) => {
  try {
    const results = await accountController.getAccounts();
    res.json(results);
  } catch (ex) {
    res
      .status(409)
      .json({ message: "there is a conflict with my understanding", real: ex });
  }
});

router.get("/:skip/:take", async (req, res, next) => {
  try {
    const resu = await accountController.getAccounts({}, {}, { skip: parseInt(req.params.skip), limit: parseInt(req.params.take) });
    res.json(resu);
  } catch (ex) {
    res
      .status(409)
      .json({ message: "there is a conflict with my understanding", real: ex });
  }


});

router.get("/:id", async (req, res, next) => {
  let id = req.params.id
  try {
    const resutt = await accountController.getAccounts({ _id: id }, {}, {});
    res.json(resutt);
  } catch (ex) {
    res
      .status(409)
      .json({ message: "there is a conflict with my understanding", real: ex });
  }

});



module.exports = router;
