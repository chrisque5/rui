import moment from 'moment';
import {
  mapBuyer, mapDeal, mapLeg, mapSeller, mapTerms, mapTradeEconomics,
} from './dealSubmitHelpers';
import { ids, strategies } from '../constants';
import { getDateInLocalTZ } from '../helper';

/**
 * Take the antD form values and map them to fwd trade dates
 *
 * @param {Object} formValues the values passed from the antD form
 * @param {Object} index the index of the leg
 * @returns {Object} the fwd date JSON
 */
const mapFwdTradeDates = (formValues, index = 0) => {
  let durationSpotToEnd = null;

  switch (formValues.strategy) {
    case strategies.FWD.FORWARD:
    case strategies.FWD.FORWARD_FORWARD: {
      const { far, near } = formValues[ids.TRADE_DURATION];
      durationSpotToEnd = index === 0 ? near : far;
      break;
    }
    case strategies.FWD.OUTRIGHT: {
      durationSpotToEnd = formValues[ids.DURATION_SPOT_TO_END];
      break;
    }
    default:
      break;
  }

  return {
    durationSpotToEnd,
    publishDate: moment(index === 0 ? formValues[ids.PUBLISH_DATE_1] : formValues[ids.PUBLISH_DATE_2]).format('YYYY-MM-DD'),
    spotDate: formValues[ids.SPOT_DATE] ? moment(formValues[ids.SPOT_DATE], 'DD/MM/YYYY', false).format('YYYY-MM-DD') : getDateInLocalTZ(),
  };
};

/**
 * Take the antD form values and map them to a fwd execution chain
 *
 * @param {Object} formValues the values passed from the antD form
 * @returns {Object} the execution chain JSON
 */
const mapFormToFwdChain = (formValues) => {
  const buyer = mapBuyer(formValues);
  const seller = mapSeller(formValues);
  const { executionChain = {}, tradeEconomics = {} } = mapDeal(formValues);
  const { scalingFactor = null } = formValues.currencyPair || {};

  let newStrategy = executionChain.strategy;

  // The server uses the "forward" strategy to handle both Forward Swap and Forward Forward
  if (executionChain.strategy === strategies.FWD.FORWARD_FORWARD.toLowerCase()) {
    newStrategy = strategies.FWD.FORWARD.toLowerCase();
  }

  const fwdDealCommonProps = {
    isTurnTrade: formValues[ids.TURN_TRADE] || false,
    points: formValues[ids.POINTS],
    scalingFactor,
  };

  const deals = [];

  switch (formValues.strategy) {
    case strategies.FWD.FORWARD:
    case strategies.FWD.FORWARD_FORWARD: {
      const deal = {
        ...fwdDealCommonProps,
        trades: [{
          ...mapFwdTradeDates(formValues),
          ...mapTradeEconomics(tradeEconomics, buyer, seller),
          ...mapTerms(formValues),
          ...mapLeg(formValues, 0),
        },
        {
          ...mapFwdTradeDates(formValues, 1),
          ...mapTradeEconomics(tradeEconomics, seller, buyer),
          ...mapTerms(formValues, 1),
          ...mapLeg(formValues, 1),
        }],
      };

      deals.push(deal);

      break;
    }
    case strategies.FWD.OUTRIGHT: {
      const deal = {
        ...fwdDealCommonProps,
        trades: [{
          ...mapFwdTradeDates(formValues),
          ...mapTradeEconomics(tradeEconomics, buyer, seller),
          ...mapTerms(formValues),
          ...mapLeg(formValues, 0),
        }],
      };

      deals.push(deal);

      break;
    }
    default:
      break;
  }

  return { ...executionChain, strategy: newStrategy, deals: [...deals] };
};

export default mapFormToFwdChain;
