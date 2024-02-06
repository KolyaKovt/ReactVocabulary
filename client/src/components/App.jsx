import { Route, Routes } from "react-router-dom"

import ListVocabularies from "../pages/ListVocabularies"
import NewVocabulary from "../pages/NewVocabulary"
import OpenVocabulary from "../pages/OpenVocabulary"
import RenameVocabulary from "../pages/RenameVocabulary"
import AddWords from "../pages/AddWords"
import ChangeWords from "../pages/ChangeWords"
import ConnectingWords from "../pages/ConnectingWords"
import GuessingWords from "../pages/GuessingWords"

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListVocabularies />} />
      <Route path="/new" element={<NewVocabulary />} />
      {/* <Route
        path="/open"
        element={
          <OpenVocabulary
            getVocabulary={getVocabulary}
            setIndex={setIndex}
            escapeHandler={escapeHandler}
          />
        }
      /> */}
      {/* <Route
        path="/rename"
        element={
          <RenameVocabulary
            getVocabulary={getVocabulary}
            escapeHandler={escapeHandler}
          />
        }
      /> */}
      {/* <Route
        path="/words/add"
        element={
          <AddWords
            getVocabulary={getVocabulary}
            escapeHandler={escapeHandler}
          />
        }
      /> */}
      {/* <Route
        path="/words/change"
        element={
          <ChangeWords
            getVocabulary={getVocabulary}
            escapeHandler={escapeHandler}
            index={index}
          />
        }
      /> */}
      {/* <Route
        path="/play/connecting-words"
        element={
          <ConnectingWords
            getVocabulary={getVocabulary}
            incrementCountOfRep={incrementCountOfRep}
            escapeHandler={escapeHandler}
          />
        }
      /> */}
      {/* <Route
        path="/play/guessing-words"
        element={
          <GuessingWords
            getVocabulary={getVocabulary}
            incrementCountOfRep={incrementCountOfRep}
            escapeHandler={escapeHandler}
          />
        }
      /> */}
    </Routes>
  )
}

export default App
