import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OpenVocabulary({ id, serverBase }) {
  const [vocabulary, setVocabulary] = useState({});

  useEffect(() => {
    getVocabulary();
  }, []);

  async function getVocabulary() {
    try {
      const res = await fetch(`${serverBase}/get-vocabulary/${id}`);
      
      setVocabulary(await res.json());
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main>
      <h1>{vocabulary.name}</h1>
      <Link className="btn btn-secondary" to="/list-vocabularies">
        Cancel
      </Link>
      <Link className="btn btn-success" to="/list-vocabularies">
        Add words
      </Link>
      <Link className="btn btn-primary" to="/list-vocabularies">
        Play connecting words
      </Link>
      <Link className="btn btn-dark" to="/list-vocabularies">
        Play guessing word
      </Link>
      {/* {vocabulary.fitstLang.map((word, index) => {
        <div className="container-for-word-pairs">
          <p className="number">{index + 1}</p>
          <div className="word-pairs">
            <div className="word">{word}</div>
            <div className="word">{vocabulary.secLang[index]}</div>
          </div>
          <div className="links">
            <a href="/vocabularies/change-words/<%= vocabulary.id %>/<%= i %>" className="btn btn-primary">Change</a>
            <a href="/vocabularies/delete-words/<%= vocabulary.id %>/<%= i %>" className="btn btn-danger">Delete</a>
          </div>
        </div>
      })} */}
    </main>
  );
}

OpenVocabulary.propTypes = {
  id: PropTypes.string,
  serverBase: PropTypes.string
};