import React from 'react';

function generateChoices(choices, showNextQuestion, checkAnswer) {
  const handleClick = (e) => {
    let answer = e.target.innerHTML;
    checkAnswer(answer);
    showNextQuestion();
  }
  return (
    <div className="btnContainer">
      {
        choices.map((choice, index) => {
          return <button aria-label={"Answer option: " + choice} className={'choice-btn-' + (index + 1)} key={index} onClick={handleClick}>{choice}</button>
        })
      }
    </div>
  )
}

export default generateChoices;