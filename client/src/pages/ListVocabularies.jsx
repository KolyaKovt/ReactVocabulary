/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {
  deleteVocabularyThunk,
  fetchVocabulariesThunk,
} from "../redux/vocabularies/operations"
import {
  selectVocabularies,
  selectVocabulary,
} from "../redux/vocabularies/slice"

export default function ListVocabularies() {
  const vocabularies = useSelector(selectVocabularies)
  const dispatch = useDispatch()

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
        <ul className="flex flex-col gap-5 max-h-[450px] overflow-y-auto">
          {vocabularies.map(vocabulary => {
            return (
              <li className="vocabulary" key={vocabulary.id}>
                <div className="flex gap-2 mb-4">
                  <h2>{vocabulary.name}</h2>
                  <p className="count-of-rep-sec">({vocabulary.exercise})</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    className="btn btn-secondary"
                    onClick={() => dispatch(selectVocabulary(vocabulary.id))}
                    to="/open"
                  >
                    Open
                  </Link>
                  <Link
                    className="btn btn-primary"
                    to="/rename"
                    onClick={() => dispatch(selectVocabulary(vocabulary.id))}
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
