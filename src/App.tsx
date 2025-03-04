import { useState } from 'react';
import Keyboard from './components/Keyboard';
import { wordList } from './utils';

const App: React.FC = () => {
  const [keyboardKey, setKeyboardKey] = useState(0);
  const [currentWordObj, setCurrentWordObj] = useState(
    wordList[Math.floor(Math.random() * 850)]
  );

  function handleRefresh() {
    setKeyboardKey((prev) => prev + 1);
    setCurrentWordObj(wordList[Math.floor(Math.random() * 850)]);
  }

  return (
    <div
      style={{
        width: '90vw',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Keyboard
        key={keyboardKey}
        currentWord={currentWordObj.word.toUpperCase()}
        currentHint={currentWordObj.hint}
        handleRefresh={handleRefresh}
      />
      <button onClick={() => console.log(currentWordObj.word)}>
        console answer
      </button>
      <span>{currentWordObj.hint}</span>
    </div>
  );
};

export default App;
