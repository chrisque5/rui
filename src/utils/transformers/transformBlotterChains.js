import moment from 'moment';
import {
  dateFormatter, timeFormatter, valueDateFormatter, fixingDateFormatter, publishDateFormatter,
} from '../agGrid/index';
import { blotterApprovalsMap, blotterStpStatusesMap, ids } from '../constants';
/**
 * Calculate the approval states
 * If > 1 rejected then it's rejected
 * Else If > 1 pending then pending
 * Else all 3 approved then approved
 * @param {Array} states the approval states
 * @returns {string} the approval state
 */
const calcOveralApprovalStatus = (states) => {
  const {
    APPROVED: { value: approvedValue },
    PENDING: { value: pendingValue },
    REJECTED: { value: rejectedValue },
  } = blotterApprovalsMap;

  if (states.includes(rejectedValue)) {
    return rejectedValue;
  }

  if (states.includes(pendingValue)) {
    return pendingValue;
  }

  return states.every((e) => e === approvedValue) ? approvedValue : '';
};

/**
 * Transform a trade into something usable by the UI
 * @param {Object} trade the trade details
 * @returns {Object} the transformed trade
 */
const transformTrade = (trade) => {
  const {
    valueDate,
    publishDate,
    fixingDate,
    notionalAmount,
    tradeStrategy,
    tradeEconomics: {
      payer: {
        brokerage: {
          amount: payerBrokerageAmount = '',
          currency: payerBrokerageCurrency = '',
          stdAmount: payerBrokerageStdAmount = '',
          stdCurrency: payerBrokerageStdCurrency = '',
        } = {},
        tradingCustomerName: payerCustomerName,
        tradingCustomerLongName: payerCustomerLongName,
        brokerGcdPostingName: payerBrokerName,
        brokerGcdPostingFullName: payerBrokerLongName,
        brokerDeskId: payerBrokerDeskId,
        traderGcdPostingName: payerTraderName,
        traderGcdPostingFullName: payerTraderLongName,
        agentCustomerGcdName: payerThirdPartyAgentName,
        strategyId: payerStrategyId,
      },
      receiver: {
        brokerage: {
          amount: receiverBrokerageAmount = '',
          currency: receiverBrokerageCurrency = '',
          stdAmount: receiverBrokerageStdAmount = '',
          stdCurrency: receiverBrokerageStdCurrency = '',
        } = {},
        tradingCustomerName: receiverCustomerName,
        tradingCustomerLongName: receiverCustomerLongName,
        brokerGcdPostingName: receiverBrokerName,
        brokerGcdPostingFullName: receiverBrokerLongName,
        brokerDeskId: receiverBrokerDeskId,
        traderGcdPostingName: receiverTraderName,
        traderGcdPostingFullName: receiverTraderLongName,
        agentCustomerGcdName: receiverThirdPartyAgentName,
        strategyId: receiverStrategyId,
      },
    },
  } = trade;

  return {
    valueDate,
    fixingDate,
    publishDate,
    notionalAmount,
    payerBrokerageCurrency,
    payerBrokerageAmount,
    payerBrokerageStdAmount,
    payerBrokerageStdCurrency,
    payerCustomerName,
    payerCustomerLongName,
    payerBrokerName,
    payerBrokerLongName,
    payerBrokerDeskId,
    payerTraderName,
    payerTraderLongName,
    payerThirdPartyAgentName,
    payerStrategyId,
    receiverBrokerageAmount,
    receiverBrokerageCurrency,
    receiverBrokerageStdAmount,
    receiverBrokerageStdCurrency,
    receiverCustomerName,
    receiverCustomerLongName,
    receiverBrokerName,
    receiverBrokerLongName,
    receiverBrokerDeskId,
    receiverTraderName,
    receiverTraderLongName,
    receiverThirdPartyAgentName,
    receiverStrategyId,
    tradeStrategy,
  };
};

/**
 * Transform a deal into something usable by the UI
 * @param {string} chainId the chain id
 * @param {Object} deal the deal details
 * @param {string} dealType the deal type
 * @param {Object} tradeTime the deal trade time
 * @returns {Object} the transformed deal
 */
