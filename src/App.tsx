import React, { useState } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Table } from './components/Table';

export const App: React.FC = () => {
  const [isShown, setIsShown] = useState(false);

  const showInfo = (state: boolean) => {
    setIsShown(state)
  }

  return (
    <div className="App">
      <h1 className="App__title">15 GAMES</h1>
      <button
        className="button is-warning App__button"
        onClick={() => showInfo(true)}
      >
        click for info
      </button>
      {isShown && <p className="notification is-active">
        <button
          className="delete"
          onClick={() => showInfo(false)}
        ></button>
        The 15 puzzle is a sliding puzzle having 15 square tiles numbered 1–15 in a frame that 
        is 4 tiles high and 4 tiles wide, leaving one unoccupied tile position. 
        Tiles in the same row or column of the open position can be moved by sliding them horizontally 
        or vertically, respectively. The goal of the puzzle is to place the tiles in numerical order.
        <br /><br />
        Tap shuffle and let the game begin!
      </p>}

      <Table onInfo={showInfo} />
    </div>
  );
}

export default App;
