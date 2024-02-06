import axios from "axios"

// http://localhost:3310
// https://vocabulary-dsm6.onrender.com
const api = axios.create({
  baseURL: "http://localhost:3310",
})

export const fetchVocabularies = async () => {
  const res = await api.get("/")
  return res.data
}

export const fetchVocabulary = async id => {
  const res = await api.get(`/${id}`)
  return res.data
}

export const deleteVocabulary = id => {
  api.delete(`/${id}`)
}

export const renameVocabulary = (id, name) => {
  api.patch("/", {
    id,
    name,
  })
}

export const addWord = (id, word, transl) => {
  api.post("/words", {
    id,
    transl,
    word,
  })
}

export const deleteWord = id => {
  api.delete(`/words/${id}`)
}

export const changeWord = (id, word, transl) => {
  api.patch("/words", {
    id,
    transl,
    word,
  })
}

export const exercise = id => {
  api.patch("/exercise", {
    id,
  })
}