const transformDeal = ({
  chainId, deal, dealType, tradeTime,
}) => {
  const {
    dmsDealReference,
    dealAction,
    dealEntityId,
    dealStatus,
    points,
    payerSTPStatus,
    receiverSTPStatus,
    executionVenueType,
    isDealUnderInvestigation,
    investigatingUserFullName,
    investigatingTime,
    lockSequence,
    payerApproval: {
      brokerApprovalState: payerBrokerApprovalState,
      midOfficeApprovalState: payerMidOfficeApprovalState,
      traderApprovalState: payerTraderApprovalState,
    },
    receiverApproval: {
      brokerApprovalState: receiverBrokerApprovalState,
      midOfficeApprovalState: receiverMidOfficeApprovalState,
      traderApprovalState: receiverTraderApprovalState,
    },
    trades,
  } = deal;

  // sort to keep near/far legs in order
  trades.sort((a, b) => a.indexPosition - b.indexPosition);

  const [trade1, trade2] = trades;

  const {
    valueDate,
    fixingDate,
    publishDate,
    notionalAmount,
    payerBrokerageCurrency,
    payerBrokerageAmount,
    payerBrokerageStdAmount,
    payerBrokerageStdCurrency,
    payerCustomerName,
    payerCustomerLongName,
    payerBrokerName,
    payerBrokerLongName,
    payerBrokerDeskId,
    payerTraderName,
    payerTraderLongName,
    payerThirdPartyAgentName,
    payerStrategyId,
    receiverBrokerageAmount,
    receiverBrokerageCurrency,
    receiverBrokerageStdAmount,
    receiverBrokerageStdCurrency,
    receiverCustomerName,
    receiverCustomerLongName,
    receiverBrokerName,
    receiverBrokerLongName,
    receiverBrokerDeskId,
    receiverTraderName,
    receiverTraderLongName,
    receiverThirdPartyAgentName,
    receiverStrategyId,
    tradeStrategy,
  } = transformTrade(trade1);

  // if more than 1 trade its fwd/fwdfwd so use far leg strategies
  let tradeStrategyToUse = tradeStrategy;
  let payerStrategyIdToUse = payerStrategyId;
  let receiverStrategyIdToUse = receiverStrategyId;
  let notionalAmountToUse = notionalAmount;
  let valueDateToUse = valueDate;
  if (trades.length > 1) {
    tradeStrategyToUse = trade2.tradeStrategy;
    notionalAmountToUse = trade2.notionalAmount;
    valueDateToUse = trade2.valueDate;
    const {
      payerStrategyId: payerStrategyIdTrade2,
      receiverStrategyId: receiverStrategyIdTrade2,
      tradeStrategy: tradeStrategyTrade2,
    } = transformTrade(trade2);

    payerStrategyIdToUse = payerStrategyIdTrade2;
    receiverStrategyIdToUse = receiverStrategyIdTrade2;
    tradeStrategyToUse = tradeStrategyTrade2;
  }

  const { title: payerSTPStatusGroupTitle = '' } = blotterStpStatusesMap[payerSTPStatus] || {};
  const { title: receiverSTPStatusGroupTitle = '' } = blotterStpStatusesMap[receiverSTPStatus] || {};

  return {
    chainId,
    dmsDealReference,
    dealEntityId,
    dealType,
    tradeStrategy: tradeStrategyToUse,
    tradeDate: dateFormatter({ value: tradeTime }),
    tradeDateTimeMilli: moment(tradeTime).valueOf(),
    tradeTime: timeFormatter({ value: tradeTime }),
    dealAction,
    dealStatus,
    executionVenueType,
    valueDate: valueDateFormatter({ value: valueDateToUse }),
    fixingDate: fixingDateFormatter({ value: fixingDate }),
    publishDate: publishDateFormatter({ value: publishDate }),
    price: points,
    notionalAmount: notionalAmountToUse,
    isDealUnderInvestigation,
    investigatingUserFullName,
    investigatingTime,
    lockSequence,
    payerSTPStatus,
    payerSTPStatusGroup: payerSTPStatusGroupTitle,
    payerBrokerageCurrency,
    payerBrokerageAmount,
    payerBrokerageStdAmount,
    payerBrokerageStdCurrency,
    payerCustomerName,
    payerCustomerLongName,
    payerBrokerName,
    payerBrokerLongName,
    payerBrokerDeskId,
    payerTraderName,
    payerTraderLongName,
    payerThirdPartyAgentName,
    payerStrategyId: payerStrategyIdToUse,
    receiverSTPStatus,
    receiverSTPStatusGroup: receiverSTPStatusGroupTitle,
    receiverBrokerageAmount,
    receiverBrokerageCurrency,
    receiverBrokerageStdCurrency,
    receiverBrokerageStdAmount,
    receiverCustomerName,
    receiverCustomerLongName,
    receiverBrokerName,
    receiverBrokerLongName,
    receiverBrokerDeskId,
    receiverTraderName,
    receiverTraderLongName,
    receiverThirdPartyAgentName,
    receiverStrategyId: receiverStrategyIdToUse,
    payerOverallApprovalStatus:
      calcOveralApprovalStatus([payerBrokerApprovalState, payerMidOfficeApprovalState, payerTraderApprovalState]),
    payerBrokerApprovalState,
    payerMidOfficeApprovalState,
    payerTraderApprovalState,
    receiverOverallApprovalStatus:
      calcOveralApprovalStatus([receiverBrokerApprovalState, receiverMidOfficeApprovalState, receiverTraderApprovalState]),
    receiverBrokerApprovalState,
    receiverMidOfficeApprovalState,
    receiverTraderApprovalState,
  };
};

