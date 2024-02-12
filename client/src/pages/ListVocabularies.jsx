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
} from "../redux/vocabularies/slice"

export default function ListVocabularies() {
  const dispatch = useDispatch()
  const vocabularies = useSelector(selectVocabularies)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    dispatch(fetchVocabulariesThunk())
  }, [dispatch])

  return (
    <main className="flex flex-col items-center">
      {isLoading && <Loader />}
      
      <section>
        <div className="py-6 sticky top-0 bg-[#1d232a]">
          <h1 className="mb-6 text-4xl font-bold">Vocabularies</h1>
          <Link className="btn btn-success" to="/new">
            New vocabulary
          </Link>
        </div>

        <ul className="flex flex-col gap-5 pb-6">
          {vocabularies.map(vocabulary => {
            return (
              <li key={vocabulary.id}>
                <div className="flex gap-2 mb-4 font-bold text-2xl">
                  <h2>{vocabulary.name}</h2>
                  <p>({vocabulary.exercise})</p>
                </div>
                <div className="flex gap-2">
                  <Link className="btn btn-secondary" to={`/${vocabulary.id}`}>
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
