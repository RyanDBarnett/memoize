import React from 'react';
import Scoreboard from '../components/Scoreboard';
import { shallow } from "enzyme";

describe('Scoreboard', () => {
  it('should match snapshot', () => {
    let wrapper = shallow(
      <Scoreboard
        numCards={25}
        numCorrect={3}
        numIncorrect={3}
      />
    )
    expect(wrapper).toMatchSnapshot();
  }); 
});