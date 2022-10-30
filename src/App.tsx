import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Table } from './components/Table';


export const App: React.FC = () => {
  

  return (
    <div className="App">
      <h1 className='tag is-success is-large App__title'>15 GAMES</h1>

      <Table />
    </div>
  );
}

export default App;
