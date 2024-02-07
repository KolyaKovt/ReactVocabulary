import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// http://localhost:3310
// https://vocabulary-dsm6.onrender.com
const api = axios.create({
  baseURL:
    import.meta.env.NODE_ENV === "production"
      ? "https://vocabulary-dsm6.onrender.com"
      : "http://localhost:3310",
})

export const fetchVocabulariesThunk = createAsyncThunk(
  "fetch vocabularies",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/")
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const fetchVocabulary = createAsyncThunk(
  "fetch a vocabulary",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/${id}`)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const createVocabularyThunk = createAsyncThunk(
  "create a vocabulary",
  async (name, thunkAPI) => {
    try {
      await api.post("/", { name })
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const deleteVocabularyThunk = createAsyncThunk(
  "delete a vocabulary",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/${id}`)
      return id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const renameVocabularyThunk = createAsyncThunk(
  "rename a vocabulary",
  async (info, thunkAPI) => {
    try {
      await api.patch("/", info)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
