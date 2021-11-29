/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  RetweetOutlined, InfoCircleOutlined, StarFilled, PushpinOutlined, PushpinFilled,
} from '@ant-design/icons';
import {
  Table, Cascader, Form, Button, Row, Popover, Select, Tooltip, Checkbox,
} from 'antd';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { bindActionCreators } from 'redux';
import * as uiActions from '../../actions/uiActions';
import * as userActions from '../../actions/userActions';
import * as clientActions from '../../actions/clientActions';
import * as brokerActions from '../../actions/brokerActions';
import * as agentActions from '../../actions/agentActions';
import {
  validationStates, resetValidationForId, clientTraderValidation, resetCounterpartyValidation,
} from '../../utils/validation';
import { ids, dealTypes, strategies } from '../../utils/constants';
import { doesArrayExistWithValue } from '../../utils/helper';
import * as notification from '../../utils/notifications';

class CounterPartiesContainer extends Component {
  // eslint-disable-next-line react/sort-comp
  constructor(props) {
    super(props);

    this.state = {
      clientCascaderOptions: [],
      brokerCascaderOptions: [],
      pinnedAgentSelectOptions: [],
      unpinnedAgentSelectOptions: [],
      isClientLoading: true,
      isBrokerLoading: true,
      isAgentLoading: true,
      validationInProgress: false,
    };
  }

