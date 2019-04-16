import React from 'react';


function endRoundBtns(resetAllQuestions, resetIncorrectQuestions) {
  return (
    <div className="btnContainer">
      <button onClick={resetAllQuestions}>Reset All Questions</button>
      <button onClick={resetIncorrectQuestions}>Practice Incorrect Questions</button>
    </div>
  )
}

export default endRoundBtns;