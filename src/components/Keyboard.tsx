import React, { useEffect, useState } from 'react';

const keyboardRows: string[] = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

type KeyboardProps = {
  currentWord: string;
  currentHint: string;
  handleRefresh: () => void;
};

const Keyboard: React.FC<KeyboardProps> = ({ currentWord, handleRefresh }) => {
  const [attempts, setAttempts] = useState(7);
  const [charLeft, setCharLeft] = useState(currentWord.split(''));
  const [status, setStatus] = useState<'playing' | 'lost' | 'won'>('playing');
  const charBtns = document.getElementsByClassName('char-btn');
  const charSpans = document.getElementsByClassName(
    'char-span'
  ) as HTMLCollectionOf<HTMLSpanElement>;

  useEffect(() => {
    if (!attempts) {
      setStatus('lost');
      for (let i = 0; i < charBtns.length; i++) {
        charBtns.item(i)?.setAttribute('disabled', 'true');
      }
      for (let i = 0; i < charSpans.length; i++) {
        let charSpan = charSpans.item(i);
        if (charSpan) charSpan.style.display = 'inline-block';
      }
    }
    if (!charLeft.length) {
      setStatus('won');
      for (let i = 0; i < charBtns.length; i++) {
        charBtns.item(i)?.setAttribute('disabled', 'true');
      }
    }
  }, [attempts, charLeft]);

  function handleInput(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.setAttribute('disabled', 'true'); // Disable the respective btn ele
    const userInput = e.currentTarget.value;

    if (currentWord.split('').includes(userInput)) {
      // Correct guess logic

      let coll: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName(
        `${userInput}-char`
      ) as HTMLCollectionOf<HTMLElement>;

      for (let i = 0; i < coll.length; i++) {
        const item = coll.item(i);
        if (item) {
          item.style.display = 'inline-block';
          item.style.color = 'green';
        }
      }

      setCharLeft((prev) => prev.filter((char) => char != userInput));
    } else {
      // Incorrect guess logic

      setAttempts((prev) => prev - 1);
    }
  }

  return (
    <div>
      <div
        className="char-container"
        style={{ display: 'flex', gap: '2rem' }}>
        {currentWord.split('').map((char, index) => (
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
      <span style={{ margin: '1rem' }}>Attempts Left: {attempts}</span>
      <span>Status:{status}</span>
      {keyboardRows.map((row, index) => (
        <div
          className="row"
          key={index}>
          {row.split('').map((char, index) => (
            <button
              key={index}
              className="char-btn"
              value={char}
              onClick={(e) => handleInput(e)}>
              {char}
            </button>
          ))}
        </div>
      ))}
      <button
        value={'SPACEBAR'}
        onClick={handleRefresh}>
        spacebar
      </button>
    </div>
  );
};

export default Keyboard;
