/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function OpenVocabulary({
  getVocabulary,
  serverBase,
  setIndex,
  escapeHandler,
}) {
  const [vocabulary, setVocabulary] = useState({
    firstLang: [],
    secLang: [],
    name: "",
  });

  const escapeRef = useRef(null);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getVocabulary(setVocabulary);
  }, [refresh]);
  
  useEffect(() => {
    const handler = (e) => escapeHandler(e, escapeRef);

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  function deleteWord(index) {
    fetch(`${serverBase}/vocabulary/words/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: vocabulary.wordsIds[index] }),
    })
      .then(() => setRefresh(!refresh))
      .catch(e => console.error(e));
  }

  return (
    <main>
      <h1>{vocabulary.name} (count: {vocabulary.firstLang.length})</h1>
      <Link className="btn btn-secondary" to="/vocabularies" ref={escapeRef}>
        Cancel
      </Link>
      <Link className="btn btn-success" to="/vocabulary/words/add">
        Add words
      </Link>
      <Link className="btn btn-primary" to="/vocabulary/play/connecting-words">
        Play connecting words
      </Link>
      <Link className="btn btn-dark" to="/vocabulary/play/guessing-words">
        Play guessing word
      </Link>
      {vocabulary.firstLang.map((word, index) => {
        return (
          <div className="container-for-word-pairs" key={index}>
            <div className="word-pairs">
              <div className="word">{word}</div>
              <div className="word">{vocabulary.secLang[index]}</div>
            </div>
            <div className="links">
              <Link
                to="/vocabulary/words/change"
                className="btn btn-primary"
                onClick={() => setIndex(index)}
              >
                Change
              </Link>
              <a className="btn btn-danger" onClick={() => deleteWord(index)}>
                Delete
              </a>
            </div>
          </div>
        );
      })}
    </main>
  );
}

OpenVocabulary.propTypes = {
  getVocabulary: PropTypes.func,
  serverBase: PropTypes.string,
  setIndex: PropTypes.func,
  escapeHandler: PropTypes.func,
};
