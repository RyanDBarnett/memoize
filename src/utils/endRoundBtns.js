import React from 'react';


function endRoundBtns(resetAllQuestions, resetIncorrectQuestions) {
  return (
    <div>
      <button onClick={resetAllQuestions}>Reset All Questions</button>
      <button onClick={resetIncorrectQuestions}>Practice Incorrect Questions</button>
    </div>
  )
}

export default endRoundBtns;