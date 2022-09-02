const uuidv4 = require("uuid");

module.exports.fileUploadData = async (file) => {
  let filename = uuidv4.v4();
  let name = file.name.split(".");
  file.mv(`./image/${filename}.${name[name.length - 1]}`, (err) => {
    if (err) {
      console.log({ error });
      throw err;
    }
  });
  return true;
};
