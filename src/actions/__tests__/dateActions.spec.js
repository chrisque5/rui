import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  getDatesFailed, getDatesSuccess, resetDates, resetDatesAction, getFwdDatesByTerm, getFwdTermsByValueDate,
  getFwdOutrightDatesByTerm, getFwdOutrightTermByValueDate, getNdfOutrightDatesByValueDate, getNdfOutrightDatesByTerm,
  getNdfSpreadDatesByTerm, getNdfSpreadDatesByValueDate, getSptValueDate, getSptDayCounts,
} from '../dateActions';
import { actionTypes } from '../../utils/constants';
import dateApi from '../../api/dateApi';
import * as selectors from '../../utils/selectors';

const mockStore = configureMockStore([thunk]);
const dummy = { fixingDate: '2030-01-01', valueDate: '2040-01-01' };

const ndfOutrightDatesState = {
  displayTenor: '31D',
  dayCountFromTrade: 32,
  spotDate: '2021-01-22',
  dayCountFromSpot: 31,
  publishDate: '2021-02-19',
  fixingDate: '2021-02-19',
  forwardStart: false,
  valueDate: '2021-02-22',
};

const ndfOutrightTermsState = {
  displayTenor: '7D',
  dayCountFromTrade: 8,
  spotDate: '2021-01-22',
  dayCountFromSpot: 7,
  publishDate: '2021-01-28',
  fixingDate: '2021-01-28',
  forwardStart: false,
  valueDate: '2021-02-01',
};

const ndfSpreadTermsState = {
  valueDate: {
    near: '2021-04-06',
    far: '2021-08-03',
  },
  spotDate: '2021-02-03',
  fixingDate: {
    near: '2021-04-01',
    far: '2021-07-30',
  },
  publishDate: {
    near: '2021-04-01',
    far: '2021-07-30',
  },
  dayCount: {
    near: 62,
    far: 181,
  },
  forwardStart: {
    near: false,
    far: false,
  },
};

const ndfSpreadDatesState = {
  valueDate: {
    near: '2021-04-06',
    far: '2021-08-03',
  },
  spotDate: '2021-02-03',
  fixingDate: {
    near: '2021-04-01',
    far: '2021-07-30',
  },
  publishDate: {
    near: '2021-04-01',
    far: '2021-07-30',
  },
  dayCount: {
    near: 62,
    far: 181,
  },
  forwardStart: {
    near: false,
    far: false,
  },
  term: {
    near: '62D',
    far: '181D',
  },
};

const fwdDatesState = {
  dayCount: { near: 1, far: 2 },
  tradeDuration: { near: 1, far: 2 },
  valueDate: { near: '2030-01-01', far: '2030-01-02' },
  spotDate: '2020-01-01',
  isTodayValidDate: true,
};

const fwdTermsState = {
  dayCount: { near: 1, far: 2 },
  tradeDuration: { near: 1, far: 2 },
  term: { near: '1D', far: '2D' },
  spotDate: '2020-01-01',
};

const fwdOutrightDatesState = {
  valueDate: '2030-01-01',
  dayCount: 1,
  spotDate: '2020-01-01',
  isTodayValidDate: true,
};

const fwdOutrightTermsState = {
  term: '1D',
  dayCount: 1,
  spotDate: '2020-01-01',
};

const sptDateState = {
  dayCountFromTrade: 2,
  dayCountFromSpot: 1,
  valueDate: '2021-01-27',
  spotDate: '2021-01-26',
  displayTenor: '1D',
};

const sptTenorState = {
  dayCountFromTrade: 1,
  dayCountFromSpot: 0,
  valueDate: '2021-01-26',
  spotDate: '2021-01-26',
  displayTenor: '0D',
};

describe('ACTION', () => {
  test('getDatesSuccess should create a LOAD_DATES_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_DATES_SUCCESS, dates: dummy };
    expect(getDatesSuccess(dummy)).toEqual(expectedAction);
  });

  test('getDatesFailed should create a LOAD_DATES_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_DATES_FAILED, error: {} };
    expect(getDatesFailed({})).toEqual(expectedAction);
  });

  test('resetDatesAction should create a RESET_DATES action', () => {
    const expectedAction = { type: actionTypes.RESET_DATES };
    expect(resetDatesAction({})).toEqual(expectedAction);
  });
});

