import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "vocDb",
});

db.connect(err => {
  if (err) throw err;
});

function handleError(res, err) {
  res.sendStatus(err.code).json({ error: err.message });
}

async function getVocabularyObj(vocabulary) {
  const queryWords = `SELECT * FROM words WHERE vocabulary_id = ${vocabulary.id};`;

  vocabulary.firstLang = [];
  vocabulary.secLang = [];
  vocabulary.wordsIds = [];

  try {
    const words = await new Promise((resolve, reject) => {
      db.query(queryWords, (err, words) => {
        if (err) reject(err);
        resolve(words);
      });
    });

    for (let j = 0; j < words.length; j++) {
      const wordObj = words[j];
      vocabulary.firstLang.push(wordObj.word);
      vocabulary.secLang.push(wordObj.translation);
      vocabulary.wordsIds.push(wordObj.id);
    }
  } catch (err) {
    handleError(res, err);
  }

  return vocabulary;
}

app.get("/vocabularies", async (req, res) => {
  const queryVocs = `SELECT * FROM vocabularies;`;
  
  db.query(queryVocs, async (err, vocabularies) => {
    if (err) handleError(res, err);
    
    for (let i = 0; i < vocabularies.length; i++) {
      await getVocabularyObj(vocabularies[i]);
    }

    return res.json(vocabularies);
  });
});

app.get("/vocabulary/:id", async (req, res) => {
  const query = `SELECT * FROM vocabularies WHERE id = ${req.params.id};`;

  db.query(query, async (err, vocabularies) => {
    if (err) handleError(res, err);

    if (vocabularies.length === 0) return res.json({ message: "Vocabulary not found" });

    return res.json(await getVocabularyObj(vocabularies[0]));
  });
});

app.post("/vocabulary/create", async (req, res) => {
  const query = `INSERT INTO vocabularies (name)
  VALUES ('${req.body.name}');`;

  db.query(query, (err) => {
    if (err) handleError(res, err);
    return res.sendStatus(200);
  })
});

app.put("/vocabulary/rename", async (req, res) => {
  const query = `UPDATE vocabularies
  SET name = '${req.body.name}'
  WHERE id = ${req.body.id};`;

  db.query(query, (err) => {
    if (err) handleError(res, err);
    
    return res.sendStatus(200);
  });
});

app.delete("/vocabulary/delete", async (req, res) => {
  const queryWords = `DELETE FROM words
  WHERE vocabulary_id = ${req.body.id};`;
  
  const queryVocs = `DELETE FROM vocabularies
  WHERE id = ${req.body.id};`;

  try {
    const idGood = await new Promise((resolve, reject) => {
      db.query(queryVocs, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  
    if (idGood) db.query(queryWords, (err) => {
      if (err) handleError(res, err);
      return res.sendStatus(200);
    });
  } catch (err) {
    handleError(res, err);
  }
});

app.post("/vocabulary/words/add", async (req, res) => {
  const query = `INSERT INTO words (word, translation, vocabulary_id)
  VALUES ('${req.body.word}', '${req.body.transl}', ${req.body.id});`;

  db.query(query, (err) => {
    if (err) handleError(res, err);
    
    return res.sendStatus(200);
  });
});

app.delete("/vocabulary/words/delete", async (req, res) => {
  const query = `DELETE FROM words
  WHERE id = ${req.body.id};`;

  db.query(query, (err) => {
    if (err) handleError(res, err);
    
    return res.sendStatus(200);
  });
});

app.put("/vocabulary/words/change", async (req, res) => {
  const query = `UPDATE words
  SET word = '${req.body.word}', translation = '${req.body.transl}'
  WHERE id = ${req.body.id};`;

  db.query(query, (err) => {
    if (err) handleError(res, err);
    
    return res.sendStatus(200);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("It's alive on http://localhost:" + PORT);
});
