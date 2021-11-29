/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { Tabs, Button } from 'antd';
import DraggableTabs from './DraggableTabs';
import { favorites } from '../../utils/constants';
import FavoritesContainer from './FavoritesContainer';

const BrokersTab = ({
  onChange, onEdit, panes, onClientTraderRemove,
  onClientTraderClick, onOrderChanged, tabOrder, activeTabKey,
  onCurrencyRemove, onCurrencyClick, onTermRemove, onTermClick,
  onExecutionVenueClick, onExecutionVenueRemove, currencyScope, termScope,
  counterPartyScope, executionVenueScope, onFirmClick, selectedPreferenceFirm,
}) => (
  <DraggableTabs
    hideAdd
    onChange={onChange}
    type="editable-card"
    onEdit={onEdit}
    orderChanged={onOrderChanged}
    tabOrder={tabOrder}
    activeKey={activeTabKey}
  >
    {panes && panes.map(
      (pane) => {
        const {
          userSettings: {
            displayClients,
            displayClientFavourites,
            displayCurrencyFavourites,
            displayTermFavourites,
            displayExecutionVenueFavourites,
          } = {},
          firms = [],
          clients = [],
          currencyPairs = [],
          terms = [],
          executionVenues = [],
        } = pane;

        return (
          <Tabs.TabPane tab={pane.title.toLowerCase()} key={pane.key}>
            <Button.Group className="favorites">

              {displayClients && firms.length > 0 && (

                <FavoritesContainer
                  favType={favorites.FIRMS}
                  favList={firms}
                  selectedBroker={pane}
                  onClose={onClientTraderRemove}
                  onClick={onFirmClick}
                  orderChanged={onOrderChanged}
                  canDrag={false}
                />

              )}

              {(displayClients || displayClientFavourites) && clients.length > 0 && (

                <FavoritesContainer
                  favType={favorites.CLIENT_TRADER}
                  favList={clients}
                  selectedBroker={pane}
                  onClose={onClientTraderRemove}
                  onClick={onClientTraderClick}
                  orderChanged={onOrderChanged}
                  scope={{ counterPartyScope }}
                  canDrag={selectedPreferenceFirm === null}
                />

              )}

              {displayCurrencyFavourites && currencyPairs.length > 0 && (

                <FavoritesContainer
                  favType={favorites.CCY_PAIR}
                  favList={currencyPairs}
                  selectedBroker={pane}
                  onClose={onCurrencyRemove}
                  onClick={onCurrencyClick}
                  orderChanged={onOrderChanged}
                  scope={{ currencyScope }}
                />

              )}

              {displayTermFavourites && terms.length > 0 && (

                <FavoritesContainer
                  favType={favorites.TERM}
                  favList={terms}
                  selectedBroker={pane}
                  onClose={onTermRemove}
                  onClick={onTermClick}
                  orderChanged={onOrderChanged}
                  scope={{ termScope }}
                />

              )}

              {displayExecutionVenueFavourites && executionVenues.length > 0 && (

                <FavoritesContainer
                  favType={favorites.EXECUTION_VENUE}
                  favList={executionVenues}
                  selectedBroker={pane}
                  onClose={onExecutionVenueRemove}
                  onClick={onExecutionVenueClick}
                  orderChanged={onOrderChanged}
                  scope={{ executionVenueScope }}
                />

              )}
            </Button.Group>
          </Tabs.TabPane>
        );
      },
    )}
  </DraggableTabs>
);

BrokersTab.defaultProps = {
  selectedPreferenceFirm: null,
};

BrokersTab.propTypes = {
  activeTabKey: PropTypes.string.isRequired,
  panes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClientTraderClick: PropTypes.func.isRequired,
  onClientTraderRemove: PropTypes.func.isRequired,
  onCurrencyRemove: PropTypes.func.isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
  onTermRemove: PropTypes.func.isRequired,
  onTermClick: PropTypes.func.isRequired,
  onOrderChanged: PropTypes.func.isRequired,
  tabOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  onExecutionVenueRemove: PropTypes.func.isRequired,
  onExecutionVenueClick: PropTypes.func.isRequired,
  currencyScope: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedPreferenceFirm: PropTypes.string,
};

export default BrokersTab;
