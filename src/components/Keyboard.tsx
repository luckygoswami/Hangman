import React, { useEffect } from 'react';

const keyboardRows: string[] = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

type KeyboardProps = {
  userInput: (key: string) => void;
  handleRefresh: () => void;
};

const Keyboard: React.FC<KeyboardProps> = ({ userInput, handleRefresh }) => {
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
    <>
      {keyboardRows.map((row, index) => (
        <div
          className="row"
          key={index}>
          {row.split('').map((char, index) => (
            <button
              key={index}
              id={`${char}-btn`}
              className="char-btn"
              value={char}
              onClick={(e) => userInput(e.currentTarget.value)}>
              {char}
            </button>
          ))}
        </div>
      ))}
      <button onClick={handleRefresh}>spacebar</button>
    </>
  );
};

export default Keyboard;
