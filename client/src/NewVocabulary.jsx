import FormVocabulary from "./_form_vocabulary";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function NewVocabulary({ serverBase }) {
  const vocNameRef = useRef();

  async function createVocabulary(e) {
    e.preventDefault();

    fetch(`${serverBase}/vocabulary/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: vocNameRef.current.value }),
    }).catch((e) => console.error(e));

    vocNameRef.current.value = "";
  }

  return (
    <main>
      <h1>New vocabulary</h1>
      <form onSubmit={createVocabulary}>
        <FormVocabulary vocNameRef={vocNameRef} />
        <Link className="btn btn-secondary" to="/vocabularies">
          Cancel
        </Link>
        <button className="btn btn-primary">Save</button>
      </form>
    </main>
  );
}

NewVocabulary.propTypes = {
  serverBase: PropTypes.string,
};
