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
    <main className="flex flex-col items-center">
      <h1 className="my-6">
        {vocabulary.name} (count: {vocabulary.firstLang.length})
      </h1>
      <div className="flex gap-2">
        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
        <Link className="btn btn-success" to="add">
          Add words
        </Link>
        <Link className="btn btn-primary" to="play/connecting-words">
          Play connecting words
        </Link>
        <Link className="btn btn-dark" to="play/guessing-words">
          Play guessing word
        </Link>
      </div>
      {vocabulary.firstLang.map((word, index) => {
        return (
          <div className="" key={index}>
            <div className="">
              <div className="">{word}</div>
              <div className="">{vocabulary.secLang[index]}</div>
            </div>
            <div className="">
              <Link to="change" className="btn btn-primary">
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
