import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  getRate, getRatesFailed, getRatesSuccess, getSpreadRate,
} from '../rateActions';
import { actionTypes } from '../../utils/constants';
import rateApi from '../../api/rateApi';

const mockStore = configureMockStore([thunk]);

describe('ACTIONS', () => {
  test('getRatesSuccess should create a LOAD_RATES_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_RATES_SUCCESS, rates: { id: 1 } };
    expect(getRatesSuccess({ id: 1 })).toEqual(expectedAction);
  });

  test('getRatesFailed should create a LOAD_RATES_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_RATES_FAILED, error: [] };
    expect(getRatesFailed([])).toEqual(expectedAction);
  });
});

describe('ACTION CREATORS', () => {
  describe('getRate', () => {
    const params = [1, 'A', 'B', 'C', 'DUMMYDEALTYPE', 'E'];

    test('should call LOAD_RATES_SUCCESS with the correct payload, when the call to getRate is sucessfully resolved',
      async () => {
        const expected = { rate: 'X', statusCode: 1, statusText: 'DUMMY' };
        rateApi.getRate = jest.fn().mockResolvedValue(expected);

        const store = mockStore({ ui: { selectedDealType: 'DUMMYDEALTYPE' } });
        await store.dispatch(getRate(...Object.values(params)));

        expect(rateApi.getRate).toBeCalledWith(...Object.values(params));
        expect(rateApi.getRate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        const [act1, act2] = actions;

        expect(act1).toEqual({ type: actionTypes.LOAD_RATES_IN_PROGRESS });
        expect(act2).toEqual({ type: actionTypes.LOAD_RATES_SUCCESS, rates: expected });
      });

    test('should call LOAD_RATES_CANCELLED with the correct payload, when the call to getRate is sucessfully resolved',
      async () => {
        const expected = { rate: 'X', statusCode: 1, statusText: 'DUMMY' };
        rateApi.getRate = jest.fn().mockResolvedValue(expected);

        const store = mockStore({ ui: { selectedDealType: 'DUMMYDEALTYPE1' } });
        await store.dispatch(getRate(...Object.values(params)));

        expect(rateApi.getRate).toBeCalledWith(...Object.values(params));
        expect(rateApi.getRate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        const [act1, act2] = actions;

        expect(act1).toEqual({ type: actionTypes.LOAD_RATES_IN_PROGRESS });
        expect(act2).toEqual({ type: actionTypes.LOAD_RATES_CANCELLED });
      });

    test('throws and error when no rate, statusCode and statusText in response', async () => {
      rateApi.getRate = jest.fn().mockResolvedValue({});

      const store = mockStore({ ui: { selectedDealType: 'DUMMYDEALTYPE' } });
      await store.dispatch(getRate(...Object.values(params)));

      expect(rateApi.getRate).toBeCalledWith(...Object.values(params));
      expect(rateApi.getRate).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      const [act1, act2] = actions;

      expect(act1).toEqual({ type: actionTypes.LOAD_RATES_IN_PROGRESS });
      expect(act2).toEqual({ type: actionTypes.LOAD_RATES_FAILED, error: {} });
    });

    test('should call LOAD_RATES_FAILED action when the call to getRate is rejected', async () => {
      rateApi.getRate = jest.fn().mockRejectedValue({});

      const store = mockStore();
      await store.dispatch(getRate(...Object.values(params)));

      expect(rateApi.getRate).toBeCalledWith(...Object.values(params));
      expect(rateApi.getRate).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      const [act1, act2] = actions;

      expect(act1).toEqual({ type: actionTypes.LOAD_RATES_IN_PROGRESS });
      expect(act2).toEqual({ type: actionTypes.LOAD_RATES_FAILED, error: {} });
    });
  });

  describe('getSpreadRate', () => {
    const params = [1, 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

    test('should call LOAD_RATES_SUCCESS with the correct payload, when the call to getSpreadRate is sucessfully resolved', async () => {
      const expected = {
        rate: 'X', rate2: 'Y', points: 'Z', statusCode: 1, statusText: 'DUMMY',
      };
      rateApi.getSpreadRate = jest.fn().mockResolvedValue(expected);

      const store = mockStore();
      await store.dispatch(getSpreadRate(...Object.values(params)));

      expect(rateApi.getSpreadRate).toBeCalledWith(...Object.values(params));
      expect(rateApi.getSpreadRate).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      const [act1, act2] = actions;

      expect(act1).toEqual({ type: actionTypes.LOAD_RATES_IN_PROGRESS });
      expect(act2).toEqual({ type: actionTypes.LOAD_RATES_SUCCESS, rates: expected });
    });

    test('throws and error when no rate, statusCode and statusText in response', async () => {
      rateApi.getSpreadRate = jest.fn().mockResolvedValue({});

      const store = mockStore();
      await store.dispatch(getSpreadRate(...Object.values(params)));

      expect(rateApi.getSpreadRate).toBeCalledWith(...Object.values(params));
      expect(rateApi.getSpreadRate).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      const [act1, act2] = actions;

      expect(act1).toEqual({ type: actionTypes.LOAD_RATES_IN_PROGRESS });
      expect(act2).toEqual({ type: actionTypes.LOAD_RATES_FAILED, error: {} });
    });

    test('should call LOAD_RATES_FAILED action when the call to getSpreadRate is rejected', async () => {
      rateApi.getSpreadRate = jest.fn().mockRejectedValue({});

      const store = mockStore();
      await store.dispatch(getSpreadRate(...Object.values(params)));

      expect(rateApi.getSpreadRate).toBeCalledWith(...Object.values(params));
      expect(rateApi.getSpreadRate).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      const [act1, act2] = actions;

      expect(act1).toEqual({ type: actionTypes.LOAD_RATES_IN_PROGRESS });
      expect(act2).toEqual({ type: actionTypes.LOAD_RATES_FAILED, error: {} });
    });
  });
});
