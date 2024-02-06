import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"

import VocabularyForm from "../components/VocabularyForm"
import { createVocabularyThunk } from "../redux/vocabularies/operations"

export default function NewVocabulary() {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm()

  const submit = data => {
    dispatch(createVocabularyThunk(data.name.trim()))
    reset()
  }

  return (
    <main>
      <section className="flex flex-col items-center">
        <h1 className="mt-6 mb-6 text-4xl font-bold">New vocabulary</h1>
        <VocabularyForm submit={handleSubmit(submit)} register={register} btnLabel={"Add"} />
      </section>
    </main>
  )
}
