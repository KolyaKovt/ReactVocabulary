import ListVocabularies from "./ListVocabularies";
import NewVocabulary from "./NewVocabulary";
import OpenVocabulary from "./OpenVocabulary";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const serverBase = "http://localhost:3000";

export default function App() {
  const [openedVocId, setOpenedVocId] = useState("");

  useEffect(() => {
    const storedOpenedVocId = localStorage.getItem("openedVocId");
    if (storedOpenedVocId) setOpenedVocId(storedOpenedVocId);
  }, []);

  useEffect(() => {
    localStorage.setItem("openedVocId", openedVocId);
  }, [openedVocId]);

  return (
    <>
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
          element={<OpenVocabulary serverBase={serverBase} id={openedVocId} />}
        />
        {/* <Route path="/rename-vocabulary" element={<NewVocabulary />} /> */}
      </Routes>
    </>
  );
}
