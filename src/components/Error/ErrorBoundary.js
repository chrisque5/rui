import { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../img/tpicap.png';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="error-page">
          <div className="flex-container">
            <div className="flex-item">
              <img src={logo} alt="Logo" className="logo" />
              <h3 className="title">Deal Management System</h3>
              <h4 className="subtitle">An unexpected error occured.</h4>
              <button
                type="button"
                data-testid="reloadPage"
                className="linkbutton"
                onClick={() => window.location.reload(true)}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
