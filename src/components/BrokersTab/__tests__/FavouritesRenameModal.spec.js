import {
  renderWithProvider, fireEvent, waitFor,
} from 'test-utils/testUtils';
import * as uiActions from '../../../actions/uiActions';
import * as userActions from '../../../actions/userActions';
import FavouritesRenameModal from '../FavouritesRenameModal';
import * as notifications from '../../../utils/notifications';
import { panes } from './FavoriteTestData.json';

describe('<FavouritesRenameModal/>', () => {
  const initialState = {
    ui: {
      isFavRenamePopupVisible: true,
      selectedFavItem: panes[0].clients[0],
      selectedPreferenceBroker: '8158,100114',
    },
  };

  const notificationSpy = jest.spyOn(notifications, 'showErrorNotification');
  const toggleRenameFavoritesPopupSpy = jest.spyOn(uiActions, 'toggleRenameFavoritesPopup');
  const editClientTraderPreferenceSpy = jest.spyOn(userActions, 'editClientTraderPreference');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders snapshot as expected', () => {
    const { container } = renderWithProvider(
      <FavouritesRenameModal />, { initialState },
    );
    expect(container).toMatchSnapshot();
  });

  test('Verify save withoutempty data change', async () => {
    const { getByTestId, getByText } = renderWithProvider(
      <FavouritesRenameModal />, { initialState },
    );
    const saveBtn = await waitFor(() => getByText('Save'));
    fireEvent.click(saveBtn);
    expect(editClientTraderPreferenceSpy).toHaveBeenCalledTimes(0);
    expect(toggleRenameFavoritesPopupSpy).toHaveBeenCalledTimes(1);

    const input = await waitFor(() => getByTestId('editFav'));
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(saveBtn);
    expect(notificationSpy).toHaveBeenCalledTimes(1);
  });

  test('Verify data change and save', async () => {
    const { getByTestId, getByText } = renderWithProvider(
      <FavouritesRenameModal />, { initialState },
    );

    const input = await waitFor(() => getByTestId('editFav'));
    fireEvent.change(input, { target: { value: 'BILL CLINTON RENAMED' } });
    const saveBtn = await waitFor(() => getByText('Save'));
    fireEvent.click(saveBtn);
    expect(editClientTraderPreferenceSpy).toHaveBeenCalledTimes(1);
    expect(toggleRenameFavoritesPopupSpy).toHaveBeenCalledTimes(1);

    editClientTraderPreferenceSpy.mockClear();
    toggleRenameFavoritesPopupSpy.mockClear();

    fireEvent.change(input, { target: { value: 'BILL CLINTON ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(editClientTraderPreferenceSpy).toHaveBeenCalledTimes(1);
    expect(toggleRenameFavoritesPopupSpy).toHaveBeenCalledTimes(1);
  });
});
