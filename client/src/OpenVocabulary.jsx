import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OpenVocabulary({ id, serverBase, setIndex }) {
  const [vocabulary, setVocabulary] = useState({
    firstLang: [],
    secLang: [],
    name: "",
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getVocabulary();
  }, [refresh]);

  function getVocabulary() {
    fetch(`${serverBase}/get-vocabulary/${id}`)
      .then(res => res.json())
      .then(voc => setVocabulary(voc))
      .catch(e => console.error(e));
  }

  function deleteWord(index) {
    fetch(`${serverBase}/delete-word`, {
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
      <h1>{vocabulary.name}</h1>
      <Link className="btn btn-secondary" to="/list-vocabularies">
        Cancel
      </Link>
      <Link className="btn btn-success" to="/add-word">
        Add words
      </Link>
      <Link className="btn btn-primary" to="/list-vocabularies">
        Play connecting words
      </Link>
      <Link className="btn btn-dark" to="/list-vocabularies">
        Play guessing word
      </Link>
      {vocabulary.firstLang.map((word, index) => {
        return (
          <div className="container-for-word-pairs" key={index}>
            <p className="number">{index + 1})</p>
            <div className="word-pairs">
              <div className="word">{word}</div>
              <div className="word">{vocabulary.secLang[index]}</div>
            </div>
            <div className="links">
              <Link
                to="/change-word"
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
  id: PropTypes.string,
  serverBase: PropTypes.string,
  setIndex: PropTypes.func,
};
