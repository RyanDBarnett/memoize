import React from 'react';

function endRoundBtns(resetAllQuestions, resetIncorrectQuestions) {
  return (
    <div className="btnContainer">
      <button className="resetAll" onClick={resetAllQuestions}>Reset All Questions</button>
      <button className="resetIncorrect" onClick={resetIncorrectQuestions}>Practice Incorrect Questions</button>
    </div>
  )
}

export default endRoundBtns;