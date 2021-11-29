import { useState, useEffect } from 'react';
import { Form, Transfer } from 'antd';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { getGcdBrokers, getBrokers } from '../../utils/selectors';

const BrokersTransfer = ({ id, setIsFormDirty }) => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const gcdBrokers = useSelector(getGcdBrokers);
  const brokers = useSelector(getBrokers);
  const [initialData, setInitialData] = useState([]);

  const handleChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  useEffect(() => {
    if (brokers) {
      const tKeys = brokers.map((broker) => broker.id);
      setTargetKeys(tKeys);
      setSelectedKeys([]);
      setInitialData(tKeys);
    }
  }, [brokers]);

  useEffect(() => {
    setIsFormDirty(!_.isEqual(initialData, targetKeys));
  }, [targetKeys, initialData, setIsFormDirty]);

  const handleSearch = (inputValue, item) => (item.name).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
    || (item.id).toString().indexOf(inputValue) !== -1;

  return (
    <>
      <div style={{ marginTop: 10, marginBottom: 5 }}>Select Brokers: </div>
      <Form.Item name={id}>
        <Transfer
          name={id}
          rowKey={(item) => item.id}
          dataSource={gcdBrokers}
          titles={['All Brokers', 'DMSWeb Broker List']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          render={(item) => `${item.name} - ${item.id}`}
          showSearch
          lazy={false}
          filterOption={handleSearch}
          listStyle={{
            width: 380,
          }}
        />
      </Form.Item>
    </>
  );
};

BrokersTransfer.propTypes = {
  id: PropTypes.string.isRequired,
  setIsFormDirty: PropTypes.func.isRequired,
};

export default BrokersTransfer;
