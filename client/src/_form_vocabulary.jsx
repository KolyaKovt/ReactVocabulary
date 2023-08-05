import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function FormVocabulary({ vocNameRef, submit }) {
  return (
    <form onSubmit={submit}>
      <input
        required
        id="name"
        type="text"
        ref={vocNameRef}
        className="form-control"
        placeholder="Vocabulary name"
      ></input>
      <Link className="btn btn-secondary" to="/vocabularies">
        Cancel
      </Link>
      <button className="btn btn-primary">Save</button>
    </form>
  );
}

FormVocabulary.propTypes = {
  vocNameRef: PropTypes.object,
  submit: PropTypes.func,
};
