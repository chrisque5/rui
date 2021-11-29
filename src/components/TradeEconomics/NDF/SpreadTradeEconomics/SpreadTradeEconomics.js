import PropTypes from 'prop-types';
import { ids, dealTypes } from '../../../../utils/constants';
import AmountContainer from '../../../Amount/AmountContainer';
import RateContainer from '../../../Rate/RateContainer';
import PointsContainer from '../../../Points/PointsContainer';
import DayCount from '../../../DayCount/DayCount';
import FixingDate from '../../../Dates/FixingDate/FixingDate';
import PublishDate from '../../../Dates/PublishDate/PublishDate';
import ValueDateContainer from '../../../Dates/ValueDate/ValueDateContainer';
import CurrencyPairContainer from '../../../CurrencyPair/CurrencyPairContainer';
import TermContainer from '../../../Term/TermContainer';

const SpreadTradeEconomics = ({
  form, rate1OnChange, rate2OnChange, pointsOnChange, termOnBlur, currencyOnChange, valueDateOnChange,
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
        onBlurAfterEffects={termOnBlur}
        additionalTerms={['TOM', 'TOD']}
      />
      <RateContainer id={ids.RATE_1} testId="txtPrice1" label="Rate" form={form} rateOnChange={rate1OnChange} dealType={dealTypes.NDF} />
      <PointsContainer id={ids.POINTS} label="Points" testId="txtPoints" form={form} pointsOnChange={pointsOnChange} dealType={dealTypes.NDF} />
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
    <div className="item-row">
      <div className="item-ccy1 filler" />
      <div className="item-ccy2 filler" />
      <div className="item-dealt-ccy filler" />
      <TermContainer
        id={ids.TERM_2}
        testId="ddlInputTerm2"
        form={form}
        onBlurAfterEffects={termOnBlur}
        additionalTerms={['TOM', 'TOD']}
      />
      <RateContainer id={ids.RATE_2} testId="txtPrice2" form={form} rateOnChange={rate2OnChange} dealType={dealTypes.NDF} />
      <div className="item-points filler" />
      <AmountContainer id={ids.AMOUNT_2} testId="txtAmount2" form={form} dealType={dealTypes.NDF} />
      <FixingDate id={ids.FIXING_DATE_2} testId="dtpFixingDate2" form={form} />
      <ValueDateContainer
        id={ids.VALUE_DATE_2}
        testId="dtpValueDate2"
        form={form}
        onChangeAfterEffects={valueDateOnChange}
      />
      <PublishDate id={ids.PUBLISH_DATE_2} testId="dtpPublishDate2" form={form} />
      <DayCount id={ids.DAY_COUNT_2} testId="numDayCount2" form={form} />
    </div>
  </div>
);

SpreadTradeEconomics.defaultProps = {
  termOnBlur: () => {},
  currencyOnChange: () => {},
  valueDateOnChange: () => {},
};

SpreadTradeEconomics.propTypes = {
  form: PropTypes.shape().isRequired,
  rate1OnChange: PropTypes.func.isRequired,
  rate2OnChange: PropTypes.func.isRequired,
  pointsOnChange: PropTypes.func.isRequired,
  termOnBlur: PropTypes.func,
  currencyOnChange: PropTypes.func,
  valueDateOnChange: PropTypes.func,
};

export default SpreadTradeEconomics;
