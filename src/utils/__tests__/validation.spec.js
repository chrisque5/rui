import * as validation from '../validation';
import { ids, dealTypes, MAX_LIMITS } from '../constants';

const {
  validationStates,
} = validation;

const fieldType = 'RATE';
const mockValidReturn = { isValid: true, message: 'Valid' };
const mockValidNDFData = {
  strategy: 'Outright',
  executionVenue: 'TPSEF',
  volumeMatch: false,
  currency1: 'USD',
  currency2: 'CNY',
  dealtCurrency: 'USD',
  term1: '1M',
  rate1: 7.0252,
  amount1: '1,000,000',
  fixingDate1: '2020-03-30T16:00:00.000Z',
  valueDate1: '2020-04-01T16:00:00.000Z',
  publishDate1: '2020-03-30T16:00:00.000Z',
  dayCount1: 31,
  buyerClientTrader: [
    105844,
    '66088,143863',
  ],
  buyerBroker: [
    2039,
    13660,
  ],
  sellerClientTrader: [
    109056,
    '68385,109059',
  ],
  sellerBroker: [
    2039,
    13660,
  ],
};

const mock3CpsData = {
  strategy: 'Spread',
  executionVenue: 'TPSEF',
  volumeMatch: false,
  points: 0.008,
  term2: '1M',
  rate2: 7.0252,
  amount2: '1,000,000',
  fixingDate2: '2020-03-30T16:00:00.000Z',
  valueDate2: '2020-04-01T16:00:00.000Z',
  publishDate2: '2020-03-30T16:00:00.000Z',
  dayCount2: 31,
  cp2BuyerClientTrader: [
    105844,
    '66088,143863',
  ],
  cp2BuyerBroker: [
    2039,
    13660,
  ],
  cp2SellerClientTrader: [
    107558,
    '7750,104286',
  ],
  cp2SellerBroker: [
    2039,
    13660,
  ],
  currency1: 'USD',
  currency2: 'CNY',
  dealtCurrency: 'USD',
  rate1: '7.017200',
  amount1: '1,000,000',
  fixingDate1: '2020-03-04T16:00:00.000Z',
  valueDate1: '2020-03-08T16:00:00.000Z',
  publishDate1: '2020-03-04T16:00:00.000Z',
  dayCount1: 7,
  buyerClientTrader: [
    109056,
    '68385,109059',
  ],
  buyerBroker: [
    2039,
    13660,
  ],
  sellerClientTrader: [
    105844,
    '66088,143863',
  ],
  sellerBroker: [
    2039,
    13660,
  ],
  term1: '1W',
};

test('validationStates returns correct number of keys and values', () => {
  expect(Object.keys(validationStates).length).toEqual(8);

  expect(validationStates[ids.BUYER_AGENT].status).toEqual('success');
  expect(validationStates[ids.BUYER_AGENT].message).toEqual('');

  expect(validationStates[ids.SELLER_AGENT].status).toEqual('success');
  expect(validationStates[ids.SELLER_AGENT].message).toEqual('');

  expect(validationStates[ids.CP2_BUYER_AGENT].status).toEqual('success');
  expect(validationStates[ids.CP2_BUYER_AGENT].message).toEqual('');

  expect(validationStates[ids.CP2_SELLER_AGENT].status).toEqual('success');
  expect(validationStates[ids.CP2_SELLER_AGENT].message).toEqual('');

  expect(validationStates[ids.BUYER_CLIENT_TRADER].status).toEqual('success');
  expect(validationStates[ids.BUYER_CLIENT_TRADER].message).toEqual('');

  expect(validationStates[ids.SELLER_CLIENT_TRADER].status).toEqual('success');
  expect(validationStates[ids.SELLER_CLIENT_TRADER].message).toEqual('');

  expect(validationStates[ids.CP2_BUYER_CLIENT_TRADER].status).toEqual('success');
  expect(validationStates[ids.CP2_BUYER_CLIENT_TRADER].message).toEqual('');

  expect(validationStates[ids.CP2_SELLER_CLIENT_TRADER].status).toEqual('success');
  expect(validationStates[ids.CP2_SELLER_CLIENT_TRADER].message).toEqual('');
});