  columns = [{
    title: 'Side',
    dataIndex: 'sideLabel',
    key: 'sideLabel',
    render: (text, record) => (
      <Button
        block
        tabIndex="-1"
        data-testid={`btn${record.side}CounterPartySide`}
        onClick={() => this.onRowClick(record.side)}
      >
        {record.btnLabel}
      </Button>
    )
    ,
  }, {
    title: 'Client/Trader',
    dataIndex: 'trader',
    key: 'trader',
    width: 350,
    render: (text, record) => (
      <Form.Item
        validateStatus={validationStates[`${record.side}ClientTrader`].status}
        help={validationStates[`${record.side}ClientTrader`].message}
        style={{ marginBottom: 0 }}
        name={`${record.side}ClientTrader`}
      >

        <Cascader
          size="small"
          options={this.state.clientCascaderOptions}
          placeholder={this.state.isClientLoading ? 'Loading... ' : 'Please select'}
          showSearch={{ filter: this.cascaderFilter, limit: 100, matchInputWidth: false }}
          data-testid={`ddl${record.side}ClientTrader`}
          onChange={(value, selectedOptions) => this.onClientTraderChange(value, selectedOptions, record.side)}
          name={`${record.side}ClientTrader`}
          displayRender={this.customCascaderDisplay}
          dropdownRender={this.dropdownRender}
          className="client-cascader"
          suffixIcon={(this.props.form.getFieldValue(`${record.side}ClientTrader`) && this.props.clientHoverInfo[record.side]) && (
            <Popover className="client-data-tip" content={this.getClientHoverInfo(record.side)} title="Client/Trader Info">
              <InfoCircleOutlined className="client-info" />
            </Popover>
          )}
        />
      </Form.Item>
    ),
  }, {
    title: 'Desk/Broker',
    dataIndex: 'broker',
    key: 'broker',
    width: 350,
    render: (text, record) => (
      <Form.Item
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: 'Broker is required' }]}
        name={`${record.side}Broker`}
      >
        <Cascader
          size="small"
          options={this.state.brokerCascaderOptions}
          placeholder={this.state.isBrokerLoading ? 'Loading... ' : 'Please select'}
          showSearch={{ filter: this.cascaderFilter, limit: 100, matchInputWidth: false }}
          data-testid={`ddl${record.side}Broker`}
          onChange={(e) => this.onBrokerChange(e, record.side)}
          name={`${record.side}Broker`}
          dropdownRender={this.dropdownRender}
        />
      </Form.Item>
    ),
  }, {
    title: 'Agent',
    dataIndex: 'agent',
    key: 'agent',
    render: (text, record) => (
      <Form.Item
        style={{ marginBottom: 0, width: '170px' }}
        validateStatus={validationStates[`${record.side}Agent`].status}
        help={validationStates[`${record.side}Agent`].message}
        name={`${record.side}Agent`}
      >
        <Select
          showSearch
          allowClear
          showAction={['focus', 'click']}
          placeholder={this.state.isAgentLoading ? 'Loading... ' : 'Please select'}
          filterOption
          optionFilterProp="title"
          name={`${record.side}Agent`}
          data-testid={`ddl${record.side}Agent`}
          onChange={(e) => this.onAgentChange(e, record.side)}
          dropdownMatchSelectWidth={false}
          disabled={this.disableAgentField(record.side)}
        >
          {this.state.pinnedAgentSelectOptions && this.state.pinnedAgentSelectOptions.length > 0
            ? (
              <>
                <Select.OptGroup label="Pinned">
                  {this.state.pinnedAgentSelectOptions.map(
                    (agent) => (
                      <Select.Option key={agent.id} value={agent.id} title={`${agent.shortName} (${agent.locationName})`}>
                        {`${agent.shortName} (${agent.locationName}) `}
                        <a data-testid="lnkPinAgent" onClick={(e) => this.pinAgent(e, agent.id)}>
                          <PushpinFilled />
                        </a>
                      </Select.Option>
                    ),
                  )}
                </Select.OptGroup>
                <Select.OptGroup label="Unpinned">
                  {this.state.unpinnedAgentSelectOptions && this.state.unpinnedAgentSelectOptions.map(
                    (agent) => !agent.pinned && (
                    <Select.Option key={agent.id} value={agent.id} title={`${agent.shortName} (${agent.locationName})`}>
                      {`${agent.shortName} (${agent.locationName}) `}
                      <a data-testid="lnkPinAgent" onClick={(e) => this.pinAgent(e, agent.id)}>
                        <PushpinOutlined />
                      </a>
                    </Select.Option>
                    ),
                  )}
                </Select.OptGroup>
              </>
            )
            : (
              <>
                {this.state.unpinnedAgentSelectOptions && this.state.unpinnedAgentSelectOptions.map(
                  (agent) => !agent.pinned && (
                  <Select.Option key={agent.id} value={agent.id} title={`${agent.shortName} (${agent.locationName})`}>
                    {`${agent.shortName} (${agent.locationName}) `}
                    <a data-testid="lnkPinAgent" onClick={(e) => this.pinAgent(e, agent.id)}>
                      <PushpinOutlined />
                    </a>
                  </Select.Option>
                  ),
                )}
              </>
            )}
        </Select>
      </Form.Item>
    ),
  }, {
    title: (
      <Tooltip
        title="Swap buy/sell sides"
        mouseEnterDelay={0.3}
        overlayStyle={{ fontSize: '0.8em', padding: 0, margin: 0 }}
      >
        <RetweetOutlined
          onClick={() => this.swapBuySellData()}
          style={{ verticalAlign: 'middle', fontSize: '1.2em' }}
          data-testid="btnSwap"
          viewBox="0 0 1024 1024"
        >
          swap
        </RetweetOutlined>
      </Tooltip>),
    dataIndex: 'preferenceLabel',
    key: 'preferenceLabel',
    render: (text, record) => (
      <Row type="flex" justify="center">
        <StarFilled
          data-testid={`btn${record.side}Favorite`}
          className="star-icon trigger"
          onClick={() => this.preferenceClientTraderClicked(record.side)}
        />
      </Row>
    ),
  }, (this.props.dealType === dealTypes.FWD
    ? {
      title: (
        <Tooltip
          title="Nett Brokerage"
          mouseEnterDelay={0.3}
          overlayStyle={{ fontSize: '0.8em', padding: 0, margin: 0 }}
        >
          N
        </Tooltip>),
      dataIndex: 'nettBrokerage',
      key: 'nettBrokerage',
      render: (text, record) => (
        <Row type="flex" justify="center">
          <Form.Item
            name={`${record.side}NettBrokerage`}
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox
              name={`${record.side}NettBrokerage`}
              data-testid={`chk${record.side}NettBrokerage`}
              disabled={this.props.strategyType === strategies.FWD.OUTRIGHT}
            />
          </Form.Item>
        </Row>
      ),
    }
    : undefined
  )].filter((x) => x !== undefined);

  componentDidMount = () => {
    this.props.clientActions.loadClientData(this.props.dealType)
      .then(() => {
        this.setState((prevState) => ({
          ...prevState,
          clientCascaderOptions: this.prepareclientCascaderOptions(this.props.clients),
          isClientLoading: !prevState.isClientLoading,
        }));
      });
    this.props.brokerActions.loadBrokers(this.props.dealType)
      .then(() => {
        this.setState((prevState) => ({
          ...prevState,
          brokerCascaderOptions: this.preparebrokerCascaderOptions(this.props.brokers),
          isBrokerLoading: !prevState.isBrokerLoading,
        }));
      });
    this.props.agentActions.loadAgents(this.props.dealType)
      .then(() => {
        this.setState((prevState) => ({
          ...prevState,
          isAgentLoading: !prevState.isAgentLoading,
        }));
        this.prepareAgentSelectOptions();
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.preferences.pinnedAgents !== this.props.user.preferences.pinnedAgents) {
      this.prepareAgentSelectOptions();
    }
  }

  prepareAgentSelectOptions = () => {
    const pinnedAgents = [];
    const unpinnedAgents = [];
    const pinnedAgentIds = this.props.user.preferences.pinnedAgents;

    this.props.agents.forEach((agent) => {
      if (pinnedAgentIds && pinnedAgentIds.includes(agent.id)) {
        pinnedAgents.push(agent);
      } else {
        unpinnedAgents.push(agent);
      }
    });

    this.setState((prevState) => ({
      ...prevState,
      pinnedAgentSelectOptions: pinnedAgents,
      unpinnedAgentSelectOptions: unpinnedAgents,
    }));
  }

  addPinnedAgent = (agentId, pinnedAgents = []) => {
    const newPinnedAgents = { pinnedAgents: [...pinnedAgents, agentId] };
    this.props.userActions.changePreference(newPinnedAgents);
  }

  removePinnedAgent = (agentId, pinnedAgents = []) => {
    const newPinnedAgents = pinnedAgents.filter((agent) => agent !== agentId);
    this.props.userActions.changePreference({ pinnedAgents: [...newPinnedAgents] });
  }

  pinAgent = (e, agentId) => {
    e.stopPropagation();
    const pinnedAgents = this.props.user.preferences.pinnedAgents || [];

    if (pinnedAgents && pinnedAgents.includes(agentId)) {
      this.removePinnedAgent(agentId, pinnedAgents);
    } else {
      this.addPinnedAgent(agentId, pinnedAgents);
    }
  }

  getDataSource = () => {
    const lrMode = _.get(this.props.user, 'preferences.settings.lrMode');
    const colData = JSON.parse(JSON.stringify(this.props.columnData));
    const rowData = (oneColumn, index) => ({
      key: index,
      sideLabel: oneColumn.title,
      side: oneColumn.formId,
      btnLabel: this.btnLabel(oneColumn.formId),
    });
    if (lrMode === true && this.props.dealType === dealTypes.FWD) {
      return colData.reverse().map((oneColumn, index) => (rowData(oneColumn, index)));
    }
    return colData.map((oneColumn, index) => (rowData(oneColumn, index)));
  };

  btnLabel = (formId) => {
    if (this.props.dealType === dealTypes.FWD) {
      const lrMode = _.get(this.props.user, 'preferences.settings.lrMode');
      const buyLabel = lrMode ? 'R' : 'B';
      const sellLabel = lrMode ? 'L' : 'S';
      return (formId === 'buyer' || formId === 'cp2Buyer') ? buyLabel : sellLabel;
    }
    return (formId === 'buyer' || formId === 'cp2Buyer') ? 'B' : 'S';
  };

  swapBuySellData = () => {
    resetCounterpartyValidation();
    const sides = [];
    this.getDataSource().forEach((row) => {
      sides.push(row.side);
    });

    const currentClientTrader1 = this.props.form.getFieldValue(`${sides[0]}ClientTrader`);
    const currentBroker1 = this.props.form.getFieldValue(`${sides[0]}Broker`);
    const currentAgent1 = this.props.form.getFieldValue(`${sides[0]}Agent`);
    const currentClientTrader2 = this.props.form.getFieldValue(`${sides[1]}ClientTrader`);
    const currentBroker2 = this.props.form.getFieldValue(`${sides[1]}Broker`);
    const currentAgent2 = this.props.form.getFieldValue(`${sides[1]}Agent`);

    this.props.form.setFieldsValue({
      [`${sides[0]}ClientTrader`]: currentClientTrader2,
      [`${sides[0]}Broker`]: currentBroker2,
      [`${sides[0]}Agent`]: currentAgent2,
      [`${sides[1]}ClientTrader`]: currentClientTrader1,
      [`${sides[1]}Broker`]: currentBroker1,
      [`${sides[1]}Agent`]: currentAgent1,
    });

    if (doesArrayExistWithValue(currentClientTrader1)) {
      const tradingCustomerId = currentClientTrader1[0];
      const traderPostingId = currentClientTrader1[1].split(',')[0];
      const executingCustomerId = currentClientTrader1[1].split(',')[1];
      this.setHoverInfo(tradingCustomerId, traderPostingId, executingCustomerId, sides[1]);
    } else {
      this.setHoverInfo(null, null, null, sides[1]);
    }

    if (doesArrayExistWithValue(currentClientTrader2)) {
      const tradingCustomerId = currentClientTrader2[0];
      const traderPostingId = currentClientTrader2[1].split(',')[0];
      const executingCustomerId = currentClientTrader2[1].split(',')[1];
      this.setHoverInfo(tradingCustomerId, traderPostingId, executingCustomerId, sides[0]);
    } else {
      this.setHoverInfo(null, null, null, sides[0]);
    }

    if (this.props.form.getFieldInstance(ids.BUYER_NETT_BROKERAGE) || this.props.form.getFieldInstance(ids.SELLER_NETT_BROKERAGE)) {
      const currentBuyerNettBrokerage = this.props.form.getFieldValue(ids.BUYER_NETT_BROKERAGE);
      const currentSellerNettBrokerage = this.props.form.getFieldValue(ids.SELLER_NETT_BROKERAGE);

      this.props.form.setFieldsValue({
        [ids.BUYER_NETT_BROKERAGE]: currentSellerNettBrokerage,
        [ids.SELLER_NETT_BROKERAGE]: currentBuyerNettBrokerage,
      });
    }
  };

  prepareclientCascaderOptions = (clients) => {
    const cascaderOptions = [];
    if (clients && Array.isArray(clients) && clients.length > 0) {
      clients.forEach((client) => {
        const option = {
          value: client.tradingCustomerId,
          label: client.tradingCustomerLegalName,
          children: [],
        };
        if (client.traders && Array.isArray(client.traders) && client.traders.length >= 0) {
          option.children.push({
            value: ids.IS_AGENT,
            label: 'Select agent instead',
          });
          client.traders.forEach((trader) => {
            option.children.push({
              value: `${trader.traderPostingId},${trader.executingCustomerId}`,
              label: `${trader.traderPostingDisplayName} (${trader.executingCustomerLegalName.substr(-3)})`,
              trader,
            });
          });
        }

        cascaderOptions.push(option);
      });
    }
    return cascaderOptions;
  };

  sortCascader = (cascaderOptions) => {
    function sortFunction(a, b) {
      const labelA = a.label.toUpperCase();
      const labelB = b.label.toUpperCase();
      if (labelA < labelB) {
        return -1;
      }
      if (labelA > labelB) {
        return 1;
      }
      return 0;
    }

    const sortedCascader = cascaderOptions;
    sortedCascader.sort(sortFunction);

    sortedCascader.forEach((elementAtDepth1) => {
      elementAtDepth1.children.sort(sortFunction);
    });
    return sortedCascader;
  };

  preparebrokerCascaderOptions = (brokers) => {
    const cascaderOptions = brokers.reduce((acc, currentBroker) => {
      const accumulated = acc;
      const deskIndex = accumulated.findIndex((desk) => desk.value === currentBroker.deskId);
      if (deskIndex > -1) {
        const item = {
          value: currentBroker.id,
          label: currentBroker.name,
        };
        if (!accumulated[deskIndex].children.some((child) => child.value === currentBroker.id)) {
          accumulated[deskIndex].children.push(item);
        }
      } else {
        accumulated.push({
          value: currentBroker.deskId,
          label: currentBroker.deskName,
          children: [{
            value: currentBroker.id,
            label: currentBroker.name,
          }],
        });
      }
      return accumulated;
    }, []);

    return this.sortCascader(cascaderOptions);
  };

  onRowClick = (side) => {
    this.props.uiActions.changeCounterPartySelection(side);
  };

  cascaderFilter = (inputValue, path) => (path.some((option) => (option.label)
    .toLowerCase().indexOf(inputValue.toLowerCase()) > -1));

  preferenceClientTraderClicked = (side) => {
    const clientTraderIds = this.props.form.getFieldValue(`${side}ClientTrader`);
    const brokerDeskIds = this.props.form.getFieldValue(`${side}Broker`);
    const agentId = this.props.form.getFieldValue(`${side}Agent`);
    let errorMessage = '';
    if (!brokerDeskIds || brokerDeskIds.length === 0) {
      errorMessage = 'Adding to favorites without broker is not supported';
    } else if (!clientTraderIds && agentId) {
      errorMessage = 'Adding agent to favorites without client is not supported';
    } else if (doesArrayExistWithValue(clientTraderIds, 1) && clientTraderIds[1] === ids.IS_AGENT && !agentId) {
      errorMessage = 'Adding client to favorites without agent is not supported';
    } else if (doesArrayExistWithValue(clientTraderIds, 1) && clientTraderIds[1] !== ids.IS_AGENT && agentId) {
      errorMessage = 'Adding client to favorites with both trader and agent is not supported';
    } else if (brokerDeskIds && clientTraderIds && agentId) {
      const favBroker = _.find(this.props.user.preferences.preferredBrokers, { id: brokerDeskIds[1] });
      const clients = favBroker ? favBroker.favourites.clients : [];
      const favAgent = clients.find((
        { tradingCustomerId, agentCustomerId },
      ) => (tradingCustomerId === clientTraderIds[0] && agentCustomerId === agentId));
      errorMessage = favAgent ? 'Agent has been added to favourites already' : '';
    } else if (brokerDeskIds && clientTraderIds) {
      const favBroker = _.find(this.props.user.preferences.preferredBrokers, { id: brokerDeskIds[1] });
      const tradingCustomerId = clientTraderIds[0];
      const traderPostingId = Number(clientTraderIds[1].split(',')[0]);
      const executingCustomerId = Number(clientTraderIds[1].split(',')[1]);

      const { favourites: { clients = [] } = {} } = favBroker || {};
      const favClient = favBroker && _.find(clients, { executingCustomerId, traderPostingId, tradingCustomerId });
      errorMessage = favClient ? 'Client/Trader has been added to favourites already' : '';
    }

    if (errorMessage === '') {
      this.props.userActions.addClientTraderPreference(brokerDeskIds, clientTraderIds, agentId);
    } else {
      notification.showWarningNotification('Favorites warning', errorMessage);
    }
  };

  customCascaderDisplay = (labels, selectedOptions) => labels.map((label, i) => {
    const option = selectedOptions[i];

    if (!selectedOptions[1]) {
      return null;
    }

    if (i === labels.length - 1) {
      if (selectedOptions[1].value === ids.IS_AGENT) {
        return (
          <span key={option.value}>
            Agent selected
          </span>
        );
      }
      return (
        <span key={option.value}>
          {label}
        </span>
      );
    }
    let tradingCustomerLabel;
    if (selectedOptions[1].trader && selectedOptions[1].trader.executingCustomerLegalName) {
      tradingCustomerLabel = `${label} (${selectedOptions[1].trader.executingCustomerLegalName.substr(-3)}) / `;
    } else {
      tradingCustomerLabel = `${label} / `;
    }
    return (<span key={option.value}>{`${tradingCustomerLabel}`}</span>);
  });

  dropdownRender = (menus) => (
    <div className="dms-trade-capture-cascader-container">
      {menus}
    </div>
  );

  focusElement = (elementId) => {
    if (elementId) {
      const elementInstance = this.props.form.getFieldInstance(elementId);
      elementInstance.focus();

      if (!elementId.includes('Agent')) {
        this.props.form.getFieldInstance(elementId).handlePopupVisibleChange(true);
      }
    }
  };

  onClientTraderChange = (value, selectedOptions, side) => {
    resetValidationForId(`${side}ClientTrader`);
    resetValidationForId(`${side}Agent`);
    clientTraderValidation(value, `${side}ClientTrader`);

    const isAgent = doesArrayExistWithValue(value, 1) && value[1] === ids.IS_AGENT;
    if (!isAgent) {
      this.props.form.resetFields([`${side}Agent`]);
    }

    if (selectedOptions.toString() === '') {
      this.setHoverInfo(null, null, null, side);
      return;
    }

    const tradingCustomerId = selectedOptions[0].value;
    const traderPostingId = selectedOptions[1].value.split(',')[0];
    const executingCustomerId = selectedOptions[1].value.split(',')[1];

    this.setHoverInfo(tradingCustomerId, traderPostingId, executingCustomerId, side);

    switch (side) {
      case 'buyer':
        this.focusElement('buyerBroker');
        this.props.uiActions.changeCounterPartySelection('seller');
        break;
      case 'seller':
        this.focusElement('sellerBroker');
        this.props.uiActions.changeCounterPartySelection('buyer');
        break;
      case 'cp2Buyer':
        this.focusElement('cp2BuyerBroker');
        this.props.uiActions.changeCounterPartySelection('cp2Seller');
        break;
      case 'cp2Seller':
        this.focusElement('cp2SellerBroker');
        this.props.uiActions.changeCounterPartySelection('buyer');
        break;
      default:
    }
  };

  onBrokerChange = (value, side) => {
    const clientTraderIds = this.props.form.getFieldValue(`${side}ClientTrader`);
    const isAgent = doesArrayExistWithValue(clientTraderIds, 1) && clientTraderIds[1] === ids.IS_AGENT;
    const is3CpChecked = this.props.is3cpChecked;

    switch (side) {
      case 'buyer':
        this.focusElement(isAgent ? 'buyerAgent' : 'sellerClientTrader');
        break;
      case 'seller':
        // eslint-disable-next-line no-nested-ternary
        this.focusElement(isAgent ? 'sellerAgent' : is3CpChecked ? 'cp2BuyerClientTrader' : null);
        break;
      case 'cp2Buyer':
        this.focusElement(isAgent ? 'cp2BuyerAgent' : 'cp2SellerClientTrader');
        break;
      case 'cp2Seller':
        this.focusElement(isAgent ? 'cp2SellerAgent' : null);
        break;
      default:
        break;
    }
  };

  disableAgentField = (side) => {
    const clientTraderIds = this.props.form.getFieldValue(`${side}ClientTrader`);
    const isAgent = clientTraderIds && doesArrayExistWithValue(clientTraderIds, 1) && clientTraderIds[1] === ids.IS_AGENT;
    return !isAgent;
  };

  onAgentChange = (value, side) => {
    resetValidationForId(`${side}Agent`);
    resetValidationForId(`${side}ClientTrader`);
    // Agent error validation still exists event after selecting value.
    // So to refresh the component added the hack.
    // This will taken off once we move to functional component.
    this.setState({
      validationInProgress: true,
    });
    const is3CpChecked = this.props.is3cpChecked;

    switch (side) {
      case 'buyer':
        this.focusElement('sellerClientTrader');
        break;
      case 'seller':
        if (is3CpChecked) {
          this.focusElement('cp2BuyerClientTrader');
        }
        break;
      case 'cp2Buyer':
        this.focusElement('cp2SellerClientTrader');
        break;
      default:
        break;
    }
  };

  getClientHoverInfo = (side) => {
    const getTradingCustomerInfo = (info) => {
      let tradingCustomerInfo = '';
      const {
        tradingCustomerLegalName,
        tradingCustomerId,
        tradingCustomerLeiCode,
        tradingCustomerReutersCode,
      } = info[side];

      if (tradingCustomerId || tradingCustomerLeiCode || (
        tradingCustomerReutersCode && tradingCustomerReutersCode.trim())) {
        tradingCustomerInfo = tradingCustomerInfo.concat(
          tradingCustomerId ? `GCD ID: ${tradingCustomerId}` : '',
        );
        tradingCustomerInfo = tradingCustomerInfo.concat(
          tradingCustomerLeiCode && tradingCustomerLeiCode.trim() ? ` LEI Code: ${tradingCustomerLeiCode}` : '',
        );
        tradingCustomerInfo = tradingCustomerInfo.concat(
          tradingCustomerReutersCode && tradingCustomerReutersCode.trim() ? ` Reuters Code: ${tradingCustomerReutersCode}` : '',
        );
      } else {
        tradingCustomerInfo = 'No GCD, LEI or RTNS code retrieved';
      }

      return (
        <>
          <div>
            Trading Customer Name:
            {tradingCustomerLegalName}
          </div>
          <div className="info">{tradingCustomerInfo}</div>
        </>
      );
    };

    const getTraderInfo = (info) => {
      let traderPostingInfo = '';
      const {
        traderPostingDisplayName,
        traderPostingId,
      } = info[side].traders[0];

      if (traderPostingId) {
        traderPostingInfo = traderPostingInfo.concat(traderPostingId ? `GCD ID: ${traderPostingId}` : '');
      } else {
        traderPostingInfo = 'No GCD retrieved';
      }

      return (
        <>
          <div>
            Trader:
            {traderPostingDisplayName}
          </div>
          <div className="info">{traderPostingInfo}</div>
        </>
      );
    };

    const getExecutingCustomerInfo = (info) => {
      let executingCustomerInfo = '';

      const {
        executingCustomerLegalName,
        executingCustomerId,
        executingCustomerLeiCode,
        executingCustomerReutersCode,
      } = info[side].traders[0];

      if (executingCustomerId || executingCustomerLeiCode || executingCustomerReutersCode) {
        executingCustomerInfo = executingCustomerInfo.concat(
          executingCustomerId ? `GCD ID: ${executingCustomerId}` : '',
        );
        executingCustomerInfo = executingCustomerInfo.concat(
          executingCustomerLeiCode && executingCustomerLeiCode.trim() ? ` LEI Code: ${executingCustomerLeiCode}` : '',
        );
        executingCustomerInfo = executingCustomerInfo.concat(
          executingCustomerReutersCode && executingCustomerReutersCode.trim() ? ` Reuters Code: ${executingCustomerReutersCode}` : '',
        );
      } else {
        executingCustomerInfo = 'No GCD, LEI or RTNS code retrieved';
      }

      return (
        <>
          <div>
            Executing Customer Name:
            {executingCustomerLegalName}
          </div>
          <div className="info">{executingCustomerInfo}</div>
        </>
      );
    };

    const hoverInfo = this.props.clientHoverInfo;
    if (hoverInfo && side) {
      const tradingCustomer = getTradingCustomerInfo(hoverInfo);
      let trader = <div style={{ lineHeight: '1.5', color: 'lightgrey' }}>No trader has been selected.</div>;
      let executingCustomer = <div style={{ color: 'lightgrey' }}>No executing customer has been selected.</div>;

      if (hoverInfo[side].traders && hoverInfo[side].traders[0]) {
        trader = getTraderInfo(hoverInfo);
        executingCustomer = getExecutingCustomerInfo(hoverInfo);
      }

      return (
        <div className="client-info-popover" onClick={(e) => e.stopPropagation()} role="presentation">
          {tradingCustomer}
          {trader}
          {executingCustomer}
        </div>
      );
    }
    return null;
  };

  setHoverInfo = (tradingCustomerId, traderPostingId, executingCustomerId, side) => {
    this.props.uiActions.changeClientHoverData({
      tradingCustomerId, traderPostingId, executingCustomerId, side,
    });
  };

  render() {
    return (
      <Table className="counter-parties" dataSource={this.getDataSource()} columns={this.columns} bordered pagination={false} />
    );
  }
}

CounterPartiesContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  columnData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  uiActions: PropTypes.shape().isRequired,
  userActions: PropTypes.shape().isRequired,
  clientHoverInfo: PropTypes.shape().isRequired,
  is3cpChecked: PropTypes.bool.isRequired,
  strategyType: PropTypes.string.isRequired,
  clientActions: PropTypes.shape().isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  agents: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  agentActions: PropTypes.shape().isRequired,
  brokers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  brokerActions: PropTypes.shape().isRequired,
  dealType: PropTypes.string.isRequired,
  user: PropTypes.shape().isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
  clientActions: bindActionCreators(clientActions, dispatch),
  brokerActions: bindActionCreators(brokerActions, dispatch),
  agentActions: bindActionCreators(agentActions, dispatch),
});

const mapStateToProps = ({
  ui, clients, agents, brokers, user,
}) => ({
  clientHoverInfo: ui.clientHoverInfo,
  is3cpChecked: ui.isThirdCPChecked,
  strategyType: ui.selectedStrategyType,
  clients,
  agents,
  brokers,
  user,
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterPartiesContainer);
