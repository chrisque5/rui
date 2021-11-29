import { combineReducers } from 'redux';
import agents from './agentReducer';
import blotter from './blotterReducer';
import brokers from './brokerReducer';
import brokerUpdateStatus from './brokerUpdateReducer';
import clients from './clientReducer';
import currencies from './currencyReducer';
import dates from './dateReducer';
import deal from './dealReducer';
import originalDeal from './originalDealReducer';
import desks from './deskReducer';
import executionVenues from './executionVenueReducer';
import gcdBrokers from './gcdBrokerReducer';
import rates from './rateReducer';
import ui from './uiReducer';
import user from './userReducer';
import systemSettings from './systemSettingsReducer';
import sse from './sseReducer';
import brokerageStrategies from './brokerageStrategyReducer';

const rootReducer = combineReducers({
  agents,
  blotter,
  brokers,
  brokerUpdateStatus,
  clients,
  currencies,
  dates,
  deal,
  originalDeal,
  desks,
  executionVenues,
  gcdBrokers,
  rates,
  ui,
  user,
  systemSettings,
  sse,
  brokerageStrategies,
});

export default rootReducer;
