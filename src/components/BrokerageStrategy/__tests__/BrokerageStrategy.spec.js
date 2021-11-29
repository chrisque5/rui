import {
  renderWithForm, waitFor, getByTitle,
} from 'test-utils/testUtils';
import BrokerageStrategy from '../BrokerageStrategy';

describe('<BrokerageStrategy />', () => {
  test('It Renders ', () => {
    const { container } = renderWithForm(<BrokerageStrategy />);
    expect(container).toMatchSnapshot();
  });

  test('Gap Spread to be default value ', async () => {
    renderWithForm(<BrokerageStrategy />);
    const selectedDateElem = await waitFor(() => getByTitle(document.body, 'Gap Spread'));
    expect(selectedDateElem.innerHTML).toEqual('Gap Spread');
  });
});
