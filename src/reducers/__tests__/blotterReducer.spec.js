import { actionTypes } from '../../utils/constants';
import reducer from '../blotterReducer';

/*
jest.mock('moment', () => {
  const mMoment = {
    format: jest.fn().mockImplementation((formatter) => (formatter === 'L' ? '07/08/2020' : '11:22:33')),
  };
  return jest.fn(() => mMoment);
});
*/

jest.mock('../../utils/agGrid/formatters.js', () => ({
  getLocalDate: jest.fn().mockReturnValue('07/08/2020 11:22:33'),
  dateFormatter: jest.fn().mockReturnValue('07/08/2020'),
  timeFormatter: jest.fn().mockReturnValue('11:22:33'),
  valueDateFormatter: jest.fn().mockReturnValue('07/08/2020'),
  fixingDateFormatter: jest.fn().mockReturnValue('07/08/2020'),
  publishDateFormatter: jest.fn().mockReturnValue('07/08/2020'),
}));

const initialState = {
  isDataLoading: false,
  data: [{ dmsDealReference: 456 }],
  insertedDealIds: [],
};

const dummyExecutionChains = [
  {
    dealType: 'NDF',
    tradeTime: '2019-01-24T16:20:55.128Z',
    deals: [
      {
        trades: [
          {
            valueDate: '2019-01-29 00:00:00.0',
            fixingDate: '2019-01-29 00:00:00.0',
            publishDate: '2019-01-29 00:00:00.0',
            notionalAmount: '1500000.0000',
            price: '3.7604',
            tradeStrategy: 'NDF.USD.BRL.BMF1.SEF.BIL1',
            tradeEconomics: {
              payer: {
                executingCustomerName: 'HSBC BANK U.S.A. NYK',
                tradingCustomerName: 'HSBC BANK U.S.A. NYK',
                brokerGcdPostingName: 'N. LOPEZ-MUNIZ',
                traderGcdPostingName: 'A. SHIGA',
              },
              receiver: {
                executingCustomerName: 'CITIBANK NA LON',
                tradingCustomerName: 'CITIBANK NA LON',
                brokerGcdPostingName: 'L. RAMOS',
                traderGcdPostingName: 'V. VALLE',
              },
            },
            tradeId: 1195963,
            tradeType: 'NDF',
          },
        ],
        points: '3.7604',
        dealAction: 'NEW',
        dmsDealReference: 978820,
        dealStatus: 'COMPLETE',
        version: 1,
        payerApproval: {
          brokerApprovalState: 'APPROVED',
          midOfficeApprovalState: 'APPROVED',
          traderApprovalState: 'APPROVED',
          midOfficeApprovalRequired: false,
          traderApprovalRequired: false,
          brokerApprovalRequired: false,
        },
        receiverApproval: {
          brokerApprovalState: 'APPROVED',
          midOfficeApprovalState: 'APPROVED',
          traderApprovalState: 'APPROVED',
          midOfficeApprovalRequired: false,
          traderApprovalRequired: false,
          brokerApprovalRequired: false,
        },
        payerSTPStatus: 'CONFIRM',
        receiverSTPStatus: 'CONFIRM',
        executionVenueType: 'SEF',
        isDealUnderInvestigation: false,
      },
      {
        trades: [
          {
            valueDate: '2019-02-04 00:00:00.0',
            fixingDate: '2019-01-29 00:00:00.0',
            publishDate: '2019-01-29 00:00:00.0',
            notionalAmount: '1500000.0000',
            price: '3.7611',
            tradeStrategy: 'NDF.USD.BRL.BMF1.SEF.BIL2',
            tradeEconomics: {
              payer: {
                brokerage: {
                  currency: 'USD',
                  amount: 15.0,
                  stdAmount: 2.25,
                  stdCurrency: 'USD',
                },
                executingCustomerName: 'CITIBANK NA LON',
                tradingCustomerName: 'CITIBANK NA LON',
                brokerGcdPostingName: 'L. RAMOS',
                traderGcdPostingName: 'V. VALLE',
              },
              receiver: {
                brokerage: {
                  currency: 'USD',
                  amount: 30.0,
                  stdAmount: 2.25,
                  stdCurrency: 'USD',
                },
                executingCustomerName: 'HSBC BANK U.S.A. NYK',
                tradingCustomerName: 'HSBC BANK U.S.A. NYK',
                brokerGcdPostingName: 'N. LOPEZ-MUNIZ',
                traderGcdPostingName: 'A. SHIGA',
              },
            },
            tradeId: 1195964,
            tradeType: 'NDF',
          },
        ],
        points: '0.0007',
        dealAction: 'NEW',
        dmsDealReference: 978821,
        dealStatus: 'COMPLETE',
        version: 1,
        payerApproval: {
          brokerApprovalState: 'APPROVED',
          midOfficeApprovalState: 'APPROVED',
          traderApprovalState: 'APPROVED',
          midOfficeApprovalRequired: false,
          traderApprovalRequired: false,
          brokerApprovalRequired: false,
        },
        receiverApproval: {
          brokerApprovalState: 'APPROVED',
          midOfficeApprovalState: 'APPROVED',
          traderApprovalState: 'APPROVED',
          midOfficeApprovalRequired: false,
          traderApprovalRequired: false,
          brokerApprovalRequired: false,
        },
        payerSTPStatus: 'CONFIRM',
        receiverSTPStatus: 'CONFIRM',
        executionVenueType: 'SEF',
        isDealUnderInvestigation: false,
      },
    ],
    chainId: 773387,
  },
  {
    dealType: 'NDF',
    tradeTime: '2019-01-24T01:35:10.336Z',
    deals: [
      {
        trades: [
          {
            valueDate: '2019-01-31 00:00:00.0',
            fixingDate: '2019-01-29 00:00:00.0',
            publishDate: '2019-01-29 00:00:00.0',
            notionalAmount: '15000000.0000',
            price: '14135.0',
            tradeStrategy: 'NDF.USD.IDR.3D.SEF.BIL3',
            tradeEconomics: {
              payer: {
                brokerage: {
                  currency: 'USD',
                  amount: 300.0,
                  stdAmount: 2.25,
                  stdCurrency: 'USD',
                },
                executingCustomerName: 'TORDOM BK LON',
                tradingCustomerName: 'TORDOM BK LON',
                brokerGcdPostingName: 'V. SOON',
                traderGcdPostingName: 'D. SHERBORNE',
              },
              receiver: {
                brokerage: {
                  currency: 'USD',
                  amount: 150.0,
                  stdAmount: 2.25,
                  stdCurrency: 'USD',
                },
                executingCustomerName: 'GOLDMAN SACHS BK USA NYK',
                tradingCustomerName: 'GOLDMAN SACHS BK USA NYK',
                brokerGcdPostingName: 'H. PHANTOM',
                traderGcdPostingName: 'J. XU',
              },
            },
            tradeId: 1195069,
            tradeType: 'NDF',
          },
        ],
        points: '14135.0',
        dealAction: 'NEW',
        dmsDealReference: 978141,
        dealStatus: 'COMPLETE',
        version: 1,
        payerApproval: {
          brokerApprovalState: 'APPROVED',
          midOfficeApprovalState: 'APPROVED',
          traderApprovalState: 'APPROVED',
          midOfficeApprovalRequired: false,
          traderApprovalRequired: false,
          brokerApprovalRequired: false,
        },
        receiverApproval: {
          brokerApprovalState: 'APPROVED',
          midOfficeApprovalState: 'APPROVED',
          traderApprovalState: 'APPROVED',
          midOfficeApprovalRequired: false,
          traderApprovalRequired: false,
          brokerApprovalRequired: false,
        },
        payerSTPStatus: 'CONFIRM',
        receiverSTPStatus: 'CONFIRM',
        executionVenueType: 'SEF',
        isDealUnderInvestigation: false,
      },
    ],
    chainId: 772874,
  },
];

