const { Router } = require("express")
const { Database } = require("sqlite3").verbose()
const path = require("path")

const router = Router()

const dbPath = path.join(__dirname, "database.sqlite")
const db = new Database(dbPath)

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS vocabularies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      exercise INTEGER DEFAULT 0
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

function queryAsync(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err)
      }
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

// Get all vocabularies
router.get("/", async (req, res) => {
  const query = `SELECT * FROM vocabularies;`
  const vocabularies = await queryAsync(query)

  for (let i = 0; i < vocabularies.length; i++) {
    await getVocabularyObj(vocabularies[i])
  }

  return res.json(vocabularies)
})

// Get a vocabulary by id
router.get("/:id", async (req, res) => {
  const query = "SELECT * FROM vocabularies WHERE id = ?;"
  const vocabularies = await queryAsync(query, [req.params.id])

  if (vocabularies.length === 0)
    return res.json({ message: "Vocabulary not found" })

  return res.json(await getVocabularyObj(vocabularies[0]))
})

// Create a vocabulary
router.post("/", async (req, res) => {
  const query = "INSERT INTO vocabularies (name) VALUES (?);"
  await queryAsync(query, [req.body.name])

  return res.sendStatus(201)
})

// Rename a vocabulary
router.patch("/", async (req, res) => {
  const query = "UPDATE vocabularies SET name = ? WHERE id = ?;"
  await queryAsync(query, [req.body.name, req.body.id])

  return res.sendStatus(200)
})

// Delete a vocabulary
router.delete("/:id", async (req, res) => {
  const queryWords = "DELETE FROM words WHERE vocabulary_id = ?;"
  const queryVocs = "DELETE FROM vocabularies WHERE id = ?;"

  await queryAsync(queryWords, [req.params.id])
  await queryAsync(queryVocs, [req.params.id])

  res.sendStatus(204)
})

// Add a word to a vocabulary
router.post("/words", async (req, res) => {
  const query =
    "INSERT INTO words (word, translation, vocabulary_id) VALUES (?, ?, ?);"
  await queryAsync(query, [req.body.word, req.body.transl, req.body.id])

  return res.sendStatus(201)
})

// Delete a word from a vocabulary
router.delete("/words/:id", async (req, res) => {
  const query = "DELETE FROM words WHERE id = ?;"
  await queryAsync(query, [req.params.id])

  return res.sendStatus(204)
})

// Change a word in a vocabulary
router.patch("/words", async (req, res) => {
  const query = "UPDATE words SET word = ?, translation = ? WHERE id = ?;"
  await queryAsync(query, [req.body.word, req.body.transl, req.body.id])

  return res.sendStatus(200)
})

// increment the count of repetitions in a vocabulary
router.patch("/exercise", async (req, res) => {
  const query = "UPDATE vocabularies SET exercise = exercise + 1 WHERE id = ?;"
  await queryAsync(query, [req.body.id])

  return res.sendStatus(200)
})

module.exports = router
