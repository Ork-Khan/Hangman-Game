import { useState, useEffect } from 'react'
import { Lives } from './components/Lives'
import { Keyboard } from './components/Keyboard';
import { RevealedWord } from './components/RevealedWord';
import { GameEnd } from './components/GameEnd';
import { Settings } from './components/Settings';
import './App.css'

function App() {
  const [maxLive, setMaxLive] = useState(8);
  const [wordSize, setWordSize] = useState(6);
  const [lives, setLives] = useState(maxLive);
  const [hiddenWord, setHiddenWord] = useState('');
  const [revealedLetters, setRevealedLetters] = useState(new Set());
  const [gameState, setGameState] = useState(null);
  const [newGameToggle, setNewGameToggle] = useState(false);

  useEffect(() =>{    
    fetch(`https://random-words-api.kushcreates.com/api?language=en&length=${wordSize}&type=uppercase&words=1`)
    .then(response => response.json())
    .then(data => setHiddenWord(data[0].word));

  }, [newGameToggle])   
  
  function checkLetter(letter)
  {
    if(gameState != null)
      return;

    if(!revealedLetters.has(letter)){
      setRevealedLetters(prev => new Set([...prev,letter]));
      
      if(!hiddenWord.includes(letter))
        setLives(prev => prev - 1);
    }
  }

  function checkGameEnd(){
    if(gameState != null)
      return;

    let hiddenLetters = new Set(hiddenWord);

    if(hiddenWord.length > 0 && hiddenLetters.difference(revealedLetters).size == 0)
      setGameState('won');
    else if(lives == 0)
      setGameState('lost');
  }

  function newGame(){
    setLives(maxLive);
    setRevealedLetters(new Set());
    setGameState(null);

    setNewGameToggle(prev => !prev);
  }

  checkGameEnd();

  function sizeChanged(newSize){
    setWordSize(newSize);
  }

  function lifeChanged(newLives){
    setMaxLive(newLives);
  }

  return (
    <>
      {
        gameState != null &&
        <Settings
          defaultSize = {wordSize}
          defaultLife = {maxLive}

          handleSize={sizeChanged}
          handleLives={lifeChanged}
        />
      }
      
      <header>
        <h1>Hangman Game</h1>
        <p>Guess the word in under {maxLive} attempts.</p>
      </header>
      <main>
        {
          gameState != null &&
          <GameEnd game={gameState}/>
        }

        <Lives 
          fullHealth = {maxLive}
          healthLeft = {lives}
          />
        
        <RevealedWord 
          word={hiddenWord}
          revealedLetters={revealedLetters}
          showNotFound={ gameState == 'lost' }
        />
        
        <Keyboard
          gameEnded={gameState != null}
          correct={revealedLetters.intersection(new Set(hiddenWord))}
          wrong={revealedLetters.difference(new Set(hiddenWord))}
          handleClick={checkLetter}
          />

        {
          gameState != null &&
          <div className='button-container'>
            <button className="new-game" onClick= {newGame}>New Game</button>
          </div>
        }
      </main>
    </>
  )
}

export default App
