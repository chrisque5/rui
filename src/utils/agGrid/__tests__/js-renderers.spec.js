import moment from 'moment';
import {
  approvalsCellRenderer, approvalsSummaryCellRenderer, isUnderInvestigationCellRenderer, stpCellRenderer, stpFilterCellRenderer,
} from '../index';
import { blotterStpStatusesMap } from '../../constants';

describe('approvalsSummaryCellRenderer returns the correct html string', () => {
  test('when side = PAYER ', () => {
    const params = {
      data: {
        payerBrokerApprovalState: 'PENDING', payerMidOfficeApprovalState: 'APPROVED', payerTraderApprovalState: 'REJECTED', dealAction: 'NEW',
      },
      side: 'PAYER',
    };

    let expectedOutput = '<label title="Broker: PENDING';
    expectedOutput += '\nMid-Office: APPROVED';
    expectedOutput += '\nTrader: REJECTED" class="approvals-label undefined new">undefined</label>';

    expect(approvalsSummaryCellRenderer(params)).toEqual(expectedOutput);
  });

  test('when side = RECEIVER ', () => {
    const params = {
      data: {
        receiverBrokerApprovalState: 'PENDING',
        receiverMidOfficeApprovalState: 'APPROVED',
        receiverTraderApprovalState: 'REJECTED',
        dealAction: 'NEW',
      },
      side: 'RECEIVER',
    };

    let expectedOutput = '<label title="Broker: PENDING';
    expectedOutput += '\nMid-Office: APPROVED';
    expectedOutput += '\nTrader: REJECTED" class="approvals-label undefined new">undefined</label>';

    expect(approvalsSummaryCellRenderer(params)).toEqual(expectedOutput);
  });

  test('when Action = CANCEL ', () => {
    const params = {
      data: {
        payerBrokerApprovalState: 'PENDING', payerMidOfficeApprovalState: 'APPROVED', payerTraderApprovalState: 'REJECTED', dealAction: 'CANCEL',
      },
      side: 'PAYER',
      value: 'PENDING',
    };

    let expectedOutput = '<label title="Broker: PENDING';
    expectedOutput += '\nMid-Office: APPROVED';
    expectedOutput += '\nTrader: REJECTED" class="approvals-label undefined cancel">undefined</label>';

    expect(approvalsSummaryCellRenderer(params)).toEqual(expectedOutput);
  });
});

describe('approvalsCellRenderer returns the correct html string', () => {
  const defaultParams = {
    approveStageBlotter: () => jest.fn(),
    data: {
      dealAction: 'NEW',
      dmsDealReference: 123456,
      dealEntityId: 345678,
      lockSequence: 3,
      payerStrategyId: 10001,
      receiverStrategyId: 10002,
    },
    dispatch: () => jest.fn(),
    position: 'BROKER',
    side: 'PAYER',
    value: 'APPROVED',
    permissions: {
      validForSEFDealApprove: true,
      validForNonSEFdealApprove: true,
    },
  };

  test('when value = APPROVED', () => {
    const params = { ...defaultParams };
    const expectedVal = '<label title="APPROVED" class="approvals-label success approved new">APPROVED</label>';

    expect(approvalsCellRenderer(params)).toEqual(expectedVal);

    params.position = 'MID_OFFICE';
    expect(approvalsCellRenderer(params)).toEqual(expectedVal);

    params.position = 'TRADER';
    expect(approvalsCellRenderer(params)).toEqual(expectedVal);
  });

  test('when value = REJECTED', () => {
    const params = { ...defaultParams };
    const expectedVal = '<label title="REJECTED" class="approvals-label error rejected new">REJECTED</label>';

    params.value = 'REJECTED';
    expect(approvalsCellRenderer(params)).toEqual(expectedVal);

    params.position = 'MID_OFFICE';
    expect(approvalsCellRenderer(params)).toEqual(expectedVal);

    params.position = 'TRADER';
    expect(approvalsCellRenderer(params)).toEqual(expectedVal);
  });

  test('when dealAction = CANCEL', () => {
    const params = { ...defaultParams };
    const expectedVal = '<label title="APPROVED" class="approvals-label success approved cancel">APPROVED</label>';

    params.data = {
      ...params.data,
      dealAction: 'CANCEL',
    };
    expect(approvalsCellRenderer(params)).toEqual(expectedVal);

    params.position = 'MID_OFFICE';
    expect(approvalsCellRenderer(params)).toEqual(expectedVal);

    params.position = 'TRADER';
    expect(approvalsCellRenderer(params)).toEqual(expectedVal);
  });

  describe('when value = PENDING', () => {
    test('and side = PAYER', () => {
      const params = { ...defaultParams, value: 'PENDING' };

      let button = approvalsCellRenderer(params);
      expect(button.getAttribute('data-testid')).toEqual('approval-123456-payer-broker-pending');

      params.position = 'MID_OFFICE';
      button = approvalsCellRenderer(params);
      expect(button.getAttribute('data-testid')).toEqual('approval-123456-payer-mid_office-pending');

      params.position = 'TRADER';
      button = approvalsCellRenderer(params);
      expect(button.getAttribute('data-testid')).toEqual('approval-123456-payer-trader-pending');
    });

    test('and side = RECEIVER', () => {
      const params = { ...defaultParams, side: 'RECEIVER', value: 'PENDING' };

      let button = approvalsCellRenderer(params);
      expect(button.getAttribute('data-testid')).toEqual('approval-123456-receiver-broker-pending');

      params.position = 'MID_OFFICE';
      button = approvalsCellRenderer(params);
      expect(button.getAttribute('data-testid')).toEqual('approval-123456-receiver-mid_office-pending');

      params.position = 'TRADER';
      button = approvalsCellRenderer(params);
      expect(button.getAttribute('data-testid')).toEqual('approval-123456-receiver-trader-pending');
    });

    test('and side = PAYER and user dont have Permission to approve', () => {
      const params = { ...defaultParams, value: 'PENDING' };
      params.permissions = { validForNonSEFdealApprove: false, validForSEFDealApprove: false };
      const expectedVal = '<label title="PENDING" class="approvals-label warning pending new">PENDING</label>';

      const retVal = approvalsCellRenderer(params);
      expect(retVal).toEqual(expectedVal);
    });
  });
});

