/* eslint-disable max-len */
import { transformBlotterChains } from '../index';

jest.mock('moment', () => {
  const mMoment = {
    format: jest.fn().mockImplementation((formatter) => (formatter === 'L' ? '07/08/2020' : '11:22:33 AM')),
  };
  return jest.fn(() => mMoment);
});

jest.mock('../../agGrid/formatters.js', () => ({
  getLocalDate: jest.fn().mockReturnValue('07/08/2020 11:22:33'),
  dateFormatter: jest.fn().mockReturnValue('07/08/2020'),
  timeFormatter: jest.fn().mockReturnValue('11:22:33'),
  valueDateFormatter: jest.fn().mockReturnValue('07/08/2020'),
  fixingDateFormatter: jest.fn().mockReturnValue('07/08/2020'),
  publishDateFormatter: jest.fn().mockReturnValue('07/08/2020'),
}));

const dummyChainOneTrade = {
  dealType: 'NDF',
  tradeTime: '2020-07-07T09:34:50.562+01',
  deals: [
    {
      trades: [
        {
          valueDate: '2020-08-10 00:00:00.0',
          notionalAmount: '3000000.0000',
          price: '1.724',
          tradeStrategy: 'NDF.EUR.COP.1M',
          tradeEconomics: {
            payer: {
              brokerage: {
                currency: 'SGD',
                amount: 2.25,
                stdAmount: 2.25,
                stdCurrency: 'USD',
              },
              executingCustomerName: 'BK OF AMER NA DBU SIN',
              tradingCustomerName: 'BK OF AMER NA DBU SIN',
              brokerGcdPostingName: 'D. WONG',
              traderGcdPostingName: 'D. NG',
              agentCustomerGcdName: '42 FIN SERV S.R.O PRA',
            },
            receiver: {
              brokerage: {
                currency: 'USD',
                amount: 12.99,
                stdAmount: 12.99,
                stdCurrency: 'USD',
              },
              executingCustomerName: 'AMERICAN PRESIDENT B HKG',
              tradingCustomerName: 'AMERICAN PRESIDENT B HKG',
              brokerGcdPostingName: 'A. LIM',
              traderGcdPostingName: 'D. EISENHOWER',
              agentCustomerGcdName: '42 FIN SERV S.R.O PRA',
            },
          },
          tradeId: 102,
          tradeType: 'NDF',
        },
      ],
      points: '1.724',
      dealAction: 'NEW',
      dmsDealReference: 102,
      dealEntityId: 999,
      dealStatus: 'APPROVED',
      payerSTPStatus: 'CONFIRM',
      receiverSTPStatus: 'TMMSENT',
      version: 1,
      payerApproval: {
        brokerApprovalState: 'APPROVED',
        midOfficeApprovalState: 'REJECTED',
        traderApprovalState: 'PENDING',
        brokerApprovalRequired: false,
        traderApprovalRequired: false,
        midOfficeApprovalRequired: false,
      },
      receiverApproval: {
        brokerApprovalState: 'APPROVED',
        midOfficeApprovalState: 'PENDING',
        traderApprovalState: 'APPROVED',
        brokerApprovalRequired: false,
        traderApprovalRequired: false,
        midOfficeApprovalRequired: false,
      },
      executionVenueType: 'SEF',
      isDealUnderInvestigation: false,
    },
  ],
  chainId: 101,
};

