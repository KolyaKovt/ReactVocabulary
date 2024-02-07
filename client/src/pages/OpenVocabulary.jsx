import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectIsLoading, selectVocabulary } from "../redux/vocabularies/slice"
import { fetchVocabulary } from "../redux/vocabularies/operations"
import { Loader } from "../components/Loader"

export default function OpenVocabulary() {
  const dispatch = useDispatch()
  const vocabulary = useSelector(selectVocabulary)
  const isLoading = useSelector(selectIsLoading)

  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchVocabulary(id))
  }, [dispatch, id])

  if (isLoading || !vocabulary) return <Loader />

  return (
    <main>
      <h1>
        {vocabulary.name} (count: {vocabulary.firstLang.length})
      </h1>
      <Link className="btn btn-secondary" to="/">
        Cancel
      </Link>
      <Link className="btn btn-success" to="/vocabulary/words/add">
        Add words
      </Link>
      <Link className="btn btn-primary" to="/vocabulary/play/connecting-words">
        Play connecting words
      </Link>
      <Link className="btn btn-dark" to="/vocabulary/play/guessing-words">
        Play guessing word
      </Link>
      {vocabulary.firstLang.map((word, index) => {
        return (
          <div className="container-for-word-pairs" key={index}>
            <div className="word-pairs">
              <div className="word">{word}</div>
              <div className="word">{vocabulary.secLang[index]}</div>
            </div>
            <div className="links">
              <Link to="/vocabulary/words/change" className="btn btn-primary">
                Change
              </Link>
              <a
                className="btn btn-danger"
                onClick={() => console.log("delete")}
              >
                Delete
              </a>
            </div>
          </div>
        )
      })}
    </main>
  )
}