const transformedData = [
  {
    chainId: 773387,
    dealAction: 'NEW',
    dmsDealReference: 978820,
    dealStatus: 'COMPLETE',
    dealType: 'NDF',
    executionVenueType: 'SEF',
    isDealUnderInvestigation: false,
    notionalAmount: '1500000.0000',
    payerBrokerApprovalState: 'APPROVED',
    payerBrokerName: 'N. LOPEZ-MUNIZ',
    payerBrokerageAmount: '',
    payerBrokerageCurrency: '',
    payerBrokerageStdAmount: '',
    payerBrokerageStdCurrency: '',
    payerCustomerName: 'HSBC BANK U.S.A. NYK',
    payerMidOfficeApprovalState: 'APPROVED',
    payerOverallApprovalStatus: 'APPROVED',
    payerSTPStatus: 'CONFIRM',
    payerSTPStatusGroup: 'AFFIRMED, CLEARED, CONFIRM, REPORTED',
    payerTraderApprovalState: 'APPROVED',
    payerTraderName: 'A. SHIGA',
    price: '3.7604',
    receiverBrokerApprovalState: 'APPROVED',
    receiverBrokerName: 'L. RAMOS',
    receiverBrokerageAmount: '',
    receiverBrokerageCurrency: '',
    receiverBrokerageStdAmount: '',
    receiverBrokerageStdCurrency: '',
    receiverCustomerName: 'CITIBANK NA LON',
    receiverMidOfficeApprovalState: 'APPROVED',
    receiverOverallApprovalStatus: 'APPROVED',
    receiverSTPStatus: 'CONFIRM',
    receiverSTPStatusGroup: 'AFFIRMED, CLEARED, CONFIRM, REPORTED',
    receiverTraderApprovalState: 'APPROVED',
    receiverTraderName: 'V. VALLE',
    tradeDate: '07/08/2020',
    tradeDateTimeMilli: 1548346855128,
    tradeStrategy: 'NDF.USD.BRL.BMF1.SEF.BIL1',
    tradeTime: '11:22:33',
    valueDate: '07/08/2020',
    fixingDate: '07/08/2020',
    publishDate: '07/08/2020',
  },
  {
    chainId: 773387,
    dealAction: 'NEW',
    dmsDealReference: 978821,
    dealStatus: 'COMPLETE',
    dealType: 'NDF',
    executionVenueType: 'SEF',
    isDealUnderInvestigation: false,
    notionalAmount: '1500000.0000',
    payerBrokerApprovalState: 'APPROVED',
    payerBrokerName: 'L. RAMOS',
    payerBrokerageAmount: 15,
    payerBrokerageCurrency: 'USD',
    payerBrokerageStdAmount: 2.25,
    payerBrokerageStdCurrency: 'USD',
    payerCustomerName: 'CITIBANK NA LON',
    payerMidOfficeApprovalState: 'APPROVED',
    payerOverallApprovalStatus: 'APPROVED',
    payerSTPStatus: 'CONFIRM',
    payerSTPStatusGroup: 'AFFIRMED, CLEARED, CONFIRM, REPORTED',
    payerTraderApprovalState: 'APPROVED',
    payerTraderName: 'V. VALLE',
    price: '0.0007',
    receiverBrokerApprovalState: 'APPROVED',
    receiverBrokerName: 'N. LOPEZ-MUNIZ',
    receiverBrokerageAmount: 30,
    receiverBrokerageCurrency: 'USD',
    receiverBrokerageStdAmount: 2.25,
    receiverBrokerageStdCurrency: 'USD',
    receiverCustomerName: 'HSBC BANK U.S.A. NYK',
    receiverMidOfficeApprovalState: 'APPROVED',
    receiverOverallApprovalStatus: 'APPROVED',
    receiverSTPStatus: 'CONFIRM',
    receiverSTPStatusGroup: 'AFFIRMED, CLEARED, CONFIRM, REPORTED',
    receiverTraderApprovalState: 'APPROVED',
    receiverTraderName: 'A. SHIGA',
    tradeDate: '07/08/2020',
    tradeDateTimeMilli: 1548346855128,
    tradeStrategy: 'NDF.USD.BRL.BMF1.SEF.BIL2',
    tradeTime: '11:22:33',
    valueDate: '07/08/2020',
    fixingDate: '07/08/2020',
    publishDate: '07/08/2020',
  },
  {
    chainId: 772874,
    dealAction: 'NEW',
    dmsDealReference: 978141,
    dealStatus: 'COMPLETE',
    dealType: 'NDF',
    executionVenueType: 'SEF',
    isDealUnderInvestigation: false,
    notionalAmount: '15000000.0000',
    payerBrokerApprovalState: 'APPROVED',
    payerBrokerName: 'V. SOON',
    payerBrokerageAmount: 300,
    payerBrokerageCurrency: 'USD',
    payerBrokerageStdAmount: 2.25,
    payerBrokerageStdCurrency: 'USD',
    payerCustomerName: 'TORDOM BK LON',
    payerMidOfficeApprovalState: 'APPROVED',
    payerOverallApprovalStatus: 'APPROVED',
    payerSTPStatus: 'CONFIRM',
    payerSTPStatusGroup: 'AFFIRMED, CLEARED, CONFIRM, REPORTED',
    payerTraderApprovalState: 'APPROVED',
    payerTraderName: 'D. SHERBORNE',
    price: '14135.0',
    receiverBrokerApprovalState: 'APPROVED',
    receiverBrokerName: 'H. PHANTOM',
    receiverBrokerageAmount: 150,
    receiverBrokerageCurrency: 'USD',
    receiverBrokerageStdAmount: 2.25,
    receiverBrokerageStdCurrency: 'USD',
    receiverCustomerName: 'GOLDMAN SACHS BK USA NYK',
    receiverMidOfficeApprovalState: 'APPROVED',
    receiverOverallApprovalStatus: 'APPROVED',
    receiverSTPStatus: 'CONFIRM',
    receiverSTPStatusGroup: 'AFFIRMED, CLEARED, CONFIRM, REPORTED',
    receiverTraderApprovalState: 'APPROVED',
    receiverTraderName: 'J. XU',
    tradeDate: '07/08/2020',
    tradeDateTimeMilli: 1548293710336,
    tradeStrategy: 'NDF.USD.IDR.3D.SEF.BIL3',
    tradeTime: '11:22:33',
    valueDate: '07/08/2020',
    fixingDate: '07/08/2020',
    publishDate: '07/08/2020',
  },
];

