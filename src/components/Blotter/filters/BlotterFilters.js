/* global BigInt */
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, Button, Row,
} from 'antd';
import moment from 'moment';
import { getSSESessionId, getResetBlotterSearch, getDateRangeLimit } from '../../../utils/selectors';
import { showErrorNotification } from '../../../utils/notifications';
import { loadBlotterDeals } from '../../../actions/dealActions';
import { resetBlotterSearch } from '../../../actions/uiActions';
import { loadBlotterSearchDateRangeLimit } from '../../../actions/systemSettingsActions';
import { ids, MAX_DEAL_ID_VAL } from '../../../utils/constants';

import DateField from './DateField';
import TextField from './TextField';
import DealId from './DealId';

const marginTop = 10;
const BlotterFilters = ({ closeDrawer }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const sessionId = useSelector(getSSESessionId);
  const MAX_DATE_RANGE = useSelector(getDateRangeLimit);
  const [dealIdCls, setDealIdCls] = useState(null);
  const [dateRangeCls, setDateRangeCls] = useState('highlight');
  const isBlotterSearchReset = useSelector(getResetBlotterSearch);
  useEffect(() => {
    dispatch(loadBlotterSearchDateRangeLimit());
  }, [dispatch]);

  const validateForm = useCallback(() => {
    let result = { valid: true };

    const fieldsToBeValidated = [ids.BROKER, ids.TRADER, ids.CUSTOMER];
    const dealId = form.getFieldValue([ids.DEAL_ID]);
    // If deal id has value, then date fields are not mandatory
    if (dealId) {
      fieldsToBeValidated.push(ids.DEAL_ID);
    } else {
      fieldsToBeValidated.push(ids.DATE_FROM);
      fieldsToBeValidated.push(ids.DATE_TO);
    }
    return form.validateFields(fieldsToBeValidated).then((values) => {
      const { dateFrom, dateTo } = values;
      if (moment(dateFrom) > moment(dateTo)) {
        result = {
          valid: false,
          error: 'From date cannot be greater than To date',
        };
      } else if (dateFrom && dateTo && dateTo.diff(dateFrom, 'days') > MAX_DATE_RANGE) {
        result = {
          valid: false,
          error: `Date range cannot be greater than ${MAX_DATE_RANGE} days`,
        };
      } else {
        result = {
          ...values,
          valid: true,
          subscribeToUpdates: !!sessionId,
          sessionId,
        };
      }
      return result;
    }).catch(() => {
      const dealIDError = form.getFieldError(ids.DEAL_ID);
      if (dealIDError.length > 0) {
        result = {
          valid: false,
          error: dealIDError.join('. '),
        };
      } else {
        result = {
          valid: false,
          error: 'Trade date fields are required for search',
        };
      }

      return result;
    });
  }, [form, sessionId, MAX_DATE_RANGE]);

  const handleSearch = useCallback((shouldCloseDrawer = true) => {
    validateForm().then((result) => {
      if (result.valid) {
        dispatch(loadBlotterDeals(result));
        if (shouldCloseDrawer) {
          closeDrawer();
        }
      } else {
        showErrorNotification('Validation Error', result.error);
      }
    });
  }, [dispatch, validateForm, closeDrawer]);

  const resetForm = useCallback(() => {
    form.resetFields();
    setDateRangeCls('highlight');
    setDealIdCls('');
    handleSearch(false);
  }, [form, handleSearch]);

  useEffect(() => {
    if (isBlotterSearchReset) {
      resetForm();
      dispatch(resetBlotterSearch(false));
    }
  }, [isBlotterSearchReset, dispatch, resetForm]);

  const onFormValuesChange = (changes) => {
    if (changes[ids.DEAL_ID]) {
      form.setFieldsValue({
        [ids.DATE_FROM]: null,
        [ids.DATE_TO]: null,
        [ids.BROKER]: null,
        [ids.CUSTOMER]: null,
        [ids.TRADER]: null,
      });
      const dealId = form.getFieldsValue(ids.DEAL_ID);
      if (dealId && dealId !== '') {
        setDealIdCls('highlight');
      }
      setDateRangeCls('');
    } else {
      form.resetFields([ids.DEAL_ID]);
      setDealIdCls('');
      setDateRangeCls('highlight');
    }
  };

  const dealIdValidator = async (rule, value) => {
    if (value || value === 0) {
      if (value.toString().indexOf('.') !== -1) {
        throw new Error('Decimals are not allowed in DealId');
      } else if (BigInt(value) > BigInt(MAX_DEAL_ID_VAL)) {
        throw new Error('Invalid ID value');
      } else if (value.toString().length > 19) {
        throw new Error('Maximum 19 digits allowed in DealId');
      } else if (value > 0) {
        return Promise.resolve();
      }
      throw new Error('DealId should be larger than 0');
    }
    return Promise.resolve();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="blotter-filter-container">
      <Form
        hideRequiredMark
        form={form}
        onValuesChange={onFormValuesChange}
      >
        <fieldset className={dealIdCls}>
          <legend>Search By Deal ID</legend>
          <Row type="flex">
            <DealId
              label="Deal ID"
              id={ids.DEAL_ID}
              testId={ids.DEAL_ID}
              validator={dealIdValidator}
              handleKeyDown={handleKeyDown}
              className="form-item-disabled"
            />
          </Row>
        </fieldset>
        <fieldset style={{ marginTop }} className={dateRangeCls}>
          <legend>Search By Trade Date</legend>
          <Form.Item label="Trade Date" className="blotter-trade-date" colon={false}>
            <DateField disabled id={ids.DATE_FROM} label="From" testId={ids.DATE_FROM} />
            <DateField id={ids.DATE_TO} label="To" testId={ids.DATE_TO} />
          </Form.Item>
          <Row type="flex">
            <TextField label="Broker" id={ids.BROKER} testId={ids.BROKER} handleKeyDown={handleKeyDown} />
          </Row>
          <Row type="flex">
            <TextField label="Customer" id={ids.CUSTOMER} testId={ids.CUSTOMER} handleKeyDown={handleKeyDown} />
          </Row>
          <Row type="flex">
            <TextField label="Trader" id={ids.TRADER} testId={ids.TRADER} handleKeyDown={handleKeyDown} />
          </Row>
        </fieldset>
        <Row type="flex" justify="end" className="action-buttons" style={{ marginTop }}>
          <Button
            style={{ marginRight: 3 }}
            data-testid="blotterReset"
            onClick={resetForm}
          >
            Reset
          </Button>
          <Button
            htmlType="button"
            onClick={handleSearch}
            type="primary"
            data-testid="blotterSearch"
            style={{ marginRight: 10 }}
          >
            Search
          </Button>
        </Row>
      </Form>
    </div>
  );
};

BlotterFilters.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};
export default BlotterFilters;
