/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormWord from "./_form_word";

export default function ChangeWords({ getVocabulary, serverBase, index }) {
  const [vocabulary, setVocabulary] = useState({ name: "", firstLang: [], secLang: [] });

  const wordRef = useRef();
  const translRef = useRef();

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

    await fetch(`${serverBase}/vocabulary/words/change`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: vocabulary.wordsIds[index], word: wordRef.current.value, transl: translRef.current.value }),
    })
      .catch(err => console.error(err));
    
    navigate('/vocabulary');
  }

  return (
    <main>
      <h1>Changing words in: {vocabulary.name}</h1>
      <form onSubmit={changeWord}>
        <FormWord wordRef={wordRef} translRef={translRef} />
        <Link className="btn btn-secondary" to="/vocabulary">
          Cancel
        </Link>
        <button className="btn btn-primary">Save</button>
      </form>
    </main>
  );
}

ChangeWords.propTypes = {
  getVocabulary: PropTypes.func,
  serverBase: PropTypes.string,
  index: PropTypes.number
};