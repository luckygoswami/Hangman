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
  const charSpans = document.getElementsByClassName(
    'char-span'
  ) as HTMLCollectionOf<HTMLSpanElement>;
  const isWinner = !charLeft.length;
  const isGameOver = !attempts;

  function handleRefresh() {
    const newWordObj = wordList[Math.floor(Math.random() * 850)];
    setWordObj(newWordObj);
    setKeyboardKey((prev) => prev + 1); // just to remount the Keyboard component
    setCorrectGuess([]);
    setIncorrectGuess([]);
    setCharLeft(newWordObj.word.split(''));
    for (let i = 0; i < charSpans.length; i++) {
      const charSpan = charSpans.item(i);
      if (charSpan) {
        charSpan.style.display = 'none';
        charSpan.style.color = 'red';
      }
    }
  }

  function handleUserInput(input: string) {
    if (correctGuess.includes(input) || incorrectGuess.includes(input)) return; // Return early if the user input is duplicate
    if (charLeft.includes(input)) {
      // Correct guess logic
      setCorrectGuess((prev) => [...prev, input]);

      // reveal the character occurence
      for (let i = 0; i < charSpans.length; i++) {
        const charSpan = charSpans.item(i);
        if (charSpan && charSpan.innerText == input.toUpperCase()) {
          charSpan.style.display = 'inline';
          charSpan.style.color = 'green';
        }
      }

      // update the charleft array
      setCharLeft(charLeft.filter((char) => char != input));
    } else {
      // Incorrect guess logic
      setIncorrectGuess((prev) => [...prev, input]);
    }
  }

  useEffect(() => {
    if (userInput) charLeft.length && attempts && handleUserInput(userInput);
  }, [userInput]);

  useEffect(() => {
    if (!attempts)
      for (let i = 0; i < charSpans.length; i++) {
        const charSpan = charSpans.item(i);
        if (charSpan) charSpan.style.display = 'inline';
      }
  }, [attempts]);

  return (
    <div className="main">
      <div>Info Container</div>
      <div>{/* <Hangman numberOfGuesses={attempts} /> */}</div>
      <div
        className="char-container"
        style={{ display: 'flex', gap: '2rem' }}>
        {wordObj.word
          .toUpperCase()
          .split('')
          .map((char, index) => (
            <div
              key={index}
              className="char-box"
              style={{ padding: '0.5rem', borderBottom: 'solid 5px black' }}>
              <span
                key={index}
                className={`char-span ${char}-char`}
                style={{ display: 'none', color: 'red' }}>
                {char}
              </span>
            </div>
          ))}
      </div>
      <div>attempts left: {attempts} &nbsp; </div>
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
