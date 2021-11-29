import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUserPermissions, getUserPreferencesDefaults } from '../../utils/selectors';
import { navMenuItems } from '../../utils/constants';

import NavbarContainer from '../Navbar/NavbarContainer';
import NoAccess from '../Error/NoAccess';

const launchDefaultComponent = (permissions, defaultEntryPage) => {
  const {
    validForNdf, validForFwd, validForSpt, validForBlotterEdit, validForBlotterView, validForDeskEdit,
  } = permissions;

  const {
    ADMIN, BLOTTER, FWD, NDF, SPT,
  } = navMenuItems;

  let redirectUrl;
  if ((defaultEntryPage === 'ADMIN') && validForDeskEdit) {
    redirectUrl = ADMIN.to;
  } else if ((defaultEntryPage === 'BLOTTER') && (validForBlotterView || validForBlotterEdit)) {
    redirectUrl = BLOTTER.to;
  } else if ((defaultEntryPage === 'FWD') && validForFwd) {
    redirectUrl = FWD.to;
  } else if ((defaultEntryPage === 'NDF') && validForNdf) {
    redirectUrl = NDF.to;
  } else if ((defaultEntryPage === 'SPT') && validForSpt) {
    redirectUrl = SPT.to;
  } else if (validForBlotterView || validForBlotterEdit) {
    redirectUrl = BLOTTER.to;
  } else if (validForNdf) {
    redirectUrl = NDF.to;
  } else if (validForDeskEdit) {
    redirectUrl = ADMIN.to;
  }
  return redirectUrl ? <Redirect to={redirectUrl} /> : <NoAccess />;
};

const Home = () => {
  const permissions = useSelector(getUserPermissions);
  const { defaultEntryPage } = useSelector(getUserPreferencesDefaults);

  return (
    <>
      <NavbarContainer />
      {Object.entries(permissions).length && defaultEntryPage !== 'NA' && launchDefaultComponent(permissions, defaultEntryPage)}
    </>
  );
};

export default Home;
