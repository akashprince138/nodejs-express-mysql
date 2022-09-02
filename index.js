var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var cors = require("cors");
var upload = require("express-fileupload");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(upload());

app.get("/", function (req, res) {
  return res.send({ message: "App is running" });
});
require("./routes/routes.js")(app);
app.listen(3000, function () {
  console.log("protal: 3000");
});
