import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ids } from '../../utils/constants';
import { toggleTradeDateSubmitPopup } from '../../actions/uiActions';
import { getDateTimeInLocalTZ } from '../../utils/helper';

const TradeDateConfirmModal = ({
  form, isVisible, onAccept,
}) => {
  const dispatch = useDispatch();
  const [tradeDate, setTradeDate] = useState();
  const [tradeTime, setTradeTime] = useState();
  const [currentDate, setCurrentDate] = useState(getDateTimeInLocalTZ());

  useEffect(() => {
    if (isVisible) {
      setCurrentDate(getDateTimeInLocalTZ());
    }
  }, [isVisible]);

  useEffect(() => {
    const formTradeDate = form.getFieldValue(ids.TRADE_DATE);
    const formTradeTime = form.getFieldValue(ids.TRADE_TIME);

    if (formTradeDate) {
      setTradeDate(moment(formTradeDate).format('Do MMMM YYYY'));
    }

    if (formTradeTime) {
      setTradeTime(moment(formTradeTime).format('HH:mm:ss'));
    }
  }, [form, isVisible]);

  const closePopup = () => {
    dispatch(toggleTradeDateSubmitPopup(false));
  };

  const onclick = () => {
    closePopup();
    onAccept();
  };

  return (
    <Modal
      className="confirm-modal"
      title="Confirm Trade Date/Time"
      visible={isVisible}
      onCancel={closePopup}
      bodyStyle={{ padding: '10px' }}
      footer={[
        <Button data-testid="trade-date-modal-cancel" key="back" onClick={closePopup}>Cancel</Button>,
        <Button data-testid="trade-date-modal-save" key="submit" type="primary" onClick={onclick}>Accept</Button>,
      ]}
      destroyOnClose
    >
      <div className="modal-body">
        <span className="modal-header">
          <ExclamationCircleFilled />
          Trade Date/Time has been amended.
        </span>
        <span className="modal-times">
          <span>Current Trade Date/Time: </span>
          <span>{`${moment(currentDate).format('Do MMMM YYYY')} ${moment(currentDate).format('HH:mm:ss')}`}</span>
        </span>
        <span className="modal-times">
          <span>Amended Trade Date/Time:  </span>
          <span>{`${tradeDate} ${tradeTime}`}</span>
        </span>
      </div>
    </Modal>
  );
};

TradeDateConfirmModal.propTypes = {
  form: PropTypes.shape().isRequired,
  isVisible: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default TradeDateConfirmModal;
