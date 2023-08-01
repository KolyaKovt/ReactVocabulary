import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const countOfStrins = 7;
let indecies = [];
let countOfGuessedWords = 0;

export default function ConnectingWords({ getVocabulary }) {
  const [vocabulary, setVocabulary] = useState({
    firstLang: [],
    secLang: [],
    name: "",
  });

  const [currIndFL, setCurrIndFL] = useState([]);
  const [currIndSL, setCurrIndSL] = useState([]);

  const [selectedFL, setSelectedFL] = useState(-1);
  const [selectedSL, setSelectedSL] = useState(-1);

  const [guessedIndFL, setGuessedIndFL] = useState([]);
  const [guessedIndSL, setGuessedIndSL] = useState([]);

  useEffect(() => {
    getVocabulary(setVocabulary);
  }, []);

  useEffect(() => {
    restart();
  }, [vocabulary]);

  useEffect(() => {
    if (selectedFL === -1 || selectedSL === -1) return;

    if (currIndFL[selectedFL] === currIndSL[selectedSL]) {
      setGuessedIndFL(current => [...current, selectedFL]);
      setGuessedIndSL(current => [...current, selectedSL]);
      countOfGuessedWords++;
    }

    clearSelected();
  }, [selectedFL, selectedSL]);

  useEffect(() => {
    if (guessedIndFL.length === countOfStrins) {
      clearButtons();
      fillCurrentWords();
    }
  }, [guessedIndFL, guessedIndSL]);

  function clearSelected() {
    setSelectedFL(-1);
    setSelectedSL(-1);
  }

  function clearButtons() {
    setGuessedIndFL([]);
    setGuessedIndSL([]);
    clearSelected();
  }

  function restart() {
    countOfGuessedWords = 0;
    clearButtons();
    getIndecies();
    fillCurrentWords();
  }

  function getIndecies() {
    indecies = vocabulary.firstLang.map((el, i) => i);
  }

  function fillCurrentWords() {
    let fl = [];
    let sl = [];

    let minimal = Math.min(countOfStrins, indecies.length);

    for (let i = 0; i < minimal; i++) {
      let rndIndex = getRandomNumber(0, indecies.length - 1);

      fl.push(indecies[rndIndex]);
      sl.push(indecies[rndIndex]);

      indecies.splice(rndIndex, 1);
    }

    shuffleArray(sl);

    setCurrIndFL(fl);
    setCurrIndSL(sl);
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffleArray(array) {
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      let randomIndex = getRandomNumber(0, array.length - 1);
      let anotherElement = array[randomIndex];
      array[i] = anotherElement;
      array[randomIndex] = element;
    }
  }

  return (
    <>
      <main>
        <h1>Left words: {vocabulary.firstLang.length - countOfGuessedWords}</h1>
        <Link className="btn btn-secondary" to="/vocabulary">
          Cancel
        </Link>
        <a className="btn btn-success" onClick={restart}>
          Restart
        </a>
        {currIndFL.map((wIndex, i) => {
          return (
            <div className="container-for-word-pairs" key={i}>
              <div className="word-pairs">
                <div
                  className={guessedIndFL.includes(i) ? "word guessed" : selectedFL === i ? "word selected" : "word"}
                  onClick={() =>
                    selectedFL === i ? setSelectedFL(-1) : setSelectedFL(i)
                  }
                >
                  {vocabulary.firstLang[wIndex]}
                </div>
                <div
                  className={guessedIndSL.includes(i) ? "word guessed" : selectedSL === i ? "word selected" : "word"}
                  onClick={() =>
                    selectedSL === i ? setSelectedSL(-1) : setSelectedSL(i)
                  }
                >
                  {vocabulary.secLang[currIndSL[i]]}
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}

ConnectingWords.propTypes = {
  getVocabulary: PropTypes.func,
};
