const sql = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = "qwertyuiop";
const Login = function (login) {
  this.email = login.email;
  this.password = login.password;
};

Login.create = async (newLogin, result) => {
  sql.query(
    "select * from users where email = " + "'" + newLogin.email + "'",
    newLogin,
    async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, {
          data: "there is some issue in database.",
          message: "false",
        });
        return;
      } else if (res.length === 0) {
        result(null, { data: "Email does not exist", message: "false" });
      } else {
        const comparision = await bcrypt.compare(
          newLogin.password,
          res[0].password
        );
        if (comparision) {
          var token = jwt.sign({ email: res[0].email }, secretkey, {
            expiresIn: 86400, // expires in 24 hours
          });
          result(null, { data: res[0], message: "success", token: token });
        } else {
          result(null, { data: "Email/Password mismatch.", message: "false" });
        }
      }
    }
  );
};
module.exports = Login;
