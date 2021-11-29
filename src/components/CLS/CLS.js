/* eslint-disable jsx-a11y/label-has-for */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox, Form, Tooltip,
} from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { ids } from '../../utils/constants';
import { toggleIsClsOverride } from '../../actions/uiActions';
import { getUserPreferenceSettingsClsDefaults } from '../../utils/selectors';

const CLS = ({
  form, id, label, testId,
}) => {
  const dispatch = useDispatch();
  const isClsDefaultsEnabled = useSelector(getUserPreferenceSettingsClsDefaults);

  useEffect(() => {
    if (isClsDefaultsEnabled) {
      dispatch(toggleIsClsOverride(false));
    }
  }, [dispatch, isClsDefaultsEnabled]);

  const onCLSToggle = (e) => {
    dispatch(toggleIsClsOverride(true));
    const isCLS2Checked = form.getFieldValue(ids.CLS_2);
    if (e.target.id === ids.CLS_1 && !isCLS2Checked) {
      form.setFieldsValue({ [ids.CLS_2]: e.target.checked });
    }
  };

  return (
    <div className="item-cls">
      {label && (
        <label htmlFor={id} className="label">
          {`${label}: `}
          <Tooltip
            title="Continuous Linked Settlement"
            mouseEnterDelay={0.3}
            overlayStyle={{ fontSize: '0.8em', padding: 0, margin: 0 }}
          >
            <InfoCircleFilled />
          </Tooltip>
        </label>
      )}
      <Form.Item
        className="cls"
        valuePropName="checked"
        name={id}
        initialValue={false}
      >
        <Checkbox
          className={(label ? 'toggle' : '')}
          data-testid={testId}
          onChange={onCLSToggle}
        />
      </Form.Item>
    </div>
  );
};

CLS.defaultProps = {
  label: '',
};

CLS.propTypes = {
  form: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
};

export default CLS;
