import { useEffect, useState } from "react"
import "./App.css"
import { fetchGet } from "../services/api"

function App() {
  const [vocabularies, setVocabularies] = useState("")

  useEffect(() => {
    fetchGet()
      .then(res => {
        setVocabularies(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (vocabularies)
    return (
      <ul>
        {vocabularies.map(voc => (
          <li key={voc.id}>{voc.name}</li>
        ))}
      </ul>
    )

  return <h1>asd</h1>
}

export default App
