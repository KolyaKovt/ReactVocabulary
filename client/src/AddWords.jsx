import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FormWord from "./_form_word";

export default function AddWords({ getVocabulary, serverBase }) {
  const [vocabulary, setVocabulary] = useState({
    firstLang: [],
    secLang: [],
    name: "",
  });

  const wordRef = useRef();
  const translRef = useRef();

  useEffect(() => {
    getVocabulary(setVocabulary);
  }, []);

  function addWord(e) {
    e.preventDefault();

    fetch(`${serverBase}/vocabulary/words/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: vocabulary.id, word: wordRef.current.value, transl: translRef.current.value }),
    })
      .catch(e => console.error(e));
    
    wordRef.current.value = "";
    translRef.current.value = "";
  }

  return (
    <main>
      <h1>Adding words in: {vocabulary.name}</h1>
      <form onSubmit={addWord}>
        <FormWord wordRef={wordRef} translRef={translRef} />
        <Link className="btn btn-secondary" to="/vocabulary">
          Cancel
        </Link>
        <button className="btn btn-primary">Save</button>
      </form>
    </main>
  );
}

AddWords.propTypes = {
  getVocabulary: PropTypes.func,
  serverBase: PropTypes.string,
};