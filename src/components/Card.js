import React from 'react';
import '../styles/Card.css';
import generateChoices from '../utils/generateChoices';
import endRoundBtns from '../utils/endRoundBtns';

const Card = ({
  currentQuestion,
  showNextQuestion,
  resetAllQuestions,
  resetIncorrectQuestions,
  checkAnswer
  }) => {
  const choices = currentQuestion && currentQuestion.choices;
  const buttons = currentQuestion ? generateChoices(choices, showNextQuestion, checkAnswer) : endRoundBtns(resetAllQuestions, resetIncorrectQuestions);
  const display = currentQuestion ? <h4>{currentQuestion.question}</h4> : <h4>All Done! Do you want to go again?</h4>
  return (
    <div className="Card">
      {display}
      {buttons}
    </div>
  )
}

export default Card;