test('LOAD_BLOTTER_DEALS_IN_PROGRESS action returns correct loading state from the action.', () => {
  const reducerOutput = reducer(initialState, { type: actionTypes.LOAD_BLOTTER_DEALS_IN_PROGRESS });
  expect(reducerOutput).toEqual({ isDataLoading: true, insertedDealIds: [], data: [...initialState.data] });
});

test('LOAD_BLOTTER_DEALS_SUCCESS action returns the right data from the action.', () => {
  const reducerOutput = reducer(
    { isDataLoading: true, data: [], lastUpdated: null },
    {
      type: actionTypes.LOAD_BLOTTER_DEALS_SUCCESS,
      payload: { data: [...dummyExecutionChains], lastUpdated: '2099–01–0111:11:11+00:00', searchParams: {} },
    },
  );
  expect(reducerOutput).toEqual({
    data: [...transformedData], isDataLoading: false, insertedDealIds: [], lastUpdated: '2099–01–0111:11:11+00:00', searchParams: {},
  });
});

test('LOAD_BLOTTER_DEALS_FAILED action returns current state.', () => {
  const reducerOutput = reducer(
    { isDataLoading: true, data: [{ dmsDealReference: 456 }] },
    { type: actionTypes.LOAD_BLOTTER_DEALS_FAILED, payload: { err: '123' } },
  );
  expect(reducerOutput).toEqual({ isDataLoading: false, data: [{ dmsDealReference: 456 }] });
});

