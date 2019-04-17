import React from 'react';
import '../styles/_Scoreboard.scss';

const Header = ({numCards,numCorrect,numIncorrect}) => {
  return (
    <section className="Scoreboard">
      <h2>Cards Left: {numCards}</h2>
      <h2>Correct: {numCorrect}</h2>
      <h2>Incorrect: {numIncorrect}</h2>
    </section>
  )
}

export default Header;