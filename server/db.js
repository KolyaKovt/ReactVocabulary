import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "vocDb",
});

db.connect(err => {
  if (err) throw err;
});

export default db;