import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ids } from '../../utils/constants';
import {
  getIsTradeDateSubmitModalVisible, getIsTradeDateEnabled, getUserPreferenceSettingsRatesFeed,
} from '../../utils/selectors';
import { toggleIsTradeDateEnabled } from '../../actions/uiActions';
import TradeDate from './TradeDate';
import TradeDateTime from './TradeDateTime';
import TradeDateEnabled from './TradeDateEnabled';
import TradeDateConfirmModal from './TradeDateConfirmModal';
import { getDateTimeInLocalTZ } from '../../utils/helper';
import { showWarningNotification } from '../../utils/notifications';

const TradeDateContainer = ({
  form, tradeDateOnChange, submitDealWithCustomDate,
}) => {
  const dispatch = useDispatch();
  const [initialTime, setInitialTime] = useState(null);
  const isTradeDateConfirmModalVisible = useSelector(getIsTradeDateSubmitModalVisible);
  const isTradeDateEnabled = useSelector(getIsTradeDateEnabled);
  const isRatesFeedEnabled = useSelector(getUserPreferenceSettingsRatesFeed);

  const onCheckBoxChange = (e) => {
    const checked = e.target.checked;
    dispatch(toggleIsTradeDateEnabled(checked));
    // if checkbox toggled on initialise the time
    if (checked) {
      const currentTime = getDateTimeInLocalTZ();
      setInitialTime(currentTime);
      if (form) {
        form.setFieldsValue({
          [ids.TRADE_DATE]: currentTime,
          [ids.TRADE_TIME]: currentTime,
        });
      }
      if (isRatesFeedEnabled) {
        showWarningNotification(
          'Rate Error',
          'Rate feed is not available when overriding trade date/time. Please set rates manually.',
        );
      }
    } else {
      // if checkbox toggled off reset the time
      setInitialTime(null);
      if (form) {
        form.resetFields([ids.TRADE_DATE, ids.TRADE_TIME]);
      }
      tradeDateOnChange();
    }
  };

  return (
    <>
      <TradeDateEnabled form={form} id={ids.IS_TRADE_DATE_ENABLED} onChange={onCheckBoxChange} />
      <TradeDate
        form={form}
        isTradeDateEnabled={isTradeDateEnabled}
        initialTime={initialTime}
        id={ids.TRADE_DATE}
        tradeDateOnChange={tradeDateOnChange}
      />
      <TradeDateTime
        form={form}
        isTradeTimeEnabled={isTradeDateEnabled}
        initialTime={initialTime}
        id={ids.TRADE_TIME}
      />
      <TradeDateConfirmModal form={form} onAccept={submitDealWithCustomDate} isVisible={isTradeDateConfirmModalVisible} />
    </>
  );
};

TradeDateContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  submitDealWithCustomDate: PropTypes.func.isRequired,
  tradeDateOnChange: PropTypes.func.isRequired,
};

export default TradeDateContainer;
