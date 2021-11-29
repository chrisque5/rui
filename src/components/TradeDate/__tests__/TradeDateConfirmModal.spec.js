import { render, fireEvent, waitFor } from 'test-utils/testUtils';
import redux from 'react-redux';
import TradeDateConfirmModal from '../TradeDateConfirmModal';
import { ids } from '../../../utils/constants';

jest.mock('react-redux', () => ({ useDispatch: () => () => { }, useSelector: () => ({}) }));
jest.mock('../../../utils/helper', () => ({ getDateTimeInLocalTZ: jest.fn().mockReturnValue({ momentTz: 1586386800000 }) }));
jest.mock('moment', () => () => ({ format: () => '2099–01–01' }));

const dispatchSpy = jest.spyOn(redux, 'useDispatch');
afterEach(() => {
  dispatchSpy.mockClear();
});

const mockForm = {
  getFieldValue: (field) => {
    if (field === ids.TRADE_DATE || field === ids.TRADE_TIME) {
      return '01-01-2030';
    }
    return 'dummy';
  },
};

const onAccept = jest.fn();
const defaultProps = { form: mockForm, isVisible: true, onAccept };

test('<TradeDateConfirmModal /> renders snapshot as expected', () => {
  const { container } = render(<TradeDateConfirmModal {...defaultProps} />);
  expect(container).toMatchSnapshot();
});

test('<TradeDateConfirmModal /> renders snapshot as expected when no dates set in form', () => {
  const props = {
    form: { getFieldValue: () => {} },
    isVisible: true,
    onAccept,
  };

  const { container } = render(<TradeDateConfirmModal {...props} />);
  expect(container).toMatchSnapshot();
});

test.skip('<TradeDateConfirmModal /> calls dispatch and onAccept on clicking of accept button', async () => {
  const { getByTestId } = render(<TradeDateConfirmModal {...defaultProps} />);
  const acceptButton = await waitFor(() => getByTestId('trade-date-modal-save'));
  fireEvent.click(acceptButton);
  expect(defaultProps.onAccept).toHaveBeenCalled();
  expect(dispatchSpy).toHaveBeenCalledTimes(2);
});

test.skip('<TradeDateConfirmModal /> calls dispatch but not onAccept on clicking of cancel button', async () => {
  const { getByTestId } = render(<TradeDateConfirmModal {...defaultProps} />);
  const cancelButton = await waitFor(() => getByTestId('trade-date-modal-cancel'));
  fireEvent.click(cancelButton);
  expect(defaultProps.onAccept).not.toHaveBeenCalledTimes(41);
  expect(dispatchSpy).toHaveBeenCalledTimes(2);
});
