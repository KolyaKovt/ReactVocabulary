import PropTypes from "prop-types";

export default function FormVocabulary({ vocNameRef }) {
  return (
    <>
      <label htmlFor="name">Enter the name of the vocabulary</label>
      <input
        required
        id="name"
        type="text"
        ref={vocNameRef}
        className="form-control"
      ></input>
    </>
  );
}

FormVocabulary.propTypes = {
  vocNameRef: PropTypes.object
};