const dummyChainTwoTrades = {
  dealType: 'NDF',
  strategy: 'spread',
  tradeTime: '2020-07-14T09:24:39.571+01',
  deals: [
    {
      trades: [
        {
          valueDate: '2020-07-23 00:00:00.0',
          notionalAmount: '3000000.0000',
          price: '65.27',
          tradeEconomics: {
            payer: {
              executingCustomerName: 'AMERICAN PRESIDENT B LON',
              tradingCustomerName: 'AMERICAN PRESIDENT B LON',
              brokerGcdPostingName: 'A. LIM',
              traderGcdPostingName: 'J. KENNEDY',
              agentCustomerGcdName: '42 FIN SERV S.R.O PRA',
            },
            receiver: {
              executingCustomerName: 'AMERICAN PRESIDENT B HKG',
              tradingCustomerName: 'AMERICAN PRESIDENT B HKG',
              brokerGcdPostingName: 'A. LIM',
              traderGcdPostingName: 'D. EISENHOWER',
              agentCustomerGcdName: '42 FIN SERV S.R.O PRA',
            },
          },
          tradeId: 305,
          tradeStrategy: 'NDF.EUR.COP.1W',
          CLS: false,
        },
      ],
      points: '65.27',
      dealAction: 'NEW',
      dmsDealReference: 305,
      dealEntityId: 999,
      dealStatus: 'APPROVED',
      version: 1,
      payerApproval: {
        brokerApprovalState: 'APPROVED',
        midOfficeApprovalState: 'APPROVED',
        traderApprovalState: 'APPROVED',
        traderApprovalRequired: false,
        brokerApprovalRequired: false,
        midOfficeApprovalRequired: false,
      },
      receiverApproval: {
        brokerApprovalState: 'APPROVED',
        midOfficeApprovalState: 'APPROVED',
        traderApprovalState: 'APPROVED',
        traderApprovalRequired: false,
        brokerApprovalRequired: false,
        midOfficeApprovalRequired: false,
      },
      executionVenueType: 'SEF',
      isDealUnderInvestigation: false,
    },
    {
      trades: [
        {
          valueDate: '2020-09-16 00:00:00.0',
          notionalAmount: '43000000.0000',
          price: '48.97',
          tradeEconomics: {
            payer: {
              executingCustomerName: 'AMERICAN PRESIDENT B HKG',
              tradingCustomerName: 'AMERICAN PRESIDENT B HKG',
              brokerGcdPostingName: 'A. LIM',
              traderGcdPostingName: 'D. EISENHOWER',
              agentCustomerGcdName: '42 FIN SERV S.R.O PRA',
            },
            receiver: {
              executingCustomerName: 'AMERICAN PRESIDENT B LON',
              tradingCustomerName: 'AMERICAN PRESIDENT B LON',
              brokerGcdPostingName: 'A. LIM',
              traderGcdPostingName: 'J. KENNEDY',
              agentCustomerGcdName: '42 FIN SERV S.R.O PRA',
            },
          },
          tradeId: 306,
          tradeStrategy: 'NDF.EUR.COP.2M',
          CLS: false,
        },
      ],
      points: '48.97',
      dealAction: 'NEW',
      dmsDealReference: 306,
      dealEntityId: 999,
      dealStatus: 'APPROVED',
      version: 1,
      payerApproval: {
        brokerApprovalState: 'APPROVED',
        midOfficeApprovalState: 'APPROVED',
        traderApprovalState: 'APPROVED',
        traderApprovalRequired: false,
        brokerApprovalRequired: false,
        midOfficeApprovalRequired: false,
      },
      receiverApproval: {
        brokerApprovalState: 'APPROVED',
        midOfficeApprovalState: 'APPROVED',
        traderApprovalState: 'APPROVED',
        traderApprovalRequired: false,
        brokerApprovalRequired: false,
        midOfficeApprovalRequired: false,
      },
      executionVenueType: 'SEF',
      isDealUnderInvestigation: false,
    },
  ],
  chainId: 302,
};

const simpleCopy = (obj) => JSON.parse(JSON.stringify(obj));

test('transformBlotterChains returns empty array when no executionChain data passed in', () => {
  expect(transformBlotterChains().length).toEqual(0);
  expect(transformBlotterChains([]).length).toEqual(0);
});

