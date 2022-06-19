import React, { useState, useEffect } from 'react';

import rock from '../assets/rock.png';
import paper from '../assets/paper.png';
import scissors from '../assets/scissors.png';

function Game() {
  // computer options
  const computerOptions = ['rock', 'paper', 'scissors'];

  const [fadeOut, setFadeOut] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState('Choose an option');
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [playerImage, setPlayerImage] = useState(rock);
  const [computerImage, setComputerImage] = useState(rock);
  const [shakeAnimation, setShakeAnimation] = useState(false);

  // Switch screens
  const startGameHundler = () => {
    setFadeOut(false);
    setFadeIn(false);
  };

  const panimate = { animation: 'shakePlayer 2s ease' };
  const canimate = { animation: 'shakeComputer 2s ease' };
  const noAnimate = { animation: '' };

  const animationHandler = () => {
    setShakeAnimation(true);
  };

  const stopAnimation = () => {
    setShakeAnimation(false);
  };

  const playerClickHandler = (hand) => {
    stopAnimation();
    setPlayerChoice(hand);
    getComputersChoice();
  };

  useEffect(() => {
    animationHandler();
    setTimeout(() => {
      // here is where we call compare hands
      compareHands();
    }, 2000);
  }, [computerChoice, playerChoice]);

  const getComputersChoice = () => {
    //computer choice
    const computerNumber = Math.floor(Math.random() * computerOptions.length);
    const randomComputerChoice = computerOptions[computerNumber];

    setComputerChoice(randomComputerChoice);
  };
  const compareHands = () => {
    console.log(playerChoice);
    console.log(computerChoice);
    if (playerChoice === 'rock') {
      setPlayerImage(rock);
      if (computerChoice === 'scissors') {
        setComputerImage(scissors);
        setResult('Player Wins');
        setPlayerScore(playerScore + 1);
        return;
      } else if (computerChoice === 'rock') {
        setComputerImage(rock);
        setResult("It's a tie");
      } else {
        setResult('Computer Wins');
        setComputerImage(paper);
        setComputerScore(computerScore + 1);
        return;
      }
    }
    // check for paper
    if (playerChoice === 'paper') {
      setPlayerImage(paper);
      if (computerChoice === 'scissors') {
        setComputerImage(scissors);
        setResult('Computer Wins');
        setComputerScore(computerScore + 1);
        return;
      } else if (computerChoice === 'paper') {
        setComputerImage(paper);
        setResult("It's a tie");
      } else {
        setComputerImage(rock);
        setResult('Player Wins');
        setPlayerScore(playerScore + 1);
        return;
      }
    }
    // check for scissors
    if (playerChoice === 'scissors') {
      setPlayerImage(scissors);
      if (computerChoice === 'rock') {
        setComputerImage(rock);
        setResult('Computer Wins');
        setComputerScore(computerScore + 1);
      } else if (computerChoice === 'scissors') {
        setComputerImage(scissors);
        setResult("It's a tie");
      } else {
        setComputerImage(paper);
        setResult('Player Wins');
        setPlayerScore(playerScore + 1);
        return;
      }
    }
  };

  return (
    <div>
      <section className='game'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <div className='score'>
                <div className='player-score'>
                  <h2>Player</h2>
                  <p>{playerScore}</p>
                </div>
                <div className='computer-score'>
                  <h2>Computer</h2>
                  <p>{computerScore}</p>
                </div>
              </div>
              <div className={fadeOut ? 'intro' : 'fadeOut intro'}>
                <h1>Rock Paper Scissors</h1>
                <button onClick={startGameHundler}>Let's Play</button>
              </div>
              <div
                className={fadeIn ? 'match fadeOut' : 'match fadeOut fadeIn'}
              >
                <h2 className='winner my-5'>{result}</h2>
                <div className='hands'>
                  <img
                    className='player-hand'
                    src={playerImage}
                    alt=''
                    style={shakeAnimation ? panimate : noAnimate}
                  />
                  <img
                    className='computer-hand'
                    src={computerImage}
                    style={shakeAnimation ? canimate : noAnimate}
                  />
                </div>
                <div className='options'>
                  <button
                    className='rock'
                    onClick={() => {
                      playerClickHandler('rock');
                    }}
                  >
                    rock
                  </button>
                  <button
                    className='rock'
                    onClick={() => {
                      playerClickHandler('paper');
                    }}
                  >
                    paper
                  </button>
                  <button
                    className='rock'
                    onClick={() => {
                      playerClickHandler('scissors');
                    }}
                  >
                    scissors
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Game;
