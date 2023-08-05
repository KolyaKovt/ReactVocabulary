/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function FormWord({ wordRef, translRef, submit }) {
  function handleKeyDown(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      if (document.activeElement === wordRef.current) {
        translRef.current.focus();
      } else {
        wordRef.current.focus();
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <form onSubmit={submit}>
      <div className="inputs">
        <div className="input">
          <input
            required
            id="word"
            type="text"
            className="form-control"
            ref={wordRef}
            placeholder="First language"
          />
        </div>
        <div className="input">
          <input
            required
            id="transl"
            type="text"
            className="form-control"
            ref={translRef}
            placeholder="Second language"
          />
        </div>
      </div>
      <Link className="btn btn-secondary" to="/vocabulary">
        Cancel
      </Link>
      <button className="btn btn-primary">Save</button>
    </form>
  );
}

FormWord.propTypes = {
  wordRef: PropTypes.object,
  translRef: PropTypes.object,
  submit: PropTypes.func,
};
