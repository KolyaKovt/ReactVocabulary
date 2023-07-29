import ListVocabularies from "./ListVocabularies";
import NewVocabulary from "./NewVocabulary";
import OpenVocabulary from "./OpenVocabulary";
import RenameVocabulary from "./RenameVocabulary";
import AddWords from "./AddWords";
import ChangeWords from "./ChangeWords";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const serverBase = "http://localhost:3000";

export default function App() {
  const [openedVocId, setOpenedVocId] = useState(() => {
    const storedOpenedVocId = localStorage.getItem("openedVocId");
    if (storedOpenedVocId) return storedOpenedVocId;
  });

  const [index, setIndex] = useState(() => {
    const storedIndex = localStorage.getItem("index");
    if (storedIndex) return storedIndex;
  });

  useEffect(() => {
    localStorage.setItem("openedVocId", openedVocId);
  }, [openedVocId]);

  useEffect(() => {
    localStorage.setItem("index", index);
  }, [index]);

  return (
    <Routes>
      <Route
        path="/list-vocabularies"
        element={
          <ListVocabularies
            serverBase={serverBase}
            setOpenedVocId={setOpenedVocId}
          />
        }
      />
      <Route
        path="/new-vocabulary"
        element={<NewVocabulary serverBase={serverBase} />}
      />
      <Route
        path="/open-vocabulary"
        element={
          <OpenVocabulary
            serverBase={serverBase}
            id={openedVocId}
            setIndex={setIndex}
          />
        }
      />
      <Route
        path="/rename-vocabulary"
        element={<RenameVocabulary serverBase={serverBase} id={openedVocId} />}
      />
      <Route
        path="/add-word"
        element={<AddWords serverBase={serverBase} id={openedVocId} />}
      />
      <Route
        path="/change-word"
        element={
          <ChangeWords serverBase={serverBase} id={openedVocId} index={index} />
        }
      />
    </Routes>
  );
}
