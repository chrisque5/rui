import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';
import { useDispatch } from 'react-redux';
import { ids, actionTypes } from '../../utils/constants';

const Strategy = ({ options, onChangeAfterEffects }) => {
  const dispatch = useDispatch();

  const strategyChanged = (event) => {
    dispatch({ type: actionTypes.CHANGE_STRATEGY, strategy: event.target.value });
    onChangeAfterEffects();
  };

  return (
    <Form.Item
      name={ids.STRATEGY}
      rules={[{ required: true, message: 'Strategy required' }]}
    >
      <Radio.Group>
        {options.map((strategy) => (
          <Radio
            key={strategy.name}
            value={strategy.name}
            onChange={strategyChanged}
            disabled={strategy.isDisabled}
            data-testid={`rdoStrategy${strategy.name}`}
          >
            {strategy.name}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

Strategy.defaultProps = {
  onChangeAfterEffects: () => {},
};

Strategy.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChangeAfterEffects: PropTypes.func,
};

export default Strategy;
