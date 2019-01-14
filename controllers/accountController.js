const accountModel = require("../db/models/account-model");

class AccountController {
  static getAccounts(params = {}, select = {}, options = {}) {
    return new Promise((resolve, reject) => {
      accountModel.find(params, select, options, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }
}

module.exports = AccountController;