describe('validation.isSubmitValid', () => {
  test('returns true if no data for submission', () => {
    const response = validation.isSubmitValid({});
    expect(response).toEqual(true);
  });

  test('returns true for valid NDF data submission', () => {
    const response = validation.isSubmitValid(mockValidNDFData);
    expect(response).toEqual(true);
  });

  test('returns false for NDF data submission when Client/Trader and reset will clear the errors', () => {
    const mockNoClientTraderData = { ...mockValidNDFData };
    mockNoClientTraderData.buyerClientTrader = [];
    mockNoClientTraderData.buyerAgent = 103381;
    const response = validation.isSubmitValid(mockNoClientTraderData);
    expect(response).toEqual(false);
    expect(validation.validationStates[ids.BUYER_CLIENT_TRADER].message).toEqual('Client/Trader is required.');
    expect(validation.validationStates[ids.BUYER_CLIENT_TRADER].status).toEqual('error');
    validation.resetValidationForId(ids.BUYER_CLIENT_TRADER);
    expect(validation.validationStates[ids.BUYER_CLIENT_TRADER].message).toEqual('');
    expect(validation.validationStates[ids.BUYER_CLIENT_TRADER].status).toEqual('success');
  });

  test('returns false for NDF data submission when noAgentData and reset will clear the errors ', () => {
    const mockNoAgentData = { ...mockValidNDFData };
    mockNoAgentData.buyerClientTrader[1] = 'agent';
    const response = validation.isSubmitValid(mockNoAgentData);
    expect(response).toEqual(false);
    expect(validation.validationStates[ids.BUYER_AGENT].message).toEqual('Pick an agent');
    expect(validation.validationStates[ids.BUYER_AGENT].status).toEqual('error');
    validation.resetValidationForId(ids.BUYER_AGENT);
    expect(validation.validationStates[ids.BUYER_AGENT].message).toEqual('');
    expect(validation.validationStates[ids.BUYER_AGENT].status).toEqual('success');
  });

  test('returns false for NDF data submission when dont have diffrerent 3Cp\'s and reset will clear the errors', () => {
    const mockInvalid3Cps = { ...mock3CpsData };
    mockInvalid3Cps.cp2SellerClientTrader = mock3CpsData.buyerClientTrader;
    const response = validation.isSubmitValid(mockInvalid3Cps);
    expect(response).toEqual(false);
    expect(validation.validationStates[ids.BUYER_CLIENT_TRADER].message).toEqual('Choose 3 different Counterparties for 3 CPs');
    expect(validation.validationStates[ids.BUYER_CLIENT_TRADER].status).toEqual('error');

    expect(validation.validationStates[ids.SELLER_CLIENT_TRADER].message).toEqual('Choose 3 different Counterparties for 3 CPs');
    expect(validation.validationStates[ids.SELLER_CLIENT_TRADER].status).toEqual('error');

    expect(validation.validationStates[ids.CP2_BUYER_CLIENT_TRADER].message).toEqual('Choose 3 different Counterparties for 3 CPs');
    expect(validation.validationStates[ids.CP2_BUYER_CLIENT_TRADER].status).toEqual('error');

    expect(validation.validationStates[ids.CP2_SELLER_CLIENT_TRADER].message).toEqual('Choose 3 different Counterparties for 3 CPs');
    expect(validation.validationStates[ids.CP2_SELLER_CLIENT_TRADER].status).toEqual('error');

    validation.resetCounterpartyValidation();

    expect(validation.validationStates[ids.BUYER_CLIENT_TRADER].message).toEqual('');
    expect(validation.validationStates[ids.BUYER_CLIENT_TRADER].status).toEqual('success');

    expect(validation.validationStates[ids.SELLER_CLIENT_TRADER].message).toEqual('');
    expect(validation.validationStates[ids.SELLER_CLIENT_TRADER].status).toEqual('success');

    expect(validation.validationStates[ids.CP2_BUYER_CLIENT_TRADER].message).toEqual('');
    expect(validation.validationStates[ids.CP2_BUYER_CLIENT_TRADER].status).toEqual('success');

    expect(validation.validationStates[ids.CP2_SELLER_CLIENT_TRADER].message).toEqual('');
    expect(validation.validationStates[ids.CP2_SELLER_CLIENT_TRADER].status).toEqual('success');
  });

  test('returns true for NDF data submission for 3Cp\'s', () => {
    const response = validation.isSubmitValid(mock3CpsData);
    expect(response).toEqual(true);

    expect(validation.validationStates[ids.BUYER_CLIENT_TRADER].message).toEqual('');
    expect(validation.validationStates[ids.BUYER_CLIENT_TRADER].status).toEqual('success');

    expect(validation.validationStates[ids.SELLER_CLIENT_TRADER].message).toEqual('');
    expect(validation.validationStates[ids.SELLER_CLIENT_TRADER].status).toEqual('success');

    expect(validation.validationStates[ids.CP2_BUYER_CLIENT_TRADER].message).toEqual('');
    expect(validation.validationStates[ids.CP2_BUYER_CLIENT_TRADER].status).toEqual('success');

    expect(validation.validationStates[ids.CP2_SELLER_CLIENT_TRADER].message).toEqual('');
    expect(validation.validationStates[ids.CP2_SELLER_CLIENT_TRADER].status).toEqual('success');
  });
});

describe('validation.isInputNumberValid', () => {
  test('returns valid status if input value is null or undefined', () => {
    const response = validation.isInputNumberValid();
    expect(response).toEqual(mockValidReturn);
  });
});

