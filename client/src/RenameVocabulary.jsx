import PropTypes from "prop-types";
import FormVocabulary from "./_form_vocabulary";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function RenameVocabulary({ serverBase, id }) {
  const vocNameRef = useRef();
  const navigate = useNavigate();

  function renameVocabulary(e) {
    e.preventDefault();

    if (vocNameRef.current.value.trim() === "") return;

    fetch(`${serverBase}/rename-vocabulary`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, name: vocNameRef.current.value }),
    }).catch((e) => console.error(e));

    vocNameRef.current.value = "";
    navigate('/list-vocabularies');
  }

  return (
    <main>
      <h1>Rename vocabulary</h1>
      <form onSubmit={renameVocabulary}>
        <FormVocabulary vocNameRef={vocNameRef} />
        <Link className="btn btn-secondary" to="/list-vocabularies">
          Cancel
        </Link>
        <button className="btn btn-primary">Save</button>
      </form>
    </main>
  );
}

RenameVocabulary.propTypes = {
  serverBase: PropTypes.string,
  id: PropTypes.string,
};
