import { useEffect } from "react"
import WordForm from "../components/WordForm"
import { useDispatch, useSelector } from "react-redux"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { useParams } from "react-router-dom"
import { fetchVocabulary } from "../redux/vocabularies/operations"

export default function AddWords() {
  const vocabulary = useSelector(selectVocabulary)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchVocabulary(id))
  }, [dispatch, id])

  const submit = () => {}

  return (
    <main className="flex flex-col items-center">
      <h1>Adding words in: {vocabulary.name}</h1>
      <WordForm submit={submit} />
    </main>
  )
}
