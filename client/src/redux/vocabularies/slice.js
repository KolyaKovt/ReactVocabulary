import { createSlice } from "@reduxjs/toolkit"
import { deleteVocabularyThunk, fetchVocabulariesThunk } from "./operations"

const initialState = {
  vocabularies: [],
  selectedVocabularyId: -1,
}

const slice = createSlice({
  name: "vocabularies",
  initialState,
  reducers: {
    selectVocabulary: (state, { payload }) => {
      state.selectedVocabularyId = payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVocabulariesThunk.fulfilled, (state, { payload }) => {
        state.vocabularies = payload
      })
      .addCase(deleteVocabularyThunk.fulfilled, (state, { payload }) => {
        state.vocabularies = state.vocabularies.filter(
          voc => voc.id !== payload
        )
      })
  },
  selectors: {
    selectVocabularies: state => state.vocabularies,
    selectSelectedVocabularyId: state => state.selectedVocabularyId,
  },
})

export const vocabulariesReducer = slice.reducer

export const {
  selectVocabularies,
  selectSelectedVocabularyId,
} = slice.selectors

export const { selectVocabulary } = slice.actions
