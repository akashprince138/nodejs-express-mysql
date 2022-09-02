const sql = require("../config/db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = function (user) {
  this.email = user.email;
  this.password = user.password;
};

User.create = async (newUser, result) => {
  const encryptedPassword = await bcrypt.hash(newUser.password, saltRounds);
  newUser.password = encryptedPassword;
  sql.query(
    "select * from users where email = " + "'" + newUser.email + "'",
    newUser,
    async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, {
          data: "there is some issue in database.",
          message: "false",
        });
        return;
      } else if (res.length > 0) {
        result(null, { data: null, message: "Email already exist." });
      } else {
        sql.query("INSERT  INTO users SET ?", newUser, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          } else {
            result(null, { data: res, message: "success" });
          }
        });
      }
    }
  );
};

User.getAll = (result) => {
  sql.query("select * from users ORDER BY id desc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, { data: res, message: "success" });
    }
  });
};

User.getById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, { data: res, message: "success" });
    }
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET email = ? WHERE id = ?",
    [user.email, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else if (res.affectedRows == 0) {
      result({ success: "false" }, null);
      return;
    } else {
      console.log("deleted user with id: ", id);
      result(null, { data: res, message: "success" });
    }
  });
};
module.exports = User;