/**
 * Transform a blotter chain to one or more deals
 * @param {Object} chain the chain to process
 * @returns {Array} the array of deals
 * */
const transformBlotterChain = (chain = {}) => {
  const {
    chainId,
    dealType,
    deals = [],
    tradeTime,
  } = chain;

  if (!deals.length) {
    return [];
  }

  return deals.map((deal) => transformDeal({
    chainId,
    deal,
    dealType,
    tradeTime,
  }));
};

/**
 * Transform blotter chains to one or more deals
 * @param {Array} chains the chains to process
 * @returns {Array} the array of transformed chain to deals
 */
const transformBlotterChains = (chains = [], searchParams = {}) => {
  if (!chains.length) {
    return [];
  }

  const chainToDeals = [];

  for (let i = 0; i <= chains.length; i += 1) {
    const transformedChain = transformBlotterChain(chains[i]);

    for (let j = 0; j < transformedChain.length; j += 1) {
      chainToDeals.push(transformedChain[j]);
    }
  }

  // if there's more than 1 deal sort by the tradeTimeMilli
  if (chainToDeals.length > 1) {
    chainToDeals.sort((a, b) => b.tradeDateTimeMilli - a.tradeDateTimeMilli);
  }
  const blotterDeals = [...chainToDeals];
  const brokerSearchTxt = searchParams[ids.BROKER] ? searchParams[ids.BROKER].toLowerCase() : null;
  const customerSearchTxt = searchParams[ids.CUSTOMER] ? searchParams[ids.CUSTOMER].toLowerCase() : null;
  const traderSearchTxt = searchParams[ids.TRADER] ? searchParams[ids.TRADER].toLowerCase() : null;

  if (brokerSearchTxt || customerSearchTxt || traderSearchTxt) {
    return blotterDeals.filter((deal) => {
      const {
        payerBrokerName, payerBrokerLongName, receiverBrokerName, receiverBrokerLongName,
        payerCustomerName, payerCustomerLongName, receiverCustomerName, receiverCustomerLongName,
        payerTraderName, payerTraderLongName, receiverTraderName, receiverTraderLongName,
      } = deal;

      const broker = `${payerBrokerName},${payerBrokerLongName},${receiverBrokerName},${receiverBrokerLongName}`.toLowerCase();
      const customer = `${payerCustomerName},${payerCustomerLongName},${receiverCustomerName},${receiverCustomerLongName}`.toLowerCase();
      const trader = `${payerTraderName},${payerTraderLongName},${receiverTraderName},${receiverTraderLongName}`.toLowerCase();

      let brokerExists = true;
      let customerExists = true;
      let traderExists = true;

      if (brokerSearchTxt) {
        brokerExists = broker.indexOf(brokerSearchTxt) !== -1;
      }

      if (customerSearchTxt) {
        customerExists = customer.indexOf(customerSearchTxt) !== -1;
      }

      if (traderSearchTxt) {
        traderExists = trader.indexOf(traderSearchTxt) !== -1;
      }

      return brokerExists && customerExists && traderExists;
    });
  }
  return blotterDeals;
};

export default transformBlotterChains;
