import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ListVocabularies({ serverBase, setOpenedVocId }) {
  const [vocabularies, setVocabularies] = useState([]);

  useEffect(() => {
    getVocabularies();
  }, []);

  function getVocabularies() {
    fetch(`${serverBase}/get-vocabularies`)
      .then(res => res.json())
      .then(vocabularies => setVocabularies(vocabularies))
      .catch(e => console.error(e));
  }

  function deleteVocabulary(id) {
    fetch(`${serverBase}/delete-vocabulary`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .catch(e => console.error(e));
    
    setVocabularies((currVocab) => currVocab.filter((voc) => voc._id !== id));
  }

  return (
    <main>
      <h1>Vocabularies</h1>
      <Link className="btn btn-success" to="/new-vocabulary">
        New vocabulary
      </Link>
      <div className="vocabularies">
        {vocabularies.map((vocabulary) => {
          return (
            <section className="vocabulary" key={vocabulary._id}>
              <div className="voc-name">
                <section>{vocabulary.name}</section>
                <section className="count-of-rep-sec">
                  {vocabulary.countOfRepetitions}
                </section>
              </div>
              <Link
                className="btn btn-secondary"
                onClick={() => setOpenedVocId(vocabulary._id)}
                to="/open-vocabulary"
              >
                Open
              </Link>
              <a className="btn btn-primary">Rename</a>
              <a
                className="btn btn-danger"
                onClick={async () => deleteVocabulary(vocabulary._id)}
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
