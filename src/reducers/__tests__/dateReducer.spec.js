import { actionTypes } from '../../utils/constants';
import reducer from '../dateReducer';

jest.mock('moment', () => (() => '2099–01–0111:11:11+00:00'));

const initialDateState = {
  fixingDate: {},
  valueDate: {},
  spotDate: {},
  publishDate: {},
  forwardStart: {},
  dayCount: {},
  tradeDuration: {},
  isDateResponsePending: false,
};

const testDates1 = {
  fxoLegReponse: {
    responseId: 0,
    dealType: null,
    expiryDate: {
      unadjustedDate: 1583366400000,
      adjustedDate: 1583366400000,
      adjusted: false,
    },
    premiumDate: null,
    fxValueDate: {
      unadjustedDate: 1583539200000,
      adjustedDate: 1583712000000,
      adjusted: true,
    },
    ndfFixingDate: {
      unadjustedDate: 1583366400000,
      adjustedDate: 1583366400000,
      adjusted: false,
    },
    ndoFixingDate: null,
    deliveryDate: {
      unadjustedDate: 1583539200000,
      adjustedDate: 1583712000000,
      adjusted: true,
    },
    spotDate: 1581033600000,
    spotOffset: 2,
    publishDate: {
      unadjustedDate: 1583366400000,
      adjustedDate: 1583366400000,
      adjusted: false,
    },
    term: {
      tenorPeriod: 'MONTHS',
      tenorPeriodMultiplier: 1,
    },
    contexts: [{
      contextName: 'Fixing Date',
      events: [{
        calendar: 'SGD',
        eventDate: 1583539200000,
        eventDescription: 'Weekend',
        businessCenter: 'Singapore                                                                                           ',
      }, {
        calendar: 'SGD',
        eventDate: 1583625600000,
        eventDescription: 'Weekend',
        businessCenter: 'Singapore                                                                                           ',
      }],
    }, {
      contextName: 'Value Date',
      events: [{
        calendar: 'SGD',
        eventDate: 1583539200000,
        eventDescription: 'Weekend',
        businessCenter: 'Singapore                                                                                           ',
      }, {
        calendar: 'USD',
        eventDate: 1583539200000,
        eventDescription: 'Weekend',
        businessCenter: 'New York                                                                                            ',
      }, {
        calendar: 'USD',
        eventDate: 1583625600000,
        eventDescription: 'Weekend',
        businessCenter: 'New York                                                                                            ',
      }, {
        calendar: 'SGD',
        eventDate: 1583625600000,
        eventDescription: 'Weekend',
        businessCenter: 'Singapore                                                                                           ',
      }],
    }],
  },
  forwardStart: false,
  fwdTodayIsValidDate: true,
  fwdNearLegValueDate: {
    unadjustedDate: 1581033600000,
    adjustedDate: 1581033600000,
    adjusted: false,
  },
  fwdFarLegValueDate: {
    unadjustedDate: 1583539200000,
    adjustedDate: 1583712000000,
    adjusted: true,
  },
  isDateResponsePending: false,
};

