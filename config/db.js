const mysql = require("mysql");
const logger = require("../middleware/logger");
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connection.connect((error) => {
  if (error) {
    logger.error("Database not connected");
    throw error;}
  console.log("Database run successfully.");
});

module.exports = connection;
