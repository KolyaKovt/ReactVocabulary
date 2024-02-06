import { useEffect } from "react"
import "./App.css"
import { fetchVocabularies } from "../services/api"

function App() {
  useEffect(() => {
    fetchVocabularies().then(res => {
      console.log(res)
    })
  }, [])

  return <h1>Hi there</h1>
}

export default App
