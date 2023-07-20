const express = require("express");
const mongoose = require("mongoose");
const Vocabulary = require("./models/Vocabulary");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost/vocDb");

app.get("/get-vocabularies", async (req, res) => {
  try {
    res.json(await Vocabulary.find());
  } catch (e) {
    console.error(e);
  }
});

app.get("/get-vocabulary/:id", async (req, res) => {
  try {
    res.json(await Vocabulary.findById(req.params.id));
  } catch (e) {
    console.error(e);
  }
});

app.post("/create-vocabulary", async (req, res) => {
  const vocabulary = new Vocabulary({
    name: req.body.name,
  });

  try {
    res.json(await vocabulary.save());
  } catch (e) {
    console.error(e);
  }
});

app.put("/rename-vocabulary", async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.body.id);

    vocabulary.name = req.body.name;
    await vocabulary.save();

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
});

app.delete("/delete-vocabulary", async (req, res) => {
  try {
    await Vocabulary.findByIdAndDelete(req.body.id);

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
});

app.post("/add-word", async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.body.id);

    vocabulary.firstLang.push(req.body.word);
    vocabulary.secLang.push(req.body.transl);
    await vocabulary.save();

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
});

app.delete("/delete-word", async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.body.id);

    vocabulary.firstLang.splice(req.body.index, 1);
    vocabulary.secLang.splice(req.body.index, 1);

    await vocabulary.save();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
});

app.put("/change-word", async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.body.id);

    vocabulary.firstLang[req.body.index] = req.body.word;
    vocabulary.secLang[req.body.index] = req.body.transl;
    await vocabulary.save();

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
});

app.listen(PORT, () => {
  console.log("It's alive on http://localhost:" + PORT);
});
