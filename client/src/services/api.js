import axios from "axios"

const api = axios.create({
  baseURL: "https://vocabulary-dsm6.onrender.com",
})

export const fetchGet = async () => {
  const res = await api.get("/")
  return res.data
}
