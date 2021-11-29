import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { act, Simulate } from 'react-dom/test-utils';
import { Form } from 'antd';
import InterestContainer from '../InterestContainer';

let container;

container = document.createElement('div');
document.body.appendChild(container);

afterAll(() => {
  document.body.removeChild(container);
  container = null;
});

describe('<InterestContainer/>', () => {
  const store = configureMockStore()({
    ui: {
      isInterestEnabled: true,
    },
  });

  const defaultProps = {
    form: {
      getFieldsError: jest.fn(() => ({})),
    },
    uiActions: {
      enableInterest: jest.fn(() => ({})),
    },
    label: 'Interest',
    id: 'interest',
    testId: 'testInterest',
    calulateInterest: jest.fn(() => ({})),
    calulateInterestRate: jest.fn(() => ({})),
  };

  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <Form><InterestContainer {...defaultProps} /></Form>
      </Provider>, container,
    );
  });

  const checkbox = container.querySelector('input.ant-checkbox-input');
  const txtInterest = container.querySelector('input.ant-input-number-input');

  it('renders ok', () => {
    expect(checkbox.checked).toBe(true);
    expect(txtInterest.disabled).toBe(false);
  });

  it('calculate Interest', () => {
    Simulate.blur(txtInterest);
    expect(defaultProps.calulateInterest).toHaveBeenCalledTimes(1);
  });
});
