import React from 'react';
import Card from '../components/Card';
import { shallow } from "enzyme";

describe('Card', () => {
  let wrapper;

  const mockShowNextQuestion = jest.fn()
  const mockResetAllQuestions = jest.fn()
  const mockResetIncorrectQuestions = jest.fn()
  const mockCheckAnswer = jest.fn()

  const mockCurrentQuestion = {
    answer: "Roles",
    choices: ["Properties","States","Roles"],
    id: "1",
    question: "Which of the 3 ARIA main features defines what an element is or does?"
  }

  beforeEach( () => {
    wrapper = shallow(
      <Card 
        currentQuestion={mockCurrentQuestion}
        showNextQuestion={mockShowNextQuestion}
        resetAllQuestions={mockResetAllQuestions}
        resetIncorrectQuestions={mockResetIncorrectQuestions}
        checkAnswer={mockCheckAnswer}
      />
    )
  });
  
  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should display ending buttons and heading if there are no more cards", () => {
    wrapper = shallow(
      <Card 
        currentQuestion={null}
      />
    )
    expect(wrapper).toMatchSnapshot();
  });
});