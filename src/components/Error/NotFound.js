import { useHistory } from 'react-router-dom';
import logo from '../../img/tpicap.png';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="error-page">
      <div className="flex-container">
        <div className="flex-item">
          <img src={logo} alt="Logo" className="logo" />

          <h3 className="title">Deal Management System</h3>
          <h4 className="subtitle">404 - Not Found</h4>
          <p>
            Page &quot;
            {history.location.pathname}
            &quot; not found.
          </p>
          <button type="button" className="linkbutton" onClick={history.goBack}>Go back</button>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
