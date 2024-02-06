/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import VocabularyForm from "../components/VocabularyForm";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function RenameVocabulary({
  serverBase,
  getVocabulary,
  escapeHandler,
}) {
  const [vocabulary, setVocabulary] = useState({
    name: "",
    firstLang: [],
    secLang: [],
  });

  const vocNameRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    vocNameRef.current.value = vocabulary.name;
  }, [vocabulary]);

  useEffect(() => {
    getVocabulary(setVocabulary);
  }, []);

  async function renameVocabulary(e) {
    e.preventDefault();

    if (vocNameRef.current.value.trim() === "") return;

    await fetch(`${serverBase}/vocabulary/rename`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: vocabulary.id,
        name: vocNameRef.current.value,
      }),
    }).catch(e => console.error(e));

    navigate("/vocabularies");
  }

  return (
    <main>
      <h1>Rename vocabulary</h1>
      <VocabularyForm vocNameRef={vocNameRef} submit={renameVocabulary} escapeHandler={escapeHandler} />
    </main>
  );
}

RenameVocabulary.propTypes = {
  serverBase: PropTypes.string,
  getVocabulary: PropTypes.func,
  escapeHandler: PropTypes.func,
};