const testDates2 = {
  fxoLegReponse: {
    responseId: 0,
    dealType: null,
    expiryDate: {
      unadjustedDate: 1643328000000,
      adjustedDate: 1643328000000,
      adjusted: false,
    },
    premiumDate: null,
    fxValueDate: {
      unadjustedDate: 1644192000000,
      adjustedDate: 1644192000000,
      adjusted: false,
    },
    ndfFixingDate: {
      unadjustedDate: 1643328000000,
      adjustedDate: 1643328000000,
      adjusted: false,
    },
    ndoFixingDate: null,
    deliveryDate: {
      unadjustedDate: 1644192000000,
      adjustedDate: 1644192000000,
      adjusted: false,
    },
    spotDate: 1581033600000,
    spotOffset: 2,
    publishDate: {
      unadjustedDate: 1643328000000,
      adjustedDate: 1643328000000,
      adjusted: false,
    },
    term: {
      tenorPeriod: 'YEARS',
      tenorPeriodMultiplier: 2,
    },
    contexts: [{
      contextName: 'Fixing Date',
      events: [{
        calendar: 'USD',
        eventDate: 1643414400000,
        eventDescription: 'Weekend',
        businessCenter: 'New York                                                                                            ',
      }, {
        calendar: 'CNH',
        eventDate: 1643846400000,
        eventDescription: 'Lunar New Year 3                                  ',
        businessCenter: 'CNH Hong Kong deliverable Chinese yuan (Spot Market)                                                ',
      }, {
        calendar: 'CNH',
        eventDate: 1643414400000,
        eventDescription: 'Weekend',
        businessCenter: 'CNH Hong Kong deliverable Chinese yuan (Spot Market)                                                ',
      }, {
        calendar: 'CNH',
        eventDate: 1643932800000,
        eventDescription: 'Lunar New Year 4                                  ',
        businessCenter: 'CNH Hong Kong deliverable Chinese yuan (Spot Market)                                                ',
      }, {
        calendar: 'CNH',
        eventDate: 1643500800000,
        eventDescription: 'Weekend',
        businessCenter: 'CNH Hong Kong deliverable Chinese yuan (Spot Market)                                                ',
      }, {
        calendar: 'CNH',
        eventDate: 1644105600000,
        eventDescription: 'Weekend',
        businessCenter: 'CNH Hong Kong deliverable Chinese yuan (Spot Market)                                                ',
      }, {
        calendar: 'CNH',
        eventDate: 1643673600000,
        eventDescription: 'Lunar New Year 1                                  ',
        businessCenter: 'CNH Hong Kong deliverable Chinese yuan (Spot Market)                                                ',
      }, {
        calendar: 'USD',
        eventDate: 1643500800000,
        eventDescription: 'Weekend',
        businessCenter: 'New York                                                                                            ',
      }, {
        calendar: 'CNH',
        eventDate: 1643760000000,
        eventDescription: 'Lunar New Year 2                                  ',
        businessCenter: 'CNH Hong Kong deliverable Chinese yuan (Spot Market)                                                ',
      }, {
        calendar: 'CNH',
        eventDate: 1644019200000,
        eventDescription: 'Weekend',
        businessCenter: 'CNH Hong Kong deliverable Chinese yuan (Spot Market)                                                ',
      }],
    }],
  },
  forwardStart: false,
  fwdTodayIsValidDate: true,
  fwdNearLegValueDate: {
    unadjustedDate: 1581033600000,
    adjustedDate: 1581033600000,
    adjusted: false,
  },
  fwdFarLegValueDate: {
    unadjustedDate: 1644192000000,
    adjustedDate: 1644192000000,
    adjusted: false,
  },
  isDateResponsePending: false,
};

test('LOAD_DATES_SUCCESS action returns dates from action.', () => {
  const reducerOutput = reducer(testDates1, { type: actionTypes.LOAD_DATES_SUCCESS, dates: testDates2 });
  expect(reducerOutput).toEqual(testDates2);
});

test('LOAD_DATES_FAILED action returns current state.', () => {
  const reducerOutput = reducer(testDates1, { type: actionTypes.LOAD_DATES_FAILED, error: {} });
  expect(reducerOutput).toEqual(testDates1);
});

test('LOAD_DATES_CANCELLED action returns current state.', () => {
  const reducerOutput = reducer(testDates1, { type: actionTypes.LOAD_DATES_CANCELLED });
  expect(reducerOutput).toEqual(testDates1);
});

test('LOAD_DATES_IN_PROGRESS action returns isDateResponsePending === true', () => {
  const reducerOutput = reducer(undefined, { type: actionTypes.LOAD_DATES_IN_PROGRESS });
  expect(reducerOutput).toEqual({ ...initialDateState, isDateResponsePending: true });
});

test('RESET_DATES action returns resetted dates.', () => {
  const reducerOutput = reducer(testDates1, { type: actionTypes.RESET_DATES, dates: {} });
  expect(reducerOutput).toEqual(initialDateState);
});

test('DEFAULT action returns current state.', () => {
  const reducerOutput = reducer(testDates1, { type: actionTypes.LOAD_USER_SUCCESS, user: { permissions: { validForNdf: true } } });
  expect(reducerOutput).toEqual(testDates1);
});

test('DEFAULT action sets correct initial state for dates.', () => {
  const reducerOutput = reducer(undefined, { type: undefined, dates: undefined });
  expect(reducerOutput).toEqual(initialDateState);
});
