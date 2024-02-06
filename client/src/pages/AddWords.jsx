/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import FormWord from "../components/_form_word";

export default function AddWords({ getVocabulary, serverBase, escapeHandler }) {
  const [vocabulary, setVocabulary] = useState({
    firstLang: [],
    secLang: [],
    name: "",
  });

  const wordRef = useRef(null);
  const translRef = useRef(null);

  useEffect(() => {
    getVocabulary(setVocabulary);
  }, []);

  function addWord(e) {
    e.preventDefault();

    wordRef.current.focus();

    fetch(`${serverBase}/vocabulary/words/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: vocabulary.id,
        word: wordRef.current.value,
        transl: translRef.current.value,
      }),
    }).catch(e => console.error(e));

    wordRef.current.value = "";
    translRef.current.value = "";
  }

  return (
    <main>
      <h1>Adding words in: {vocabulary.name}</h1>
      <FormWord wordRef={wordRef} translRef={translRef} submit={addWord} escapeHandler={escapeHandler} />
    </main>
  );
}

AddWords.propTypes = {
  getVocabulary: PropTypes.func,
  escapeHandler: PropTypes.func,
  serverBase: PropTypes.string,
};
