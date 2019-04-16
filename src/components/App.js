import React, { Component } from 'react';
import '../styles/App.css';
import Card from './Card';
// import questions from '../data/questions.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestions: null,
      currentQuestion: {},
      correctQuestions: [],
      incorrectQuestions: []
    }
  }

  componentDidMount = () => {
    fetch('https://fe-apps.herokuapp.com/api/v1/memoize/1901/ryandbarnett/cards')
      .then(response => response.json())
      .then(data => {
        this.setState({
          currentQuestions: Object.assign([], data.cards).splice(1),
          currentQuestion: Object.assign({}, data.cards[0])
        })
      })
      .catch(error => {throw new Error(error)})
  }

  checkAnswer = (answer) => {
    if(this.state.currentQuestion.answer === answer) {
      this.setState({
        correctQuestions: this.state.correctQuestions.concat([this.state.currentQuestion])
      })
    } else {
      this.setState({
        incorrectQuestions: this.state.incorrectQuestions.concat([this.state.currentQuestion])
      })
    }
  }
  
  showNextQuestion = () => {
    this.setState({
      currentQuestion: this.state.currentQuestions.shift()
    }) 
  }

  resetAllQuestions = () => {
    let allQuestions = this.state.correctQuestions.concat(this.state.incorrectQuestions)
    this.setState({
      currentQuestions: allQuestions.splice(1),
      currentQuestion: allQuestions[0],
      correctQuestions: [],
      incorrectQuestions: []
    })
  }

  resetIncorrectQuestions = () => {
    this.setState({
      currentQuestions: this.state.incorrectQuestions.splice(1),
      currentQuestion: Object.assign({}, this.state.incorrectQuestions[0]),
      incorrectQuestions: []
    })
  }

  render() {
    let card = this.state.currentQuestions !== null &&
      <Card
        currentQuestion={this.state.currentQuestion}
        showNextQuestion={this.showNextQuestion}
        resetAllQuestions={this.resetAllQuestions}
        resetIncorrectQuestions={this.resetIncorrectQuestions}
        checkAnswer={this.checkAnswer}
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
