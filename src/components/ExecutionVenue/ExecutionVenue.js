import PropTypes from 'prop-types';
import { StarFilled } from '@ant-design/icons';
import {
  Form, Select, Tooltip,
} from 'antd';
import { ids } from '../../utils/constants';

const ExecutionVenue = ({
  isLoading, options, addPreferenceClick,
}) => (
  <Form.Item
    labelCol={{ span: 12 }}
    wrapperCol={{ span: 12 }}
    label={(
      <>
        <span className="execution-venue-label">Venue</span>
        <Tooltip
          title="Add Execution Venue to client manager"
          mouseEnterDelay={0.3}
          overlayStyle={
            { fontSize: '0.8em', padding: 0, margin: 0 }
          }
        >
          <StarFilled
            className="star-icon"
            data-testid="addPreference"
            onClick={addPreferenceClick}
          />
        </Tooltip>
      </>
    )}
    rules={[{ required: true, message: 'Execution venue required' }]}
    name={ids.EXECUTION_VENUE}
  >

    <Select loading={isLoading} data-testid="ddlExecutionVenue">
      {options && options.map(
        (executionVenue) => {
          const { venueId } = executionVenue;
          return (
            <Select.Option
              data-testid={`ddlExecutionVenue_${venueId}`}
              key={venueId}
              value={venueId}
            >
              {venueId}
            </Select.Option>
          );
        },
      )}
    </Select>
  </Form.Item>
);

ExecutionVenue.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addPreferenceClick: PropTypes.func.isRequired,
};

export default ExecutionVenue;
