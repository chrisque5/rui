import * as _ from 'lodash';
import { doesArrayExistWithValue, isValidTerm, filterSpotExecutionVenues } from './helper';
import { specialTermsPerStrategy, dealTypes } from './constants';

export const isInScope = (favItem, scopes, selectedBroker) => {
  if (!scopes) return false;
  if (_.isEmpty(scopes)) return true;

  const favorite = favItem;
  if (scopes.currencyScope) {
    const favoriteForBroker = _.find(scopes.currencyScope, { deskBroker: selectedBroker });
    const matchedScope = _.find(favoriteForBroker.currencyScope, { baseCurrency: favorite.baseCurrency, counterCurrency: favorite.counterCurrency });
    if (matchedScope) return matchedScope.allowedInScope;
  }

  if (scopes.termScope) {
    if (favorite.valueDate) return true;
    const favoriteForBroker = _.find(scopes.termScope, { deskBroker: selectedBroker });
    const matchedScope = _.find(favoriteForBroker.termScope, { term: favorite.term });
    if (matchedScope) return matchedScope.allowedInScope;
  }

  if (scopes.counterPartyScope) {
    const favoriteForBroker = _.find(scopes.counterPartyScope, { deskBroker: selectedBroker });
    const matchedScope = favoriteForBroker.counterPartyScope.find((aCounterPartyScope) => {
      const hasFound = _.isEqual(
        _.pick(aCounterPartyScope.favoriteClient, ['traderPostingId', 'tradingCustomerId', 'executingCustomerId']),
        _.pick(favorite, ['traderPostingId', 'tradingCustomerId', 'executingCustomerId']),
      );

      return hasFound;
    });

    if (matchedScope) return matchedScope.allowedInScope;
  }

  if (scopes.executionVenueScope) {
    const favoriteForBroker = _.find(scopes.executionVenueScope, { deskBroker: selectedBroker });
    const matchedScope = _.find(favoriteForBroker.executionVenueScope, { executionVenue: favorite.executionVenue });
    if (matchedScope) return matchedScope.allowedInScope;
  }

  return false;
};

export const getCurrencyScope = (curr, preferences = {}) => {
  const { preferredBrokers = [] } = preferences;

  return preferredBrokers.map((favoriteItem) => {
    if (!favoriteItem.favourites) return null;

    const currencyScope = favoriteItem.favourites.currencyPairs.map((currencyPair) => {
      let allowedInScope = false;
      if (doesArrayExistWithValue(curr)
        && _.find(curr, { baseCurrency: currencyPair.baseCurrency, counterCurrency: currencyPair.counterCurrency })) {
        allowedInScope = true;
      }
      return { baseCurrency: currencyPair.baseCurrency, counterCurrency: currencyPair.counterCurrency, allowedInScope };
    });
    return { currencyScope, deskBroker: `${favoriteItem.deskId},${favoriteItem.id}` };
  });
};

export const getTermScope = (preferences = {}, currentStrategy, currentDealType) => {
  if (!currentStrategy && !currentDealType) return null;
  const { terms = [] } = specialTermsPerStrategy.find((o) => o.dealType === currentDealType && o.strategy === currentStrategy) || [];

  const { preferredBrokers = [] } = preferences;

  return preferredBrokers.map((favoriteItem) => {
    if (!favoriteItem.favourites) return null;

    const termScope = favoriteItem.favourites.terms.map((termItem) => {
      if (termItem.valueDate) return { term: termItem.valueDate, allowedInScope: true }; // let through any valueDates as term

      let allowedInScope = false;
      if (termItem.term && isValidTerm(termItem.term, terms) && currentDealType !== dealTypes.SPT) {
        allowedInScope = true;
      }
      return { term: termItem.term, allowedInScope };
    });
    return { termScope, deskBroker: `${favoriteItem.deskId},${favoriteItem.id}` };
  });
};

export const getCounterPartyScope = (brokers, agents, clients, preferences) => {
  if (!doesArrayExistWithValue(brokers)) return null;

  return preferences.preferredBrokers.map((favoriteItem) => {
    if (!favoriteItem.favourites) return null;

    const matchedBroker = _.find(brokers, { id: favoriteItem.id, deskId: favoriteItem.deskId });
    const counterPartyScope = favoriteItem.favourites.clients.map((favoriteClient) => {
      if (!matchedBroker) {
        return { favoriteClient, allowedInScope: false };
      }

      const matchedTradingCustomer = _.find(clients, {
        tradingCustomerId: favoriteClient.tradingCustomerId,
      });
      if (!matchedTradingCustomer) {
        return { favoriteClient, allowedInScope: false };
      }

      if (favoriteClient.agentCustomerId > 0 && favoriteClient.executingCustomerId === 0 && favoriteClient.traderPostingId === 0) {
        // Agent available
        const matchedAgent = _.find(agents, {
          id: favoriteClient.agentCustomerId,
        });
        if (!matchedAgent) {
          return { favoriteClient, allowedInScope: false };
        }
      } else {
        // Trader + Exec. customer available
        const matchedTrader = _.find(matchedTradingCustomer.traders, {
          traderPostingId: favoriteClient.traderPostingId,
          executingCustomerId: favoriteClient.executingCustomerId,
        });
        if (!matchedTrader) {
          return { favoriteClient, allowedInScope: false };
        }
      }
      return { favoriteClient, allowedInScope: true };
    });
    return { counterPartyScope, deskBroker: `${favoriteItem.deskId},${favoriteItem.id}` };
  });
};

export const getExecutionVenueScope = (execVenues, preferences = {}, currentDealType) => {
  const { preferredBrokers = [] } = preferences;

  const filteredExecVenues = currentDealType === dealTypes.SPT ? filterSpotExecutionVenues(execVenues) : execVenues;

  return preferredBrokers.map((favoriteItem) => {
    if (!favoriteItem.favourites) return null;

    const executionVenueScope = favoriteItem.favourites.executionVenues.map((executionVenue) => {
      let allowedInScope = false;
      if (doesArrayExistWithValue(filteredExecVenues)
        && _.find(filteredExecVenues, { venueId: executionVenue.executionVenue })) {
        allowedInScope = true;
      }
      return { executionVenue: executionVenue.executionVenue, allowedInScope };
    });
    return { executionVenueScope, deskBroker: `${favoriteItem.deskId},${favoriteItem.id}` };
  });
};
