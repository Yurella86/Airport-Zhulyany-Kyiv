import React from 'react';
import './App.css';
import Scoreboard from './Component/Scoreboard/Scoreboard';
import { Provider } from 'react-redux';
import store from './Store/store';

function App() {
  return (
    <div className="container">

      <header><h1>Розклад аеропорт “Київ”</h1></header>

      <main>
        <Provider store={store}>
          <Scoreboard />
        </Provider>
      </main>

    </div>
  );
}

export default App;
