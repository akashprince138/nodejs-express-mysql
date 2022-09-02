const logger = require("../middleware/logger");
const { fileUploadData } = require("../middleware/image-upload");
const User = require("../model/image_upload.model.js");

exports.create = async (req, res) => {
  console.log("req", req.body);
  if (!req.files || !req.files.image) {
    res.status(400).send({
      status: 400,
      message: "Please upload image file.",
    });
    return;
  }
  if (req.files.image) {
    await fileUploadData(req.files && req.files.image);
    req.body.image = req.files.image.name;
  }
  if (!req.body.user_id) {
    res.status(400).send({
      status: 400,
      message: "user id is required",
    });
    return;
  }

  const user = new User({
    user_id: req.body.user_id,
    image: req.body.image,
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while image upload.",
      });
    else res.send(data);
  });
};
