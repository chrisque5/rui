import {
  useEffect, useCallback, useState, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  Form, Button, Row, Space,
} from 'antd';
import _ from 'lodash';
import { showSuccessNotification } from '../../utils/notifications';
import { loadCurrencies, updateCLSFlags } from '../../actions/currencyActions';
import { changeDealType, resetAdminTabChanges } from '../../actions/uiActions';
import { getCurrencies, getResetAdminTabChanges } from '../../utils/selectors';
import { dealTypeOptions, ids } from '../../utils/constants';
import { ConfirmUnsavedChanges } from '../../utils/helper';

import CurrencyPairsEditor from './CurrencyPairsEditor';
import DealTypes from '../DealTypes/DealTypes';

const CurrencyOverrideContainer = ({ setIsTabDirty }) => {
  const dispatch = useDispatch();
  const gridRef = useRef({});
  const currencyPairsData = useSelector(getCurrencies);
  const [form] = Form.useForm();
  const [blockNavigation, setBlockNavigation] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [resetOrignalData, setResetOrignalData] = useState(true);
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resetAdminTabChangesState = useSelector(getResetAdminTabChanges);

  const disableNDF = dealTypeOptions.map((i) => (i.name === 'NDF' ? { ...i, isDisabled: true } : i));

  const loadData = useCallback(() => {
    setTimeout(() => {
      setIsLoading(true);
      const dealType = form.getFieldValue(ids.DEAL_TYPE);
      dispatch(changeDealType(dealType));
      dispatch(loadCurrencies(dealType, false)).then(() => {
        setIsLoading(false);
        setOriginalData([]);
        setResetOrignalData(true);
      });
    });
  }, [dispatch, form]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setIsTabDirty(blockNavigation);
  }, [blockNavigation, setIsTabDirty]);

  useEffect(() => {
    if (currencyPairsData.length > 0 && originalData.length === 0 && resetOrignalData) {
      const cloneData = JSON.parse(JSON.stringify(currencyPairsData));
      setOriginalData(cloneData);
      setResetOrignalData(false);
    }
  }, [currencyPairsData, originalData, resetOrignalData]);

  const resetForm = useCallback(() => {
    setBlockNavigation(false);
    setOriginalData([]);
    form.resetFields(['isCLS']);
    loadData();
    dispatch(resetAdminTabChanges(false));
  }, [loadData, form, dispatch]);

  useEffect(() => {
    if (resetAdminTabChangesState) {
      setIsTabDirty(false);
      resetForm();
    }
  }, [resetAdminTabChangesState, setIsTabDirty, resetForm]);

  const getGridRowData = () => {
    const gridRowData = [];
    gridRef.current.api.forEachNode((node) => gridRowData.push(node.data));
    return gridRowData;
  };

  const isGridDirty = () => !_.isEqualWith(getGridRowData(), originalData, _.isEqual);

  const onDataChange = () => {
    setBlockNavigation(isGridDirty());
  };

  const transformData = (data) => {
    const dealType = form.getFieldValue(ids.DEAL_TYPE);
    return _.map(data, (i) => ({
      dealType,
      currency1: i.baseCurrency,
      currency2: i.counterCurrency,
      cls: i.isCLS,
    }));
  };

  const handleDealTypeChange = () => {
    const dealType = form.getFieldValue(ids.DEAL_TYPE);

    if (blockNavigation) {
      ConfirmUnsavedChanges(
        'You have unsaved changes. Are you sure you want to switch the deal type?',
        () => {
          setBlockNavigation(false);
          setOriginalData([]);
          loadData();
          gridRef.current.api.showLoadingOverlay();
        },
        () => {
          form.setFieldsValue({ [ids.DEAL_TYPE]: dealType });
        },
      );
    } else {
      setOriginalData([]);
      loadData();
    }
  };

  const handleApply = async () => {
    if (blockNavigation) {
      setSubmitInProgress(true);
      gridRef.current.api.showLoadingOverlay();
      const changedRecords = _.differenceWith(getGridRowData(), originalData, _.isEqual);
      const recordsToUpdate = transformData(changedRecords);
      const response = await dispatch(updateCLSFlags(recordsToUpdate));

      if (!response.error) {
        showSuccessNotification(
          'Currency Pairs',
          'Currency Pairs successfully updated',
          5,
        );
        setBlockNavigation(false);
        setResetOrignalData(true);
        loadData();
        gridRef.current.api.hideOverlay();
        setSubmitInProgress(false);
      } else {
        gridRef.current.api.hideOverlay();
        setSubmitInProgress(false);
      }
    }
  };

  return (
    <>

      <Form
        hideRequiredMark
        form={form}
        initialValues={{ dealType: dealTypeOptions[1].name }}
        style={{ width: '400px' }}
      >
        <Row type="flex" style={{ marginTop: 10, marginBottom: 10 }}>
          <DealTypes
            options={disableNDF}
            dealTypeChange={handleDealTypeChange}
          />
        </Row>
        <Row type="flex" style={{ marginTop: 10 }}>
          <CurrencyPairsEditor
            currencyPairsData={currencyPairsData}
            onDataChange={onDataChange}
            ref={gridRef}
            isLoading={isLoading}
          />
        </Row>
        <Row type="flex" justify="end" className="action-buttons">
          <Space>
            <Button
              style={{ marginRight: 3 }}
              data-testid="cocBtnReset"
              id={ids.CANCEL}
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button
              htmlType="button"
              onClick={handleApply}
              type="primary"
              data-testid="cocBtnApply"
              id={ids.SUBMIT}
              loading={submitInProgress}
            >
              Apply
            </Button>
          </Space>
        </Row>
      </Form>
    </>
  );
};

CurrencyOverrideContainer.propTypes = {
  setIsTabDirty: PropTypes.func.isRequired,
};

export default CurrencyOverrideContainer;
