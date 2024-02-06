/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const countOfStrins = 6;
let indecies = [];
let countOfGuessedWords = 0;

export default function GuessingWords({ getVocabulary, incrementCountOfRep, escapeHandler }) {
  const [vocabulary, setVocabulary] = useState({
    firstLang: [],
    secLang: [],
    name: "",
  });

  const escapeRef = useRef(null);

  const [correctInd, setCorrectInd] = useState(-1);
  const [buttonsInds, setButtonsInds] = useState([]);

  const [wrongInds, setWrongInds] = useState([]);

  useEffect(() => {
    getVocabulary(setVocabulary);

    const handler = (e) => escapeHandler(e, escapeRef);

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  useEffect(() => {
    restart();
  }, [vocabulary]);

  function restart() {
    countOfGuessedWords = 0;
    setWrongInds([]);
    getIndecies();
    fillButtonsInds();
  }

  function getIndecies() {
    indecies = vocabulary.firstLang.map((el, i) => i);
  }

  function fillButtonsInds() {
    const rndIndex = getRandomNumber(0, indecies.length - 1);
    setCorrectInd(indecies[rndIndex]);
    let l = [indecies[rndIndex]];

    indecies.splice(rndIndex, 1);

    let minimal = Math.min(countOfStrins, vocabulary.firstLang.length);

    for (let i = 1; i < minimal; i++) {
      const rndIndexForButtns = getRandomNumber(0, vocabulary.firstLang.length - 1);

      if (l.includes(rndIndexForButtns) || correctInd === rndIndexForButtns) {
        i--;
        continue;
      }

      l.push(rndIndexForButtns);
    }

    shuffleArray(l);

    setButtonsInds(l);
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

  function checkTheAnswer(i) {
    if (buttonsInds[i] === correctInd) {
      countOfGuessedWords++;
      setWrongInds([]);
      fillButtonsInds();
    } else {
      if (!wrongInds.includes(i)) setWrongInds(current => [...current, i]);
    }

    if (vocabulary.firstLang.length - countOfGuessedWords === 0) {
      setButtonsInds([]);
      setCorrectInd(-1);
      incrementCountOfRep();
    }
  }

  return (
    <main>
      <div className="h1-plus-buttons">
        <h1>Left words: {vocabulary.firstLang.length - countOfGuessedWords}</h1>
        <Link className="btn btn-secondary" to="/vocabulary" ref={escapeRef}>
          Cancel
        </Link>
        <a className="btn btn-success" onClick={restart}>
          Restart
        </a>
      </div>
      <div className="word-to-guess">{vocabulary.firstLang[correctInd]}</div>
      <div className="games-container">
        {buttonsInds.map((bIndex, i) => {
          return (
            <div
              className={
                "word words-variants " + (wrongInds.includes(i) ? "wrong" : "")
              }
              onClick={() => checkTheAnswer(i)}
              key={i}
            >
              {vocabulary.secLang[bIndex]}
            </div>
          );
        })}
      </div>
    </main>
  );
}

GuessingWords.propTypes = {
  getVocabulary: PropTypes.func,
  incrementCountOfRep: PropTypes.func,
  escapeHandler: PropTypes.func,
};
