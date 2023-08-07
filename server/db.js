const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "vocDb",
});

db.connect(err => {
  if (err) throw err;
});

module.exports = db;
