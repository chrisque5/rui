import { fireEvent, render, waitFor } from 'test-utils/testUtils';
import SubmitModal from '../SubmitModal';

const defaultProps = {
  hideModal: jest.fn(),
  onAccept: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
});

test('<SubmitModal /> renders snapshot as expected', () => {
  const { container } = render(<SubmitModal {...defaultProps} />);
  expect(container).toMatchSnapshot();
});

test('<SubmitModal /> renders snapshot as expected when isModalVisible is true', () => {
  const props = {
    ...defaultProps,
    isModalVisible: true,
  };

  const { container } = render(<SubmitModal {...props} />);
  expect(container).toMatchSnapshot();
});

test('<SubmitModal /> calls hideModal() on cancel', async () => {
  const props = {
    ...defaultProps,
    isModalVisible: true,
  };

  const { getByTestId } = render(<SubmitModal {...props} />);
  const cancelButton = await waitFor(() => getByTestId('submit-deal-modal-cancel'));

  fireEvent.click(cancelButton);

  expect(defaultProps.hideModal).toHaveBeenCalledTimes(1);
  expect(defaultProps.onAccept).not.toHaveBeenCalled();
});

test('<SubmitModal /> calls hideModal() and onAccept() on submit', async () => {
  const props = {
    ...defaultProps,
    isModalVisible: true,
  };

  const { getByTestId } = render(<SubmitModal {...props} />);
  const submitButton = await waitFor(() => getByTestId('submit-deal-modal-submit'));

  fireEvent.click(submitButton);

  expect(defaultProps.hideModal).toHaveBeenCalledTimes(1);
  expect(defaultProps.onAccept).toHaveBeenCalledTimes(1);
});
