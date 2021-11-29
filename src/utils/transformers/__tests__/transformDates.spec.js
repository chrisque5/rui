import moment from 'moment';
import * as transformDates from '../transformDates';

const exampleNdfOutrightTenorResponse = {
  dayCountFromSpot: 30,
  dayCountFromTrade: 32,
  displayTenor: '30D',
  fixingDate: '2021-02-24',
  forwardStart: false,
  publishDate: '2021-02-24',
  spotDate: '2021-01-27',
  valueDate: '2021-02-26',
};

const exampleNdfOutrightDatesResponse = {
  dayCountFromSpot: 33,
  dayCountFromTrade: 35,
  displayTenor: '33D',
  fixingDate: '2021-02-25',
  forwardStart: false,
  publishDate: '2021-02-25',
  spotDate: '2021-01-27',
  valueDate: '2021-03-01',
};

const exampleNdfSpreadResponse = {
  farDayCountFromSpot: 181,
  farDayCountFromTrade: 183,
  farDisplayTenor: '181D',
  farFixingDate: '2021-07-30',
  farForwardStart: false,
  farPublishDate: '2021-07-30',
  farValueDate: '2021-08-03',
  nearDayCountFromSpot: 62,
  nearDayCountFromTrade: 64,
  nearDisplayTenor: '62D',
  nearFixingDate: '2021-04-01',
  nearForwardStart: false,
  nearPublishDate: '2021-04-01',
  nearValueDate: '2021-04-06',
  nearSpotDate: '2021-02-03',
  farSpotDate: '2021-02-03',
};

const exampleFwdDatesResponse = {
  nearDayCount: 4,
  farDayCount: 7,
  spotDate: '2020-04-20',
  nearDurationSpotToEnd: 0,
  farDurationSpotToEnd: 7,
  nearValueDate: '2020-04-20',
  farValueDate: '2020-04-27',
  fwdTodayIsValidDate: true,
};

const exampleFwdTenorResponse = {
  nearDayCount: 6,
  farDayCount: 9,
  spotDate: '2020-04-20',
  nearDurationSpotToEnd: 4,
  farDurationSpotToEnd: 13,
  nearDisplayTenor: '4D',
  farDisplayTenor: '13D',
};

const exampleFwdOutrightDatesResponse = {
  valueDate: '2021-05-14',
  dayCount: 4,
  spotDate: '2020-05-13',
  fwdTodayIsValidDate: true,
};

const exampleFwdOutrightTenorResponse = {
  displayTenor: '7D',
  dayCount: 9,
  spotDate: '2020-05-22',
};

const exampleSptTenorResponse = {
  valueDate: moment('2021-01-26'),
  spotDate: moment('2021-01-26'),
  dayCountFromTrade: 1,
  dayCountFromSpot: 0,
  displayTenor: '0D',
};

const exampleSptDateResponse = {
  dayCountFromSpot: 1,
  dayCountFromTrade: 2,
  displayTenor: '1D',
  spotDate: '2021-01-26',
};

const exampleNdfOutrightTenorState = {
  valueDate: moment('2021-02-26'),
  spotDate: moment('2021-01-27'),
  fixingDate: moment('2021-02-24'),
  publishDate: moment('2021-02-24'),
  dayCount: 30,
  forwardStart: { near: false },
};

const exampleNdfOutrightDatesState = {
  term: '33D',
  spotDate: moment('2021-01-27'),
  fixingDate: moment('2021-02-25'),
  publishDate: moment('2021-02-25'),
  dayCount: 33,
  forwardStart: { near: false },
  valueDate: moment('2021-03-01'),
};

