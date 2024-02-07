import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import {
  deleteVocabularyThunk,
  fetchVocabulariesThunk,
  fetchVocabulary,
  renameVocabularyThunk,
} from "./operations"

const initialState = {
  vocabularies: [],
  vocabulary: null,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: "vocabularies",
  initialState,
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
      .addCase(fetchVocabulary.fulfilled, (state, { payload }) => {
        state.vocabulary = payload
      })
      .addMatcher(
        isAnyOf(
          deleteVocabularyThunk.pending,
          deleteVocabularyThunk.pending,
          renameVocabularyThunk.pending,
          fetchVocabulary.pending
        ),
        state => {
          state.isLoading = true
        }
      )
      .addMatcher(
        isAnyOf(
          deleteVocabularyThunk.fulfilled,
          deleteVocabularyThunk.fulfilled,
          renameVocabularyThunk.fulfilled,
          fetchVocabulary.fulfilled
        ),
        state => {
          state.isLoading = false
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(
          deleteVocabularyThunk.rejected,
          deleteVocabularyThunk.rejected,
          renameVocabularyThunk.rejected,
          fetchVocabulary.rejected
        ),
        (state, { payload }) => {
          state.error = payload
        }
      )
  },
  selectors: {
    selectVocabularies: state => state.vocabularies,
    selectVocabulary: state => state.vocabulary,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
  },
})

export const vocabulariesReducer = slice.reducer

export const {
  selectVocabularies,
  selectVocabulary,
  selectIsLoading,
  selectError,
} = slice.selectors
