import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import { getBlotterDeals, getBlotterGridUpdates, getUserDeskId } from '../../../utils/selectors';
import { brokerageFormatter } from '../../../utils/agGrid/index';
import { STD_BROKERAGE_CCY } from '../../../utils/constants';
import messages from '../../../utils/messages';

const TotalBrokerageRenderer = () => {
  const blotterDeals = useSelector(getBlotterDeals);
  const blotterGridUpdates = useSelector(getBlotterGridUpdates);
  const userDeskId = useSelector(getUserDeskId);
  const [totalBrokerage, setTotalBrokerage] = useState();

  useEffect(() => {
    let total = 0;
    if (blotterDeals && blotterDeals.length > 0) {
      const fitleredDeals = blotterGridUpdates.fitleredDeals ? blotterGridUpdates.fitleredDeals : blotterDeals;
      if (fitleredDeals) {
        fitleredDeals.forEach((deal) => {
          const isSameDesk = (deskId) => deskId && deskId === userDeskId;
          let buyAmt = 0;
          if (isSameDesk(deal.payerBrokerDeskId) && deal.payerBrokerageStdAmount && deal.payerBrokerageStdAmount !== '') {
            buyAmt = deal.payerBrokerageStdAmount;
          }

          let sellAmt = 0;
          if (isSameDesk(deal.receiverBrokerDeskId) && deal.receiverBrokerageStdAmount && deal.receiverBrokerageStdAmount !== '') {
            sellAmt = deal.receiverBrokerageStdAmount;
          }

          total += (buyAmt + sellAmt);
        });
      }
    }
    setTotalBrokerage(brokerageFormatter({ value: total }));
  }, [blotterDeals, blotterGridUpdates, userDeskId]);

  return (
    <div className="ag-header-group-cell-label">
      <div className="ag-name-value total-brokerage">
        <Tooltip
          placement="bottom"
          mouseLeaveDelay={0}
          title={messages.TOTAL_BROKERAGE_TOOLTIP}
        >
          <span>Total Brokerage: </span>
          <span data-testid="blotter-total-brokerage">
            {STD_BROKERAGE_CCY}
            {' '}
            {totalBrokerage}
          </span>
        </Tooltip>
      </div>
    </div>

  );
};

export default TotalBrokerageRenderer;
