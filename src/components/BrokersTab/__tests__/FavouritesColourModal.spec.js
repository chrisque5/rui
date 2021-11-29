import {
  renderWithProvider, fireEvent, waitFor,
} from 'test-utils/testUtils';
import * as uiActions from '../../../actions/uiActions';
import * as userActions from '../../../actions/userActions';
import FavouritesColourModal from '../FavouritesColourModal';
import { panes } from './FavoriteTestData.json';

describe('<FavouritesColourModal/>', () => {
  const initialState = {
    ui: {
      isColourChangePopUpVisible: true,
      selectedFavItem: panes[0].clients[0],
      selectedPreferenceBroker: '8158,100114',
    },
  };

  const toggleChangeFavoritesColourPopupSpy = jest.spyOn(uiActions, 'toggleChangeFavoritesColourPopup');
  const editClientTraderPreferenceSpy = jest.spyOn(userActions, 'editClientTraderPreference');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders snapshot as expected', () => {
    const { container } = renderWithProvider(
      <FavouritesColourModal />, { initialState },
    );
    expect(container).toMatchSnapshot();
  });

  test('Verify save color change', async () => {
    const { getByTestId } = renderWithProvider(
      <FavouritesColourModal />, { initialState },
    );
    const defaultColorBtn = await waitFor(() => getByTestId('FavBtnColour1'));
    fireEvent.click(defaultColorBtn);
    expect(editClientTraderPreferenceSpy).toHaveBeenCalledTimes(1);
    expect(toggleChangeFavoritesColourPopupSpy).toHaveBeenCalledTimes(1);
  });
});
