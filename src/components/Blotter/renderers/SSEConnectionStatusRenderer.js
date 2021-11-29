import { useSelector } from 'react-redux';
import { Popover } from 'antd';
import { ApiTwoTone, CheckCircleTwoTone, SyncOutlined } from '@ant-design/icons';
import { getSSEStatus } from '../../../utils/selectors';
import { sseStatuses } from '../../../utils/constants';

export default function SSEConnectionStatusRenderer() {
  const status = useSelector(getSSEStatus);
  const getStatusText = () => (status || 'Disconnected');

  const getStatusIcon = () => {
    const { CONNECTED, CONNECTING } = sseStatuses;
    if (status === CONNECTED) {
      return <CheckCircleTwoTone twoToneColor="#52C41A" data-testid="connectedIcon" />;
    } if (status === CONNECTING) {
      return <SyncOutlined spin style={{ color: '#FF7E00' }} data-testid="connectingIcon" />;
    }

    return <ApiTwoTone twoToneColor="red" data-testid="notConnectedIcon" />;
  };
  return (
    <div className="ag-name-value" data-testid="chkRtuIcon">
      <Popover content={<span>{`Status: ${getStatusText()}`}</span>} title="Real Time Update Connection">
        {getStatusIcon()}
      </Popover>
    </div>
  );
}
