import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"

import VocabularyForm from "../components/VocabularyForm"
import { renameVocabularyThunk } from "../redux/vocabularies/operations"
import { useNavigate, useParams } from "react-router-dom"

export default function RenameVocabulary() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()
  const { id } = useParams()

  const submit = data => {
    dispatch(
      renameVocabularyThunk({
        name: data.name.trim(),
        id,
      })
    )
    navigate("/")
    reset()
  }

  return (
    <main>
      <section className="flex flex-col items-center">
        <h1 className="mt-6 mb-6 text-4xl font-bold">Rename the vocabulary</h1>
        <VocabularyForm
          submit={handleSubmit(submit)}
          register={register}
          btnLabel={"Rename"}
        />
      </section>
    </main>
  )
}
