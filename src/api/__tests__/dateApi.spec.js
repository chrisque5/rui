import 'moment/min/locales';
import moment from 'moment';
import DateApi from '../dateApi';
import restApi from '../restApi';
import * as transformDates from '../../utils/transformers/transformDates';

jest.mock('../../utils/helper', () => ({
  getDateInLocalTZ: jest.fn().mockReturnValue('2020-02-10'),
}));

jest.mock('moment', () => {
  const actualMoment = jest.requireActual('moment');
  return actualMoment;
});

const exampleGetNdfOutrightDatesParameters = {
  term: '1W',
  instrumentId: 4313,
  tradeDate: null,
};

const exampleGetNdfOutrightTermsParameters = {
  valueDate: moment('2020-02-12'),
  instrumentId: 4313,
  tradeDate: null,
};

const exampleGetNdfSpreadDatesParameters = {
  nearTerm: '1W',
  farTerm: '6M',
  instrumentId: 4313,
  tradeDate: null,
};

const exampleGetNdfSpreadTermsParameters = {
  nearValueDate: moment('2020-02-17'),
  farValueDate: moment('2020-02-24'),
  instrumentId: 4313,
  tradeDate: null,
};

const exampleGetFwdDatesParameters = {
  nearTerm: '0D',
  farTerm: '1W',
  tradeDate: null,
  instrumentId: 4313,
};

const exampleGetFwdTermsParameters = {
  nearDate: moment('2020-04-20'),
  farDate: moment('2020-04-29'),
  tradeDate: null,
  instrumentId: 4313,
};

const exampleGetFwdOutrightDatesParameters = {
  term: '1W',
  tradeDate: null,
  instrumentId: 4313,
};

const exampleGetFwdOutrightTermsParameters = {
  valueDate: moment('2020-04-20'),
  tradeDate: null,
  instrumentId: 4313,
};

const exampleGetSptValueDateParameters = {
  tradeDate: null,
  instrumentId: 4313,
};

const exampleGetSptDayCountsParameters = {
  tradeDate: null,
  valueDate: moment('2020-02-11'),
  instrumentId: 4313,
};

describe('getNdfOutrightDatesByTerm()', () => {
  beforeAll(() => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: 'mockResponseData' }));

    jest.spyOn(
      transformDates,
      'mapNdfOutrightTenorResponseToState',
    ).mockImplementation(() => ({ type: 'NDF' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('calls correct endpoints and functions', async () => {
    const result = await DateApi.getNdfOutrightDatesByTerm(...Object.values(exampleGetNdfOutrightDatesParameters));

    const {
      term,
      instrumentId,
    } = exampleGetNdfOutrightDatesParameters;

    expect(restApi.request).toBeCalledWith('/DMSWeb/services/dates/ndf/outright/tenors', 'POST', {
      tradeDate: '2020-02-10',
      fxOptionId: instrumentId,
      displayTenor: term,
    });
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(transformDates.mapNdfOutrightTenorResponseToState).toBeCalledWith('mockResponseData');
    expect(transformDates.mapNdfOutrightTenorResponseToState).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ type: 'NDF' });
  });

  test('no restApi response throws exception.', async () => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: null }));

    await DateApi.getNdfOutrightDatesByTerm(...Object.values(exampleGetNdfOutrightDatesParameters))
      .catch((e) => {
        expect(e).toEqual(new Error('No dates received from server for term.'));
      });
  });
});

describe('getNdfOutrightDatesByValueDate()', () => {
  beforeAll(() => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: 'mockResponseData' }));

    jest.spyOn(
      transformDates,
      'mapNdfOutrightDatesResponseToState',
    ).mockImplementation(() => ({ type: 'NDF' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('calls correct endpoints and functions', async () => {
    const result = await DateApi.getNdfOutrightDatesByValueDate(...Object.values(exampleGetNdfOutrightTermsParameters));

    expect(restApi.request).toBeCalledWith('/DMSWeb/services/dates/ndf/outright/dates', 'POST', {
      valueDate: '2020-02-12',
      tradeDate: '2020-02-10',
      fxOptionId: exampleGetNdfOutrightTermsParameters.instrumentId,
    });
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(transformDates.mapNdfOutrightDatesResponseToState).toBeCalledWith('mockResponseData');
    expect(transformDates.mapNdfOutrightDatesResponseToState).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ type: 'NDF' });
  });

  test('no restApi response throws exception.', async () => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: null }));

    await DateApi.getNdfOutrightDatesByValueDate(...Object.values(exampleGetNdfOutrightTermsParameters))
      .catch((e) => {
        expect(e).toEqual(new Error('No dates received from server for value date.'));
      });
  });
});

