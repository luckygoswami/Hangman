import React, { useEffect } from 'react';
import '../styles/Keyboard.css';

const keyboardRows: string[] = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

type KeyboardProps = {
  userInput: (key: string) => void;
  handleRefresh: () => void;
  isWinner: boolean;
  isGameOver: boolean;
};

const Keyboard: React.FC<KeyboardProps> = ({
  userInput,
  handleRefresh,
  isWinner,
  isGameOver,
}) => {
  useEffect(() => {
    // handle keyboard input
    const handleKeypress = (e: globalThis.KeyboardEvent) => {
      if (e.key == ' ') {
        handleRefresh();
      } else {
        /^[a-zA-Z]$/.test(e.key) && userInput(e.key);
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
              className="char-btn"
              disabled={isWinner || isGameOver}
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
