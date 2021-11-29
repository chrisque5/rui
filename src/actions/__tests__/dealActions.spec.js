import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  createDeal, createDealFailed, createDealSuccess,
  loadBlotterDeals, loadBlotterDealsInProgress, loadBlotterDealsFailed, loadBlotterDealsSuccess,
  removeBlotterNewDealIds,
  enableInvestigationChkFlag, enableInvestigationChkFlagSuccess, enableInvestigationChkFlagFailed,
  updateOriginalDeal,
} from '../dealActions';
import { actionTypes } from '../../utils/constants';
import dealApi from '../../api/dealApi';

const mockStore = configureMockStore([thunk]);
const dummyDeal = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }];

const setup = (date) => {
  const dateToUse = new Date(date);
  global.Date = jest.fn(() => dateToUse);
};

describe('ACTION', () => {
  test('createDealSuccess should create a CREATE_DEAL_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.CREATE_DEAL_SUCCESS, deal: [...dummyDeal] };
    expect(createDealSuccess(dummyDeal)).toEqual(expectedAction);
  });

  test('createDealFailed should create a CREATE_DEAL_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.CREATE_DEAL_FAILED, error: [] };
    expect(createDealFailed([])).toEqual(expectedAction);
  });

  test('loadBlotterDealsSuccess should create a LOAD_BLOTTER_DEALS_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_BLOTTER_DEALS_SUCCESS, payload: [...dummyDeal] };
    expect(loadBlotterDealsSuccess(dummyDeal)).toEqual(expectedAction);
  });

  test('loadBlotterDealsFailed should create a LOAD_BLOTTER_DEALS_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_BLOTTER_DEALS_FAILED, payload: [] };
    expect(loadBlotterDealsFailed([])).toEqual(expectedAction);
  });

  test('loadBlotterDealsInProgress should create a LOAD_BLOTTER_DEALS_IN_PROGRESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_BLOTTER_DEALS_IN_PROGRESS };
    expect(loadBlotterDealsInProgress()).toEqual(expectedAction);
  });

  test('removeBlotterNewDealIds should create a REMOVE_BLOTTER_NEW_DEAL_IDS action with correct payload', () => {
    let expectedAction = { type: actionTypes.REMOVE_BLOTTER_NEW_DEAL_IDS, payload: { dealIds: [123, 456] } };
    expect(removeBlotterNewDealIds([123, 456])).toEqual(expectedAction);

    expectedAction = { type: actionTypes.REMOVE_BLOTTER_NEW_DEAL_IDS, payload: { dealIds: [] } };
    expect(removeBlotterNewDealIds()).toEqual(expectedAction);
  });

  test('updateOriginalDeal should create a UPDATE_ORIGINAL_DEAL action with correct payload', () => {
    const expectedAction = { type: actionTypes.UPDATE_ORIGINAL_DEAL, payload: { originalDeal: dummyDeal } };
    expect(updateOriginalDeal(dummyDeal)).toEqual(expectedAction);
  });
});

