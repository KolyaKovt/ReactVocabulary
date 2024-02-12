/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import WordForm from "../components/WordForm";

export default function ChangeWords({ getVocabulary, serverBase, index, escapeHandler }) {
  const [vocabulary, setVocabulary] = useState({
    name: "",
    firstLang: [],
    secLang: [],
  });

  const wordRef = useRef(null);
  const translRef = useRef(null);

  useEffect(() => {
    wordRef.current.value = vocabulary.firstLang[index];
    translRef.current.value = vocabulary.secLang[index];
  }, [vocabulary, index]);

  const navigate = useNavigate();

  useEffect(() => {
    getVocabulary(setVocabulary);
  }, []);

  async function changeWord(e) {
    e.preventDefault();

    wordRef.current.focus();

    await fetch(`${serverBase}/vocabulary/words/change`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: vocabulary.wordsIds[index],
        word: wordRef.current.value,
        transl: translRef.current.value,
      }),
    }).catch(err => console.error(err));

    navigate("/vocabulary");
  }

  return (
    <main>
      <h1>Changing words in: {vocabulary.name}</h1>
      <WordForm wordRef={wordRef} translRef={translRef} submit={changeWord} escapeHandler={escapeHandler} />
    </main>
  );
}

ChangeWords.propTypes = {
  getVocabulary: PropTypes.func,
  escapeHandler: PropTypes.func,
  serverBase: PropTypes.string,
  index: PropTypes.number,
};
