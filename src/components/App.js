import React, { Component } from 'react';
import '../styles/App.css';
import Card from './Card';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>ARIA Flashcards</h1>
          <h2>Learn how to make the web more accessible!</h2>
          <Card />
        </header>
      </div>
    );
  }
}

export default App;
