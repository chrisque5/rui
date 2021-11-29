import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const SubmitModal = ({ isModalVisible = false, hideModal, onAccept }) => {
  const handleOk = () => {
    hideModal();
    onAccept();
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <Modal
      className="confirm-modal"
      visible={isModalVisible}
      onCancel={handleCancel}
      title="Confirm Submit Duplicate Deal"
      footer={[
        <Button data-testid="submit-deal-modal-cancel" key="back" onClick={handleCancel}>Cancel</Button>,
        <Button data-testid="submit-deal-modal-submit" key="submit" type="primary" onClick={handleOk}>Submit Again</Button>,
      ]}
      destroyOnClose
    >
      <div className="modal-body">
        <span className="modal-header">
          <ExclamationCircleFilled />
          You are about to submit a duplicate deal.
        </span>
        <span className="modal-text">
          <p>No changes have been made since the previous deal was submitted.</p>
          <p>If you did not intend to submit a duplicate deal click the &lsquo;Cancel&rsquo; button and change at least one field.</p>
        </span>
      </div>
    </Modal>
  );
};

SubmitModal.propTypes = ({
  isModalVisible: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
});

export default SubmitModal;
