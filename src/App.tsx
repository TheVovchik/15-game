import React, { useState, useCallback } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Table } from './components/Table';
import { Notification } from './components/Notification';

export const App: React.FC = () => {
  const [isShown, setIsShown] = useState(false);

  const showInfo = useCallback((state: boolean) => setIsShown(state), []);

  return (
    <div className="App">
      <h1 className="App__title">15 GAMES</h1>
      <button
        className="button is-warning App__button"
        onClick={() => showInfo(true)}
      >
        click for info
      </button>
      {isShown && <Notification showInfo={showInfo}/>}

      <Table onInfo={showInfo} />
    </div>
  );
}

export default App;