describe('transformBlotterChains returns correct payload when one trade', () => {
  test('and all values populated', () => {
    const dummyDeal = simpleCopy(dummyChainOneTrade);
    const dummyChains = [{ ...dummyDeal }];
    const [deal] = transformBlotterChains(dummyChains);
    expect(JSON.stringify(deal)).toEqual('{"chainId":101,"dmsDealReference":102,"dealEntityId":999,"dealType":"NDF","tradeStrategy":"NDF.EUR.COP.1M","tradeDate":"07/08/2020","tradeDateTimeMilli":{},"tradeTime":"11:22:33","dealAction":"NEW","dealStatus":"APPROVED","executionVenueType":"SEF","valueDate":"07/08/2020","fixingDate":"07/08/2020","publishDate":"07/08/2020","price":"1.724","notionalAmount":"3000000.0000","isDealUnderInvestigation":false,"payerSTPStatus":"CONFIRM","payerSTPStatusGroup":"AFFIRMED, CLEARED, CONFIRM, REPORTED","payerBrokerageCurrency":"SGD","payerBrokerageAmount":2.25,"payerBrokerageStdAmount":2.25,"payerBrokerageStdCurrency":"USD","payerCustomerName":"BK OF AMER NA DBU SIN","payerBrokerName":"D. WONG","payerTraderName":"D. NG","payerThirdPartyAgentName":"42 FIN SERV S.R.O PRA","receiverSTPStatus":"TMMSENT","receiverSTPStatusGroup":"TMMSENT","receiverBrokerageAmount":12.99,"receiverBrokerageCurrency":"USD","receiverBrokerageStdCurrency":"USD","receiverBrokerageStdAmount":12.99,"receiverCustomerName":"AMERICAN PRESIDENT B HKG","receiverBrokerName":"A. LIM","receiverTraderName":"D. EISENHOWER","receiverThirdPartyAgentName":"42 FIN SERV S.R.O PRA","payerOverallApprovalStatus":"REJECTED","payerBrokerApprovalState":"APPROVED","payerMidOfficeApprovalState":"REJECTED","payerTraderApprovalState":"PENDING","receiverOverallApprovalStatus":"PENDING","receiverBrokerApprovalState":"APPROVED","receiverMidOfficeApprovalState":"PENDING","receiverTraderApprovalState":"APPROVED"}');
  });

  test('and no brokerage for payer passed in', () => {
    const dummyDeal = simpleCopy(dummyChainOneTrade);
    delete dummyDeal.deals[0].trades[0].tradeEconomics.payer.brokerage;
    const dummyChains = [{ ...dummyDeal }];
    const [deal] = transformBlotterChains(dummyChains);
    expect(JSON.stringify(deal)).toEqual('{"chainId":101,"dmsDealReference":102,"dealEntityId":999,"dealType":"NDF","tradeStrategy":"NDF.EUR.COP.1M","tradeDate":"07/08/2020","tradeDateTimeMilli":{},"tradeTime":"11:22:33","dealAction":"NEW","dealStatus":"APPROVED","executionVenueType":"SEF","valueDate":"07/08/2020","fixingDate":"07/08/2020","publishDate":"07/08/2020","price":"1.724","notionalAmount":"3000000.0000","isDealUnderInvestigation":false,"payerSTPStatus":"CONFIRM","payerSTPStatusGroup":"AFFIRMED, CLEARED, CONFIRM, REPORTED","payerBrokerageCurrency":"","payerBrokerageAmount":"","payerBrokerageStdAmount":"","payerBrokerageStdCurrency":"","payerCustomerName":"BK OF AMER NA DBU SIN","payerBrokerName":"D. WONG","payerTraderName":"D. NG","payerThirdPartyAgentName":"42 FIN SERV S.R.O PRA","receiverSTPStatus":"TMMSENT","receiverSTPStatusGroup":"TMMSENT","receiverBrokerageAmount":12.99,"receiverBrokerageCurrency":"USD","receiverBrokerageStdCurrency":"USD","receiverBrokerageStdAmount":12.99,"receiverCustomerName":"AMERICAN PRESIDENT B HKG","receiverBrokerName":"A. LIM","receiverTraderName":"D. EISENHOWER","receiverThirdPartyAgentName":"42 FIN SERV S.R.O PRA","payerOverallApprovalStatus":"REJECTED","payerBrokerApprovalState":"APPROVED","payerMidOfficeApprovalState":"REJECTED","payerTraderApprovalState":"PENDING","receiverOverallApprovalStatus":"PENDING","receiverBrokerApprovalState":"APPROVED","receiverMidOfficeApprovalState":"PENDING","receiverTraderApprovalState":"APPROVED"}');
  });

  test('and no brokerage for receiver passed in', () => {
    const dummyDeal = simpleCopy(dummyChainOneTrade);
    delete dummyDeal.deals[0].trades[0].tradeEconomics.receiver.brokerage;
    const dummyChains = [{ ...dummyDeal }];
    const [deal] = transformBlotterChains(dummyChains);
    expect(JSON.stringify(deal)).toEqual('{"chainId":101,"dmsDealReference":102,"dealEntityId":999,"dealType":"NDF","tradeStrategy":"NDF.EUR.COP.1M","tradeDate":"07/08/2020","tradeDateTimeMilli":{},"tradeTime":"11:22:33","dealAction":"NEW","dealStatus":"APPROVED","executionVenueType":"SEF","valueDate":"07/08/2020","fixingDate":"07/08/2020","publishDate":"07/08/2020","price":"1.724","notionalAmount":"3000000.0000","isDealUnderInvestigation":false,"payerSTPStatus":"CONFIRM","payerSTPStatusGroup":"AFFIRMED, CLEARED, CONFIRM, REPORTED","payerBrokerageCurrency":"SGD","payerBrokerageAmount":2.25,"payerBrokerageStdAmount":2.25,"payerBrokerageStdCurrency":"USD","payerCustomerName":"BK OF AMER NA DBU SIN","payerBrokerName":"D. WONG","payerTraderName":"D. NG","payerThirdPartyAgentName":"42 FIN SERV S.R.O PRA","receiverSTPStatus":"TMMSENT","receiverSTPStatusGroup":"TMMSENT","receiverBrokerageAmount":"","receiverBrokerageCurrency":"","receiverBrokerageStdCurrency":"","receiverBrokerageStdAmount":"","receiverCustomerName":"AMERICAN PRESIDENT B HKG","receiverBrokerName":"A. LIM","receiverTraderName":"D. EISENHOWER","receiverThirdPartyAgentName":"42 FIN SERV S.R.O PRA","payerOverallApprovalStatus":"REJECTED","payerBrokerApprovalState":"APPROVED","payerMidOfficeApprovalState":"REJECTED","payerTraderApprovalState":"PENDING","receiverOverallApprovalStatus":"PENDING","receiverBrokerApprovalState":"APPROVED","receiverMidOfficeApprovalState":"PENDING","receiverTraderApprovalState":"APPROVED"}');
  });

  test('and no stp flags passed in', () => {
    const dummyDeal = simpleCopy(dummyChainOneTrade);
    delete dummyDeal.deals[0].payerSTPStatus;
    delete dummyDeal.deals[0].receiverSTPStatus;
    const dummyChains = [{ ...dummyDeal }];
    const [deal] = transformBlotterChains(dummyChains);

    expect(JSON.stringify(deal)).toEqual('{"chainId":101,"dmsDealReference":102,"dealEntityId":999,"dealType":"NDF","tradeStrategy":"NDF.EUR.COP.1M","tradeDate":"07/08/2020","tradeDateTimeMilli":{},"tradeTime":"11:22:33","dealAction":"NEW","dealStatus":"APPROVED","executionVenueType":"SEF","valueDate":"07/08/2020","fixingDate":"07/08/2020","publishDate":"07/08/2020","price":"1.724","notionalAmount":"3000000.0000","isDealUnderInvestigation":false,"payerSTPStatusGroup":"","payerBrokerageCurrency":"SGD","payerBrokerageAmount":2.25,"payerBrokerageStdAmount":2.25,"payerBrokerageStdCurrency":"USD","payerCustomerName":"BK OF AMER NA DBU SIN","payerBrokerName":"D. WONG","payerTraderName":"D. NG","payerThirdPartyAgentName":"42 FIN SERV S.R.O PRA","receiverSTPStatusGroup":"","receiverBrokerageAmount":12.99,"receiverBrokerageCurrency":"USD","receiverBrokerageStdCurrency":"USD","receiverBrokerageStdAmount":12.99,"receiverCustomerName":"AMERICAN PRESIDENT B HKG","receiverBrokerName":"A. LIM","receiverTraderName":"D. EISENHOWER","receiverThirdPartyAgentName":"42 FIN SERV S.R.O PRA","payerOverallApprovalStatus":"REJECTED","payerBrokerApprovalState":"APPROVED","payerMidOfficeApprovalState":"REJECTED","payerTraderApprovalState":"PENDING","receiverOverallApprovalStatus":"PENDING","receiverBrokerApprovalState":"APPROVED","receiverMidOfficeApprovalState":"PENDING","receiverTraderApprovalState":"APPROVED"}');
  });
});

