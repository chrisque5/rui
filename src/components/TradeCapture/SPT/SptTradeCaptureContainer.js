import {
  forwardRef, useEffect, useCallback, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form, Row, Col, Divider, Button,
} from 'antd';
import {
  ids, dealTypes, strategyOptions, navMenuItems, actionTypes,
} from '../../../utils/constants';
import BrokersTabContainer from '../../BrokersTab/BrokersTabContainer';
import TradeCapture from '../TradeCapture';
import TradeDateContainer from '../../TradeDate/TradeDateContainer';
import VolumeMatch from '../../VolumeMatch/VolumeMatch';
import ExecutionVenueContainer from '../../ExecutionVenue/ExecutionVenueContainer';
import SptTradeEconomicsContainer from '../../TradeEconomics/SPT/SptTradeEconomicsContainer';
import OutrightTradeSides from '../../TradeSides/OutrightTradeSide/OutrightTradeSides';
import { changeDealType, changePage, toggleTradeDateSubmitPopup } from '../../../actions/uiActions';
import {
  getUserPreferences, getDates, getCurrencies, getUserPreferenceSettingsRatesFeed,
} from '../../../utils/selectors';
import Strategy from '../../Strategy/Strategy';
import { getSptValueDate, resetDates } from '../../../actions/dateActions';
import { resetCurrencies } from '../../../actions/currencyActions';
import { showErrorNotification, showWarningNotification } from '../../../utils/notifications';
import { doesArrayExistWithValue, findCurrencyPair } from '../../../utils/helper';
import { getRate } from '../../../actions/rateActions';