describe('validation.isInputNumberValid for FWD RATE Field', () => {
  test('returns valid status for RATE max limit valdiation', () => {
    const response = validation.isInputNumberValid(fieldType, 12345.123456, dealTypes.FWD);
    expect(response).toEqual(mockValidReturn);
  });

  test('returns in valid status for RATE max limit valdiation', () => {
    const limitKey = MAX_LIMITS[dealTypes.FWD][fieldType];
    const mockInValidReturn = { isValid: false, message: `Maximum ${limitKey.INTEGER} digits allowed before decimal point` };

    const response = validation.isInputNumberValid(fieldType, 123456.123456, dealTypes.FWD);
    expect(response).toEqual(mockInValidReturn);
  });

  test('returns in valid status for RATE max limit valdiation', () => {
    const limitKey = MAX_LIMITS[dealTypes.FWD][fieldType];
    const mockInValidReturn = { isValid: false, message: `Maximum ${limitKey.PRECISION} digits allowed after decimal point` };

    const response = validation.isInputNumberValid(fieldType, 12345.123456789, dealTypes.FWD);
    expect(response).toEqual(mockInValidReturn);
  });
});

describe('validation.isInputNumberValid for NDF RATE Field', () => {
  test('returns valid status for RATE max limit valdiation', () => {
    const response = validation.isInputNumberValid(fieldType, 12345.123456, dealTypes.NDF);
    expect(response).toEqual(mockValidReturn);
  });

  test('returns valid status for RATE max limit valdiation', () => {
    const response = validation.isInputNumberValid(fieldType, 12345, dealTypes.NDF);
    expect(response).toEqual(mockValidReturn);
  });

  test('returns in valid status for RATE max limit valdiation', () => {
    const limitKey = MAX_LIMITS[dealTypes.NDF][fieldType];
    const mockInValidReturn = { isValid: false, message: `Maximum ${limitKey.INTEGER} digits allowed before decimal point` };

    const response = validation.isInputNumberValid(fieldType, 123456.123456, dealTypes.NDF);
    expect(response).toEqual(mockInValidReturn);
  });

  test('returns in valid status for RATE max limit valdiation', () => {
    const limitKey = MAX_LIMITS[dealTypes.NDF][fieldType];
    const mockInValidReturn = { isValid: false, message: `Maximum ${limitKey.PRECISION} digits allowed after decimal point` };

    const response = validation.isInputNumberValid(fieldType, 12345.123456789, dealTypes.NDF);
    expect(response).toEqual(mockInValidReturn);
  });
});

describe('validation.isInputNumberValid for FWD BROKERAGE_AMOUNT Field', () => {
  const fieldName = 'BROKERAGE_AMOUNT';
  test('returns valid status for BROKERAGE_AMOUNT max limit valdiation', () => {
    const response = validation.isInputNumberValid(fieldName, 123456789123.123, dealTypes.FWD);
    expect(response).toEqual(mockValidReturn);
  });

  test('returns in valid status for BROKERAGE_AMOUNT max limit valdiation', () => {
    const limitKey = MAX_LIMITS[dealTypes.FWD][fieldName];
    const mockInValidReturn = { isValid: false, message: `Maximum ${limitKey.INTEGER} digits allowed before decimal point` };

    const response = validation.isInputNumberValid(fieldName, 123456789123456.1234, dealTypes.FWD);
    expect(response).toEqual(mockInValidReturn);
  });

  test('returns in valid status for BROKERAGE_AMOUNT max limit valdiation', () => {
    const limitKey = MAX_LIMITS[dealTypes.FWD][fieldName];
    const mockInValidReturn = { isValid: false, message: `Maximum ${limitKey.PRECISION} digits allowed after decimal point` };

    const response = validation.isInputNumberValid(fieldName, 12345.123456789, dealTypes.FWD);
    expect(response).toEqual(mockInValidReturn);
  });

  test('returns in valid status for BROKERAGE_AMOUNT max limit precision valdiation for given input', () => {
    const response = validation.isInputNumberValid(fieldName, 12345.123456789, dealTypes.FWD, 9);
    expect(response).toEqual(mockValidReturn);
  });

  test('returns valid status for FWD Type OUT and BROKERAGE_AMOUNT max limit valdiation', () => {
    const response = validation.isInputNumberValid(fieldName, 123456789123.123, 'OUT');
    expect(response).toEqual(mockValidReturn);
  });

  test('returns in valid status for Invalid Deal Type', () => {
    const dealName = 'FWDOUT';
    try {
      validation.isInputNumberValid(fieldName, 12345.123, dealName);
    } catch (error) {
      expect(error).toEqual(new Error(`Error validating ${fieldName} for ${dealName}.`));
    }
  });
});
