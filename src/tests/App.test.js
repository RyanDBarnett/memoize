import React from 'react';
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
    beforeEach( () => {
      wrapper.setState({
        currentQuestion: {answer: 'Roles'}
      });
    });

    it('should put the currentQuestion into correctQuestions if answer matches', () => {
      wrapper.instance().checkAnswer('Roles');
      expect(wrapper.state().correctQuestions.length).toEqual(1);
    });

    it('should put the currentQuestion into incorrectQuestions if answer matches', () => {
      wrapper.instance().checkAnswer('States');
      expect(wrapper.state().incorrectQuestions.length).toEqual(1);
    });
  });

  describe('showNextQuestion', () => {
    it('should set the first question in currentQuestions to the currentQuestion', () => {
      wrapper.setState({
        currentQuestions: [{question: 'Test Question 1'}],
        currentQuestion: {}
      });
      expect(wrapper.state().currentQuestions.length).toEqual(1);
      expect(wrapper.state().currentQuestion).toEqual({})
      wrapper.instance().showNextQuestion();
      expect(wrapper.state().currentQuestions.length).toEqual(0);
      expect(wrapper.state().currentQuestion).toEqual({question: 'Test Question 1'});
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

  describe('getStateLocalStorage', () => {
    it('should return a previously set app state from localStorage', () => {
      let mockState = {
        currentQuestions: [{question: 3}, {question: 4}],
        currentQuestion: {question: 2},
        correctQuestions: [{question: 4}],
        incorrectQuestions: []
      }
      localStorage.setItem('appState', JSON.stringify(mockState));
      let returnedAppState = wrapper.instance().getStateLocalStorage('appState');
      expect(returnedAppState).toEqual(mockState);
    });
  });
});
