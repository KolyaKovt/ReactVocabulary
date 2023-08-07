//importing modules
import express from "express";
import cors from "cors";
import router from "./router.js";

const app = express();

//using middleware
app.use(express.json());
app.use(cors());

//using routes
app.use('/', router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("It's alive on http://localhost:" + PORT);
});
