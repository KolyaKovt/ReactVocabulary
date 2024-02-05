const { Router } = require("express")
const sqlite3 = require("sqlite3").verbose()
const path = require("path")

const router = Router()

const dbPath = path.join(__dirname, "database.sqlite")
const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS vocabularies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      countOfRepetitions INTEGER DEFAULT 0
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT,
      translation TEXT,
      vocabulary_id INTEGER
    )
  `)
})

function queryAsync(query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

async function getVocabularyObj(vocabulary) {
  const query = `SELECT * FROM words WHERE vocabulary_id = ${vocabulary.id};`
  const words = await queryAsync(query)

  vocabulary.firstLang = []
  vocabulary.secLang = []
  vocabulary.wordsIds = []

  for (let j = 0; j < words.length; j++) {
    const wordObj = words[j]
    vocabulary.firstLang.push(wordObj.word)
    vocabulary.secLang.push(wordObj.translation)
    vocabulary.wordsIds.push(wordObj.id)
  }

  return vocabulary
}

router.get("/", async (req, res) => {
  const query = `SELECT * FROM vocabularies;`
  const vocabularies = await queryAsync(query)

  for (let i = 0; i < vocabularies.length; i++) {
    await getVocabularyObj(vocabularies[i])
  }

  return res.json(vocabularies)
})

router.get("/:id", async (req, res) => {
  const query = `SELECT * FROM vocabularies WHERE id = ${req.params.id};`
  const vocabularies = await queryAsync(query)

  if (vocabularies.length === 0)
    return res.json({ message: "Vocabulary not found" })

  return res.json(await getVocabularyObj(vocabularies[0]))
})

router.post("/create", async (req, res) => {
  const query = `INSERT INTO vocabularies (name) VALUES ('${req.body.name}');`
  await queryAsync(query)

  return res.sendStatus(200)
})

router.patch("/rename", async (req, res) => {
  const query = `UPDATE vocabularies
  SET name = '${req.body.name}'
  WHERE id = ${req.body.id};`
  await queryAsync(query)

  return res.sendStatus(200)
})

router.delete("/delete", async (req, res) => {
  const queryWords = `DELETE FROM words
    WHERE vocabulary_id = ${req.body.id};`

  const queryVocs = `DELETE FROM vocabularies
    WHERE id = ${req.body.id};`

  await queryAsync(queryWords)
  await queryAsync(queryVocs)

  res.sendStatus(200)
})

router.post("/words/add", async (req, res) => {
  const query = `INSERT INTO words (word, translation, vocabulary_id)
    VALUES ('${req.body.word}', '${req.body.transl}', ${req.body.id});`
  await queryAsync(query)

  return res.sendStatus(200)
})

router.delete("/words/delete", async (req, res) => {
  const query = `DELETE FROM words
    WHERE id = ${req.body.id};`
  await queryAsync(query)

  return res.sendStatus(200)
})

router.patch("/words/change", async (req, res) => {
  const query = `UPDATE words
    SET word = '${req.body.word}', translation = '${req.body.transl}'
    WHERE id = ${req.body.id};`
  await queryAsync(query)

  return res.sendStatus(200)
})

router.put("/incrementCountOfRepetitions", async (req, res) => {
  const query = `UPDATE vocabularies
    SET countOfRepetitions = countOfRepetitions + 1
    WHERE id = ${req.body.id};`
  await queryAsync(query)

  return res.sendStatus(200)
})

module.exports = router
