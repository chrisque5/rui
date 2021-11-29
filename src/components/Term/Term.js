import PropTypes from 'prop-types';
import { StarFilled } from '@ant-design/icons';
import {
  Form, AutoComplete, Tooltip,
} from 'antd';

const Term = ({
  id, label, termSearch, handleKeyDown, validator,
  searchResults, testId, termOnSelect, termOnBlur, addPreferenceClick,
}) => (
  <Form.Item
    label={label ? (
      <>
        <span>{label}</span>
        <Tooltip
          title="Add term to client manager"
          mouseEnterDelay={0.3}
          overlayStyle={
          { fontSize: '0.8em', padding: 0, margin: 0 }
          }
        >
          <StarFilled
            data-testid="addPreference"
            className="star-icon"
            onClick={() => addPreferenceClick()}
          />
        </Tooltip>
      </>
    ) : null}
    className="item-term"
    rules={[{ validator }]}
    name={id}
  >

    <AutoComplete
      data-testid={testId}
      onSearch={termSearch}
      onFocus={termSearch}
      onSelect={(value) => termOnSelect(value, id)}
      onBlur={(value) => termOnBlur(value, id)}
      placeholder="E.G. 1D"
      onInputKeyDown={(e) => handleKeyDown(e, id)}
      defaultActiveFirstOption
    >
      {searchResults}
    </AutoComplete>
  </Form.Item>
);

Term.propTypes = {
  addPreferenceClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(String).isRequired,
  termSearch: PropTypes.func.isRequired,
  termOnSelect: PropTypes.func.isRequired,
  termOnBlur: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

export default Term;
