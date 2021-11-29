import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import TradeEconomics from '../TradeEconomics';
import SptTradeEconomics from './SptTradeEconomics';
import { getCurrencies } from '../../../utils/selectors';
import { actionTypes, ids } from '../../../utils/constants';
import { getSptDayCounts, resetDates } from '../../../actions/dateActions';
import { showWarningNotification, showErrorNotification } from '../../../utils/notifications';

const SptTradeEconomicsContainer = ({ form, setDateAndDayCount }) => {
  const dispatch = useDispatch();
  const currencies = useSelector(getCurrencies);

  const getInstrumentId = (currency1, currency2) => {
    const { instrumentId } = currencies.find((currency) => (
      currency.baseCurrency === currency1 && currency.counterCurrency === currency2)) || {};
    return instrumentId;
  };

  const currencyOnChange = (currency2) => {
    const currency1 = form.getFieldValue(ids.CURRENCY_1);
    if (currency1) {
      const instrumentId = getInstrumentId(currency1, currency2);
      if (instrumentId) { setDateAndDayCount(instrumentId); }
    }
  };

  const valueDateOnChange = async (valueDate) => {
    if (valueDate) {
      const currency1 = form.getFieldValue(ids.CURRENCY_1);
      const currency2 = form.getFieldValue(ids.CURRENCY_2);
      const dayDiff = moment().diff(valueDate, 'days');

      if (currency1 && currency2) {
        if ([0, 6].includes(valueDate.day()) || dayDiff > 0) {
          showWarningNotification('Date Warning', 'Value Date entered is a non-working day or in the past. Manually update all other dates.');
          form.resetFields([ids.RATE_1]);
        }

        const instrumentId = getInstrumentId(currency1, currency2);
        const tradeDate = form.getFieldValue(ids.TRADE_DATE) || null;

        const { dates, error = null, type } = await dispatch(getSptDayCounts(tradeDate, valueDate, instrumentId));

        if (type === actionTypes.LOAD_DATES_CANCELLED || type === actionTypes.LOAD_DATES_FAILED) {
          if (error) {
            dispatch(resetDates());
            showErrorNotification('Date Error', `${error.message || error.statusText}`);
          }
        } else {
          form.setFieldsValue({
            [ids.DAY_COUNT_1]: dates.dayCountFromTrade,
          });
        }
      }
    }
  };

  return (
    <SptTradeEconomics
      form={form}
      currencyOnChange={currencyOnChange}
      valueDateOnChange={valueDateOnChange}
    />
  );
};

SptTradeEconomicsContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  setDateAndDayCount: PropTypes.func.isRequired,
};

export default TradeEconomics(SptTradeEconomicsContainer);
