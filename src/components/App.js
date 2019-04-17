import React, { Component } from 'react';
import '../styles/_App.scss';
import Header from './Header';
import Scoreboard from './Scoreboard';
import Card from './Card';
import balloon from '../media/hot-air-balloon.png';

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

  componentDidUpdate = () => {
    this.setStateLocalStorage();
  }

  componentDidMount = () => {
    if(localStorage.length) {
      this.setState(this.getStateLocalStorage());
    } else {
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
    });
  }

  resetAllQuestions = () => {
    const allQuestions = this.state.correctQuestions.concat(this.state.incorrectQuestions)
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
      currentQuestion: this.state.incorrectQuestions[0],
      incorrectQuestions: []
    })
  }

  setStateLocalStorage = () => {
    localStorage.setItem('appState', JSON.stringify(this.state));
  }

  getStateLocalStorage = () => {
    return JSON.parse(localStorage.getItem('appState'));
  }

  addBalloons = () => {
    return (
      this.state.correctQuestions.map((correctQues, index) => {
        return <img className="hot-air-balloon" aria-hidden="true" key={index} src={balloon} style={{top: this.getRandomWindowHeight()}} alt="Orange and red striped hot air balloon"/>
      })
    )
  }

  getRandomWindowHeight = () => {
    let height = window.innerHeight;
    return Math.floor(Math.random() * height) + 1;
  }

  render() {
    let balloons = this.state.correctQuestions && this.addBalloons();
    let card = this.state.currentQuestions !== null &&
      <Card
        currentQuestion={this.state.currentQuestion}
        showNextQuestion={this.showNextQuestion}
        resetAllQuestions={this.resetAllQuestions}
        resetIncorrectQuestions={this.resetIncorrectQuestions}
        checkAnswer={this.checkAnswer}
      />;
    let scoreboard = this.state.currentQuestions !== null &&
      <Scoreboard 
        numCards={this.state.currentQuestions.length}
        numCorrect={this.state.correctQuestions.length}
        numIncorrect={this.state.incorrectQuestions.length}
      />

    return (
      <main className="App">
        {balloons}
        <Header />
        {scoreboard}
        {card}
      </main>
    );
  }
}

export default App;
