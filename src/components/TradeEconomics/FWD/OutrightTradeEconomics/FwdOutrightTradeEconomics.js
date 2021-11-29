import PropTypes from 'prop-types';
import AmountContainer from '../../../Amount/AmountContainer';
import { ids, dealTypes } from '../../../../utils/constants';
import RateContainer from '../../../Rate/RateContainer';
import DayCount from '../../../DayCount/DayCount';
import ValueDateContainer from '../../../Dates/ValueDate/ValueDateContainer';
import CurrencyPairContainer from '../../../CurrencyPair/CurrencyPairContainer';
import TermContainer from '../../../Term/TermContainer';
import CLS from '../../../CLS/CLS';

const FwdOutrightTradeEconomics = ({
  form, termOnBlur, currencyOnChange, valueDateOnChange,
}) => (
  <div className="economics-container">
    <div className="item-row">
      <CurrencyPairContainer
        testId="ddlCurrency"
        label="Currency Pair"
        form={form}
        dealType={dealTypes.FWD}
        onChangeAfterEffects={currencyOnChange}
      />
      <TermContainer id={ids.TERM_1} testId="ddlInputTerm1" label="Term" form={form} onBlurAfterEffects={termOnBlur} />
      <RateContainer id={ids.RATE_1} testId="txtPrice1" label="Rate" form={form} dealType={dealTypes.FWD} />
      <AmountContainer id={ids.AMOUNT_1} testId="txtAmount1" label="Amount" form={form} dealType={dealTypes.FWD} />
      <ValueDateContainer id={ids.VALUE_DATE_1} testId="dtpValueDate1" label="Date" form={form} onChangeAfterEffects={valueDateOnChange} />
      <DayCount id={ids.DAY_COUNT_1} testId="numDayCount1" label="Days" form={form} />
      <CLS label="CLS" id={ids.CLS_1} testId="testCls1" form={form} />
    </div>
  </div>
);

FwdOutrightTradeEconomics.propTypes = {
  form: PropTypes.shape().isRequired,
  termOnBlur: PropTypes.func.isRequired,
  currencyOnChange: PropTypes.func.isRequired,
  valueDateOnChange: PropTypes.func.isRequired,
};

export default FwdOutrightTradeEconomics;
