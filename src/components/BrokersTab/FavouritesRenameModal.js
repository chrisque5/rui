import { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as uiActions from '../../actions/uiActions';
import * as userActions from '../../actions/userActions';
import * as notification from '../../utils/notifications';

class FavouritesRenameModal extends Component {
    onValueChange = (e) => {
      this.valueChanged = true;
      this.setState({
        nickName: e.target.value,
      });
    };

    handleSave = () => {
      if (!this.valueChanged) {
        this.closePopup();
      } else if (!this.state.nickName || this.state.nickName.trim() === '') {
        notification.showErrorNotification('Validation Error', 'Blank name cannot be saved');
      } else {
        const favoriteItem = _.clone(this.props.selectedFavItem);
        favoriteItem.nickName = this.state.nickName.trim();
        this.props.userActions.editClientTraderPreference(
          this.props.selectedPreferenceBroker, favoriteItem,
        );
        this.closePopup(this.props.selectedFavItem);
      }
    };

    closePopup = () => {
      this.props.uiActions.toggleRenameFavoritesPopup(this.props.selectedFavItem);
      this.valueChanged = false;
    };

    handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        this.handleSave();
      }
    };

    render() {
      return (
        <Modal
          visible={this.props.visible}
          title="Rename Client/Trader"
          onCancel={this.closePopup}
          okText="Save"
          onOk={this.handleSave}
          bodyStyle={{ padding: 10 }}
          closable
          width={200}
          destroyOnClose
        >
          <div style={{ display: 'inline-flex' }}>
            <span style={{ marginRight: '10px' }}>Client/Trader: </span>
            <div>
              <Input
                size="small"
                name="editFav"
                data-testid="editFav"
                defaultValue={this.props.selectedFavItem ? this.props.selectedFavItem.nickName : ''}
                autoFocus
                onChange={this.onValueChange}
                onKeyDown={(event) => this.handleKeyDown(event)}
                maxLength={50}
              />
            </div>
          </div>
        </Modal>
      );
    }
}

const mapStateToProps = ({ ui }) => ({
  visible: ui.isFavRenamePopupVisible,
  selectedFavItem: ui.selectedFavItem,
  selectedPreferenceBroker: ui.selectedPreferenceBroker,
});

FavouritesRenameModal.propTypes = {
  selectedFavItem: PropTypes.shape().isRequired,
  uiActions: PropTypes.shape().isRequired,
  userActions: PropTypes.shape().isRequired,
  visible: PropTypes.bool.isRequired,
  selectedPreferenceBroker: PropTypes.string.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(FavouritesRenameModal);
