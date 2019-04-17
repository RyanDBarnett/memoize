import React from 'react';
import '../styles/_Scoreboard.scss';

const Header = ({numCards,numCorrect,numIncorrect}) => {
  return (
    <section className="Scoreboard">
      <h2>Cards Left: {numCards}</h2>
      <h2 role="alert">Correct: {numCorrect}</h2>
      <h2 role="alert">Incorrect: {numIncorrect}</h2>
    </section>
  )
}

export default Header;