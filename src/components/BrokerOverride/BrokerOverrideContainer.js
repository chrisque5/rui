import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form, Button, Row, Space,
} from 'antd';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';
import {
  loadBrokers,
  loadBrokersSuccess,
  updateBrokers,
  loadGcdBrokers,
  loadGcdBrokersSuccess,
  updateBrokersSuccess,
} from '../../actions/brokerActions';
import { loadDesks } from '../../actions/deskActions';
import { changeDealType, resetAdminTabChanges } from '../../actions/uiActions';
import {
  getDesks,
  getGcdBrokers,
  getBrokerUpdateStatus,
  getResetAdminTabChanges,
} from '../../utils/selectors';
import { dealTypeOptions, ids } from '../../utils/constants';
import { ConfirmUnsavedChanges } from '../../utils/helper';
import Desks from './Desks';
import BrokersTransfer from './BrokersTransfer';
import DealTypes from '../DealTypes/DealTypes';

const BrokerOverrideContainer = ({ setIsTabDirty }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const desks = useSelector(getDesks);
  const gcdBrokers = useSelector(getGcdBrokers);
  const brokerUpdateStatus = useSelector(getBrokerUpdateStatus);

  const [isSubmitInProgress, setIsSubmitInProgress] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const resetAdminTabChangesState = useSelector(getResetAdminTabChanges);

  const resetForm = useCallback(() => {
    form.resetFields();
    dispatch(loadBrokersSuccess([]));
    dispatch(loadGcdBrokersSuccess([]));
    form.getFieldInstance(ids.DESK).focus();
    dispatch(resetAdminTabChanges(false));
  }, [dispatch, form]);

  useEffect(() => {
    if (resetAdminTabChangesState) {
      setIsTabDirty(false);
      resetForm();
    }
  }, [resetAdminTabChangesState, setIsTabDirty, resetForm]);

  useEffect(() => {
    setIsTabDirty(isFormDirty);
  }, [isFormDirty, setIsTabDirty]);

  const validateForm = () => {
    let result = { valid: true };
    return form
      .validateFields()
      .then((values) => {
        const selectedBrokers = values.selectedBrokers || [];
        const dataWithAllKeys = gcdBrokers.filter((broker) => selectedBrokers.includes(broker.id));
        result = {
          ...values,
          brokers: dataWithAllKeys,
          valid: true,
        };
        return result;
      })
      .catch(() => {
        result = {
          valid: false,
          error: 'Please review validation errors',
        };
        return result;
      });
  };

  const handleApply = () => {
    validateForm().then((result) => {
      if (result.valid) {
        setIsSubmitInProgress(true);
        dispatch(updateBrokers(result));
      } else {
        showErrorNotification('Validation Error', result.error);
      }
    });
  };

  const reloadData = useCallback(() => {
    setTimeout(() => {
      const dealType = form.getFieldValue(ids.DEAL_TYPE);
      dispatch(changeDealType(dealType));
      const deskId = form.getFieldValue(ids.DESK);
      if (deskId) {
        dispatch(loadGcdBrokers(dealType, deskId));
        dispatch(loadBrokers(dealType, deskId));
      }
    });
  }, [dispatch, form]);

  const handleDealTypeChange = () => {
    const dealType = form.getFieldValue(ids.DEAL_TYPE);

    if (isFormDirty) {
      ConfirmUnsavedChanges(
        'You have unsaved changes. Are you sure you want to switch the deal type?',
        reloadData,
        () => {
          form.setFieldsValue({ [ids.DEAL_TYPE]: dealType });
        },
      );
    } else {
      reloadData();
    }
  };

  useEffect(() => {
    const dealType = form.getFieldValue(ids.DEAL_TYPE);
    dispatch(changeDealType(dealType));
    dispatch(loadDesks(dealType));
    if (!form.getFieldValue(ids.DESK)) {
      dispatch(loadBrokersSuccess([]));
      dispatch(loadGcdBrokersSuccess([]));
    }
  }, [dispatch, form]);

  useEffect(() => {
    if (brokerUpdateStatus) {
      setIsSubmitInProgress(false);
      showSuccessNotification(
        'DMSWeb Broker List',
        'DMSWeb Broker List successfully updated',
      );
      reloadData();
      dispatch(updateBrokersSuccess(false));
    } else {
      setIsSubmitInProgress(false);
    }
  }, [brokerUpdateStatus, dispatch, reloadData]);

  return (
    <Form
      hideRequiredMark
      form={form}
      initialValues={{ dealType: dealTypeOptions[0].name }}
    >
      <Row type="flex" style={{ marginTop: 10 }}>
        <DealTypes
          options={dealTypeOptions}
          form={form}
          id={ids.DEAL_TYPE}
          data-testid="bocRadioDealType"
          dealTypeChange={handleDealTypeChange}
          style={{ marginBottom: 10 }}
        />
      </Row>
      <Row type="flex" style={{ marginTop: 10 }}>
        <Desks
          desks={desks}
          deskOnSelect={reloadData}
          form={form}
          id={ids.DESK}
          data-testid="bocDdDesk"
        />
      </Row>
      <BrokersTransfer
        form={form}
        id={ids.SELECTED_BROKERS}
        data-testid="transfer"
        setIsFormDirty={setIsFormDirty}
      />
      <Row type="flex" justify="end" className="action-buttons">
        <Space>
          <Button
            data-testid="bocBtnReset"
            id={ids.CANCEL}
            onClick={resetForm}
          >
            Cancel
          </Button>
          <Button
            htmlType="button"
            onClick={handleApply}
            type="primary"
            data-testid="bocBtnApply"
            id={ids.SUBMIT}
            loading={isSubmitInProgress}
          >
            Apply
          </Button>
        </Space>
      </Row>
    </Form>
  );
};

BrokerOverrideContainer.propTypes = {
  setIsTabDirty: PropTypes.func.isRequired,
};

export default BrokerOverrideContainer;
