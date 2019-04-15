import React from 'react';

const Card = ({currentQuestion, showNextQuestion, resetAllQuestions, resetIncorrectQuestions}) => {
  function generateChoices() {
    return currentQuestion.choices.map((choice, index) => {
      return <button key={index} onClick={showNextQuestion}>{choice}</button>
    });
  }
  let answerOptions = currentQuestion ? 
    generateChoices() :
    <div>
      <button onClick={resetAllQuestions}>Reset All Questions</button>
      <button onClick={resetIncorrectQuestions}>Practice Incorrect Questions</button>
    </div>;
  let display = currentQuestion ? <h4>{currentQuestion.question}</h4> : <h4>All Done! Do you want to go again?</h4>
  return (
    <div className="card">
      <h3>Card</h3>
      {display}
      {answerOptions}
    </div>
  )
}

export default Card;