test('REMOVE_BLOTTER_NEW_DEAL_IDS action returns the right data from the action.', () => {
  const reducerOutput = reducer(
    {
      data: [...transformedData],
      insertedDealIds: [777, 888, 999],
      isDataLoading: false,
      lastUpdated: '2099–01–0111:11:11+00:00',
    },
    {
      type: actionTypes.REMOVE_BLOTTER_NEW_DEAL_IDS,
      payload: { dealIds: [999, 888] },
    },
  );
  expect(reducerOutput).toEqual(
    {
      data: [...transformedData],
      insertedDealIds: [777],
      isDataLoading: false,
      lastUpdated: '2099–01–0111:11:11+00:00',
    },
  );
});

test('DEFAULT action returns current state.', () => {
  const reducerOutput = reducer(
    { isDataLoading: true, data: [{ dmsDealReference: 456 }] },
    { type: actionTypes.LOAD_USER_SUCCESS, user: { permissions: { validForNdf: true } } },
  );
  expect(reducerOutput).toEqual({ isDataLoading: true, data: [{ dmsDealReference: 456 }] });
});

test('LOAD_BLOTTER_RTU_COUNT_SUCCESS action returns current state.', () => {
  const reducerOutput = reducer(
    { rtuBlotterCount: 'NA' },
    { type: actionTypes.LOAD_BLOTTER_RTU_COUNT_SUCCESS, payload: { rtuBlotterCount: 'NA' } },
  );
  expect(reducerOutput).toEqual({ rtuBlotterCount: 'NA' });
});
