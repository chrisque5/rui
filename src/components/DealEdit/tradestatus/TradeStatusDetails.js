import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import {
  getDeal,
} from '../../../utils/selectors';
import { dateFormatter } from '../../../utils/agGrid/formatters';

const TradeStatusDetails = () => {
  const {
    dmsDealReference, dealType, dealAction, dealStatus, tradeTime, executionTime,
  } = useSelector(getDeal);
  const valueMargin = 5;
  const col1LabelWidth = 70;
  const col2LabelWidth = 120;
  return (
    <>
      <Row style={{ marginBottom: 10 }} justify="flex-start">
        <Col>
          <Row data-testid="dmsDealReference">
            <span style={{ width: col1LabelWidth }}><b>DMS Ref: </b></span>
            <span style={{ marginLeft: valueMargin }}>{dmsDealReference}</span>
          </Row>
          <Row data-testid="dealType" style={{ marginTop: valueMargin, marginBottom: valueMargin }}>
            <span style={{ width: col1LabelWidth }}><b>DMS Type: </b></span>
            <span style={{ marginLeft: valueMargin }}>{dealType}</span>
          </Row>
          <Row data-testid="dealAction">
            <span style={{ width: col1LabelWidth }}><b>DMS Action: </b></span>
            <span style={{ marginLeft: valueMargin }}>{dealAction}</span>
          </Row>
        </Col>
        <Col style={{ marginLeft: 200 }}>
          <Row data-testid="tradeDateTime">
            <span style={{ width: col2LabelWidth }}><b>Trade Date/Time: </b></span>
            <span style={{ marginLeft: valueMargin }}>{dateFormatter({ value: tradeTime }, 'DD/MM/YYYY hh:mm:ss')}</span>
          </Row>
          <Row data-testid="executionDateTime" style={{ marginTop: valueMargin, marginBottom: valueMargin }}>
            <span style={{ width: col2LabelWidth }}><b>Execution Date/Time: </b></span>
            <span style={{ marginLeft: valueMargin }}>{dateFormatter({ value: executionTime }, 'DD/MM/YYYY hh:mm:ss')}</span>
          </Row>
          <Row data-testid="dealStatus">
            <span style={{ width: col2LabelWidth }}><b>Deal Status: </b></span>
            <span style={{ marginLeft: valueMargin }}>{dealStatus}</span>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TradeStatusDetails;
