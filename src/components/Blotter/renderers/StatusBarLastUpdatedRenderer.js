import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBlotterLastUpdated } from '../../../utils/selectors';
import { formatDate } from '../../../utils/agGrid/index';

export default function StatusBarLastUpdatedRenderer() {
  const blotterLastUpdated = useSelector(getBlotterLastUpdated);
  const [formattedDate, setFormattedDate] = useState();

  useEffect(() => {
    if (blotterLastUpdated !== null) {
      setFormattedDate(`${formatDate(blotterLastUpdated, 'L')} ${formatDate(blotterLastUpdated, 'LTS')}`);
    } else {
      setFormattedDate('N/A');
    }
  }, [blotterLastUpdated]);

  return (
    <div className="ag-name-value">
      <span>Last Updated: </span>
      <span className="ag-name-value-value" data-testid="blotter-last-updated">{formattedDate}</span>
    </div>
  );
}
