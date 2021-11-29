import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  loadBrokerageStrategies, loadBrokerageStrategiesSuccess, loadBrokerageStrategiesFailed,
} from '../brokerageStrategyActions';
import { actionTypes } from '../../utils/constants';
import brokerageStrategyApi from '../../api/brokerageStrategyApi';

const mockStore = configureMockStore([thunk]);

const dummyBrokerageStrategies = ['Brokerage Strategy 1', 'Brokerage Strategy 2', 'Brokerage Strategy 3'];

describe('Broker Strategies Actions', () => {
  test('loadBrokerageStrategiesSuccess should create a LOAD_BROKERAGE_STRATEGIES_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_BROKERAGE_STRATEGIES_SUCCESS, brokerageStrategies: dummyBrokerageStrategies };
    expect(loadBrokerageStrategiesSuccess(dummyBrokerageStrategies)).toEqual(expectedAction);
  });

  test('loadBrokerageStrategiesFailed should create a LOAD_BROKERAGE_STRATEGIES_FAILED action', () => {
    const expectedAction = { type: actionTypes.LOAD_BROKERAGE_STRATEGIES_FAILED, error: {} };
    expect(loadBrokerageStrategiesFailed({})).toEqual(expectedAction);
  });
});

describe('ACTION CREATOR', () => {
  test(`loadBrokerageStrategies should call LOAD_BROKERAGE_STRATEGIES_SUCCESS with the correct payload when the call to getBrokerageStrategyData is 
  successfully resolved and the deal types match`, async () => {
    brokerageStrategyApi.getBrokerageStrategyData = jest.fn().mockResolvedValue([...dummyBrokerageStrategies]);

    const store = mockStore({ ui: { selectedDealType: 'DUMMYDEALTYPE', selectedStrategyType: 'DUMMYSTRATEGYTYPE' } });
    await store.dispatch(loadBrokerageStrategies('DUMMYDEALTYPE', 'DUMMYSTRATEGYTYPE'));

    expect(brokerageStrategyApi.getBrokerageStrategyData).toBeCalledWith('DUMMYDEALTYPE', 'DUMMYSTRATEGYTYPE');
    expect(brokerageStrategyApi.getBrokerageStrategyData).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_BROKERAGE_STRATEGIES_SUCCESS, brokerageStrategies: dummyBrokerageStrategies });
  });

  test(`loadBrokerageStrategies should call LOAD_BROKERAGE_STRATEGIES_CANCELLED when the call to getClientData is resolved
  and the deal types do not match`, async () => {
    brokerageStrategyApi.getBrokerageStrategyData = jest.fn().mockResolvedValue([...dummyBrokerageStrategies]);
    const store = mockStore();
    await store.dispatch(loadBrokerageStrategies('DUMMYDEALTYPE', 'DUMMYSTRATEGYTYPE'));

    expect(brokerageStrategyApi.getBrokerageStrategyData).toBeCalledWith('DUMMYDEALTYPE', 'DUMMYSTRATEGYTYPE');
    expect(brokerageStrategyApi.getBrokerageStrategyData).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_BROKERAGE_STRATEGIES_CANCELLED });
  });

  test(`loadBrokerageStrategies should call LOAD_BROKERAGE_STRATEGIES_FAILED action when the call to 
  getBrokerageStrategyData is rejected`, async () => {
    brokerageStrategyApi.getBrokerageStrategyData = jest.fn().mockRejectedValue([]);

    const store = mockStore();
    await store.dispatch(loadBrokerageStrategies('DUMMYDEALTYPE', 'DUMMYSTRATEGYTYPE'));

    expect(brokerageStrategyApi.getBrokerageStrategyData).toBeCalledWith('DUMMYDEALTYPE', 'DUMMYSTRATEGYTYPE');
    expect(brokerageStrategyApi.getBrokerageStrategyData).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_BROKERAGE_STRATEGIES_FAILED, error: [] });
  });
});
