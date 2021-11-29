import moment from 'moment';
import { dealTypes, ids, strategies } from '../constants';
import { doesArrayExistWithValue, dayDifferenceIgnoreHours } from '../helper';

const getDurationPeriod = (value) => {
  const valueWithoutNumbers = value.replace(/[0-9]/g, '');
  const zeroDayTerms = ['IMM', 'BMF', 'TOM', 'TOD', 'ON', 'TN', 'SN'];

  return zeroDayTerms.includes(valueWithoutNumbers) ? 'D' : value.slice(-1);
};

const getDurationMultiplier = (value, dayCount) => {
  const valueWithoutNumbers = value.replace(/[0-9]/g, '');
  const zeroDayTerms = ['TOM', 'TOD', 'ON', 'TN', 'SN'];

  if (value.startsWith('IMM') || value.startsWith('BMF')) {
    return dayCount;
  }

  return zeroDayTerms.includes(valueWithoutNumbers) ? '0' : value.slice(0, -1);
};

const getTradeDate = (formValues) => {
  const isBackDated = formValues[ids.IS_TRADE_DATE_ENABLED];
  let newTradeDate = new Date().toISOString();

  if (isBackDated) {
    const tradeDate = formValues[ids.TRADE_DATE];
    const tradeTime = formValues[ids.TRADE_TIME];

    if (tradeDate !== null && tradeTime !== null) {
      newTradeDate = moment(tradeDate);
      const tradeTimeUtc = moment(tradeTime);

      // set time on selected date and to UTC
      newTradeDate.set({
        hour: tradeTimeUtc.get('hour'),
        minute: tradeTimeUtc.get('minute'),
        second: tradeTimeUtc.get('second'),
      }).utc();
    }
  }

  return {
    tradeTime: newTradeDate,
    isBackDated,
  };
};

const mapDeal = (formValues) => {
  const { isBackDated, tradeTime } = getTradeDate(formValues);
  const {
    primaryExerciseCurrencies = '',
    secondaryExerciseCurrencies = '',
    primaryDeliveryCurrencies = '',
    secondaryDeliveryCurrencies = '',
  } = formValues.currencyPair || {};

  return {
    executionChain: {
      strategy: formValues[ids.STRATEGY].toLowerCase(),
      dealType: formValues[ids.DEAL_TYPE],
      tradeTime,
      isBackDated,
      instrumentId: formValues[ids.INSTRUMENT_ID],
      volumeMatch: formValues[ids.VOLUME_MATCH] || false,
    },
    tradeEconomics: {
      currency1: formValues[ids.CURRENCY_1],
      currency2: formValues[ids.CURRENCY_2],
      primaryExerciseCurrencies,
      secondaryExerciseCurrencies,
      primaryDeliveryCurrencies,
      secondaryDeliveryCurrencies,
      dealtCurrency: formValues[ids.DEALT_CURRENCY],
      executionVenue: formValues[ids.EXECUTION_VENUE],
      settlementCurrency: formValues[ids.CURRENCY_1],
    },
  };
};

const hasAgent = (formValues, party) => doesArrayExistWithValue(formValues[party], 1) && formValues[party][1] === ids.IS_AGENT;
const getBrokerageStrategy = (formValues) => (formValues[ids.STRATEGY] === strategies.NDF.SPREAD ? formValues[ids.BROKERAGE_STRATEGY] : null);

const mapBuyer = (formValues) => {
  const buyer = {
    tradingCustomerGcdId: formValues[ids.BUYER_CLIENT_TRADER][0],
    brokerGcdPostingId: formValues[ids.BUYER_BROKER][1],
    traderGcdPostingId: hasAgent(formValues, ids.BUYER_CLIENT_TRADER) ? null : Number(formValues[ids.BUYER_CLIENT_TRADER][1].split(',')[0]),
    executingCustomerGcdId: hasAgent(formValues, ids.BUYER_CLIENT_TRADER) ? null : Number(formValues[ids.BUYER_CLIENT_TRADER][1].split(',')[1]),
    agentCustomerGcdId: hasAgent(formValues, ids.BUYER_CLIENT_TRADER) ? formValues[ids.BUYER_AGENT] : null,
    brokerageStrategy: getBrokerageStrategy(formValues),
  };

  if (formValues[ids.DEAL_TYPE] === dealTypes.FWD) {
    buyer.nettBrokerageCharge = formValues[ids.BUYER_NETT_BROKERAGE] ? formValues[ids.BUYER_NETT_BROKERAGE] : false;
  }

  return buyer;
};

