var cors = require("cors");
module.exports = (app) => {
  const Login = require("../controller/login.controller.js");
  const ImageUpload = require("../controller/image_upload.controller");
  const Users = require("../controller/users.controller.js");
  const tokenVerify = require("./../token-verify");
  app.post("/login", cors(), Login.create);
  app.post("/image_upload", cors(), ImageUpload.create);

  app.get("/users", tokenVerify, Users.findAll);
  app.post("/user", tokenVerify, Users.create);
  app.get("/user/:id", tokenVerify, Users.findOne);
  app.put("/user/:id", tokenVerify, Users.update);
  app.delete("/user/:id", tokenVerify, Users.delete);
};
