const sql = require("../config/db.js");
const logger = require("../middleware/logger");
require("dotenv").config();
const User = function (user) {
  this.user_id = user.user_id;
  this.image = user.image;
};

User.create = async (newUser, result) => {
  sql.query("INSERT  INTO images SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, { data: res, message: "success" });
    }
  });
};
module.exports = User;