describe('ACTION CREATOR', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getNdfOutrightDatesByTerm()', () => {
    test(
      `getNdfOutrightDatesByTerm should dispatch LOAD_DATES_SUCCESS with the correct payload, when no dates in state and the call to
      getNdfOutrightDatesByTerm is successfully resolved and the deal/strategy types match`,
      async () => {
        dateApi.getNdfOutrightDatesByTerm = jest.fn().mockResolvedValue(ndfOutrightTermsState);

        const store = mockStore({ dates: {}, ui: { selectedDealType: 'NDF', selectedStrategyType: 'Outright' } });
        await store.dispatch(getNdfOutrightDatesByTerm('A', 'B', 'C'));

        expect(dateApi.getNdfOutrightDatesByTerm).toBeCalledWith('A', 'B', 'C');
        expect(dateApi.getNdfOutrightDatesByTerm).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);

        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: ndfOutrightTermsState });
      },
    );

    test(
      `getNdfOutrightDatesByTerm should call LOAD_DATES_SUCCESS with the correct payload, when dates in state and the call to
      getNdfOutrightDatesByTerm is successfully resolved and the deal/strategy types match`,
      async () => {
        dateApi.getNdfOutrightDatesByTerm = jest.fn().mockResolvedValue(ndfOutrightTermsState);

        const store = mockStore({ dates: dummy, ui: { selectedDealType: 'NDF', selectedStrategyType: 'Outright' } });
        await store.dispatch(getNdfOutrightDatesByTerm('A', 'B', 'C'));

        expect(dateApi.getNdfOutrightDatesByTerm).toBeCalledWith('A', 'B', 'C');
        expect(dateApi.getNdfOutrightDatesByTerm).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);

        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: ndfOutrightTermsState });
      },
    );

    test('getNdfOutrightDatesByTerm should dispatch LOAD_DATES_FAILED when the call to getNdfOutrightDatesByTerm is rejected', async () => {
      dateApi.getNdfOutrightDatesByTerm = jest.fn().mockRejectedValue({});

      const store = mockStore({ dates: dummy });
      await store.dispatch(getNdfOutrightDatesByTerm('A', 'B', 'C'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_FAILED, error: {} });
    });

    test(`getNdfOutrightDatesByTerm should dispatch LOAD_DATES_CANCELLED when the call to getNdfOutrightDatesByTerm is successfully resolved
      and the deal types do not match`, async () => {
      dateApi.getNdfOutrightDatesByTerm = jest.fn().mockResolvedValue(ndfOutrightTermsState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'FWD' } });
      await store.dispatch(getNdfOutrightDatesByTerm('A', 'B', 'C'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });

    test(`getNdfOutrightDatesByTerm should dispatch LOAD_DATES_CANCELLED when the call to getNdfOutrightDatesByTerm is successfully resolved
      and the strategy types do not match`, async () => {
      dateApi.getNdfOutrightDatesByTerm = jest.fn().mockResolvedValue(ndfOutrightTermsState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'NDF', selectedStrategyType: 'Spread' } });
      await store.dispatch(getNdfOutrightDatesByTerm('A', 'B', 'C'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });
  });

  describe('getNdfOutrightDatesByValueDate()', () => {
    test(
      `getNdfOutrightDatesByValueDate should dispatch LOAD_DATES_SUCCESS with the correct payload, when no dates in state and the call to
      getNdfOutrightDatesByValueDate is successfully resolved and the deal/strategy types match`,
      async () => {
        dateApi.getNdfOutrightDatesByValueDate = jest.fn().mockResolvedValue(ndfOutrightDatesState);

        const store = mockStore({ dates: {}, ui: { selectedDealType: 'NDF', selectedStrategyType: 'Outright' } });
        await store.dispatch(getNdfOutrightDatesByValueDate('A', 'B', 'C'));

        expect(dateApi.getNdfOutrightDatesByValueDate).toBeCalledWith('A', 'B', 'C');
        expect(dateApi.getNdfOutrightDatesByValueDate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);

        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: ndfOutrightDatesState });
      },
    );

    test(
      `getNdfOutrightDatesByValueDate should call LOAD_DATES_SUCCESS with the correct payload, when dates in state and the call to
      getNdfOutrightDatesByValueDate is successfully resolved and the deal/strategy types match`,
      async () => {
        dateApi.getNdfOutrightDatesByValueDate = jest.fn().mockResolvedValue(ndfOutrightDatesState);

        const store = mockStore({ dates: dummy, ui: { selectedDealType: 'NDF', selectedStrategyType: 'Outright' } });
        await store.dispatch(getNdfOutrightDatesByValueDate('A', 'B', 'C'));

        expect(dateApi.getNdfOutrightDatesByValueDate).toBeCalledWith('A', 'B', 'C');
        expect(dateApi.getNdfOutrightDatesByValueDate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);

        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: ndfOutrightDatesState });
      },
    );

    test('getNdfOutrightDatesByValueDate should dispatch LOAD_DATES_FAILED when the call to getNdfOutrightDatesByValueDate is rejected', async () => {
      dateApi.getNdfOutrightDatesByValueDate = jest.fn().mockRejectedValue({});

      const store = mockStore({ dates: dummy });
      await store.dispatch(getNdfOutrightDatesByValueDate('A', 'B', 'C'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_FAILED, error: {} });
    });
  });

  describe('getNdfSpreadDatesByTerm()', () => {
    test(
      `getNdfSpreadDatesByTerm should dispatch LOAD_DATES_SUCCESS with the correct payload, when no dates in state and the call to
    getNdfSpreadDatesByTerm is successfully resolved and the deal/strategy types match`,
      async () => {
        dateApi.getNdfSpreadDatesByTerm = jest.fn().mockResolvedValue(ndfSpreadTermsState);

        const store = mockStore({ dates: {}, ui: { selectedDealType: 'NDF', selectedStrategyType: 'Spread' } });
        await store.dispatch(getNdfSpreadDatesByTerm('A', 'B', 'C', 'D'));

        expect(dateApi.getNdfSpreadDatesByTerm).toBeCalledWith('A', 'B', 'C', 'D');
        expect(dateApi.getNdfSpreadDatesByTerm).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);

        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: ndfSpreadTermsState });
      },
    );

    test(
      `getNdfSpreadDatesByTerm should call LOAD_DATES_SUCCESS with the correct payload, when dates in state and the call to
      getNdfSpreadDatesByTerm is successfully resolved and the deal/strategy types match`,
      async () => {
        dateApi.getNdfSpreadDatesByTerm = jest.fn().mockResolvedValue(ndfSpreadTermsState);

        const store = mockStore({ dates: dummy, ui: { selectedDealType: 'NDF', selectedStrategyType: 'Spread' } });
        await store.dispatch(getNdfSpreadDatesByTerm('A', 'B', 'C', 'D'));

        expect(dateApi.getNdfSpreadDatesByTerm).toBeCalledWith('A', 'B', 'C', 'D');
        expect(dateApi.getNdfSpreadDatesByTerm).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);

        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: ndfSpreadTermsState });
      },
    );

    test('getNdfSpreadDatesByTerm should dispatch LOAD_DATES_FAILED when the call to getNdfSpreadDatesByTerm is rejected', async () => {
      dateApi.getNdfSpreadDatesByTerm = jest.fn().mockRejectedValue({});

      const store = mockStore({ dates: dummy });
      await store.dispatch(getNdfSpreadDatesByTerm('A', 'B', 'C', 'D'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_FAILED, error: {} });
    });

    test(`getNdfSpreadDatesByTerm should dispatch LOAD_DATES_CANCELLED when the call to getNdfSpreadDatesByTerm is successfully resolved
      and the deal types do not match`, async () => {
      dateApi.getNdfSpreadDatesByTerm = jest.fn().mockResolvedValue(ndfSpreadTermsState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'FWD' } });
      await store.dispatch(getNdfSpreadDatesByTerm('A', 'B', 'C', 'D'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });

    test(`getNdfSpreadDatesByTerm should dispatch LOAD_DATES_CANCELLED when the call to getNdfSpreadDatesByTerm is successfully resolved
      and the strategy types do not match`, async () => {
      dateApi.getNdfSpreadDatesByTerm = jest.fn().mockResolvedValue(ndfSpreadTermsState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'NDF', selectedStrategyType: 'Outright' } });
      await store.dispatch(getNdfSpreadDatesByTerm('A', 'B', 'C', 'D'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });
  });

  describe('getNdfSpreadDatesByValueDate()', () => {
    test(
      `getNdfSpreadDatesByValueDate should dispatch LOAD_DATES_SUCCESS with the correct payload, when no dates in state and the call to
      getNdfSpreadDatesByValueDate is successfully resolved and the deal/strategy types match`,
      async () => {
        dateApi.getNdfSpreadDatesByValueDate = jest.fn().mockResolvedValue(ndfSpreadDatesState);

        const store = mockStore({ dates: {}, ui: { selectedDealType: 'NDF', selectedStrategyType: 'Spread' } });
        await store.dispatch(getNdfSpreadDatesByValueDate('A', 'B', 'C', 'D', false));

        expect(dateApi.getNdfSpreadDatesByValueDate).toBeCalledWith('A', 'B', 'C', 'D', false);
        expect(dateApi.getNdfSpreadDatesByValueDate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);

        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: ndfSpreadDatesState });
      },
    );

    test(
      `getNdfSpreadDatesByValueDate should call LOAD_DATES_SUCCESS with the correct payload, when dates in state and the call to
      getNdfSpreadDatesByValueDate is successfully resolved and the deal/strategy types match`,
      async () => {
        dateApi.getNdfSpreadDatesByValueDate = jest.fn().mockResolvedValue(ndfSpreadDatesState);

        const store = mockStore({ dates: dummy, ui: { selectedDealType: 'NDF', selectedStrategyType: 'Spread' } });
        await store.dispatch(getNdfSpreadDatesByValueDate('A', 'B', 'C', 'D', false));

        expect(dateApi.getNdfSpreadDatesByValueDate).toBeCalledWith('A', 'B', 'C', 'D', false);
        expect(dateApi.getNdfSpreadDatesByValueDate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);

        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: ndfSpreadDatesState });
      },
    );

    test('getNdfSpreadDatesByValueDate should dispatch LOAD_DATES_FAILED when the call to getNdfSpreadDatesByValueDate is rejected', async () => {
      dateApi.getNdfSpreadDatesByValueDate = jest.fn().mockRejectedValue({});

      const store = mockStore({ dates: dummy });
      await store.dispatch(getNdfSpreadDatesByValueDate('A', 'B', 'C', 'D'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_FAILED, error: {} });
    });

    test(`getNdfSpreadDatesByValueDate should dispatch LOAD_DATES_CANCELLED when the call to getNdfSpreadDatesByValueDate is successfully resolved
      and the deal types do not match`, async () => {
      dateApi.getNdfSpreadDatesByValueDate = jest.fn().mockResolvedValue(ndfSpreadDatesState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'FWD' } });
      await store.dispatch(getNdfSpreadDatesByValueDate('A', 'B', 'C', 'D', false));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });

    test(`getNdfSpreadDatesByValueDate should dispatch LOAD_DATES_CANCELLED when the call to getNdfSpreadDatesByValueDate is successfully resolved
      and the strategy types do not match`, async () => {
      dateApi.getNdfSpreadDatesByValueDate = jest.fn().mockResolvedValue(ndfSpreadDatesState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'NDF', selectedStrategyType: 'Outright' } });
      await store.dispatch(getNdfSpreadDatesByValueDate('A', 'B', 'C', 'D', false));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });
  });

  describe('getFwdDatesByTerm()', () => {
    test(
      `getFwdDatesByTerm should call LOAD_DATES_SUCCESS with the correct payload, when no dates in state and the call to getFwdDatesByTerm
    is successfully resolved and deal/strategy types match`,
      async () => {
        dateApi.getFwdDatesByTerm = jest.fn().mockResolvedValue(fwdDatesState);

        const store = mockStore({ dates: {}, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Forward' } });
        await store.dispatch(getFwdDatesByTerm('A', 'B', 'C', 'D'));

        expect(dateApi.getFwdDatesByTerm).toBeCalledWith('A', 'B', 'C', 'D');
        expect(dateApi.getFwdDatesByTerm).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: fwdDatesState });
      },
    );

    test(
      `getFwdDatesByTerm should call LOAD_DATES_SUCCESS with the correct payload, when dates in state and the call to getFwdDatesByTerm
      is successfully resolved and deal/strategy types match`,
      async () => {
        dateApi.getFwdDatesByTerm = jest.fn().mockResolvedValue(fwdDatesState);

        const store = mockStore({ dates: fwdDatesState, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Forward Forward' } });
        await store.dispatch(getFwdDatesByTerm('A', 'B', 'C', 'D'));

        expect(dateApi.getFwdDatesByTerm).toBeCalledWith('A', 'B', 'C', 'D');
        expect(dateApi.getFwdDatesByTerm).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: fwdDatesState });
      },
    );

    test('getFwdDatesByTerm should call LOAD_DATES_FAILED action when the call to getFwdDatesByTerm is rejected', async () => {
      dateApi.getFwdDatesByTerm = jest.fn().mockRejectedValue({});

      const store = mockStore({ dates: dummy });
      await store.dispatch(getFwdDatesByTerm('A', 'B', 'C', 'D'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_FAILED, error: {} });
    });

    test(`getFwdDatesByTerm should dispatch LOAD_DATES_CANCELLED when the call to getFwdDatesByTerm is successfully resolved
      and the deal types do not match`, async () => {
      dateApi.getFwdDatesByTerm = jest.fn().mockResolvedValue(fwdDatesState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'SPT' } });
      await store.dispatch(getFwdDatesByTerm('A', 'B', 'C', 'D'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });

    test(`getFwdDatesByTerm should dispatch LOAD_DATES_CANCELLED when the call to getFwdDatesByTerm is successfully resolved
      and the strategy types do not match`, async () => {
      dateApi.getFwdDatesByTerm = jest.fn().mockResolvedValue(fwdDatesState);

      jest.spyOn(
        selectors,
        'getSelectedStrategyType',
      ).mockImplementationOnce(() => 'Outright');

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Forward' } });
      await store.dispatch(getFwdDatesByTerm('A', 'B', 'C', 'D'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });
  });

  describe('getFwdTermsByValueDate()', () => {
    test(
      `getFwdTermsByValueDate should call LOAD_DATES_SUCCESS with the correct payload, when no terms in state and the call to getFwdTermsByValueDate
      is successfully resolved and deal/strategy types match`,
      async () => {
        dateApi.getFwdTermsByValueDate = jest.fn().mockResolvedValue(fwdTermsState);

        const store = mockStore({ dates: {}, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Forward' } });
        await store.dispatch(getFwdTermsByValueDate('A', 'B', 'C', 'D'));

        expect(dateApi.getFwdTermsByValueDate).toBeCalledWith('A', 'B', 'C', 'D');
        expect(dateApi.getFwdTermsByValueDate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: fwdTermsState });
      },
    );

    test(
      `getFwdTermsByValueDate should call LOAD_DATES_SUCCESS with the correct payload, when terms in state and the call to getFwdTermsByValueDate
      is successfully resolved and deal/strategy types match`,
      async () => {
        dateApi.getFwdTermsByValueDate = jest.fn().mockResolvedValue(fwdTermsState);

        const store = mockStore({ dates: fwdTermsState, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Forward Forward' } });
        await store.dispatch(getFwdTermsByValueDate('A', 'B', 'C', 'D'));

        expect(dateApi.getFwdTermsByValueDate).toBeCalledWith('A', 'B', 'C', 'D');
        expect(dateApi.getFwdTermsByValueDate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: fwdTermsState });
      },
    );

    test('getFwdTermsByValueDate should call LOAD_DATES_FAILED action when the call to getFwdTermsByValueDate is rejected', async () => {
      dateApi.getFwdTermsByValueDate = jest.fn().mockRejectedValue({});

      const store = mockStore({ dates: dummy });
      await store.dispatch(getFwdTermsByValueDate('A', 'B', 'C', 'D'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_FAILED, error: {} });
    });

    test(`getFwdTermsByValueDate should dispatch LOAD_DATES_CANCELLED when the call to getFwdTermsByValueDate is successfully resolved
      and the deal types do not match`, async () => {
      dateApi.getFwdTermsByValueDate = jest.fn().mockResolvedValue(fwdTermsState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'SPT' } });
      await store.dispatch(getFwdTermsByValueDate('A', 'B', 'C', 'D'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });

    test(`getFwdTermsByValueDate should dispatch LOAD_DATES_CANCELLED when the call to getFwdTermsByValueDate is successfully resolved
      and the strategy types do not match`, async () => {
      dateApi.getFwdTermsByValueDate = jest.fn().mockResolvedValue(fwdTermsState);

      jest.spyOn(
        selectors,
        'getSelectedStrategyType',
      ).mockImplementationOnce(() => 'Outright');

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Forward Forward' } });
      await store.dispatch(getFwdTermsByValueDate('A', 'B', 'C', 'D'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });
  });

  describe('getFwdOutrightDatesByTerm()', () => {
    test(
      `getFwdOutrightDatesByTerm should call LOAD_DATES_SUCCESS with the correct payload, when no terms in state and the call to
      getFwdOutrightDatesByTerm is successfully resolved and deal/strategy types match`,
      async () => {
        dateApi.getFwdOutrightDatesByTerm = jest.fn().mockResolvedValue(fwdOutrightDatesState);

        const store = mockStore({ dates: {}, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Outright' } });
        await store.dispatch(getFwdOutrightDatesByTerm('A', 'B', 'C'));

        expect(dateApi.getFwdOutrightDatesByTerm).toBeCalledWith('A', 'B', 'C');
        expect(dateApi.getFwdOutrightDatesByTerm).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: fwdOutrightDatesState });
      },
    );

    test(
      `getFwdOutrightDatesByTerm should call LOAD_DATES_SUCCESS with the correct payload, when terms in state and the call to getFwdDatesByTerm
      is successfully resolved and deal/strategy types match`,
      async () => {
        dateApi.getFwdOutrightDatesByTerm = jest.fn().mockResolvedValue(fwdOutrightDatesState);

        const store = mockStore({ dates: fwdTermsState, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Outright' } });
        await store.dispatch(getFwdOutrightDatesByTerm('A', 'B', 'C'));

        expect(dateApi.getFwdOutrightDatesByTerm).toBeCalledWith('A', 'B', 'C');
        expect(dateApi.getFwdOutrightDatesByTerm).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: fwdOutrightDatesState });
      },
    );

    test('getFwdOutrightDatesByTerm should call LOAD_DATES_FAILED action when the call to getFwdOutrightDatesByTerm is rejected', async () => {
      dateApi.getFwdOutrightDatesByTerm = jest.fn().mockRejectedValue({});

      const store = mockStore({ dates: fwdTermsState });
      await store.dispatch(getFwdOutrightDatesByTerm('A', 'B', 'C'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_FAILED, error: {} });
    });

    test(`getFwdOutrightDatesByTerm should dispatch LOAD_DATES_CANCELLED when the call to getFwdOutrightDatesByTerm is successfully resolved
      and the deal types do not match`, async () => {
      dateApi.getFwdOutrightDatesByTerm = jest.fn().mockResolvedValue(fwdTermsState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'SPT' } });
      await store.dispatch(getFwdOutrightDatesByTerm('A', 'B', 'C'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });

    test(`getFwdOutrightDatesByTerm should dispatch LOAD_DATES_CANCELLED when the call to getFwdOutrightDatesByTerm is successfully resolved
      and the deal types do not match`, async () => {
      dateApi.getFwdOutrightDatesByTerm = jest.fn().mockResolvedValue(fwdTermsState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'SPT' } });
      await store.dispatch(getFwdOutrightDatesByTerm('A', 'B', 'C'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });

    test(`getFwdOutrightDatesByTerm should dispatch LOAD_DATES_CANCELLED when the call to getFwdOutrightDatesByTerm is successfully resolved
      and the strategy types do not match`, async () => {
      dateApi.getFwdOutrightDatesByTerm = jest.fn().mockResolvedValue(fwdTermsState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Forward' } });
      await store.dispatch(getFwdOutrightDatesByTerm('A', 'B', 'C'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });
  });

  describe('getFwdOutrightTermsByValueDate()', () => {
    test(
      `getFwdOutrightTermByValueDate should call LOAD_DATES_SUCCESS with the correct payload, when no terms in state and the call to
      getFwdOutrightTermsByValueDate is successfully resolved and deal/strategy types match`,
      async () => {
        dateApi.getFwdOutrightTermsByValueDate = jest.fn().mockResolvedValue(fwdOutrightTermsState);

        const store = mockStore({ dates: {}, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Outright' } });
        await store.dispatch(getFwdOutrightTermByValueDate('A', 'B', 'C'));

        expect(dateApi.getFwdOutrightTermsByValueDate).toBeCalledWith('A', 'B', 'C');
        expect(dateApi.getFwdOutrightTermsByValueDate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: fwdOutrightTermsState });
      },
    );

    test(
      `getFwdOutrightTermByValueDate should call LOAD_DATES_SUCCESS with the correct payload, when terms in state and the call to
      getFwdOutrightTermsByValueDate is successfully resolved and deal types match`,
      async () => {
        dateApi.getFwdOutrightTermsByValueDate = jest.fn().mockResolvedValue(fwdOutrightTermsState);

        const store = mockStore({ dates: fwdOutrightTermsState, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Outright' } });
        await store.dispatch(getFwdOutrightTermByValueDate('A', 'B', 'C'));

        expect(dateApi.getFwdOutrightTermsByValueDate).toBeCalledWith('A', 'B', 'C');
        expect(dateApi.getFwdOutrightTermsByValueDate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: fwdOutrightTermsState });
      },
    );

    test(
      'getFwdOutrightTermByValueDate should call LOAD_DATES_FAILED action when the call to getFwdOutrightTermsByValueDate is rejected',
      async () => {
        dateApi.getFwdOutrightTermsByValueDate = jest.fn().mockRejectedValue({});

        const store = mockStore({ dates: fwdOutrightTermsState });
        await store.dispatch(getFwdOutrightTermByValueDate('A', 'B', 'C'));

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_FAILED, error: {} });
      },
    );

    test(`getFwdOutrightTermByValueDate should dispatch LOAD_DATES_CANCELLED when the call to getFwdOutrightTermByValueDate is successfully resolved
      and the deal types do not match`, async () => {
      dateApi.getFwdOutrightTermsByValueDate = jest.fn().mockResolvedValue(fwdOutrightTermsState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'SPT' } });
      await store.dispatch(getFwdOutrightTermByValueDate('A', 'B', 'C'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });

    test(`getFwdOutrightTermByValueDate should dispatch LOAD_DATES_CANCELLED when the call to getFwdOutrightTermByValueDate is successfully resolved
      and the strategy types do not match`, async () => {
      dateApi.getFwdOutrightTermsByValueDate = jest.fn().mockResolvedValue(fwdOutrightTermsState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'FWD', selectedStrategyType: 'Forward Forward' } });
      await store.dispatch(getFwdOutrightTermByValueDate('A', 'B', 'C'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });
  });

  describe('getSptValueDate()', () => {
    test(
      `getSptValueDate should call LOAD_DATES_SUCCESS with the correct payload, when no terms in state and the call to
      getSptValueDate is successfully resolved and deal types match`,
      async () => {
        dateApi.getSptValueDate = jest.fn().mockResolvedValue(sptTenorState);

        const store = mockStore({ dates: {}, ui: { selectedDealType: 'SPT' } });
        await store.dispatch(getSptValueDate('A', 'B'));

        expect(dateApi.getSptValueDate).toBeCalledWith('A', 'B');
        expect(dateApi.getSptValueDate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: sptTenorState });
      },
    );

    test(
      `getSptValueDate should call LOAD_DATES_SUCCESS with the correct payload, when terms in state and the call to
      getSptValueDate is successfully resolved and deal types match`,
      async () => {
        dateApi.getSptValueDate = jest.fn().mockResolvedValue(sptTenorState);

        const store = mockStore({ dates: dummy, ui: { selectedDealType: 'SPT' } });
        await store.dispatch(getSptValueDate('A', 'B'));

        expect(dateApi.getSptValueDate).toBeCalledWith('A', 'B');
        expect(dateApi.getSptValueDate).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: sptTenorState });
      },
    );

    test(
      'getSptValueDate should call LOAD_DATES_FAILED action when the call to getSptValueDate is rejected',
      async () => {
        dateApi.getSptValueDate = jest.fn().mockRejectedValue({});

        const store = mockStore({ dates: fwdOutrightTermsState });
        await store.dispatch(getSptValueDate('A', 'B'));

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_FAILED, error: {} });
      },
    );

    test(`getSptValueDate should dispatch LOAD_DATES_CANCELLED when the call to getSptValueDate is successfully resolved
      and the deal types do not match`, async () => {
      dateApi.getSptValueDate = jest.fn().mockResolvedValue(sptTenorState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'NDF' } });
      await store.dispatch(getSptValueDate('A', 'B'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });
  });

  describe('getSptDayCounts()', () => {
    test(
      `getSptDayCounts should call LOAD_DATES_SUCCESS with the correct payload, when no terms in state and the call to
      getSptDayCounts is successfully resolved and deal types match`,
      async () => {
        dateApi.getSptDayCounts = jest.fn().mockResolvedValue(sptDateState);

        const store = mockStore({ dates: {}, ui: { selectedDealType: 'SPT' } });
        await store.dispatch(getSptDayCounts('A', 'B', 'C'));

        expect(dateApi.getSptDayCounts).toBeCalledWith('A', 'B', 'C');
        expect(dateApi.getSptDayCounts).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: sptDateState });
      },
    );

    test(
      `getSptDayCounts should call LOAD_DATES_SUCCESS with the correct payload, when terms in state and the call to
      getSptDayCounts is successfully resolved and deal types match`,
      async () => {
        dateApi.getSptDayCounts = jest.fn().mockResolvedValue(sptDateState);

        const store = mockStore({ dates: dummy, ui: { selectedDealType: 'SPT' } });
        await store.dispatch(getSptDayCounts('A', 'B', 'C'));

        expect(dateApi.getSptDayCounts).toBeCalledWith('A', 'B', 'C');
        expect(dateApi.getSptDayCounts).toHaveBeenCalledTimes(1);

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_SUCCESS, dates: sptDateState });
      },
    );

    test(
      'getSptDayCounts should call LOAD_DATES_FAILED action when the call to getSptDayCounts is rejected',
      async () => {
        dateApi.getSptDayCounts = jest.fn().mockRejectedValue({});

        const store = mockStore({ dates: sptDateState });
        await store.dispatch(getSptDayCounts('A', 'B', 'C'));

        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
        expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_FAILED, error: {} });
      },
    );

    test(`getSptDayCounts should dispatch LOAD_DATES_CANCELLED when the call to getSptDayCounts is successfully resolved
      and the deal types do not match`, async () => {
      dateApi.getSptDayCounts = jest.fn().mockResolvedValue(sptDateState);

      const store = mockStore({ dates: dummy, ui: { selectedDealType: 'NDF' } });
      await store.dispatch(getSptDayCounts('A', 'B', 'C'));

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(actions[0]).toEqual({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
      expect(actions[1]).toEqual({ type: actionTypes.LOAD_DATES_CANCELLED });
    });
  });

  describe('resetDates()', () => {
    test('resetDates should call RESET_DATES action', async () => {
      const store = mockStore({ dates: dummy });
      await store.dispatch(resetDates());

      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.RESET_DATES });
    });
  });
});