describe('ACTION CREATOR', () => {
  describe('createDeal should call ', () => {
    test('CREATE_DEAL_SUCCESS with the correct payload, when the call to createDeal is successfully resolved', async () => {
      dealApi.createDeal = jest.fn().mockResolvedValue([...dummyDeal]);

      const store = mockStore();
      await store.dispatch(createDeal({ formVal1: 'x', formVal2: false }));

      expect(dealApi.createDeal).toBeCalledWith({ formVal1: 'x', formVal2: false });
      expect(dealApi.createDeal).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CREATE_DEAL_SUCCESS, deal: [...dummyDeal] });
    });

    test('CREATE_DEAL_FAILED action when the call to createDeal is rejected', async () => {
      dealApi.createDeal = jest.fn().mockRejectedValue([]);

      const store = mockStore();
      await store.dispatch(createDeal({ formVal1: 'x', formVal2: false }));

      expect(dealApi.createDeal).toBeCalledWith({ formVal1: 'x', formVal2: false });
      expect(dealApi.createDeal).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CREATE_DEAL_FAILED, error: [] });
    });
  });

  describe('loadBlotterDeals should call', () => {
    setup('16 October 2019 15:49:11 UTC');

    test(`LOAD_BLOTTER_DEALS_SUCCESS with the correct payload, when the call to getBlotterDeals is successfully resolved and subscribeToUpdates
    is false`, async () => {
      dealApi.getBlotterDeals = jest.fn().mockResolvedValue([...dummyDeal]);

      const searchParams = {
        subscribeToUpdates: false,
      };

      const store = mockStore({ ui: { currentPage: 'BLOTTER' } });
      await store.dispatch(loadBlotterDeals(searchParams));

      expect(dealApi.getBlotterDeals).toBeCalledWith(searchParams);
      expect(dealApi.getBlotterDeals).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      const [act1, act2] = actions;

      expect(act1).toEqual({ type: actionTypes.LOAD_BLOTTER_DEALS_IN_PROGRESS });
      expect(act2).toEqual({
        type: actionTypes.LOAD_BLOTTER_DEALS_SUCCESS,
        payload: { data: [...dummyDeal], lastUpdated: '2019-10-16T15:49:11.000Z', searchParams },
      });
    });

    test(`LOAD_BLOTTER_DEALS_SUCCESS with the correct payload, when the call to getBlotterDeals is successfully resolved and subscribeToUpdates
    is true`, async () => {
      dealApi.getBlotterDeals = jest.fn().mockResolvedValue([...dummyDeal]);

      const searchParams = {
        sessionId: 'abc123',
        subscribeToUpdates: true,
      };

      const store = mockStore({ ui: { currentPage: 'BLOTTER' }, sse: { sessionId: 'abc123' } });
      await store.dispatch(loadBlotterDeals(searchParams));

      expect(dealApi.getBlotterDeals).toBeCalledWith(searchParams);
      expect(dealApi.getBlotterDeals).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      const [act1, act2] = actions;

      expect(act1).toEqual({ type: actionTypes.LOAD_BLOTTER_DEALS_IN_PROGRESS });
      expect(act2).toEqual({
        type: actionTypes.LOAD_BLOTTER_DEALS_SUCCESS,
        payload: { data: [...dummyDeal], lastUpdated: '2019-10-16T15:49:11.000Z', searchParams },
      });
    });

    test('LOAD_BLOTTER_DEALS_CANCELLED when the call to getBlotterDeals is successfully resolved and the sessionId has changed', async () => {
      dealApi.getBlotterDeals = jest.fn().mockResolvedValue([...dummyDeal]);

      const searchParams = {
        sessionId: 'abc123',
        subscribeToUpdates: true,
      };

      const store = mockStore({ ui: { currentPage: 'BLOTTER' }, sse: { sessionId: 'efg456' } });
      await store.dispatch(loadBlotterDeals(searchParams));

      expect(dealApi.getBlotterDeals).toBeCalledWith(searchParams);
      expect(dealApi.getBlotterDeals).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      const [act1, act2] = actions;

      expect(act1).toEqual({ type: actionTypes.LOAD_BLOTTER_DEALS_IN_PROGRESS });
      expect(act2).toEqual({ type: actionTypes.LOAD_BLOTTER_DEALS_CANCELLED });
    });

    test('LOAD_BLOTTER_DEALS_CANCELLED when the call to getBlotterDeals is successfully resolved and the page has changed', async () => {
      dealApi.getBlotterDeals = jest.fn().mockResolvedValue([...dummyDeal]);

      const searchParams = {
        sessionId: 'abc123',
        subscribeToUpdates: true,
      };

      const store = mockStore({ ui: { currentPage: 'NDF' } });
      await store.dispatch(loadBlotterDeals(searchParams));

      expect(dealApi.getBlotterDeals).toBeCalledWith(searchParams);
      expect(dealApi.getBlotterDeals).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      const [act1, act2] = actions;

      expect(act1).toEqual({ type: actionTypes.LOAD_BLOTTER_DEALS_IN_PROGRESS });
      expect(act2).toEqual({ type: actionTypes.LOAD_BLOTTER_DEALS_CANCELLED });
    });

    test('LOAD_BLOTTER_DEALS_FAILED action when the call to loadBlotterDeals is rejected', async () => {
      dealApi.getBlotterDeals = jest.fn().mockRejectedValue([]);
      const searchParams = {};
      const store = mockStore();
      await store.dispatch(loadBlotterDeals(searchParams));

      expect(dealApi.getBlotterDeals).toBeCalledWith(searchParams);
      expect(dealApi.getBlotterDeals).toHaveBeenCalledTimes(1);

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      const [act1, act2] = actions;

      expect(act1).toEqual({ type: actionTypes.LOAD_BLOTTER_DEALS_IN_PROGRESS });
      expect(act2).toEqual({ type: actionTypes.LOAD_BLOTTER_DEALS_FAILED, payload: [] });
    });
  });

  describe('enableInvestigationChkFlag should call', () => {
    test('enableInvestigationChkFlagSuccess should create a ENABLE_INVESTIGATION_FLAG_SUCCESS action', () => {
      const expectedAction = { type: actionTypes.ENABLE_INVESTIGATION_FLAG_SUCCESS };
      expect(enableInvestigationChkFlagSuccess()).toEqual(expectedAction);
    });

    test('enableInvestigationChkFlagFailed should create a ENABLE_INVESTIGATION_FLAG_FAILURE action', () => {
      const payload = { error: 'error' };
      const expectedAction = { type: actionTypes.ENABLE_INVESTIGATION_FLAG_FAILURE, payload };
      expect(enableInvestigationChkFlagFailed(payload)).toEqual(expectedAction);
    });

    test('enableInvestigationChkFlag with the correct payload when success', async () => {
      dealApi.enableInvestigationChkFlag = jest.fn().mockResolvedValue({
        isDealUnderInvestigation: true,
        investigatingTime: 1616141484495,
        investigatingUserFullName: 'STEPHEN TAYLOR',
        dealId: 6000,
      });

      const dummyObj = { dmsDealId: 6000, isDealUnderInvestigation: true };

      const store = mockStore();
      await store.dispatch(enableInvestigationChkFlag(dummyObj));

      expect(dealApi.enableInvestigationChkFlag).toBeCalledWith(dummyObj);

      const action = store.getActions()[0];
      expect(action).toEqual({ type: actionTypes.ENABLE_INVESTIGATION_FLAG_SUCCESS });
    });

    test('enableInvestigationChkFlag with the correct payload when failed', async () => {
      dealApi.enableInvestigationChkFlag = jest.fn().mockRejectedValue({ error: 'error' });

      const dummyObj = { dmsDealId: 6000, isDealUnderInvestigation: true };

      const store = mockStore();
      await store.dispatch(enableInvestigationChkFlag(dummyObj));

      expect(dealApi.enableInvestigationChkFlag).toBeCalledWith(dummyObj);

      const action = store.getActions()[0];
      expect(action).toEqual({ type: actionTypes.ENABLE_INVESTIGATION_FLAG_FAILURE, payload: { error: 'error' } });
    });
  });
});
