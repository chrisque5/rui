import PropTypes from 'prop-types';
import AmountContainer from '../../../Amount/AmountContainer';
import { ids, dealTypes } from '../../../../utils/constants';
import RateContainer from '../../../Rate/RateContainer';
import DayCount from '../../../DayCount/DayCount';
import FixingDate from '../../../Dates/FixingDate/FixingDate';
import PublishDate from '../../../Dates/PublishDate/PublishDate';
import ValueDateContainer from '../../../Dates/ValueDate/ValueDateContainer';
import CurrencyPairContainer from '../../../CurrencyPair/CurrencyPairContainer';
import TermContainer from '../../../Term/TermContainer';

const OutrightTradeEconomics = ({
  form, termOnBlur, currencyOnChange, valueDateOnChange,
}) => (
  <div className="economics-container">
    <div className="item-row">
      <CurrencyPairContainer
        testId="ddlCurrency"
        label="Currency Pair"
        form={form}
        dealType={dealTypes.NDF}
        onChangeAfterEffects={currencyOnChange}
      />
      <TermContainer
        id={ids.TERM_1}
        testId="ddlInputTerm1"
        label="Term"
        form={form}
        additionalTerms={['TOM', 'TOD']}
        onBlurAfterEffects={termOnBlur}
      />
      <RateContainer id={ids.RATE_1} testId="txtPrice1" label="Rate" form={form} dealType={dealTypes.NDF} />
      <AmountContainer id={ids.AMOUNT_1} testId="txtAmount1" label="Amount" form={form} dealType={dealTypes.NDF} />
      <FixingDate id={ids.FIXING_DATE_1} testId="dtpFixingDate1" label="Fixing Date" form={form} />
      <ValueDateContainer
        id={ids.VALUE_DATE_1}
        testId="dtpValueDate1"
        label="Value Date"
        form={form}
        onChangeAfterEffects={valueDateOnChange}
      />
      <PublishDate id={ids.PUBLISH_DATE_1} testId="dtpPublishDate1" label="Publish Date" form={form} />
      <DayCount id={ids.DAY_COUNT_1} testId="numDayCount1" label="Days" form={form} />
    </div>
  </div>
);

OutrightTradeEconomics.defaultProps = {
  termOnBlur: () => {},
  currencyOnChange: () => {},
  valueDateOnChange: () => {},
};

OutrightTradeEconomics.propTypes = {
  form: PropTypes.shape().isRequired,
  termOnBlur: PropTypes.func,
  currencyOnChange: PropTypes.func,
  valueDateOnChange: PropTypes.func,
};

export default OutrightTradeEconomics;
