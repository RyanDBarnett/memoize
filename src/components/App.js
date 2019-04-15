import React, { Component } from 'react';
import '../styles/App.css';
import Card from './Card';
import questions from '../data/questions.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      originalQuestions: questions
    }
  }
  render() {
    console.log(this.state.originalQuestions)
    return (
      <div className="App">
        <header className="App-header">
          <h1>ARIA Flashcards</h1>
          <h2>Learn how to make the web more accessible!</h2>
        </header>
        <Card />
      </div>
    );
  }
}

export default App;