const SptTradeCaptureContainer = forwardRef(({
  resetForm, getSubmitButtonStyle, isSubmitInProgress, setDefaults, validateDeal, submitDeal, getDefaultsForDeal, isSubmitButtonDisabled,
}, ref) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { defaults } = useSelector(getUserPreferences);
  const { spotDate, dayCountFromSpot, displayTenor } = useSelector(getDates);
  const currencies = useSelector(getCurrencies);
  const ratesFeed = useSelector(getUserPreferenceSettingsRatesFeed);
  const [defaultValues, setDefaultValues] = useState(null);
  const { getFieldValue, setFieldsValue, resetFields } = form;

  const getInstrumentId = useCallback(() => {
    const currency1Value = getFieldValue(ids.CURRENCY_1);
    const currency2Value = getFieldValue(ids.CURRENCY_2);

    if (currency1Value && currency2Value) {
      const { instrumentId } = currencies.find((currency) => (
        currency.baseCurrency === currency1Value && currency.counterCurrency === currency2Value)) || {};
      return instrumentId;
    }
    return null;
  }, [currencies, getFieldValue]);

  const setDateAndDayCount = useCallback(async (instrumentId) => {
    if (instrumentId) {
      const tradeDate = getFieldValue(ids.TRADE_DATE) || null;
      const { dates, error = null, type } = await dispatch(getSptValueDate(tradeDate, instrumentId));

      if (type === actionTypes.LOAD_DATES_CANCELLED || type === actionTypes.LOAD_DATES_FAILED) {
        if (error) {
          dispatch(resetDates());
          showErrorNotification('Date Error', `${error.message || error.statusText}`);
        }
      } else {
        setFieldsValue({
          [ids.VALUE_DATE_1]: dates.valueDate,
          [ids.DAY_COUNT_1]: dates.dayCountFromTrade,
        });
      }
    }
  }, [dispatch, getFieldValue, setFieldsValue]);

  const tradeDateOnChange = useCallback((value, id) => {
    const instrumentId = getInstrumentId();

    if (instrumentId) {
      setFieldsValue({ [id]: value });
      setDateAndDayCount(instrumentId);
    }
  }, [getInstrumentId, setFieldsValue, setDateAndDayCount]);

  const setRate = useCallback(async () => {
    if (ratesFeed && !getFieldValue(ids.IS_TRADE_DATE_ENABLED)) {
      const currency1 = getFieldValue(ids.CURRENCY_1);
      const currency2 = getFieldValue(ids.CURRENCY_2);
      const valueDate = getFieldValue(ids.VALUE_DATE_1);

      if (currency1 && currency2 && valueDate) {
        resetFields([ids.RATE_1]);
        try {
          const { rates: { rate, statusCode, statusText } } = await dispatch(
            getRate(currency1, currency2, displayTenor, valueDate, dealTypes.SPT, spotDate),
          );
          if (rate > -1) {
            setFieldsValue({ [ids.RATE_1]: rate });
          } else if (statusCode === 100) {
            setFieldsValue({ [ids.RATE_1]: '' });
          } else if (rate < 0 || statusCode !== 0) {
            throw new TypeError(statusText);
          }
        } catch (err) {
          showWarningNotification('Rate Error', (`${err.message || err.statusText}`));
        }
      }
    }
  }, [ratesFeed, getFieldValue, dispatch, displayTenor, spotDate, setFieldsValue, resetFields]);

  const submitValidDeal = (deal) => {
    const currencyPair = findCurrencyPair(deal.currency1, deal.currency2, currencies);

    submitDeal({
      ...deal,
      currencyPair,
      dealType: dealTypes.SPT,
      spotDate,
      durationSpotToEnd: dayCountFromSpot,
      displayTenor,
    });
  };

  const submitDealWithCustomDate = async () => {
    const result = await validateDeal();

    if (result.valid) {
      submitValidDeal(result.deal);
    } else {
      showErrorNotification('Validation Error', result.error);
    }
  };

  const handleSubmit = async () => {
    const result = await validateDeal();

    if (result.valid) {
      if (getFieldValue(ids.IS_TRADE_DATE_ENABLED)) {
        dispatch(toggleTradeDateSubmitPopup(true));
        return;
      }
      submitValidDeal(result.deal);
    } else {
      showErrorNotification('Validation Error', result.error);
    }
  };

  const resetFormAndDates = () => {
    resetForm();
    const instrumentId = getInstrumentId();
    if (instrumentId) { setDateAndDayCount(instrumentId); }
  };

  useEffect(() => {
    dispatch(changeDealType(dealTypes.SPT));
    dispatch(changePage(navMenuItems.SPT.key));
    return () => {
      resetForm();
      dispatch(changePage(''));
      dispatch(resetCurrencies());
    };
  }, [dispatch, resetForm]);

  useEffect(() => {
    setDefaults(defaults, dealTypes.SPT);
    setDefaultValues(getDefaultsForDeal(dealTypes.SPT, defaults));
  }, [defaults, setDefaults, getDefaultsForDeal]);

  useEffect(() => {
    // set the inital values only once
    if (defaultValues && !getFieldValue(ids.CURRENCY_1)) {
      setFieldsValue({
        [ids.CURRENCY_1]: defaultValues.baseCurrency,
        [ids.CURRENCY_2]: defaultValues.counterCurrency,
        [ids.DEALT_CURRENCY]: defaultValues.dealtCurrency,
        // [ids.EXECUTION_VENUE]: defaultValues.executionVenue,
      });
    }
  }, [defaultValues, getFieldValue, setFieldsValue]);

  useEffect(() => {
    if (displayTenor && spotDate) {
      setRate();
    }
  }, [displayTenor, spotDate, setRate]);

  useEffect(() => {
    if (doesArrayExistWithValue(currencies)) {
      const instrumentId = getInstrumentId();
      if (instrumentId) { setDateAndDayCount(instrumentId); }
    }
  }, [currencies, setDateAndDayCount, getInstrumentId]);

  const updateSubmitStyle = (prevValues, curValues) => prevValues.executionVenue !== curValues.executionVenue;
  return (
    <div className="dms-trade-capture">
      <Form
        hideRequiredMark
        form={form}
        ref={ref}
        initialValues={{
          [ids.STRATEGY]: (strategyOptions.SPT)[0].name,
        }}
      >
        <BrokersTabContainer form={form} />
        <Row type="flex" className="strategy-venue">
          <Col span={8} style={{ display: 'none' }}>
            <Strategy form={form} options={strategyOptions.SPT} />
          </Col>
          <Col span={6} offset={8}>
            <Row className="trade-date">
              <TradeDateContainer form={form} tradeDateOnChange={tradeDateOnChange} submitDealWithCustomDate={submitDealWithCustomDate} />
            </Row>
          </Col>
          <Col span={3}>
            <VolumeMatch id={ids.VOLUME_MATCH} form={form} label="Volume Match" />
          </Col>
          <Col span={4} offset={3}>
            <ExecutionVenueContainer form={form} dealType={dealTypes.SPT} />
          </Col>
        </Row>

        <Divider style={{ marginTop: 2, marginBottom: 2 }} />

        <div className="trade-economics">
          <SptTradeEconomicsContainer form={form} setDateAndDayCount={setDateAndDayCount} />
        </div>
        <div className="trade-sides">
          <OutrightTradeSides form={form} dealType={dealTypes.SPT} />
        </div>

        <Row type="flex" justify="end" className="action-buttons">
          <Button style={{ marginRight: 3 }} data-testid="btnReset" id="reset" onClick={resetFormAndDates}>Reset</Button>
          {' '}
          <Form.Item shouldUpdate={updateSubmitStyle} style={{ marginTop: '-3px' }}>
            {() => (
              <Button
                style={getSubmitButtonStyle()}
                htmlType="button"
                disabled={isSubmitButtonDisabled()}
                loading={isSubmitInProgress}
                onClick={handleSubmit}
                type="primary"
                data-testid="btnSubmit"
                id="submit"
              >
                {getSubmitButtonStyle().btnText}
              </Button>
            )}
          </Form.Item>
          {' '}
        </Row>
      </Form>
    </div>
  );
});

SptTradeCaptureContainer.propTypes = {
  resetForm: PropTypes.func.isRequired,
  isSubmitInProgress: PropTypes.bool.isRequired,
  isSubmitButtonDisabled: PropTypes.func.isRequired,
  getSubmitButtonStyle: PropTypes.func.isRequired,
  setDefaults: PropTypes.func.isRequired,
  validateDeal: PropTypes.func.isRequired,
  submitDeal: PropTypes.func.isRequired,
  getDefaultsForDeal: PropTypes.func.isRequired,
};

export default TradeCapture(SptTradeCaptureContainer);
