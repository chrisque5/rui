import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import {
  Col, Layout, Row,
} from 'antd';
import { getBlotterSearchParams } from '../../../utils/selectors';

const SearchCriteriaLabelRenderer = () => {
  const searchParams = useSelector(getBlotterSearchParams);
  const [searchResultLabel, setSearchResultLabel] = useState('Search results for: ');
  const [dateBrokerSearchLabel, setDateBrokerSearchLabel] = useState(null);
  const [custTraderSearchLabel, setCustTraderSearchLabel] = useState(null);
  const [tooltipText, setTooltipText] = useState(null);
  const labelStyle = {
    maxWidth: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  };
  useEffect(() => {
    let dateBrokerSearch = 'TODAY';
    let custTraderSearch = '';
    const { dateFrom, dateTo, valid } = searchParams;
    let isToday = false;
    if (moment(dateFrom).isSame(moment(new Date()), 'day') && moment(dateFrom).isSame(moment(dateTo), 'day')) {
      isToday = true;
      setSearchResultLabel('Showing the results for: ');
    }
    if (valid) {
      const {
        dealId, broker, trader, customer,
      } = searchParams;

      if (!isToday || dealId || broker || trader || customer) {
        setSearchResultLabel('Search results for: ');
      }

      if (dealId) {
        dateBrokerSearch = `Deal ID: ${dealId}`;
        setCustTraderSearchLabel(custTraderSearch);
      } else {
        if (!isToday || broker || trader || customer) {
          dateBrokerSearch = `Trade Date From: ${moment(dateFrom).format('L')} To: ${moment(dateTo).format('L')}`;
        }

        if (broker) {
          dateBrokerSearch += `, Broker: ${broker} `;
        }

        if (customer) {
          custTraderSearch += `Customer: ${customer}`;
        }

        if (trader) {
          custTraderSearch += customer ? ', ' : '';
          custTraderSearch += `Trader: ${trader}`;
        }

        setCustTraderSearchLabel(custTraderSearch);
      }
    }
    setDateBrokerSearchLabel(dateBrokerSearch);
    let tooltip = `${dateBrokerSearch}`;
    if (custTraderSearch) {
      tooltip += `, ${custTraderSearch}`;
    }
    setTooltipText(tooltip);
  }, [searchParams]);

  return (
    <Layout title={tooltipText}>
      <Row>
        <Col>
          <span data-testid="lblSearchResult" className="ag-name-value">{searchResultLabel}</span>
        </Col>
        <Col style={{ ...labelStyle }}>
          <span data-testid="lblDateBrokerSearch" className="ag-name-value-value">
            {dateBrokerSearchLabel}
          </span>
        </Col>
      </Row>
      <Row>
        <Col style={{ width: 106 }} />
        <Col style={{ ...labelStyle }}>
          <span data-testid="lblCustTraderSearch" className="ag-name-value-value">{custTraderSearchLabel}</span>
        </Col>
      </Row>
    </Layout>
  );
};

export default SearchCriteriaLabelRenderer;
