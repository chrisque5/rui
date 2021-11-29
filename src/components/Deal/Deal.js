import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { dealTypes } from '../../utils/constants';
import { getLastDealType, getUserPermissions } from '../../utils/selectors';

import NavbarContainer from '../Navbar/NavbarContainer';
import NdfTradeCaptureContainer from '../TradeCapture/NDF/NdfTradeCaptureContainer';
import FwdTradeCaptureContainer from '../TradeCapture/FWD/FwdTradeCaptureContainer';
import SptTradeCaptureContainer from '../TradeCapture/SPT/SptTradeCaptureContainer';
import Forbidden from '../Error/Forbidden';
import NotFound from '../Error/NotFound';

const dealByType = (lastDealType, urlDealType = null, permissions) => {
  const { validForNdf, validForFwd, validForSpt } = permissions;

  switch (urlDealType) {
    case dealTypes.NDF:
      return validForNdf ? <NdfTradeCaptureContainer /> : <Forbidden />;
    case dealTypes.FWD:
      return validForFwd ? <FwdTradeCaptureContainer /> : <Forbidden />;
    case dealTypes.SPT:
      return validForSpt ? <SptTradeCaptureContainer /> : <Forbidden />;
    default:
      break;
  }

  // if there is a last deal type set OR
  // urlDealType is null as it came from the root path / AND permissioned
  // redirect to that type
  //
  // NB urlDealType === null is a placeholder until there is a landing page for /
  let newDealType = null;

  if (lastDealType) {
    newDealType = lastDealType;
  } else if (urlDealType === null && validForNdf) {
    newDealType = dealTypes.NDF;
  } else if (urlDealType === null && validForFwd) {
    newDealType = dealTypes.FWD;
  }

  return newDealType !== null ? <Redirect to={`/deal/${newDealType}`} /> : <NotFound />;
};

const Deal = ({ match }) => {
  const { params: { dealType: urlDealType } = {} } = match;

  const permissions = useSelector(getUserPermissions);
  const lastDealType = useSelector(getLastDealType);
  return (
    <>
      <NavbarContainer selectedKey={urlDealType} />
      <DndProvider backend={HTML5Backend}>
        {Object.entries(permissions).length && dealByType(lastDealType, urlDealType, permissions)}
      </DndProvider>
    </>
  );
};

Deal.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Deal;