describe('transformBlotterChains returns correct payload when two trades', () => {
  test('and all values populated', () => {
    const dummyDeal = simpleCopy(dummyChainTwoTrades);
    const dummyChains = [{ ...dummyDeal }];
    const [deal] = transformBlotterChains(dummyChains);
    expect(JSON.stringify(deal)).toEqual('{"chainId":302,"dmsDealReference":305,"dealEntityId":999,"dealType":"NDF","tradeStrategy":"NDF.EUR.COP.1W","tradeDate":"07/08/2020","tradeDateTimeMilli":{},"tradeTime":"11:22:33","dealAction":"NEW","dealStatus":"APPROVED","executionVenueType":"SEF","valueDate":"07/08/2020","fixingDate":"07/08/2020","publishDate":"07/08/2020","price":"65.27","notionalAmount":"3000000.0000","isDealUnderInvestigation":false,"payerSTPStatusGroup":"","payerBrokerageCurrency":"","payerBrokerageAmount":"","payerBrokerageStdAmount":"","payerBrokerageStdCurrency":"","payerCustomerName":"AMERICAN PRESIDENT B LON","payerBrokerName":"A. LIM","payerTraderName":"J. KENNEDY","payerThirdPartyAgentName":"42 FIN SERV S.R.O PRA","receiverSTPStatusGroup":"","receiverBrokerageAmount":"","receiverBrokerageCurrency":"","receiverBrokerageStdCurrency":"","receiverBrokerageStdAmount":"","receiverCustomerName":"AMERICAN PRESIDENT B HKG","receiverBrokerName":"A. LIM","receiverTraderName":"D. EISENHOWER","receiverThirdPartyAgentName":"42 FIN SERV S.R.O PRA","payerOverallApprovalStatus":"APPROVED","payerBrokerApprovalState":"APPROVED","payerMidOfficeApprovalState":"APPROVED","payerTraderApprovalState":"APPROVED","receiverOverallApprovalStatus":"APPROVED","receiverBrokerApprovalState":"APPROVED","receiverMidOfficeApprovalState":"APPROVED","receiverTraderApprovalState":"APPROVED"}');
  });

  test('and no brokerage for payer passed in', () => {
    const dummyDeal = simpleCopy(dummyChainTwoTrades);
    delete dummyDeal.deals[0].trades[0].tradeEconomics.payer.brokerage;
    const dummyChains = [{ ...dummyDeal }];
    const [deal] = transformBlotterChains(dummyChains);
    expect(JSON.stringify(deal)).toEqual('{"chainId":302,"dmsDealReference":305,"dealEntityId":999,"dealType":"NDF","tradeStrategy":"NDF.EUR.COP.1W","tradeDate":"07/08/2020","tradeDateTimeMilli":{},"tradeTime":"11:22:33","dealAction":"NEW","dealStatus":"APPROVED","executionVenueType":"SEF","valueDate":"07/08/2020","fixingDate":"07/08/2020","publishDate":"07/08/2020","price":"65.27","notionalAmount":"3000000.0000","isDealUnderInvestigation":false,"payerSTPStatusGroup":"","payerBrokerageCurrency":"","payerBrokerageAmount":"","payerBrokerageStdAmount":"","payerBrokerageStdCurrency":"","payerCustomerName":"AMERICAN PRESIDENT B LON","payerBrokerName":"A. LIM","payerTraderName":"J. KENNEDY","payerThirdPartyAgentName":"42 FIN SERV S.R.O PRA","receiverSTPStatusGroup":"","receiverBrokerageAmount":"","receiverBrokerageCurrency":"","receiverBrokerageStdCurrency":"","receiverBrokerageStdAmount":"","receiverCustomerName":"AMERICAN PRESIDENT B HKG","receiverBrokerName":"A. LIM","receiverTraderName":"D. EISENHOWER","receiverThirdPartyAgentName":"42 FIN SERV S.R.O PRA","payerOverallApprovalStatus":"APPROVED","payerBrokerApprovalState":"APPROVED","payerMidOfficeApprovalState":"APPROVED","payerTraderApprovalState":"APPROVED","receiverOverallApprovalStatus":"APPROVED","receiverBrokerApprovalState":"APPROVED","receiverMidOfficeApprovalState":"APPROVED","receiverTraderApprovalState":"APPROVED"}');
  });

  test('and no brokerage for receiver passed in', () => {
    const dummyDeal = simpleCopy(dummyChainTwoTrades);
    delete dummyDeal.deals[0].trades[0].tradeEconomics.receiver.brokerage;
    const dummyChains = [{ ...dummyDeal }];
    const [deal] = transformBlotterChains(dummyChains);
    expect(JSON.stringify(deal)).toEqual('{"chainId":302,"dmsDealReference":305,"dealEntityId":999,"dealType":"NDF","tradeStrategy":"NDF.EUR.COP.1W","tradeDate":"07/08/2020","tradeDateTimeMilli":{},"tradeTime":"11:22:33","dealAction":"NEW","dealStatus":"APPROVED","executionVenueType":"SEF","valueDate":"07/08/2020","fixingDate":"07/08/2020","publishDate":"07/08/2020","price":"65.27","notionalAmount":"3000000.0000","isDealUnderInvestigation":false,"payerSTPStatusGroup":"","payerBrokerageCurrency":"","payerBrokerageAmount":"","payerBrokerageStdAmount":"","payerBrokerageStdCurrency":"","payerCustomerName":"AMERICAN PRESIDENT B LON","payerBrokerName":"A. LIM","payerTraderName":"J. KENNEDY","payerThirdPartyAgentName":"42 FIN SERV S.R.O PRA","receiverSTPStatusGroup":"","receiverBrokerageAmount":"","receiverBrokerageCurrency":"","receiverBrokerageStdCurrency":"","receiverBrokerageStdAmount":"","receiverCustomerName":"AMERICAN PRESIDENT B HKG","receiverBrokerName":"A. LIM","receiverTraderName":"D. EISENHOWER","receiverThirdPartyAgentName":"42 FIN SERV S.R.O PRA","payerOverallApprovalStatus":"APPROVED","payerBrokerApprovalState":"APPROVED","payerMidOfficeApprovalState":"APPROVED","payerTraderApprovalState":"APPROVED","receiverOverallApprovalStatus":"APPROVED","receiverBrokerApprovalState":"APPROVED","receiverMidOfficeApprovalState":"APPROVED","receiverTraderApprovalState":"APPROVED"}');
  });

  test('and no stp flags passed in', () => {
    const dummyDeal = simpleCopy(dummyChainTwoTrades);
    delete dummyDeal.deals[0].payerSTPStatus;
    delete dummyDeal.deals[0].receiverSTPStatus;
    const dummyChains = [{ ...dummyDeal }];
    const [deal] = transformBlotterChains(dummyChains);
    expect(JSON.stringify(deal)).toEqual('{"chainId":302,"dmsDealReference":305,"dealEntityId":999,"dealType":"NDF","tradeStrategy":"NDF.EUR.COP.1W","tradeDate":"07/08/2020","tradeDateTimeMilli":{},"tradeTime":"11:22:33","dealAction":"NEW","dealStatus":"APPROVED","executionVenueType":"SEF","valueDate":"07/08/2020","fixingDate":"07/08/2020","publishDate":"07/08/2020","price":"65.27","notionalAmount":"3000000.0000","isDealUnderInvestigation":false,"payerSTPStatusGroup":"","payerBrokerageCurrency":"","payerBrokerageAmount":"","payerBrokerageStdAmount":"","payerBrokerageStdCurrency":"","payerCustomerName":"AMERICAN PRESIDENT B LON","payerBrokerName":"A. LIM","payerTraderName":"J. KENNEDY","payerThirdPartyAgentName":"42 FIN SERV S.R.O PRA","receiverSTPStatusGroup":"","receiverBrokerageAmount":"","receiverBrokerageCurrency":"","receiverBrokerageStdCurrency":"","receiverBrokerageStdAmount":"","receiverCustomerName":"AMERICAN PRESIDENT B HKG","receiverBrokerName":"A. LIM","receiverTraderName":"D. EISENHOWER","receiverThirdPartyAgentName":"42 FIN SERV S.R.O PRA","payerOverallApprovalStatus":"APPROVED","payerBrokerApprovalState":"APPROVED","payerMidOfficeApprovalState":"APPROVED","payerTraderApprovalState":"APPROVED","receiverOverallApprovalStatus":"APPROVED","receiverBrokerApprovalState":"APPROVED","receiverMidOfficeApprovalState":"APPROVED","receiverTraderApprovalState":"APPROVED"}');
  });
});
