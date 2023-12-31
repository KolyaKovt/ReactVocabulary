/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ListVocabularies({ serverBase, setOpenedVocId }) {
  const [vocabularies, setVocabularies] = useState([]);

  useEffect(() => {
    getVocabularies();
  }, []);

  function getVocabularies() {
    fetch(`${serverBase}/vocabularies`)
      .then((res) => res.json())
      .then((vocabularies) => setVocabularies(vocabularies))
      .catch((e) => console.error(e));
  }

  function deleteVocabulary(id) {
    fetch(`${serverBase}/vocabulary/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).catch((e) => console.error(e));

    setVocabularies((currVocab) => currVocab.filter((voc) => voc.id !== id));
  }

  return (
    <main>
      <h1>Vocabularies</h1>
      <Link className="btn btn-success" to="/vocabulary/new">
        New vocabulary
      </Link>
      <div className="vocabularies">
        {vocabularies.map((vocabulary) => {
          return (
            <section className="vocabulary" key={vocabulary.id}>
              <div className="voc-name">
                <section>{vocabulary.name}</section>
                <section className="count-of-rep-sec">
                  {vocabulary.countOfRepetitions}
                </section>
              </div>
              <Link
                className="btn btn-secondary"
                onClick={() => setOpenedVocId(vocabulary.id)}
                to="/vocabulary"
              >
                Open
              </Link>
              <Link
                className="btn btn-primary"
                to="/vocabulary/rename"
                onClick={() => setOpenedVocId(vocabulary.id)}
              >
                Rename
              </Link>
              <a
                className="btn btn-danger"
                onClick={async () => deleteVocabulary(vocabulary.id)}
              >
                Delete
              </a>
            </section>
          );
        })}
      </div>
    </main>
  );
}

ListVocabularies.propTypes = {
  serverBase: PropTypes.string,
  setOpenedVocId: PropTypes.func,
};
