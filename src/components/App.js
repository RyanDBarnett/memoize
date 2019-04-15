import React, { Component } from 'react';
import '../styles/App.css';
import Card from './Card';
import questions from '../data/questions.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestions: Object.assign([], questions),
      currentQuestion: null,
      correctQuestions: [],
      incorrectQuestions: []
    }
  }

  componentDidMount = () => {
    this.showNextQuestion();
  }

  showNextQuestion = () => {
    this.setState({
      currentQuestion: this.state.currentQuestions.shift()
    })
  }

  resetAllQuestions = () => {
    this.setState({
      currentQuestions: Object.assign([], questions).splice(1),
      currentQuestion: Object.assign({}, questions[0])
    })
  }

  resetIncorrectQuestions = () => {
    this.setState({
      currentQuestions: this.state.incorrectQuestions,
      incorrectQuestions: []
    })
  }

  render() {
    let card = this.state.currentQuestion &&
      <Card
        currentQuestion={this.state.currentQuestion}
        showNextQuestion={this.showNextQuestion}
        resetAllQuestions={this.resetAllQuestions}
        resetIncorrectQuestions={this.resetIncorrectQuestions}
      />;
    return (
      <div className="App">
        <header className="App-header">
          <h1>ARIA Flashcards</h1>
          <h2>Learn how to make the web more accessible!</h2>
        </header>
        {card}
      </div>
    );
  }
}

export default App;
