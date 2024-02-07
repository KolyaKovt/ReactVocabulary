import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import {
  deleteVocabularyThunk,
  fetchVocabulariesThunk,
  renameVocabularyThunk,
} from "./operations"

const initialState = {
  vocabularies: [],
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
      .addMatcher(
        isAnyOf(
          deleteVocabularyThunk.pending,
          deleteVocabularyThunk.pending,
          renameVocabularyThunk.pending
        ),
        state => {
          state.isLoading = true
        }
      )
      .addMatcher(
        isAnyOf(
          deleteVocabularyThunk.fulfilled,
          deleteVocabularyThunk.fulfilled,
          renameVocabularyThunk.fulfilled
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
          renameVocabularyThunk.rejected
        ),
        (state, { payload }) => {
          state.error = payload
        }
      )
  },
  selectors: {
    selectVocabularies: state => state.vocabularies,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
  },
})

export const vocabulariesReducer = slice.reducer

export const {
  selectVocabularies,
  selectIsLoading,
  selectError,
} = slice.selectors

export const { selectVocabulary } = slice.actions
