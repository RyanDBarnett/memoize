import endRoundBtns from '../utils/endRoundBtns';
import { shallow } from "enzyme";

describe('endRoundBtns', () => {
  let wrapper;

  const mockResetAllQuestions = jest.fn();
  const mockResetIncorrectQuestions = jest.fn();

  beforeEach( () => {
    wrapper = shallow(
      endRoundBtns(mockResetAllQuestions, mockResetIncorrectQuestions)
    )
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke the reset all questions function when reset button is clicked', () => {
    let resetBtn = wrapper.find('.resetAll');
    resetBtn.simulate('click');
    expect(mockResetAllQuestions).toHaveBeenCalled()
  });

  it('should invoke the reset incorrect questions function when reset incorrect button is clicked', () => {
    let resetIncorrectBtn = wrapper.find('.resetIncorrect');
    resetIncorrectBtn.simulate('click');
    expect(mockResetIncorrectQuestions).toHaveBeenCalled()
  });
});