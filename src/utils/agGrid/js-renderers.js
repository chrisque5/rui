import moment from 'moment';
import { blotterApprovalsMap, blotterStpStatusesMap } from '../constants';

/**
 * Renders a STP cell
 * @param {Object} params the cell params
 * @returns {string} the HTML as a string
 */
const stpCellRenderer = (params) => {
  const {
    data: { payerSTPStatus, receiverSTPStatus } = {},
    side,
  } = params;

  const value = side === 'PAYER' ? payerSTPStatus : receiverSTPStatus;

  if (value !== undefined && value !== null) {
    const { color } = blotterStpStatusesMap[value] || {};

    return `<span class="stp-traffic-icon ${color}" title="${value}">&nbsp;</span>`;
  }

  return '<span class="stp-traffic-icon" title="N/A">&nbsp;</span>';
};

/**
 * Renders a STP filter cell
 * @param {Object} params the cell params
 * @returns {string} the HTML as a string
 */
const stpFilterCellRenderer = ({ value }) => {
  const { color = null } = Object.values(blotterStpStatusesMap).find((status) => status.title === value) || {};
  const title = color !== null ? value : 'N/A';

  let returnVal = `<span class="stp-traffic-filter" title="${title}">`;
  returnVal += `<span class="stp-traffic-icon-filter ${color}"></span><span class="stp-traffic-text">${title}</span>`;
  returnVal += '</span>';

  return returnVal;
};

/**
 * Renders an is under investigation cell
 * @param {sting} value the cell value
 * @returns {string} the HTML as a string
 */
const isUnderInvestigationCellRenderer = (params = {}) => {
  const {
    value, node, column, dispatch, enableInvestigationChkFlag,
    data: {
      investigatingTime, dealEntityId, investigatingUserFullName,
    } = {},
  } = params;

  const checkbox = document.createElement('input');
  const title = (value && investigatingUserFullName)
    ? `Under Investigation By: ${investigatingUserFullName} at ${moment(investigatingTime).format('L HH:mm:ss')}`
    : 'Investigation Flag';

  Object.assign(checkbox, {
    type: 'checkbox',
    checked: value,
    className: 'custom-checkbox',
    title,
    onchange: (e) => {
      node.setDataValue(column.colId, e.target.checked);
      const payload = {
        dmsDealId: dealEntityId,
        isDealUnderInvestigation: e.target.checked,
      };
      dispatch(enableInvestigationChkFlag(payload));
    },
    value,
  });

  return checkbox;
};

/**
 * Generate an approvals label
 *
 * @param {String} title - the label title
 * @param {String} text - the label text
 * @param {String} dealAction - the dealAction, used to set the class
 */
const generateApprovalsLabel = ({
  title, text, dealAction = '', isDealUnderInvestigation,
}) => {
  const dealActionLower = dealAction.toLowerCase();
  let { className } = blotterApprovalsMap[text] || {};
  if (isDealUnderInvestigation && dealActionLower !== 'cancel') {
    className = '';
  }
  return `<label title="${title}" class="approvals-label ${className} ${dealActionLower}">${text}</label>`;
};

/**
   * Renders an approval summary cell
   *
   * @param {Object} params the cell params
   * @returns {string} the HTML as a string
   */
const approvalsSummaryCellRenderer = (params = {}) => {
  const {
    data: {
      payerOverallApprovalStatus, receiverOverallApprovalStatus,
      payerBrokerApprovalState, payerMidOfficeApprovalState, payerTraderApprovalState,
      receiverBrokerApprovalState, receiverMidOfficeApprovalState, receiverTraderApprovalState,
      dealAction, isDealUnderInvestigation,
    } = {},
    side,
  } = params;

  const getTitle = (broker, midOffice, trader) => `Broker: ${broker}\nMid-Office: ${midOffice}\nTrader: ${trader}`;

  if (side === 'PAYER') {
    return generateApprovalsLabel({
      dealAction,
      text: payerOverallApprovalStatus,
      title: getTitle(payerBrokerApprovalState, payerMidOfficeApprovalState, payerTraderApprovalState),
      isDealUnderInvestigation,
    });
  }

  return generateApprovalsLabel({
    dealAction,
    text: receiverOverallApprovalStatus,
    title: getTitle(receiverBrokerApprovalState, receiverMidOfficeApprovalState, receiverTraderApprovalState),
    isDealUnderInvestigation,
  });
};

/**
   * If user has approval permission for the Execution venue return true else false
   * @param {string} executionVenueType the cell params
   * @param {Object} permissions the cell params
   * @returns {string} Boolean
   */
const canApproveDeal = (executionVenueType, permissions) => {
  const { validForSEFDealApprove, validForNonSEFdealApprove } = permissions;
  if ((executionVenueType === 'SEF' && validForSEFDealApprove) || (executionVenueType !== 'SEF' && validForNonSEFdealApprove)) {
    return true;
  }
  return false;
};

/**
   * Renders an approval cell
   *   If APPROVED OR REJECTED show a label
   *   IF PENDING and has approval permission return an approvals button otherwise return label
   *   If dealAction is CANCEL show label instead of button
   *
   * @param {Object} params the cell params
   * @returns {string} the HTML as a string
   */
const approvalsCellRenderer = (params = {}) => {
  const {
    approveStageBlotter,
    data: {
      dealAction, dmsDealReference, dealEntityId, lockSequence, payerStrategyId, receiverStrategyId,
      executionVenueType, isDealUnderInvestigation,
    } = {},
    dispatch,
    position,
    side,
    value,
    permissions,
  } = params;

  // if approved, rejected, no permission to approve or the deal action is cancelled return a label
  if (value === 'APPROVED' || value === 'REJECTED' || dealAction === 'CANCEL'
    || (value === 'PENDING' && !canApproveDeal(executionVenueType, permissions))) {
    return generateApprovalsLabel({
      dealAction, text: value, title: value, isDealUnderInvestigation,
    });
  }

  // build up the payload to send to the approval action
  const payload = {
    dealEntityId,
    lockSequence,
    approvalPosition: position,
    isApproved: true,
    strategyId: side === 'PAYER' ? payerStrategyId : receiverStrategyId,
  };

  // create a button element
  // N.B. native elements are more performant in the grid than React components
  const elementButton = document.createElement('button');

  // assign the button a class, html and hook up the onclick event
  Object.assign(elementButton, {
    className: 'ant-btn ant-btn-primary',
    innerHTML: value,
    onclick(e) {
      e.target.disabled = true;
      dispatch(approveStageBlotter(payload));
    },
  });

  elementButton.setAttribute('data-testid', `approval-${dmsDealReference}-${side}-${position}-${value}`.toLowerCase());

  return elementButton;
};

export {
  approvalsCellRenderer,
  approvalsSummaryCellRenderer,
  isUnderInvestigationCellRenderer,
  stpCellRenderer,
  stpFilterCellRenderer,
};
