import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { Form } from 'antd';
import Interest from '../Interest';

let container;

container = document.createElement('div');
document.body.appendChild(container);

afterAll(() => {
  document.body.removeChild(container);
  container = null;
});

describe('<Interest/>', () => {
  const defaultProps = {
    form: {
      getFieldsError: jest.fn(() => ({})),
    },
    label: 'Interest',
    id: 'interest',
    testId: 'testInterest',
    enableInterest: false,
    onEnableInterest: jest.fn(() => ({})),
    interestOnChange: jest.fn(() => ({})),
    handleKeyDown: jest.fn(() => ({})),
  };

  act(() => {
    ReactDOM.render(<Form><Interest {...defaultProps} /></Form>, container);
  });

  const checkbox = container.querySelector('input.ant-checkbox-input');
  const txtInterest = container.querySelector('input.ant-input-number-input');

  test('renders ok', () => {
    expect(checkbox.checked).toBe(false);
    expect(txtInterest.disabled).toBe(true);
  });

  test('enables Interest', () => {
    act(() => {
      defaultProps.enableInterest = true;
      ReactDOM.render(<Form><Interest {...defaultProps} /></Form>, container);
    });
    expect(checkbox.checked).toBe(true);
    expect(txtInterest.disabled).toBe(false);
  });

  test('tests interestOnChange', () => {
    txtInterest.value = 0.2;
    Simulate.blur(txtInterest);
    expect(defaultProps.interestOnChange).toHaveBeenCalledTimes(1);
  });

  test('tests invalid interest rate', () => {
    txtInterest.value = 'abc';
    Simulate.blur(txtInterest);
    expect(txtInterest.value).toBe('');
  });

  test('tests handleKeyDown', () => {
    txtInterest.value = 0.2;
    Simulate.keyDown(txtInterest);
    expect(defaultProps.handleKeyDown).toHaveBeenCalledTimes(1);
  });
});
