import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { shallow } from "enzyme";

describe('App', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App />
    );
  });

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('checkAnswer', () => {
    it('should put the currentQuestion into correctQuestions if answer matches', () => {
      let wrapper2 = shallow(<App />);
      wrapper2.setState({
        currentQuestions: [],
        currentQuestion: {
          answer: "Roles",
          choices: ["Properties","States","Roles"],
          id: "1",
          question: "Which of the 3 ARIA main features defines what an element is or does?"
        },
        correctQuestions: [],
        incorrectQuestions: []
      });
      wrapper2.instance().checkAnswer('Roles');
      expect(wrapper2.state().correctQuestions.length).toEqual(1);
    });

    it('should put the currentQuestion into incorrectQuestions if answer matches', () => {
      let wrapper2 = shallow(<App />);
      wrapper2.setState({
        currentQuestions: [],
        currentQuestion: {
          answer: "Roles",
          choices: ["Properties","States","Roles"],
          id: "1",
          question: "Which of the 3 ARIA main features defines what an element is or does?"
        },
        correctQuestions: [],
        incorrectQuestions: []
      });
      wrapper2.instance().checkAnswer('States');
      expect(wrapper2.state().incorrectQuestions.length).toEqual(1);
    });
  });

  describe('showNextQuestion', () => {
    it('should set the first question in currentQuestions to the currentQuestion', () => {
      let wrapper3 = shallow(<App />);
      wrapper3.setState({
        currentQuestions: [
          {
            answer: "Roles",
            choices: ["Properties","States","Roles"],
            id: "1",
            question: "Which of the 3 ARIA main features defines what an element is or does?"
          }
        ],
        currentQuestion: null,
      });
      expect(wrapper3.state().currentQuestions.length).toEqual(1);
      expect(wrapper3.state().currentQuestion).toEqual(null)
      wrapper3.instance().showNextQuestion();
      expect(wrapper3.state().currentQuestions.length).toEqual(0);
      expect(wrapper3.state().currentQuestion).toEqual({
        answer: "Roles",
        choices: ["Properties","States","Roles"],
        id: "1",
        question: "Which of the 3 ARIA main features defines what an element is or does?"
      });
    });
  });

  describe('resetAllQuestions', () => {
    beforeEach( () => {
      wrapper.setState({
        currentQuestions: [],
        correctQuestions: [
          {question: "Test Question 1"},
          {question: "Test Question 2"}
        ],
        incorrectQuestions: [
          {question: "Test Question 3"},
          {question: "Test Question 4"}
        ]
      });
    });

    it('should combine both correct and incorrect questions and assign them to currentQuestions except for the first value', () => {
      let combinedQuestions = wrapper.state().correctQuestions.concat(wrapper.state().incorrectQuestions).slice(1);
      wrapper.instance().resetAllQuestions();
      expect(wrapper.state().currentQuestions).toEqual(combinedQuestions);
    });

    it('should assign the first value of the combined questions to currentQuestion', () => {
      let firstValue = wrapper.state().correctQuestions.concat(wrapper.state().incorrectQuestions)[0];
      wrapper.instance().resetAllQuestions();
      expect(wrapper.state().currentQuestion).toEqual(firstValue);
    });

    it('should set the correct and incorrect questions to empty arrays', () => {
      wrapper.instance().resetAllQuestions();
      expect(wrapper.state().correctQuestions).toEqual([]);
      expect(wrapper.state().incorrectQuestions).toEqual([]);
    });
  });

  describe('resetIncorrectQuestions', () => {
    beforeEach( () => {
      wrapper.setState({
        incorrectQuestions: [
          {question: "Test Question 1"},
          {question: "Test Question 2"},
          {question: "Test Question 3"},
          {question: "Test Question 4"}
        ]
      });
    });

    it('should set the currentQuestions to the all of the incorrect questions minus the first incorrect question', () => {
      let expectedQuestions = Object.assign([], wrapper.state().incorrectQuestions).splice(1);
      wrapper.instance().resetIncorrectQuestions();
      expect(wrapper.state().currentQuestions).toEqual(expectedQuestions);
    });
    
    it('should set the currentQuestion to the first incorrect question', () => {
      let firstIncorrectQuestion = wrapper.state().incorrectQuestions[0];
      wrapper.instance().resetIncorrectQuestions();
      expect(wrapper.state().currentQuestion).toEqual(firstIncorrectQuestion);
    });

    it('should set the incorrect questions array to an empty array', () => {
      wrapper.instance().resetIncorrectQuestions();
      expect(wrapper.state().incorrectQuestions).toEqual([]);
    });
  });
});
