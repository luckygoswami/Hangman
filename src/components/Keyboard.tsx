import React, { useEffect } from 'react';
import '../styles/Keyboard.css';

const keyboardRows: string[] = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

type KeyboardProps = {
  userInput: (key: string) => void;
  handleRefresh: () => void;
  isWinner: boolean;
  isGameOver: boolean;
  correctGuess: string[];
  incorrectGuess: string[];
};

const Keyboard: React.FC<KeyboardProps> = ({
  userInput,
  handleRefresh,
  isWinner,
  isGameOver,
  correctGuess,
  incorrectGuess,
}) => {
  useEffect(() => {
    // handle keyboard input
    const handleKeypress = (e: globalThis.KeyboardEvent) => {
      const input = e.key.toLowerCase();

      if (input == ' ') {
        handleRefresh();
      } else {
        /^[a-zA-Z]$/.test(input) && userInput(input);
      }
    };

    window.addEventListener('keypress', handleKeypress);

    return () => {
      window.removeEventListener('keypress', handleKeypress);
    };
  }, []);

  return (
    <div className="keyboard">
      {keyboardRows.map((row, index) => (
        <div
          className="row"
          key={index}>
          {row.split('').map((char) => (
            <button
              key={char}
              id={`${char}-btn`}
              className={`char-btn ${
                correctGuess.includes(char)
                  ? 'correct-key'
                  : incorrectGuess.includes(char)
                  ? 'incorrect-key'
                  : ''
              }`}
              disabled={
                isWinner ||
                isGameOver ||
                correctGuess.includes(char) ||
                incorrectGuess.includes(char)
              }
              onClick={() => userInput(char)}>
              {char}
            </button>
          ))}
        </div>
      ))}
      <button
        className="spacebar-btn"
        onClick={handleRefresh}>
        Refresh
      </button>
    </div>
  );
};

export default Keyboard;
