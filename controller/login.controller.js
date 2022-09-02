var Login = require("../model/login.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Email and Password can not be empty!",
    });
  }

  // Create a Customer
  const login = new Login({
    email: req.body.email,
    password: req.body.password,
  });

  // Save Customer in the database
  Login.create(login, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while login.",
      });
    else res.send(data);
  });
};