const exampleNdfSpreadTenorsState = {
  valueDate: {
    near: moment('2021-04-06'),
    far: moment('2021-08-03'),
  },
  spotDate: {
    near: moment('2021-02-03'),
    far: moment('2021-02-03'),
  },
  fixingDate: {
    near: moment('2021-04-01'),
    far: moment('2021-07-30'),
  },
  publishDate: {
    near: moment('2021-04-01'),
    far: moment('2021-07-30'),
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

const exampleNdfSpreadDatesState = {
  valueDate: {
    near: moment('2021-04-06'),
    far: moment('2021-08-03'),
  },
  spotDate: {
    near: moment('2021-02-03'),
    far: moment('2021-02-03'),
  },
  fixingDate: {
    near: moment('2021-04-01'),
    far: moment('2021-07-30'),
  },
  publishDate: {
    near: moment('2021-04-01'),
    far: moment('2021-07-30'),
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

const exampleFwdDatesState = {
  dayCount: {
    near: 4,
    far: 7,
  },
  tradeDuration: {
    near: 0,
    far: 7,
  },
  valueDate: {
    near: moment('2020-04-20'),
    far: moment('2020-04-27'),
  },
  spotDate: moment('2020-04-20'),
  isTodayValidDate: true,
};

const exampleFwdTenorState = {
  dayCount: {
    near: 6,
    far: 9,
  },
  tradeDuration: {
    near: 4,
    far: 13,
  },
  term: {
    near: '4D',
    far: '13D',
  },
  spotDate: moment('2020-04-20'),
};

const exampleFwdOutrightDatesState = {
  valueDate: moment('2021-05-14'),
  dayCount: 4,
  spotDate: moment('2020-05-13'),
  isTodayValidDate: true,
};

const exampleFwdOutrightTenorState = {
  term: '7D',
  dayCount: 9,
  spotDate: moment('2020-05-22'),
};

const exampleSptTenorState = {
  dayCountFromTrade: 1,
  dayCountFromSpot: 0,
  valueDate: moment('2021-01-26'),
  spotDate: moment('2021-01-26'),
  displayTenor: '0D',
};

const exampleSptDateState = {
  dayCountFromTrade: 2,
  dayCountFromSpot: 1,
  valueDate: moment('2021-01-27'),
  spotDate: moment('2021-01-26'),
  displayTenor: '1D',
};

describe('map NDF response to state', () => {
  test('mapNdfOutrightTenorResponseToState', () => {
    const response = exampleNdfOutrightTenorResponse;
    const actualResult = transformDates.mapNdfOutrightTenorResponseToState(response);
    expect(JSON.stringify(exampleNdfOutrightTenorState)).toEqual(JSON.stringify(actualResult));
  });

  test('mapNdfOutrightDatesResponseToState', () => {
    const response = exampleNdfOutrightDatesResponse;
    const actualResult = transformDates.mapNdfOutrightDatesResponseToState(response);
    expect(JSON.stringify(exampleNdfOutrightDatesState)).toEqual(JSON.stringify(actualResult));
  });

  test('mapNdfSpreadTenorResponseToState', () => {
    const response = exampleNdfSpreadResponse;
    const actualResult = transformDates.mapNdfSpreadTenorResponseToState(response);
    expect(JSON.stringify(exampleNdfSpreadTenorsState)).toEqual(JSON.stringify(actualResult));
  });

  test('mapNdfSpreadDatesResponseToState', () => {
    const response = exampleNdfSpreadResponse;
    const actualResult = transformDates.mapNdfSpreadDatesResponseToState(response);
    expect(JSON.stringify(exampleNdfSpreadDatesState)).toEqual(JSON.stringify(actualResult));
  });
});

describe('map FWD response to state', () => {
  test('mapFwdDatesResponseToState()', () => {
    const response = exampleFwdDatesResponse;
    const actualResult = transformDates.mapFwdDatesResponseToState(response);
    expect(JSON.stringify(exampleFwdDatesState)).toEqual(JSON.stringify(actualResult));
  });

  test('mapFwdTenorResponseToState()', () => {
    const response = exampleFwdTenorResponse;
    const actualResult = transformDates.mapFwdTenorResponseToState(response);
    expect(JSON.stringify(exampleFwdTenorState)).toEqual(JSON.stringify(actualResult));
  });

  test('mapFwdOutrightTenorResponseToState()', () => {
    const response = exampleFwdOutrightTenorResponse;
    const actualResult = transformDates.mapFwdOutrightTenorResponseToState(response);
    expect(JSON.stringify(exampleFwdOutrightTenorState)).toEqual(JSON.stringify(actualResult));
  });

  test('mapFwdOutrightDatesResponseToState()', () => {
    const response = exampleFwdOutrightDatesResponse;
    const actualResult = transformDates.mapFwdOutrightDatesResponseToState(response);
    expect(JSON.stringify(exampleFwdOutrightDatesState)).toEqual(JSON.stringify(actualResult));
  });
});

describe('map SPT response to state', () => {
  test('mapSptTenorResponseToState()', () => {
    const response = exampleSptTenorResponse;
    const actualResult = transformDates.mapSptTenorResponseToState(response);
    expect(JSON.stringify(exampleSptTenorState)).toEqual(JSON.stringify(actualResult));
  });

  test('mapSptDateResponseToState()', () => {
    const valueDate = moment('2021-01-27');
    const response = exampleSptDateResponse;
    const actualResult = transformDates.mapSptDateResponseToState(response, valueDate);
    expect(JSON.stringify(exampleSptDateState)).toEqual(JSON.stringify(actualResult));
  });
});
