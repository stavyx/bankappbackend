const express = require("express");
const router = express.Router();
const data = require("../model/data");

const accountModel = require("../db/models/account-model");

router.get("/seed", (req, res, next) => {
  accountModel.insertMany(data, (err, result) => {
    if (err) res.status(400).json(err);
    res.json(result);
  });
});

module.exports = router;
