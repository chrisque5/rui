import { Link, useLocation } from 'react-router-dom';

import logo from '../../img/tpicap.png';

const Forbidden = () => {
  const location = useLocation();

  return (
    <div className="error-page">
      <div className="flex-container">
        <div className="flex-item">
          <img src={logo} alt="Logo" className="logo" />

          <h3 className="title">Deal Management System</h3>
          <h3 className="subtitle">Insufficient Permissions</h3>
          <p>
            Insufficient permissions to access
            &quot;
            {location.pathname}
            &quot;.
          </p>
          <Link to="/" className="linkbutton">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
