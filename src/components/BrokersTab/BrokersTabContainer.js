import { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as uiActions from '../../actions/uiActions';
import * as userActions from '../../actions/userActions';
import BrokersTab from './BrokersTab';
import { ids, strategies, favorites } from '../../utils/constants';
import { resetValidationForId } from '../../utils/validation';
import { showWarningNotification } from '../../utils/notifications';
import FavouritesRenameModal from './FavouritesRenameModal';
import { isValidDate } from '../../utils/helper';
import {
  isInScope, getCurrencyScope, getTermScope, getCounterPartyScope, getExecutionVenueScope,
} from '../../utils/scopeHelper';
import FavouritesColourModal from './FavouritesColourModal';

class BrokersTabContainer extends Component {
  onTabChange = (activeTabKey) => {
    this.props.uiActions.changeSelectedPreferenceBroker(activeTabKey);
  }

  onTabEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  remove = (brokerIds) => {
    this.showDeleteConfirmation(favorites.BROKER, brokerIds);
  }

  onTabOrderChanged = (newOrder, existingOrder, favType, selectedBroker) => {
    this.props.userActions.editBrokerOrder(
      newOrder, this.props.preferences.preferredBrokers, favType, selectedBroker,
    );
  }

  calculatedTabOrder = () => {
    if (this.props.preferences && this.props.preferences.preferredBrokers) {
      return this.props.preferences.preferredBrokers.map((broker) => `${broker.deskId.toString()},${broker.id.toString()}`);
    }
    return [];
  }

  /**
   * When a firm is clicked
   * If the firm isn't the currently selected one in the state then select it
   * If the firm is the currently selected one in the state then deselect it
   *
   * @param {Object} selectedFirm the selected firm
   * @param {string} selectedBbrokerDeskIdsrokerId the broker and desk
   */
  onFirmClick = (selectedFirm, brokerDeskIds) => {
    const firm = this.props.selectedPreferenceFirm === selectedFirm.tradingCustomerCodeLocationCode ? {} : selectedFirm;
    this.props.userActions.selectPreferredFirm(firm, brokerDeskIds);
  }

  setClientTrader =
    ({
      tradingCustomerId, traderPostingId, executingCustomerId, status, agentCustomerId,
    }, brokerDeskIds) => {
      if (status === 'DELETED') {
        showWarningNotification('Warning', 'Selected client/trader has been marked as deleted.');
        return;
      } if (status === 'UNAVAILABLE') {
        showWarningNotification('Warning', 'Selected client/trader is not available for selection.');
        return;
      }

      if (!isInScope({
        tradingCustomerId, traderPostingId, executingCustomerId, status, agentCustomerId,
      }, { counterPartyScope: this.props.counterPartyScope }, this.props.selectedPreferenceBroker)) {
        showWarningNotification('Warning', 'Selected counterparty is not available for selection here.');
        return;
      }

      const selectedTradeSide = this.props.selectedTradeSide;
      const clientTraderIdProp = `${selectedTradeSide}ClientTrader`;
      const brokerDeskIdProp = `${selectedTradeSide}Broker`;
      const agentIdProp = `${selectedTradeSide}Agent`;
      const isThirdCPChecked = this.props.isThirdCPChecked;

      resetValidationForId(`${selectedTradeSide}ClientTrader`);
      resetValidationForId(`${selectedTradeSide}Agent`);

      const traderAgentVal = (traderPostingId !== 0 && executingCustomerId !== 0) ? (`${traderPostingId},${executingCustomerId}`) : 'agent';
      this.props.form.setFieldsValue({
        [clientTraderIdProp]: [tradingCustomerId, traderAgentVal],
      });
      this.props.form.setFieldsValue({ [brokerDeskIdProp]: brokerDeskIds });
      this.props.form.setFieldsValue({ [agentIdProp]: agentCustomerId !== 0 ? agentCustomerId : undefined });
      let rowToSwitch;

      if (selectedTradeSide === 'buyer') {
        rowToSwitch = 'seller';
      } else if (selectedTradeSide === 'seller') {
        rowToSwitch = isThirdCPChecked ? 'cp2Buyer' : 'buyer';
      } else if (selectedTradeSide === 'cp2Buyer') {
        rowToSwitch = 'cp2Seller';
      } else if (selectedTradeSide === 'cp2Seller') {
        rowToSwitch = 'buyer';
      }

      this.props.uiActions.changeClientHoverData({
        tradingCustomerId, traderPostingId, executingCustomerId,
      });
      this.props.uiActions.changeCounterPartySelection(rowToSwitch);
    }

  onClientTraderRemove = (event) => (clientIds, brokerIds) => {
    event.stopPropagation();
    event.preventDefault();
    this.showDeleteConfirmation(favorites.CLIENT_TRADER, brokerIds, clientIds);
  }

  setCurrency = (currencyPair) => {
    if (!isInScope(currencyPair, { currencyScope: this.props.currencyScope }, this.props.selectedPreferenceBroker)) {
      showWarningNotification('Warning', 'Selected currency is not available for selection here.');
      return;
    }

    const dealtCurrency = currencyPair.dealtCurrency || currencyPair.baseCurrency;
    this.props.form.setFieldsValue({
      [ids.CURRENCY_1]: currencyPair.baseCurrency,
      [ids.CURRENCY_2]: currencyPair.counterCurrency,
      [ids.DEALT_CURRENCY]: dealtCurrency,
    });

    this.props.form.getFieldInstance(ids.CURRENCY_2).props.onChange(currencyPair.counterCurrency);
    this.props.form.getFieldInstance(ids.DEALT_CURRENCY).props.onChange(dealtCurrency);
  }

  onCurrencyRemove = (event) => (currencyPair, brokerIds) => {
    event.stopPropagation();
    event.preventDefault();
    this.showDeleteConfirmation(favorites.CCY_PAIR, brokerIds, currencyPair);
  }

  setTerm = (selectedTerm) => {
    if (!isInScope(selectedTerm, { termScope: this.props.termScope }, this.props.selectedPreferenceBroker)) {
      showWarningNotification('Warning', 'Selected term is not available for selection here.');
      return;
    }

    const term = selectedTerm.term ? selectedTerm.term : selectedTerm;
    const selectedStrategy = this.props.form.getFieldValue(ids.STRATEGY);

    if (selectedTerm.valueDate && isValidDate(selectedTerm.valueDate)) {
      this.setValueDate(selectedTerm, selectedStrategy);
      return;
    }

    switch (selectedStrategy) {
      case strategies.NDF.OUTRIGHT:
      case strategies.FWD.FORWARD:
      case strategies.FWD.OUTRIGHT:
        this.props.form.getFieldInstance(ids.TERM_1).props.onSelect(term, ids.TERM_1);
        break;
      case strategies.NDF.SPREAD:
      case strategies.FWD.FORWARD_FORWARD:
        if (this.props.lastSetTerm === ids.TERM_1) {
          this.props.form.getFieldInstance(ids.TERM_2).props.onSelect(term, ids.TERM_1);
        } else {
          this.props.form.getFieldInstance(ids.TERM_1).props.onSelect(term, ids.TERM_1);
        }
        break;
      default:
        throw Error('Invalid strategy type on term favorite selection.');
    }
  }

  setValueDate = (selectedTerm, strategy) => {
    const fmtValueDate = moment(selectedTerm.valueDate, 'L');
    switch (strategy) {
      case strategies.NDF.OUTRIGHT:
      case strategies.FWD.FORWARD:
      case strategies.FWD.OUTRIGHT:
      case strategies.SPT.SPOT:
        this.props.form.getFieldInstance(ids.VALUE_DATE_1).props.onChange(fmtValueDate, ids.VALUE_DATE_1);
        break;
      case strategies.NDF.SPREAD:
      case strategies.FWD.FORWARD_FORWARD:
        if (this.props.lastSetTerm === ids.TERM_1) {
          this.props.form.getFieldInstance(ids.VALUE_DATE_2).props.onChange(fmtValueDate, ids.VALUE_DATE_2);
          this.props.uiActions.changeLastTermSelection(ids.TERM_2);
        } else {
          this.props.form.getFieldInstance(ids.VALUE_DATE_1).props.onChange(fmtValueDate, ids.VALUE_DATE_1);
          this.props.uiActions.changeLastTermSelection(ids.TERM_1);
        }
        break;
      default:
        throw Error('Invalid strategy type on term favorite selection.');
    }
  }

  onTermRemove = (event) => (term, brokerIds) => {
    event.stopPropagation();
    event.preventDefault();
    this.showDeleteConfirmation(favorites.TERM, brokerIds, term);
  }

  setExecutionVenue = (selectedExecutionVenue) => {
    if (!isInScope(selectedExecutionVenue, { executionVenueScope: this.props.executionVenueScope }, this.props.selectedPreferenceBroker)) {
      showWarningNotification('Warning', 'Selected execution venue is not available for selection here.');
      return;
    }

    const executionVenues = this.props.form.getFieldInstance(ids.EXECUTION_VENUE).props.children;
    const executionVenue = selectedExecutionVenue.executionVenue;

    if (executionVenues.find((i) => i.key === executionVenue)) {
      this.props.form.setFieldsValue({
        [ids.EXECUTION_VENUE]: executionVenue,
      });
    }
  }

  onExecutionVenueRemove = (event) => (executionVenue, brokerIds) => {
    event.stopPropagation();
    event.preventDefault();
    this.showDeleteConfirmation(favorites.EXECUTION_VENUE, brokerIds, executionVenue);
  }

  getPanes = () => {
    const panes = [];
    if (this.props.preferences.preferredBrokers) {
      this.props.preferences.preferredBrokers.forEach(
        (brokerPref) => (brokerPref.favourites
          ? panes.push({
            title: `${brokerPref.nickName}`,
            clients: this.props.selectedPreferenceClients,
            currencyPairs: brokerPref.favourites.currencyPairs,
            terms: brokerPref.favourites.terms,
            executionVenues: brokerPref.favourites.executionVenues,
            key: `${brokerPref.deskId},${brokerPref.id}`, // note: AntD calls toString to create Ids on whatever is here.
            brokerId: brokerPref.id,
            brokerName: brokerPref.name,
            deskId: brokerPref.deskId,
            deskName: brokerPref.deskName,
            firms: this.props.selectedPreferenceFirms,
            userSettings: this.props.userSettings,
          })
          : panes.push({
            title: `${brokerPref.nickName}`,
            key: `${brokerPref.deskId},${brokerPref.id}`,
            brokerId: brokerPref.id,
            brokerName: brokerPref.name,
            deskId: brokerPref.deskId,
            deskName: brokerPref.deskName,
          })),
      );
    }
    return panes;
  };

  showDeleteConfirmation = (type, brokerIds, favItem) => {
    let confirmText = 'Are you sure you want to delete favorite item?';
    if (type === favorites.BROKER) {
      confirmText = 'Are you sure you want to hide this Broker tab?';
    }
    const onOk = () => {
      // wipe selected broker if no preferred brokers available
      if (!this.props.preferences.preferredBrokers) {
        this.props.uiActions.changeSelectedPreferenceBroker();
      }

      switch (type) {
        case favorites.CLIENT_TRADER:
          this.props.userActions.deleteClientTraderPreference(brokerIds, favItem);
          break;
        case favorites.BROKER:
          this.props.userActions.deleteBrokerPreference(brokerIds.split(','));
          break;
        case favorites.CCY_PAIR:
          this.props.userActions.deleteCurrencyPairPreference(brokerIds, favItem);
          break;
        case favorites.TERM:
          this.props.userActions.deleteTermPreference(brokerIds, favItem);
          break;
        case favorites.EXECUTION_VENUE:
          this.props.userActions.deleteExecutionVenuePreference(brokerIds, favItem);
          break;
        default:
          break;
      }
    };

    Modal.confirm({
      title: 'Confirm',
      content: confirmText,
      okText: 'Yes',
      cancelText: 'No',
      onOk,
    });
  }

  render() {
    const panes = this.getPanes();
    return (
      panes.length > 0
      && (
        <>
          <BrokersTab
            onChange={this.onTabChange}
            onEdit={this.onTabEdit}
            onClientTraderClick={this.setClientTrader}
            panes={panes}
            onClientTraderRemove={this.onClientTraderRemove}
            onCurrencyRemove={this.onCurrencyRemove}
            onCurrencyClick={this.setCurrency}
            onTermRemove={this.onTermRemove}
            onTermClick={this.setTerm}
            onExecutionVenueClick={this.setExecutionVenue}
            onExecutionVenueRemove={this.onExecutionVenueRemove}
            onOrderChanged={this.onTabOrderChanged}
            tabOrder={this.calculatedTabOrder()}
            activeTabKey={this.props.selectedPreferenceBroker}
            currencyScope={this.props.currencyScope}
            termScope={this.props.termScope}
            counterPartyScope={this.props.counterPartyScope}
            executionVenueScope={this.props.executionVenueScope}
            onFirmClick={this.onFirmClick}
            selectedPreferenceFirm={this.props.selectedPreferenceFirm}
          />
          <FavouritesRenameModal />
          <FavouritesColourModal />
        </>
      )
    );
  }
}

BrokersTabContainer.defaultProps = {
  termScope: [{}],
  counterPartyScope: [{}],
  executionVenueScope: [{}],
  userSettings: {},
  selectedPreferenceFirm: null,
};

BrokersTabContainer.propTypes = {
  preferences: PropTypes.shape().isRequired,
  form: PropTypes.shape().isRequired,
  selectedTradeSide: PropTypes.string.isRequired,
  isThirdCPChecked: PropTypes.bool.isRequired,
  selectedPreferenceBroker: PropTypes.string.isRequired,
  selectedPreferenceFirm: PropTypes.string,
  selectedPreferenceFirms: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedPreferenceClients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  lastSetTerm: PropTypes.string.isRequired,
  uiActions: PropTypes.shape().isRequired,
  userActions: PropTypes.shape().isRequired,
  currencyScope: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  termScope: PropTypes.arrayOf(PropTypes.shape()),
  counterPartyScope: PropTypes.arrayOf(PropTypes.shape()),
  executionVenueScope: PropTypes.arrayOf(PropTypes.shape()),
  userSettings: PropTypes.shape(),
};

const mapStateToProps = ({
  ui, user, currencies, brokers, agents, clients, executionVenues,
}) => ({
  selectedTradeSide: ui.selectedTradeSide,
  isThirdCPChecked: ui.isThirdCPChecked,
  preferences: user.preferences,
  selectedPreferenceBroker: ui.selectedPreferenceBroker,
  selectedPreferenceFirms: ui.selectedPreferenceFirms,
  selectedPreferenceFirm: ui.selectedPreferenceFirm,
  selectedPreferenceClients: ui.selectedPreferenceClients,
  lastSetTerm: ui.lastSetTerm,
  selectedDealType: ui.selectedDealType,
  selectedStrategy: ui.selectedStrategyType,
  currencyScope: getCurrencyScope(currencies, user.preferences),
  termScope: getTermScope(user.preferences, ui.selectedStrategyType, ui.selectedDealType),
  counterPartyScope: getCounterPartyScope(brokers, agents, clients, user.preferences),
  executionVenueScope: getExecutionVenueScope(executionVenues, user.preferences, ui.selectedDealType),
  userSettings: user.preferences.settings,
});

const mapDispatchToProps = (dispatch) => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(BrokersTabContainer);
