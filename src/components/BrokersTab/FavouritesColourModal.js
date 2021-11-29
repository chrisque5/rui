import { Component } from 'react';
import { Tag, Modal, Row } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as uiActions from '../../actions/uiActions';
import * as userActions from '../../actions/userActions';
import { favouritesColours as colours } from '../../utils/constants';

class FavouritesColourModal extends Component {
  onClick = (selectedColor) => {
    const favoriteItem = {
      ...this.props.selectedFavItem,
      backgroundColour: selectedColor,
    };

    this.props.userActions.editClientTraderPreference(
      this.props.selectedPreferenceBroker, favoriteItem,
    );
    this.closePopup();
  };

  closePopup = () => {
    if (this.props.visible) {
      this.props.uiActions.toggleChangeFavoritesColourPopup(this.props.selectedFavItem);
    }
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        title="Change Favourite Colour"
        onCancel={this.closePopup}
        bodyStyle={{ padding: 10 }}
        keyboard
        footer={null}
        closable
        destroyOnClose
      >
        <Row>
          <h4>Please choose a colour: </h4>
        </Row>
        <Row>
          {colours.map((colour) => (
            <Tag
              key={colour.ID}
              data-testid={`FavBtnColour${colour.ID}`}
              onClick={() => this.onClick(colour.ID)}
              color={colour.VALUE}
              className="colour-tag"
            >
              {colour.NAME}
            </Tag>
          ))}
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  visible: ui.isColourChangePopUpVisible,
  selectedFavItem: ui.selectedFavItem,
  selectedPreferenceBroker: ui.selectedPreferenceBroker,
});

const mapDispatchToProps = (dispatch) => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
});

FavouritesColourModal.defaultProps = {
  visible: false,
};

FavouritesColourModal.propTypes = {
  selectedFavItem: PropTypes.shape().isRequired,
  visible: PropTypes.bool,
  uiActions: PropTypes.shape().isRequired,
  userActions: PropTypes.shape().isRequired,
  selectedPreferenceBroker: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesColourModal);
