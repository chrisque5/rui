import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button, Input,
} from 'antd';

const { TextArea } = Input;
const SaveDesriptionModal = ({
  visible, onOk, onBack, onDescriptionChange,
}) => {
  const [isOkBtnDisabled, setIsOkBtnDisabled] = useState(true);
  const onChange = (e) => {
    const value = e.target.value;
    if (value) {
      setIsOkBtnDisabled(false);
    } else {
      setIsOkBtnDisabled(true);
    }
  };
  const onBlur = (e) => {
    onDescriptionChange(e.target.value);
  };
  return (
    <Modal
      className="save-description"
      title="Save Description"
      visible={visible}
      onOk={onOk}
      onCancel={onBack}
      bodyStyle={{ padding: '10px', minHeight: 150 }}
      footer={[
        <Button data-testid="btnBack" key="back" onClick={onBack}>Back</Button>,
        <Button data-testid="btnOk" disabled={isOkBtnDisabled} key="submit" type="primary" onClick={onOk}>Ok</Button>,
      ]}
      destroyOnClose
    >
      <TextArea rows={8} autoFocus onBlur={onBlur} onChange={onChange} name="editDescription" data-testid="editDescription" />
    </Modal>
  );
};

SaveDesriptionModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default SaveDesriptionModal;
