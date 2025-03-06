import React, { useEffect, useState } from 'react';
import './styles/App.css';
import Keyboard from './components/Keyboard';
import { wordList } from './utils';
import Hangman from './components/Hangman';

const App: React.FC = () => {
  const [keyboardKey, setKeyboardKey] = useState(0);
  const [userInput, setUserInput] = useState<string | null>();
  const [correctGuess, setCorrectGuess] = useState<string[]>([]);
  const [incorrectGuess, setIncorrectGuess] = useState<string[]>([]);
  const attempts = 7 - incorrectGuess.length;
  const [wordObj, setWordObj] = useState(
    wordList[Math.floor(Math.random() * 850)]
  );
  const [charLeft, setCharLeft] = useState(wordObj.word.split(''));
  const isWinner = !charLeft.length;
  const isGameOver = !attempts;
  const [hintReveal, setHintReveal] = useState(false);

  function handleRefresh() {
    setWordObj(wordList[Math.floor(Math.random() * 850)]);
  }

  function handleUserInput(input: string) {
    if (correctGuess.includes(input) || incorrectGuess.includes(input)) return; // Return early if the user input is duplicate
    if (charLeft.includes(input)) {
      // Correct guess logic
      setCorrectGuess((prev) => [...prev, input]);
      setCharLeft(charLeft.filter((char) => char != input));
    } else {
      // Incorrect guess logic
      setIncorrectGuess((prev) => [...prev, input]);
    }
  }

  useEffect(() => {
    // Kind of handle refresh
    setKeyboardKey((prev) => prev + 1); // just to remount the Keyboard component
    setCorrectGuess([]);
    setIncorrectGuess([]);
    setCharLeft(wordObj.word.split(''));
  }, [wordObj]);

  useEffect(() => {
    if (userInput) charLeft.length && attempts && handleUserInput(userInput);
  }, [userInput]);

  return (
    <div className="main">
      <div className={`hint-container ${hintReveal ? 'hint-revealed' : ''}`}>
        {wordObj.hint}
      </div>
      <div>{/* <Hangman numberOfGuesses={attempts} /> */}</div>
      <div className="word-container">
        {wordObj.word.split('').map((char, index) => (
          <div
            key={`${wordObj.word}-${index}`}
            className="char-box">
            <span
              key={char}
              className={`char-span ${
                correctGuess.includes(char)
                  ? 'correct-guess'
                  : !attempts
                  ? 'not-guessed'
                  : ''
              }`}>
              {correctGuess.includes(char) || isGameOver || isWinner
                ? char
                : '🖕'}
            </span>
          </div>
        ))}
      </div>
      <div className="actions-menu">
        <div className="attempts-box">{attempts} attempts left</div>
        <div className="hint-box">
          <span className="hint-label">
            {hintReveal ? 'Hide' : 'Show'} Hint
          </span>
          <label className="switch">
            <input
              type="checkbox"
              id="hint-toggle"
              defaultChecked={hintReveal}
              onClick={() => setHintReveal((prev) => !prev)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="keyboard-container">
        <Keyboard
          key={keyboardKey}
          userInput={setUserInput}
          handleRefresh={handleRefresh}
          isWinner={isWinner}
          isGameOver={isGameOver}
          correctGuess={correctGuess}
          incorrectGuess={incorrectGuess}
        />
      </div>
    </div>
  );
};

export default App;
