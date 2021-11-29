import PropTypes from 'prop-types';
import CurrencyPairContainer from '../../CurrencyPair/CurrencyPairContainer';
import { dealTypes, ids } from '../../../utils/constants';
import RateContainer from '../../Rate/RateContainer';
import AmountContainer from '../../Amount/AmountContainer';
import ValueDateContainer from '../../Dates/ValueDate/ValueDateContainer';
import DayCount from '../../DayCount/DayCount';
import CLS from '../../CLS/CLS';

const SptTradeEconomics = ({
  form, currencyOnChange, valueDateOnChange,
}) => (
  <div className="economics-container">
    <div className="item-row">
      <CurrencyPairContainer
        testId="ddlCurrency"
        label="Currency Pair"
        form={form}
        onChangeAfterEffects={currencyOnChange}
        dealType={dealTypes.SPT}
      />
      <RateContainer
        id={ids.RATE_1}
        testId="txtPrice1"
        label="Rate"
        form={form}
        dealType={dealTypes.SPT}
      />
      <AmountContainer
        id={ids.AMOUNT_1}
        testId="txtAmount1"
        label="Amount"
        form={form}
        dealType={dealTypes.SPT}
      />
      <ValueDateContainer
        id={ids.VALUE_DATE_1}
        testId="dtpValueDate1"
        label="Value Date"
        form={form}
        onChangeAfterEffects={valueDateOnChange}
      />
      <DayCount id={ids.DAY_COUNT_1} testId="numDayCount1" label="Days" form={form} />
      <CLS label="CLS" id={ids.CLS_1} testId="testCls1" form={form} />
    </div>
  </div>
);

SptTradeEconomics.propTypes = {
  form: PropTypes.shape().isRequired,
  currencyOnChange: PropTypes.func.isRequired,
  valueDateOnChange: PropTypes.func.isRequired,
};

export default SptTradeEconomics;
