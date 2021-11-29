import moment from 'moment';

export const mapNdfOutrightTenorResponseToState = (response) => ({
  valueDate: moment(response.valueDate),
  spotDate: moment(response.spotDate),
  fixingDate: moment(response.fixingDate),
  publishDate: moment(response.publishDate),
  dayCount: response.dayCountFromSpot,
  forwardStart: { near: response.forwardStart },
});

export const mapNdfOutrightDatesResponseToState = (response) => ({
  term: response.displayTenor,
  spotDate: moment(response.spotDate),
  fixingDate: moment(response.fixingDate),
  publishDate: moment(response.publishDate),
  dayCount: response.dayCountFromSpot,
  forwardStart: { near: response.forwardStart },
  valueDate: moment(response.valueDate),
});

export const mapNdfSpreadTenorResponseToState = (response) => ({
  valueDate: {
    near: moment(response.nearValueDate),
    far: moment(response.farValueDate),
  },
  spotDate: {
    near: moment(response.nearSpotDate),
    far: moment(response.farSpotDate),
  },
  fixingDate: {
    near: moment(response.nearFixingDate),
    far: moment(response.farFixingDate),
  },
  publishDate: {
    near: moment(response.nearPublishDate),
    far: moment(response.farPublishDate),
  },
  dayCount: {
    near: response.nearDayCountFromSpot,
    far: response.farDayCountFromSpot,
  },
  forwardStart: {
    near: response.nearForwardStart,
    far: response.farForwardStart,
  },
});

export const mapNdfSpreadDatesResponseToState = (response) => ({
  valueDate: {
    near: moment(response.nearValueDate),
    far: moment(response.farValueDate),
  },
  spotDate: {
    near: moment(response.nearSpotDate),
    far: moment(response.farSpotDate),
  },
  fixingDate: {
    near: moment(response.nearFixingDate),
    far: moment(response.farFixingDate),
  },
  publishDate: {
    near: moment(response.nearPublishDate),
    far: moment(response.farPublishDate),
  },
  dayCount: {
    near: response.nearDayCountFromSpot,
    far: response.farDayCountFromSpot,
  },
  forwardStart: {
    near: response.nearForwardStart,
    far: response.farForwardStart,
  },
  term: {
    near: response.nearDisplayTenor,
    far: response.farDisplayTenor,
  },
});

export const mapFwdOutrightDatesResponseToState = (response) => ({
  valueDate: moment(response.valueDate),
  dayCount: response.dayCount,
  spotDate: moment(response.spotDate),
  isTodayValidDate: response.fwdTodayIsValidDate,
  durationSpotToEnd: response.durationSpotToEnd,
});

export const mapFwdOutrightTenorResponseToState = (response) => ({
  term: response.displayTenor,
  dayCount: response.dayCount,
  spotDate: moment(response.spotDate),
  durationSpotToEnd: response.durationSpotToEnd,
});

export const mapFwdDatesResponseToState = (response) => ({
  dayCount: {
    near: response.nearDayCount,
    far: response.farDayCount,
  },
  tradeDuration: {
    near: response.nearDurationSpotToEnd,
    far: response.farDurationSpotToEnd,
  },
  valueDate: {
    near: moment(response.nearValueDate),
    far: moment(response.farValueDate),
  },
  spotDate: moment(response.spotDate),
  isTodayValidDate: response.fwdTodayIsValidDate,
});

export const mapFwdTenorResponseToState = (response) => ({
  dayCount: {
    near: response.nearDayCount,
    far: response.farDayCount,
  },
  tradeDuration: {
    near: response.nearDurationSpotToEnd,
    far: response.farDurationSpotToEnd,
  },
  term: {
    near: response.nearDisplayTenor,
    far: response.farDisplayTenor,
  },
  spotDate: moment(response.spotDate),
});

export const mapSptTenorResponseToState = ({
  dayCountFromTrade, dayCountFromSpot, valueDate, displayTenor, spotDate,
}) => ({
  dayCountFromTrade,
  dayCountFromSpot,
  valueDate: moment(valueDate),
  spotDate: moment(spotDate),
  displayTenor,
});

export const mapSptDateResponseToState = ({
  dayCountFromTrade, dayCountFromSpot, displayTenor, spotDate,
}, valueDate) => ({
  dayCountFromTrade,
  dayCountFromSpot,
  valueDate,
  spotDate: moment(spotDate),
  displayTenor,
});
