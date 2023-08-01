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

const serverBase = "http://localhost:3000";

export default function App() {
  const [openedVocId, setOpenedVocId] = useState(() => {
    const storedOpenedVocId = localStorage.getItem("openedVocId");
    if (storedOpenedVocId) return storedOpenedVocId;
  });

  const [index, setIndex] = useState(() => {
    const storedIndex = localStorage.getItem("index");
    if (storedIndex) return parseInt(storedIndex);
  });

  useEffect(() => {
    localStorage.setItem("openedVocId", openedVocId);
  }, [openedVocId]);

  useEffect(() => {
    localStorage.setItem("index", index);
  }, [index]);

  function getVocabulary(setVocabulary) {
    fetch(`${serverBase}/vocabulary/${openedVocId}`)
      .then(res => res.json())
      .then(voc => setVocabulary(voc))
      .catch(e => console.error(e));
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
        element={<NewVocabulary serverBase={serverBase} />}
      />
      <Route
        path="/vocabulary"
        element={
          <OpenVocabulary
            serverBase={serverBase}
            getVocabulary={getVocabulary}
            setIndex={setIndex}
          />
        }
      />
      <Route
        path="/vocabulary/rename"
        element={
          <RenameVocabulary
            serverBase={serverBase}
            getVocabulary={getVocabulary}
          />
        }
      />
      <Route
        path="/vocabulary/words/add"
        element={
          <AddWords serverBase={serverBase} getVocabulary={getVocabulary} />
        }
      />
      <Route
        path="/vocabulary/words/change"
        element={
          <ChangeWords
            serverBase={serverBase}
            getVocabulary={getVocabulary}
            index={index}
          />
        }
      />
      <Route
        path="/vocabulary/play/connecting-words"
        element={<ConnectingWords serverBase={serverBase} getVocabulary={getVocabulary} />}
      />
    </Routes>
  );
}
