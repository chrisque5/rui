import moment from 'moment';
import {
  mapBuyer, mapDeal, mapLeg, mapSeller, mapTradeEconomics,
} from './dealSubmitHelpers';

/**
 * Take the form values and map them to SPT trade dates
 *
 * @param {Object} formValues the values passed from the form
 * @returns {Object} the SPT date JSON
 */
const mapSptTradeDates = ({ spotDate }) => ({
  // TODO: publishDate may not be required, Gerard McCann to confirm
  publishDate: moment().format('YYYY-MM-DD'),
  spotDate: moment(spotDate, 'DD/MM/YYYY', false).format('YYYY-MM-DD'),
});

/**
 * Take the form values and map them to a SPT execution chain
 *
 * @param {Object} formValues the values passed from the form
 * @returns {Object} the execution chain JSON
 */
const mapFormToSptChain = (formValues) => {
  const buyer = mapBuyer(formValues);
  const seller = mapSeller(formValues);
  const { executionChain = {}, tradeEconomics = {} } = mapDeal(formValues);

  const deals = [];

  const deal = {
    trades: [{
      ...mapSptTradeDates(formValues),
      ...mapTradeEconomics(tradeEconomics, buyer, seller),
      ...mapLeg(formValues, 0),
      durationMultiplier: formValues.displayTenor.slice(0, -1),
      durationPeriod: formValues.displayTenor.slice(-1),
      durationSpotToEnd: formValues.durationSpotToEnd,
    }],
  };

  deals.push(deal);

  return { ...executionChain, deals: [...deals] };
};

export default mapFormToSptChain;
