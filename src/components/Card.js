import React from 'react';
import '../styles/_Card.scss';
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
  const display = currentQuestion ? <h4>{currentQuestion.question}</h4> : <h4 aria-live="assertive">All Done! Do you want to go again?</h4>
  return (
    <section className="Card">
      {display}
      {buttons}
    </section>
  )
}

export default Card;