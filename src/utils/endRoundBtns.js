import React from 'react';

function endRoundBtns(resetAllQuestions, resetIncorrectQuestions) {
  return (
    <div className="btnContainer">
      <button aria-label="Reset all cards" className="resetAll" onClick={resetAllQuestions}>Reset All Questions</button>
      <button aria-label="Practice only incorrect cards" className="resetIncorrect" onClick={resetIncorrectQuestions}>Practice Incorrect Questions</button>
    </div>
  )
}

export default endRoundBtns;