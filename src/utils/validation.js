import * as _ from 'lodash';
import { ids, MAX_LIMITS, strategies } from './constants';

export const validationStates = {
  [ids.BUYER_AGENT]: { status: 'success', message: '' },
  [ids.SELLER_AGENT]: { status: 'success', message: '' },
  [ids.CP2_BUYER_AGENT]: { status: 'success', message: '' },
  [ids.CP2_SELLER_AGENT]: { status: 'success', message: '' },
  [ids.BUYER_CLIENT_TRADER]: { status: 'success', message: '' },
  [ids.SELLER_CLIENT_TRADER]: { status: 'success', message: '' },
  [ids.CP2_BUYER_CLIENT_TRADER]: { status: 'success', message: '' },
  [ids.CP2_SELLER_CLIENT_TRADER]: { status: 'success', message: '' },
};

export const clientTraderValidation = (value, id) => {
  if (!value || value.length === 0) {
    validationStates[id].status = 'error';
    validationStates[id].message = 'Client/Trader is required.';
  }
};

const instantValidationRules = {
  [ids.BUYER_CLIENT_TRADER]: [clientTraderValidation],
  [ids.SELLER_CLIENT_TRADER]: [clientTraderValidation],
  [ids.CP2_BUYER_CLIENT_TRADER]: [clientTraderValidation],
  [ids.CP2_SELLER_CLIENT_TRADER]: [clientTraderValidation],
};

export const resetValidationForId = (propertyId) => {
  validationStates[propertyId] = { status: 'success', message: '' };
};

export const resetCounterpartyValidation = () => {
  Object.keys(validationStates).forEach((propertyName) => {
    validationStates[propertyName] = { status: 'success', message: '' };
  });
};

const isAgentWithTraderValid = (values) => {
  let isValid = true;
  const propNames = ['buyer', 'seller'];
  if (values.strategy === strategies.NDF.SPREAD) {
    propNames.push('cp2Buyer', 'cp2Seller');
  }

  for (let index = 0; index < propNames.length; index += 1) {
    const property = propNames[index];
    if (values[`${property}ClientTrader`] && values[`${property}ClientTrader`][1] === ids.IS_AGENT && !values[`${property}Agent`]) {
      validationStates[`${property}Agent`] = { status: 'error', message: 'Pick an agent' };
      isValid = false;
    }
    if (values[`${property}ClientTrader`] && values[`${property}ClientTrader`][1] !== ids.IS_AGENT && values[`${property}Agent`]) {
      validationStates[`${property}ClientTrader`] = { status: 'error', message: 'Choose agent as trader' };
      isValid = false;
    }
  }
  return isValid;
};

const isInstantValidationPassing = (values) => {
  Object.keys(values).forEach((property) => {
    if (instantValidationRules[property]) {
      instantValidationRules[property].forEach((validation) => validation(values[property], property));
    }
  });
};

export const reset3CpsValidation = () => {
  validationStates[ids.BUYER_CLIENT_TRADER] = { status: 'success', message: '' };
  validationStates[ids.SELLER_CLIENT_TRADER] = { status: 'success', message: '' };
  validationStates[ids.CP2_BUYER_CLIENT_TRADER] = { status: 'success', message: '' };
  validationStates[ids.CP2_SELLER_CLIENT_TRADER] = { status: 'success', message: '' };
};

const is3CpsEnabledAndHasValidData = (values) => {
  if (values.cp2BuyerClientTrader) {
    const clientTraderArray = [];
    if (values[ids.BUYER_CLIENT_TRADER]) {
      clientTraderArray.push((values[ids.BUYER_CLIENT_TRADER])[0]);
    }
    if (values[ids.SELLER_CLIENT_TRADER]) {
      clientTraderArray.push((values[ids.SELLER_CLIENT_TRADER])[0]);
    }
    if (values[ids.CP2_BUYER_CLIENT_TRADER]) {
      clientTraderArray.push((values[ids.CP2_BUYER_CLIENT_TRADER])[0]);
    }
    if (values[ids.CP2_SELLER_CLIENT_TRADER]) {
      clientTraderArray.push((values[ids.CP2_SELLER_CLIENT_TRADER])[0]);
    }

    if (_.uniq(clientTraderArray).length !== 3) {
      validationStates[ids.BUYER_CLIENT_TRADER] = { status: 'error', message: 'Choose 3 different Counterparties for 3 CPs' };
      validationStates[ids.SELLER_CLIENT_TRADER] = { status: 'error', message: 'Choose 3 different Counterparties for 3 CPs' };
      validationStates[ids.CP2_BUYER_CLIENT_TRADER] = { status: 'error', message: 'Choose 3 different Counterparties for 3 CPs' };
      validationStates[ids.CP2_SELLER_CLIENT_TRADER] = { status: 'error', message: 'Choose 3 different Counterparties for 3 CPs' };
      return false;
    }
    reset3CpsValidation();
  }
  return true;
};

export const isSubmitValid = (values) => {
  is3CpsEnabledAndHasValidData(values);
  isAgentWithTraderValid(values);
  isInstantValidationPassing(values);

  return Object.keys(validationStates).every((field) => {
    if (validationStates[field].status !== 'success') {
      return false;
    }
    return true;
  });
};

export const isInputNumberValid = (fieldType, inputValue, dealType, decimals) => {
  const status = { isValid: true, message: 'Valid' };

  if (inputValue) {
    let dealStr = dealType;
    if (dealType === 'OUT') {
      dealStr = 'FWD';
    }
    try {
      const limitKey = MAX_LIMITS[dealStr][fieldType];
      const valArr = Math.abs(inputValue).toString().split('.');
      const integerLength = valArr[0].length;
      const precision = valArr[1] ? valArr[1].length : 0;
      const maxPrecision = decimals >= 0 ? decimals : limitKey.PRECISION;
      if (integerLength > limitKey.INTEGER) {
        status.isValid = false;
        status.message = `Maximum ${limitKey.INTEGER} digits allowed before decimal point`;
      } else if (precision > maxPrecision) {
        status.isValid = false;
        status.message = `Maximum ${maxPrecision} digits allowed after decimal point`;
      }
    } catch (err) {
      // Have MAX_LIMITS been set for dealType?
      throw new Error(`Error validating ${fieldType} for ${dealType}.`);
    }
  }

  return status;
};
