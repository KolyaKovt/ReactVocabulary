import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FormWord from "./_form_word";

export default function ChangeWords({ id, serverBase }) {
  const [vocName, setVocName] = useState("");

  const wordRef = useRef();
  const translRef = useRef();

  useEffect(() => {
    getVocabulary();
  }, []);

  function getVocabulary() {
    fetch(`${serverBase}/get-vocabulary/${id}`)
      .then(res => res.json())
      .then(voc => setVocName(voc.name))
      .catch(e => console.error(e));
  }

  function changeWord(e) {
    e.preventDefault();

    fetch(`${serverBase}/change-word`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, word: wordRef.current.value, transl: translRef.current.value }),
    })
      .catch(e => console.error(e));
    
    wordRef.current.value = "";
    translRef.current.value = "";
  }

  return (
    <main>
      <h1>Changing words in: {vocName}</h1>
      <form onSubmit={changeWord}>
        <FormWord wordRef={wordRef} translRef={translRef} />
        <Link className="btn btn-secondary" to="/open-vocabulary">
          Cancel
        </Link>
        <button className="btn btn-primary">Save</button>
      </form>
    </main>
  );
}

ChangeWords.propTypes = {
  id: PropTypes.string,
  serverBase: PropTypes.string,
};