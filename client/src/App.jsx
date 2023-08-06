//importing dependencies
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

//importing other components
import ListVocabularies from "./ListVocabularies";
import NewVocabulary from "./NewVocabulary";
import OpenVocabulary from "./OpenVocabulary";
import RenameVocabulary from "./RenameVocabulary";
import AddWords from "./AddWords";
import ChangeWords from "./ChangeWords";
import ConnectingWords from "./ConnectingWords";
import GuessingWords from "./GuessingWords";

const serverBase = "http://localhost:3000";

export default function App() {
  const [openedVocId, setOpenedVocId] = useState(() => {
    const storedOpenedVocId = localStorage.getItem("openedVocId");
    if (storedOpenedVocId) return parseInt(storedOpenedVocId);
  });

  const [index, setIndex] = useState(() => {
    const storedIndex = localStorage.getItem("index");
    if (storedIndex) return parseInt(storedIndex);
  });

  useEffect(() => {
    localStorage.setItem("openedVocId", openedVocId.toString());
  }, [openedVocId]);

  useEffect(() => {
    localStorage.setItem("index", index.toString());
  }, [index]);

  function getVocabulary(setVocabulary) {
    fetch(`${serverBase}/vocabulary/${openedVocId}`)
      .then(res => res.json())
      .then(voc => setVocabulary(voc))
      .catch(e => console.error(e));
  }

  function incrementCountOfRep() {
    fetch(`${serverBase}/vocabulary/incrementCountOfRepetitions`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: openedVocId,
      }),
    }).catch(e => console.error(e));
  }

  function escapeHandler(e, escapeRef) {
    if (e.key === "Escape" || e.key === "Esc") escapeRef.current.click();
  }

  return (
    <Routes>
      <Route
        path="/vocabularies"
        element={
          <ListVocabularies
            serverBase={serverBase}
            setOpenedVocId={setOpenedVocId}
          />
        }
      />
      <Route
        path="/vocabulary/new"
        element={
          <NewVocabulary
            serverBase={serverBase}
            escapeHandler={escapeHandler}
          />
        }
      />
      <Route
        path="/vocabulary"
        element={
          <OpenVocabulary
            serverBase={serverBase}
            getVocabulary={getVocabulary}
            setIndex={setIndex}
            escapeHandler={escapeHandler}
          />
        }
      />
      <Route
        path="/vocabulary/rename"
        element={
          <RenameVocabulary
            serverBase={serverBase}
            getVocabulary={getVocabulary}
            escapeHandler={escapeHandler}
          />
        }
      />
      <Route
        path="/vocabulary/words/add"
        element={
          <AddWords
            serverBase={serverBase}
            getVocabulary={getVocabulary}
            escapeHandler={escapeHandler}
          />
        }
      />
      <Route
        path="/vocabulary/words/change"
        element={
          <ChangeWords
            serverBase={serverBase}
            getVocabulary={getVocabulary}
            escapeHandler={escapeHandler}
            index={index}
          />
        }
      />
      <Route
        path="/vocabulary/play/connecting-words"
        element={
          <ConnectingWords
            getVocabulary={getVocabulary}
            incrementCountOfRep={incrementCountOfRep}
            escapeHandler={escapeHandler}
          />
        }
      />
      <Route
        path="/vocabulary/play/guessing-words"
        element={
          <GuessingWords
            getVocabulary={getVocabulary}
            incrementCountOfRep={incrementCountOfRep}
            escapeHandler={escapeHandler}
          />
        }
      />
    </Routes>
  );
}
