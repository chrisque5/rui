import { actionTypes } from '../../utils/constants';
import reducer from '../brokerageStrategyReducer';

const testBrokerageStrategies = [
  'Brokerage Strategy 1',
  'Brokerage Strategy 2',
  'Brokerage Strategy 3',
];

describe('brokerageStrategyReducer =>', () => {
  test('LOAD_BROKERAGE_STRATEGIES_SUCCESS action returns brokerage strategies from action.', () => {
    const reducerOutput = reducer(testBrokerageStrategies, {
      type: actionTypes.LOAD_BROKERAGE_STRATEGIES_SUCCESS,
      brokerageStrategies: testBrokerageStrategies,
    });
    expect(reducerOutput).toEqual(testBrokerageStrategies);
  });

  test('LOAD_BROKERAGE_STRATEGIES_FAILED action returns current state.', () => {
    const reducerOutput = reducer(testBrokerageStrategies, { type: actionTypes.LOAD_BROKERAGE_STRATEGIES_FAILED, error: {} });
    expect(reducerOutput).toEqual(testBrokerageStrategies);
  });

  test('LOAD_BROKERAGE_STRATEGIES_CANCELLED action returns current state.', () => {
    const reducerOutput = reducer(testBrokerageStrategies, { type: actionTypes.LOAD_BROKERAGE_STRATEGIES_CANCELLED });
    expect(reducerOutput).toEqual(testBrokerageStrategies);
  });

  test('DEFAULT action sets correct initial state [] for brokerage strategies.', () => {
    const reducerOutput = reducer(undefined, { type: undefined, brokerageStrategies: undefined });
    expect(reducerOutput).toEqual([]);
  });
});
