import React, { useEffect, useState } from 'react';
import './styles/App.css';
import Keyboard from './components/Keyboard';
import { wordList } from './utils';
import Hangman from './components/Hangman';

const App: React.FC = () => {
  const [keyboardKey, setKeyboardKey] = useState(0);
  const [userInput, setUserInput] = useState<string | null>();
  const [attempts, setAttempts] = useState(7);
  const [wordObj, setWordObj] = useState(
    wordList[Math.floor(Math.random() * 850)]
  );
  const [charLeft, setCharLeft] = useState(wordObj.word.split(''));

  const charSpans = document.getElementsByClassName(
    'char-span'
  ) as HTMLCollectionOf<HTMLSpanElement>;

  function handleRefresh() {
    const newWordObj = wordList[Math.floor(Math.random() * 850)];
    setWordObj(newWordObj);
    setKeyboardKey((prev) => prev + 1); // to remount the Keyboard component
    setAttempts(7);
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
    input = input.toUpperCase();
    const charBtn = document.getElementById(`${input}-btn`);

    if (charLeft.includes(input.toLowerCase())) {
      // Correct guess logic

      // reveal the character occurence
      for (let i = 0; i < charSpans.length; i++) {
        const charSpan = charSpans.item(i);
        if (charSpan && charSpan.innerText == input) {
          charSpan.style.display = 'inline';
          charSpan.style.color = 'green';
        }
      }

      // update the charleft array
      setCharLeft(charLeft.filter((char) => char != input.toLowerCase()));

      charBtn?.setAttribute('disabled', 'true');
    } else {
      // Incorrect guess logic
      setAttempts((prev) => prev - 1);
      charBtn?.setAttribute('disabled', 'true');
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
      <div>info container</div>
      <div>
        <Hangman numberOfGuesses={attempts} />
      </div>
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
      <div>
        attempts left: {attempts} &nbsp;{' '}
        <button onClick={() => console.log(wordObj.word)}>answer</button>
        <button onClick={() => console.log(charLeft)}>char left</button>
      </div>
      <div className="keyboard-container">
        <Keyboard
          key={keyboardKey}
          userInput={setUserInput}
          handleRefresh={handleRefresh}
        />
      </div>
    </div>
  );
};

export default App;
