import moment from 'moment';
import {
  mapBuyer, mapDeal, mapLeg, mapSeller, mapTerms, mapTradeEconomics, getBrokerageStrategy,
} from './dealSubmitHelpers';
import { ids, strategies } from '../constants';
import { doesArrayExistWithValue } from '../helper';

/**
 * Take the antD form values and map them to ndf trade dates
 *
 * @param {Object} formValues the values passed from the antD form
 * @param {Object} index the index of the leg
 * @returns {Object} the ndf date JSON
 */
const mapNdfTradeDates = (formValues, index = 0) => {
  const { strategy } = formValues;
  let spotDate = '';

  if (strategy === strategies.NDF.OUTRIGHT) {
    spotDate = moment(formValues[ids.SPOT_DATE], 'DD/MM/YYYY', false)
      .format('YYYY-MM-DD');
  } else if (strategy === strategies.NDF.SPREAD) {
    spotDate = moment(index === 0 ? formValues[ids.SPOT_DATE].near : formValues[ids.SPOT_DATE].far)
      .format('YYYY-MM-DD');
  }

  return {
    fixingDate: moment(index === 0 ? formValues[ids.FIXING_DATE_1] : formValues[ids.FIXING_DATE_2])
      .format('YYYY-MM-DD'),
    publishDate: moment(index === 0 ? formValues[ids.PUBLISH_DATE_1] : formValues[ids.PUBLISH_DATE_2])
      .format('YYYY-MM-DD'),
    spotDate,
  };
};

/**
 * Take the antD form values and map them to 3 counterparties
 *
 * @param {Object} formValues the values passed from the antD form
 * @returns {Object} the ndf 3 counterparties JSON
 */
const mapCp2 = (formValues) => {
  const cp2BuyerHasAgent = doesArrayExistWithValue(formValues[ids.CP2_BUYER_CLIENT_TRADER], 1)
    && formValues[ids.CP2_BUYER_CLIENT_TRADER][1] === ids.IS_AGENT;

  const cp2SellerHasAgent = doesArrayExistWithValue(formValues[ids.CP2_SELLER_CLIENT_TRADER], 1)
    && formValues[ids.CP2_SELLER_CLIENT_TRADER][1] === ids.IS_AGENT;

  let cp2Buyer = null;
  let cp2Seller = null;

  if (formValues.cp2BuyerClientTrader && formValues.cp2BuyerBroker && formValues.cp2SellerClientTrader && formValues.cp2SellerBroker) {
    cp2Buyer = {
      tradingCustomerGcdId: formValues.cp2BuyerClientTrader[0],
      brokerGcdPostingId: formValues.cp2BuyerBroker[1],
      traderGcdPostingId: cp2BuyerHasAgent ? null : Number(formValues.cp2BuyerClientTrader[1].split(',')[0]),
      executingCustomerGcdId: cp2BuyerHasAgent ? null : Number(formValues.cp2BuyerClientTrader[1].split(',')[1]),
      agentCustomerGcdId: cp2BuyerHasAgent ? formValues[ids.CP2_BUYER_AGENT] : null,
      brokerageStrategy: getBrokerageStrategy(formValues),
    };

    cp2Seller = {
      tradingCustomerGcdId: Number(formValues.cp2SellerClientTrader[0]),
      brokerGcdPostingId: formValues.cp2SellerBroker[1],
      traderGcdPostingId: cp2SellerHasAgent ? null : Number(formValues.cp2SellerClientTrader[1].split(',')[0]),
      executingCustomerGcdId: cp2SellerHasAgent ? null : Number(formValues.cp2SellerClientTrader[1].split(',')[1]),
      agentCustomerGcdId: cp2SellerHasAgent ? formValues[ids.CP2_SELLER_AGENT] : null,
      brokerageStrategy: getBrokerageStrategy(formValues),
    };
  }

  return { cp2Buyer, cp2Seller };
};

/**
 * Take the antD form values and map them to a ndf execution chain
 *
 * @param {Object} formValues the values passed from the antD form
 * @returns {Object} the execution chain JSON
 */
const mapFormToNdfChain = (formValues) => {
  const buyer = mapBuyer(formValues);
  const seller = mapSeller(formValues);
  const { executionChain = {}, tradeEconomics = {} } = mapDeal(formValues);
  const { cp2Buyer, cp2Seller } = mapCp2(formValues);
  const { far, near } = formValues[ids.FORWARD_START];
  const deals = [];
  const ndfDealCommonProps = { dealGroupId: 1, points: formValues[ids.POINTS], forwardStart: near };

  switch (formValues[ids.STRATEGY]) {
    case strategies.NDF.OUTRIGHT: {
      const leg = {
        ...ndfDealCommonProps,
        trades: [{
          ...mapNdfTradeDates(formValues),
          ...mapTradeEconomics(tradeEconomics, buyer, seller),
          ...mapLeg(formValues, 0),
          ...mapTerms(formValues),
        }],
      };

      deals.push(leg);

      break;
    }
    case strategies.NDF.SPREAD: {
      let newBuyer = cp2Buyer ? buyer : seller;
      let newSeller = cp2Seller ? seller : buyer;

      const leg1 = {
        ...ndfDealCommonProps,
        trades: [{
          ...mapNdfTradeDates(formValues),
          ...mapTradeEconomics(tradeEconomics, newBuyer, newSeller),
          ...mapTerms(formValues),
          ...mapLeg(formValues, 0),
        }],
      };

      newBuyer = cp2Buyer || buyer;
      newSeller = cp2Seller || seller;

      const leg2 = {
        ...ndfDealCommonProps,
        dealGroupId: 2,
        forwardStart: far,
        trades: [{
          ...mapNdfTradeDates(formValues, 1),
          ...mapTradeEconomics(tradeEconomics, newBuyer, newSeller),
          ...mapTerms(formValues, 1),
          ...mapLeg(formValues, 1),
        }],
      };

      deals.push(leg1, leg2);

      break;
    }
    default:
      throw Error('Could not create deal for strategy.');
  }

  return { ...executionChain, deals: [...deals] };
};

export default mapFormToNdfChain;
