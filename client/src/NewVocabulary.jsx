import FormVocabulary from "./_form_vocabulary";
import PropTypes from "prop-types";
import { useRef } from "react";

export default function NewVocabulary({ serverBase, escapeHandler }) {
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
      <FormVocabulary vocNameRef={vocNameRef} submit={createVocabulary} escapeHandler={escapeHandler} />
    </main>
  );
}

NewVocabulary.propTypes = {
  serverBase: PropTypes.string,
  escapeHandler: PropTypes.func,
};