describe('isUnderInvestigationCellRenderer returns the correct html string', () => {
  const investigatingTime = moment('2021-03-09T12:36:20.121+08').format('L HH:mm:ss');

  test('when input value is true', () => {
    // eslint-disable-next-line max-len
    const expectedOutput = `<input type="checkbox" class="custom-checkbox" title="Under Investigation By: USER at ${investigatingTime}" value="true">`;
    expect(isUnderInvestigationCellRenderer({
      value: true,
      data: {
        dealEntityId: 5200,
        investigatingTime: '2021-03-09T12:36:20.121+08',
        investigatingUserFullName: 'USER',
      },
    }).outerHTML).toEqual(expectedOutput);
  });

  test('when input value is false', () => {
    const expectedOutput = '<input type="checkbox" class="custom-checkbox" title="Investigation Flag" value="false">';
    expect(isUnderInvestigationCellRenderer({ value: false }).outerHTML).toEqual(expectedOutput);
  });
});

describe('stpCellRenderer returns the correct html string', () => {
  ['PAYER', 'RECEIVER'].forEach((side) => {
    Object.entries(blotterStpStatusesMap).forEach(([key, value]) => {
      test(`when payerSTPStatus = ${key} and side = ${side}`, () => {
        const { color } = value;

        const expectedOutput = `<span class="stp-traffic-icon ${color}" title="${key}">&nbsp;</span>`;
        const params = { data: { payerSTPStatus: key, receiverSTPStatus: key }, side };

        expect(stpCellRenderer(params)).toEqual(expectedOutput);
      });
    });
  });

  test('when payerSTPStatus not passed in', () => {
    const expectedOutput = '<span class="stp-traffic-icon" title="N/A">&nbsp;</span>';
    const params = { data: { receiverSTPStatus: 'CONFIRMED' }, side: 'PAYER' };

    expect(stpCellRenderer(params)).toEqual(expectedOutput);
  });

  test('when receiverSTPStatus not passed in', () => {
    const expectedOutput = '<span class="stp-traffic-icon" title="N/A">&nbsp;</span>';
    const params = { data: { payerSTPStatus: 'CONFIRMED' }, side: 'RECEIVER' };

    expect(stpCellRenderer(params)).toEqual(expectedOutput);
  });

  test('when payerSTPStatus is null', () => {
    const expectedOutput = '<span class="stp-traffic-icon" title="N/A">&nbsp;</span>';
    const params = { data: { payerSTPStatus: null, receiverSTPStatus: 'CONFIRMED' }, side: 'PAYER' };

    expect(stpCellRenderer(params)).toEqual(expectedOutput);
  });

  test('when receiverSTPStatus is null', () => {
    const expectedOutput = '<span class="stp-traffic-icon" title="N/A">&nbsp;</span>';
    const params = { data: { payerSTPStatus: 'CONFIRMED', receiverSTPStatus: null }, side: 'RECEIVER' };

    expect(stpCellRenderer(params)).toEqual(expectedOutput);
  });
});

describe('stpFilterCellRenderer returns the correct html string', () => {
  Object.entries(blotterStpStatusesMap).forEach(([key, value]) => {
    test(`when value = ${key}`, () => {
      const { color, title } = value;

      let expectedOutput = `<span class="stp-traffic-filter" title="${title}">`;
      expectedOutput += `<span class="stp-traffic-icon-filter ${color}"></span><span class="stp-traffic-text">${title}</span>`;
      expectedOutput += '</span>';

      expect(stpFilterCellRenderer({ value: title })).toEqual(expectedOutput);
    });
  });

  test('when value is null', () => {
    let expectedOutput = '<span class="stp-traffic-filter" title="N/A">';
    expectedOutput += '<span class="stp-traffic-icon-filter null"></span>';
    expectedOutput += '<span class="stp-traffic-text">N/A</span></span>';
    expect(stpFilterCellRenderer({ value: null })).toEqual(expectedOutput);
  });
});
