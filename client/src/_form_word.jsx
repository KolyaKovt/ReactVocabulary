import PropTypes from "prop-types";

export default function FormWord({ wordRef, translRef }) {
  return (
    <>
      <div className="inputs">
        <div className="input">
          <label htmlFor="word">Enter word in first language</label>
          <input
            required
            id="word"
            type="text"
            className="form-control"
            ref={wordRef}
          />
        </div>
        <div className="input">
          <label htmlFor="transl">Enter word in second language</label>
          <input
            required
            id="transl"
            type="text"
            className="form-control"
            ref={translRef}
          />
        </div>
      </div>
    </>
  );
}

FormWord.propTypes = {
  wordRef: PropTypes.object,
  translRef: PropTypes.object,
};