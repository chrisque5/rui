import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'moment/min/locales';
import './styles/dms-light-theme.css';
// eslint-disable-next-line import/no-unresolved
import './styles/compiled/dms-default.css';
import App from './components/App/App';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
