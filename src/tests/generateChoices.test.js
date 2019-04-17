import generateChoices from '../utils/generateChoices';
import { shallow } from "enzyme";

describe('generateChoices', () => {
  let wrapper;

  const mockChoices = ['Yes','No'];
  const mockshowNextQuestion = jest.fn();
  const mockcheckAnswer = jest.fn();

  beforeEach( () => {
    wrapper = shallow(
      generateChoices(mockChoices, mockshowNextQuestion, mockcheckAnswer)
    )
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke check answer ', () => {
    let choiceBtn = wrapper.find('.choice-btn-1');
    choiceBtn.simulate('click', {target: {innerHTML: 'Test'}});
    expect(mockcheckAnswer).toHaveBeenCalled();
    expect(mockshowNextQuestion).toHaveBeenCalled();
  });
});