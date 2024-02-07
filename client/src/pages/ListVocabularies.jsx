/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { Loader } from "../components/Loader"

import {
  deleteVocabularyThunk,
  fetchVocabulariesThunk,
} from "../redux/vocabularies/operations"
import {
  selectIsLoading,
  selectVocabularies,
  selectVocabulary,
} from "../redux/vocabularies/slice"

export default function ListVocabularies() {
  const vocabularies = useSelector(selectVocabularies)
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    dispatch(fetchVocabulariesThunk())
  }, [])

  return (
    <main>
      <section className="flex flex-col items-center">
        <h1 className="mt-6 mb-6 text-4xl font-bold">Vocabularies</h1>
        <Link className="btn btn-success mb-6" to="/new">
          New vocabulary
        </Link>

        {isLoading && <Loader />}

        <ul className="flex flex-col gap-5 max-h-[450px] overflow-y-auto">
          {vocabularies.map(vocabulary => {
            return (
              <li key={vocabulary.id}>
                <div className="flex gap-2 mb-4 font-bold text-2xl">
                  <h2>{vocabulary.name}</h2>
                  <p>({vocabulary.exercise})</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    className="btn btn-secondary"
                    to={`/${vocabulary.id}`}
                  >
                    Open
                  </Link>
                  <Link
                    className="btn btn-primary"
                    to={`/rename/${vocabulary.id}`}
                  >
                    Rename
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      dispatch(deleteVocabularyThunk(vocabulary.id))
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
