import React from 'react';
import './App.css';
import Scoreboard from './Component/Scoreboard/Scoreboard';

function App() {
  return (
    <div className="container">
      <header><h1>Розклад аеропорт “Київ”</h1></header>

      <main>
        <Scoreboard />
      </main>

    </div>

  );
}

export default App;