const mapSeller = (formValues) => {
  const seller = {
    tradingCustomerGcdId: Number(formValues[ids.SELLER_CLIENT_TRADER][0]),
    brokerGcdPostingId: formValues[ids.SELLER_BROKER][1],
    traderGcdPostingId: hasAgent(formValues, ids.SELLER_CLIENT_TRADER) ? null : Number(formValues[ids.SELLER_CLIENT_TRADER][1].split(',')[0]),
    executingCustomerGcdId: hasAgent(formValues, ids.SELLER_CLIENT_TRADER) ? null : Number(formValues[ids.SELLER_CLIENT_TRADER][1].split(',')[1]),
    agentCustomerGcdId: hasAgent(formValues, ids.SELLER_CLIENT_TRADER) ? formValues[ids.SELLER_AGENT] : null,
    brokerageStrategy: getBrokerageStrategy(formValues),
  };

  if (formValues[ids.DEAL_TYPE] === dealTypes.FWD) {
    seller.nettBrokerageCharge = formValues[ids.SELLER_NETT_BROKERAGE] ? formValues[ids.SELLER_NETT_BROKERAGE] : false;
  }

  return seller;
};

const mapLeg = (formValues, index) => ({
  valueDate: moment(formValues[!index ? ids.VALUE_DATE_1 : ids.VALUE_DATE_2]).format('YYYY-MM-DD'),
  price: formValues[!index ? ids.RATE_1 : ids.RATE_2],
  dayCount: formValues[!index ? ids.DAY_COUNT_1 : ids.DAY_COUNT_2],
  notionalAmount: Number(formValues[!index ? ids.AMOUNT_1 : ids.AMOUNT_2].replace(/(,*)/g, '')),
  CLS: formValues[!index ? ids.CLS_1 : ids.CLS_2],
});

const mapTerms = (formValues, index = 0) => {
  let durationPeriod;
  let durationMultiplier;
  let displayTenor;
  let term;

  switch (formValues[ids.STRATEGY]) {
    case strategies.FWD.FORWARD:
      if (['ON', 'SN', 'TN'].includes(formValues[ids.TERM_1])) {
        durationPeriod = 'D';
        durationMultiplier = index === 0 ? `${formValues[ids.DAY_COUNT_1]}` : `${formValues[ids.DAY_COUNT_2]}`;
        if (durationMultiplier < 0) durationMultiplier = 0;
        displayTenor = formValues[ids.TERM_1];
      } else {
        term = index === 0 ? `${dayDifferenceIgnoreHours(formValues[ids.VALUE_DATE_1], moment(formValues[ids.SPOT_DATE]))}D` : formValues[ids.TERM_1];
        durationPeriod = getDurationPeriod(term);
        durationMultiplier = getDurationMultiplier(term, formValues[ids.DAY_COUNT_2]);
        displayTenor = term;
      }
      break;
    case strategies.FWD.OUTRIGHT:
    case strategies.FWD.FORWARD_FORWARD:
    case strategies.NDF.OUTRIGHT:
    case strategies.NDF.SPREAD: {
      term = index === 0 ? formValues[ids.TERM_1] : formValues[ids.TERM_2];
      const dayCount = index === 0 ? formValues[ids.DAY_COUNT_1] : formValues[ids.DAY_COUNT_2];

      displayTenor = term;
      durationMultiplier = getDurationMultiplier(term, dayCount);
      durationPeriod = getDurationPeriod(term);

      break;
    }
    default:
      throw Error('Could not map terms. Invalid strategy.');
  }

  return {
    durationPeriod,
    durationMultiplier,
    displayTenor,
  };
};

const mapTradeEconomics = (tradeEconomics, buyer, seller) => ({
  tradeEconomics: {
    ...tradeEconomics,
    payer: {
      ...buyer,
    },
    receiver: {
      ...seller,
    },
  },
});

export {
  mapBuyer, mapDeal, mapSeller, mapLeg,
  mapTerms, mapTradeEconomics, getBrokerageStrategy,
};
