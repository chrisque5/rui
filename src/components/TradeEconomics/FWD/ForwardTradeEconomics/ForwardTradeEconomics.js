import PropTypes from 'prop-types';
import AmountContainer from '../../../Amount/AmountContainer';
import { ids, strategies, dealTypes } from '../../../../utils/constants';
import RateContainer from '../../../Rate/RateContainer';
import DayCount from '../../../DayCount/DayCount';
import ValueDateContainer from '../../../Dates/ValueDate/ValueDateContainer';
import CurrencyPairContainer from '../../../CurrencyPair/CurrencyPairContainer';
import TermContainer from '../../../Term/TermContainer';
import PointsContainer from '../../../Points/PointsContainer';
import InterestContainer from '../../../Interest/InterestContainer';
import CLS from '../../../CLS/CLS';

const ForwardTradeEconomics = ({
  form, strategy, termOnBlur, currencyOnChange, valueDateOnChange,
  rate1OnChange, rate2OnChange, pointsOnChange, calulateInterest, calulateInterestRate,
  setDefaultExecutionVenue, spotDate,
}) => (
  <div className="economics-container">
    <div className="item-row">
      <CurrencyPairContainer
        testId="ddlCurrency"
        label="Currency Pair"
        form={form}
        dealType={dealTypes.FWD}
        onChangeAfterEffects={currencyOnChange}
        calulateInterest={calulateInterest}
      />
      <TermContainer
        id={ids.TERM_1}
        testId="ddlInputTerm1"
        label="Term"
        form={form}
        additionalTerms={
          (strategy === strategies.FWD.FORWARD ? ['ON', 'TN', 'SN'] : [])
        }
        calulateInterest={calulateInterest}
        onBlurAfterEffects={termOnBlur}
        setDefaultExecutionVenue={setDefaultExecutionVenue}
      />
      <RateContainer id={ids.RATE_1} testId="txtPrice1" label="Rate" form={form} rateOnChange={rate1OnChange} dealType={dealTypes.FWD} />
      <PointsContainer id={ids.POINTS} label="Points" testId="txtPoints" form={form} pointsOnChange={pointsOnChange} dealType={dealTypes.FWD} />
      <AmountContainer
        id={ids.AMOUNT_1}
        testId="txtAmount1"
        label="Amount"
        form={form}
        calulateInterest={calulateInterest}
        calulateInterestRate={calulateInterestRate}
        dealType={dealTypes.FWD}
      />
      <InterestContainer
        id={ids.INTEREST}
        testId="txtInterest"
        label="Interest"
        form={form}
        calulateInterest={calulateInterest}
        calulateInterestRate={calulateInterestRate}
      />
      <ValueDateContainer
        id={ids.VALUE_DATE_1}
        testId="dtpValueDate1"
        label="Date"
        form={form}
        onChangeAfterEffects={valueDateOnChange}
        spotDate={spotDate}
      />
      <DayCount id={ids.DAY_COUNT_1} testId="numDayCount1" label="Days" form={form} />
      <CLS label="CLS" id={ids.CLS_1} testId="testCls1" form={form} />
    </div>

    <div className="item-row">
      <div className="item-ccy1 filler" />
      <div className="item-ccy2 filler" />
      <div className="item-dealt-ccy filler" />
      {strategy === strategies.FWD.FORWARD_FORWARD ? (
        <TermContainer id={ids.TERM_2} testId="ddlInputTerm2" form={form} onBlurAfterEffects={termOnBlur} />
      ) : (
        <div className="item-term filler" />
      )}
      <RateContainer id={ids.RATE_2} testId="txtPrice2" form={form} rateOnChange={rate2OnChange} dealType={dealTypes.FWD} />
      <div className="item-points filler" />
      <AmountContainer
        id={ids.AMOUNT_2}
        testId="txtAmount2"
        form={form}
        calulateInterest={calulateInterest}
        calulateInterestRate={calulateInterestRate}
        dealType={dealTypes.FWD}
      />
      <div className="item-interest filler" />
      <ValueDateContainer
        id={ids.VALUE_DATE_2}
        testId="dtpValueDate2"
        form={form}
        onChangeAfterEffects={valueDateOnChange}
        spotDate={spotDate}
      />
      <DayCount id={ids.DAY_COUNT_2} testId="numDayCount2" form={form} />
      <CLS id={ids.CLS_2} testId="testCls2" form={form} />
    </div>
  </div>
);

ForwardTradeEconomics.defaultProps = {
  termOnBlur: () => { },
  currencyOnChange: () => { },
  valueDateOnChange: () => { },
  calulateInterest: () => { },
  calulateInterestRate: () => { },
};

ForwardTradeEconomics.propTypes = {
  form: PropTypes.shape().isRequired,
  spotDate: PropTypes.shape().isRequired,
  termOnBlur: PropTypes.func,
  currencyOnChange: PropTypes.func,
  valueDateOnChange: PropTypes.func,
  strategy: PropTypes.string.isRequired,
  rate1OnChange: PropTypes.func.isRequired,
  rate2OnChange: PropTypes.func.isRequired,
  pointsOnChange: PropTypes.func.isRequired,
  calulateInterest: PropTypes.func,
  calulateInterestRate: PropTypes.func,
  setDefaultExecutionVenue: PropTypes.func.isRequired,
};

export default ForwardTradeEconomics;
