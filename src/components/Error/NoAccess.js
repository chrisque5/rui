import logo from '../../img/tpicap.png';

const NoAccess = () => (
  <div className="error-page">
    <div className="flex-container">
      <div className="flex-item">
        <img src={logo} alt="Logo" className="logo" />

        <h3 className="title">Deal Management System</h3>
        <h4 className="subtitle">Insufficient Permissions</h4>
        <p>Insufficient permissions to access the application.  Please contact TV Ops.</p>
      </div>
    </div>
  </div>
);

export default NoAccess;
