import axios from "axios"

const api = axios.create({
  baseURL: `http://localhost:${3310}`,
})

export const fetchGet = async () => {
  const res = await api.get("/vocabularies")
  return res.data
}
