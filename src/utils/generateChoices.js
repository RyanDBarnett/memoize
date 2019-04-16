import React from 'react';

function generateChoices(choices, showNextQuestion, checkAnswer) {
  const handleClick = (e) => {
    let answer = e.target.innerHTML;
    checkAnswer(answer);
    showNextQuestion();
  }

  return choices.map((choice, index) => {
    return <button key={index} onClick={handleClick}>{choice}</button>
  });
}

export default generateChoices;