describe('getNdfSpreadDatesByTerm()', () => {
  beforeAll(() => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: 'mockResponseData' }));

    jest.spyOn(
      transformDates,
      'mapNdfSpreadTenorResponseToState',
    ).mockImplementation(() => ({ type: 'NDF' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('calls correct endpoints and functions', async () => {
    const result = await DateApi.getNdfSpreadDatesByTerm(...Object.values(exampleGetNdfSpreadDatesParameters));

    const {
      nearTerm,
      farTerm,
      instrumentId,
    } = exampleGetNdfSpreadDatesParameters;

    expect(restApi.request).toBeCalledWith('/DMSWeb/services/dates/ndf/tenors', 'POST', {
      tradeDate: '2020-02-10',
      fxOptionId: instrumentId,
      nearDisplayTenor: nearTerm,
      farDisplayTenor: farTerm,
    });
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(transformDates.mapNdfSpreadTenorResponseToState).toBeCalledWith('mockResponseData');
    expect(transformDates.mapNdfSpreadTenorResponseToState).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ type: 'NDF' });
  });

  test('no restApi response throws exception.', async () => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: null }));

    await DateApi.getNdfSpreadDatesByTerm(...Object.values(exampleGetNdfSpreadDatesParameters))
      .catch((e) => {
        expect(e).toEqual(new Error('No dates received from server for term.'));
      });
  });
});

describe('getNdfSpreadDatesByValueDate()', () => {
  beforeAll(() => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: 'mockResponseData' }));

    jest.spyOn(
      transformDates,
      'mapNdfSpreadDatesResponseToState',
    ).mockImplementation(() => ({ type: 'NDF' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('calls correct endpoints and functions', async () => {
    const result = await DateApi.getNdfSpreadDatesByValueDate(...Object.values(exampleGetNdfSpreadTermsParameters));

    expect(restApi.request).toBeCalledWith('/DMSWeb/services/dates/ndf/dates', 'POST', {
      tradeDate: '2020-02-10',
      fxOptionId: exampleGetNdfSpreadTermsParameters.instrumentId,
      nearValueDate: '2020-02-17',
      farValueDate: '2020-02-24',
    });
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(transformDates.mapNdfSpreadDatesResponseToState).toBeCalledWith('mockResponseData');
    expect(transformDates.mapNdfSpreadDatesResponseToState).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ type: 'NDF' });
  });

  test('no restApi response throws exception.', async () => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: null }));

    await DateApi.getNdfSpreadDatesByValueDate(...Object.values(exampleGetNdfSpreadTermsParameters))
      .catch((e) => {
        expect(e).toEqual(new Error('No dates received from server for value date.'));
      });
  });
});

describe('getFwdDatesByTerm()', () => {
  beforeAll(() => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: 'mockResponseData' }));

    jest.spyOn(
      transformDates,
      'mapFwdDatesResponseToState',
    ).mockImplementation(() => ({ type: 'FWD' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('calls correct endpoints and functions', async () => {
    const result = await DateApi.getFwdDatesByTerm(...Object.values(exampleGetFwdDatesParameters));

    const {
      nearTerm,
      farTerm,
      instrumentId,
    } = exampleGetFwdDatesParameters;

    expect(restApi.request).toBeCalledWith('/DMSWeb/services/dates/fwd/tenors', 'POST', {
      nearDisplayTenor: nearTerm,
      farDisplayTenor: farTerm,
      tradeDate: '2020-02-10',
      fxOptionId: instrumentId,
    });
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(transformDates.mapFwdDatesResponseToState).toBeCalledWith('mockResponseData');
    expect(transformDates.mapFwdDatesResponseToState).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ type: 'FWD' });
  });

  test('no restApi response throws exception.', async () => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: null }));

    await DateApi.getFwdDatesByTerm(...Object.values(exampleGetFwdDatesParameters))
      .catch((e) => {
        expect(e).toEqual(new Error('No dates received from server for term.'));
      });
  });
});

describe('getFwdTermsByValueDate()', () => {
  beforeAll(() => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: 'mockResponseData' }));

    jest.spyOn(
      transformDates,
      'mapFwdTenorResponseToState',
    ).mockImplementation(() => ({ type: 'FWD' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('calls correct endpoints and functions', async () => {
    const result = await DateApi.getFwdTermsByValueDate(...Object.values(exampleGetFwdTermsParameters));

    expect(restApi.request).toBeCalledWith('/DMSWeb/services/dates/fwd/dates', 'POST', {
      nearValueDate: '2020-04-20',
      farValueDate: '2020-04-29',
      tradeDate: '2020-02-10',
      fxOptionId: exampleGetFwdTermsParameters.instrumentId,
    });
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(transformDates.mapFwdTenorResponseToState).toBeCalledWith('mockResponseData');
    expect(transformDates.mapFwdTenorResponseToState).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ type: 'FWD' });
  });

  test('no restApi response throws exception.', async () => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: null }));

    await DateApi.getFwdTermsByValueDate(...Object.values(exampleGetFwdTermsParameters))
      .catch((e) => {
        expect(e).toEqual(new Error('No terms received from server for date.'));
      });
  });
});

