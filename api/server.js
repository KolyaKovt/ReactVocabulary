//importing modules
const express = require("express");
const cors = require("cors");
const router = require("./router");

const app = express();

//using middleware
app.use(express.json());
app.use(cors());

//using routes
app.use("/", router);

const PORT = 3310;
app.listen(PORT, () => {
  console.log("It's alive on http://localhost:" + PORT);
});
