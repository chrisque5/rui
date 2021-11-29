import PropTypes from 'prop-types';
import { StarFilled } from '@ant-design/icons';
import {
  Form, Select, Tooltip,
} from 'antd';

const CurrencyPair = ({
  currency1OnChange, currency2OnChange, baseCurrencies,
  counterCurrencies, currency1Id, currency2Id, testId, label, addPreferenceClick,
  dealtCurrencies, dealtCurrencyId, dealtCurrencyOnChange, isLoading,
}) => (
  <div className="item-ccy">
    <div className="ccy-pair">
      <div className="ccy-label">
        {label}
        <Tooltip
          title="Add currency pair to client manager"
          mouseEnterDelay={0.3}
          overlayStyle={{ fontSize: '0.8em', padding: 0, margin: 0 }}
        >
          <StarFilled
            data-testid="addPreference"
            onClick={() => addPreferenceClick()}
            className="star-icon"
          />
        </Tooltip>
        :
      </div>
      <Form.Item
        className="item-ccy1"
        name={currency1Id}
        rules={[{ required: true, message: 'CCY 1 required' }]}
      >
        <Select autoFocus showSearch name={currency1Id} data-testid={`${testId}1`} onChange={currency1OnChange}>
          {baseCurrencies && baseCurrencies.map(
            (ccy) => <Select.Option key={ccy} value={ccy}>{ccy}</Select.Option>,
          )}
        </Select>
      </Form.Item>
      <Form.Item
        className="item-ccy2"
        name={currency2Id}
        rules={[{ required: true, message: 'CCY 2 required' }]}
      >
        <Select showSearch name={currency2Id} data-testid={`${testId}2`} onChange={currency2OnChange} loading={isLoading}>
          {counterCurrencies && counterCurrencies.map(
            (ccy) => <Select.Option key={ccy} value={ccy}>{ccy}</Select.Option>,
          )}
        </Select>
      </Form.Item>
    </div>
    <Form.Item
      label="Dealt CCY"
      className="item-dealt-ccy"
      name={dealtCurrencyId}
      rules={[{ required: true, message: 'Dealt CCY required' }]}
    >
      <Select showSearch name={dealtCurrencyId} data-testid={`${testId}3`} onChange={dealtCurrencyOnChange}>
        {dealtCurrencies && dealtCurrencies.map(
          (ccy) => <Select.Option key={ccy} value={ccy}>{ccy}</Select.Option>,
        )}
      </Select>
    </Form.Item>
  </div>
);

CurrencyPair.propTypes = {
  addPreferenceClick: PropTypes.func.isRequired,
  baseCurrencies: PropTypes.arrayOf(PropTypes.string),
  counterCurrencies: PropTypes.arrayOf(PropTypes.string),
  currency1OnChange: PropTypes.func.isRequired,
  currency2OnChange: PropTypes.func.isRequired,
  dealtCurrencyOnChange: PropTypes.func.isRequired,
  currency1Id: PropTypes.string.isRequired,
  currency2Id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  dealtCurrencyId: PropTypes.string.isRequired,
  dealtCurrencies: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool.isRequired,
};

CurrencyPair.defaultProps = {
  baseCurrencies: [],
  counterCurrencies: [],
  dealtCurrencies: [],
};

export default CurrencyPair;