describe('getFwdOutrightTermsByValueDate()', () => {
  beforeAll(() => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: 'mockResponseData' }));

    jest.spyOn(
      transformDates,
      'mapFwdOutrightTenorResponseToState',
    ).mockImplementation(() => ({ type: 'FWD' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('calls correct endpoints and functions', async () => {
    const result = await DateApi.getFwdOutrightTermsByValueDate(...Object.values({ ...exampleGetFwdOutrightTermsParameters }));

    expect(restApi.request).toBeCalledWith('/DMSWeb/services/dates/fwd/outright/dates', 'POST', {
      valueDate: '2020-04-20',
      tradeDate: '2020-02-10',
      fxOptionId: exampleGetFwdOutrightTermsParameters.instrumentId,
    });
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(transformDates.mapFwdOutrightTenorResponseToState).toBeCalledWith('mockResponseData');
    expect(transformDates.mapFwdOutrightTenorResponseToState).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ type: 'FWD' });
  });

  test('no restApi response throws exception.', async () => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: null }));

    await DateApi.getFwdOutrightTermsByValueDate(...Object.values(exampleGetFwdOutrightTermsParameters))
      .catch((e) => {
        expect(e).toEqual(new Error('No terms received from server for date.'));
      });
  });
});

describe('getFwdOutrightDatesByTerm()', () => {
  beforeAll(() => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: 'mockResponseData' }));

    jest.spyOn(
      transformDates,
      'mapFwdOutrightDatesResponseToState',
    ).mockImplementation(() => ({ type: 'FWD' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('calls correct endpoints and functions', async () => {
    const result = await DateApi.getFwdOutrightDatesByTerm(...Object.values({ ...exampleGetFwdOutrightDatesParameters }));

    expect(restApi.request).toBeCalledWith('/DMSWeb/services/dates/fwd/outright/tenors', 'POST', {
      displayTenor: '1W',
      tradeDate: '2020-02-10',
      fxOptionId: exampleGetFwdOutrightDatesParameters.instrumentId,
    });
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(transformDates.mapFwdOutrightDatesResponseToState).toBeCalledWith('mockResponseData');
    expect(transformDates.mapFwdOutrightDatesResponseToState).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ type: 'FWD' });
  });

  test('no restApi response throws exception.', async () => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: null }));

    await DateApi.getFwdOutrightDatesByTerm(...Object.values(exampleGetFwdOutrightDatesParameters))
      .catch((e) => {
        expect(e).toEqual(new Error('No dates received from server for term.'));
      });
  });
});

describe('getSptValueDate()', () => {
  beforeAll(() => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: 'mockResponseData' }));

    jest.spyOn(
      transformDates,
      'mapSptTenorResponseToState',
    ).mockImplementation(() => ({ type: 'SPT' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('calls correct endpoints and functions', async () => {
    const result = await DateApi.getSptValueDate(...Object.values({ ...exampleGetSptValueDateParameters }));

    expect(restApi.request).toBeCalledWith('/DMSWeb/services/dates/spt/tenors', 'POST', {
      tradeDate: '2020-02-10',
      fxOptionId: exampleGetSptValueDateParameters.instrumentId,
    });
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(transformDates.mapSptTenorResponseToState).toBeCalledWith('mockResponseData');
    expect(transformDates.mapSptTenorResponseToState).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ type: 'SPT' });
  });

  test('no restApi response throws exception.', async () => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: null }));

    await DateApi.getSptValueDate(...Object.values(exampleGetSptValueDateParameters))
      .catch((e) => {
        expect(e).toEqual(new Error('No dates received from server for trade date and currency pair.'));
      });
  });
});

describe('getSptDayCounts()', () => {
  beforeAll(() => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: 'mockResponseData' }));

    jest.spyOn(
      transformDates,
      'mapSptDateResponseToState',
    ).mockImplementation(() => ({ type: 'SPT' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('calls correct endpoints and functions', async () => {
    const result = await DateApi.getSptDayCounts(...Object.values({ ...exampleGetSptDayCountsParameters }));

    expect(restApi.request).toBeCalledWith('/DMSWeb/services/dates/spt/dates', 'POST', {
      tradeDate: '2020-02-10',
      valueDate: '2020-02-11',
      fxOptionId: exampleGetSptDayCountsParameters.instrumentId,
    });
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(transformDates.mapSptDateResponseToState).toBeCalledWith('mockResponseData', exampleGetSptDayCountsParameters.valueDate);
    expect(transformDates.mapSptDateResponseToState).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ type: 'SPT' });
  });

  test('no restApi response throws exception.', async () => {
    jest.spyOn(
      restApi,
      'request',
    ).mockImplementation(() => Promise.resolve({ data: null }));

    await DateApi.getSptDayCounts(...Object.values(exampleGetSptDayCountsParameters))
      .catch((e) => {
        expect(e).toEqual(new Error('No day counts received from server for dates.'));
      });
  });
});

describe('parseIMM()', () => {
  test('returns correctly formatted IMM value', () => {
    const result = DateApi.parseIMM('IMM1');

    expect(result).toEqual('1I');
  });
});
