import { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Tooltip } from 'antd';
import {
  UserOutlined, DollarOutlined, CalendarOutlined, BookOutlined, BankOutlined,
} from '@ant-design/icons';
import * as uiActions from '../../actions/uiActions';
import DraggableTag from './DraggableTag';
import { isInScope } from '../../utils/scopeHelper';
import { favouritesIcons } from '../../utils/constants';

class FavoritesContainer extends Component {
  constructor(props) {
    super(props);
    if (this.props.favList) {
      this.state = this.buildFavData(this.props.favList);
    }
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.favList, prevProps.favList)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(this.buildFavData(this.props.favList));
    }
  }

  componentWillUnmount() {
    if (this.requestedFrame !== undefined) {
      cancelAnimationFrame(this.requestedFrame);
    }
  }

  buildFavData = (data) => {
    const favsById = {};
    const favsByIndex = [];
    for (let i = 0; i < data.length; i += 1) {
      const { nickName, tradingCustomerId } = data[i];
      const card = { id: i, text: `${nickName || tradingCustomerId}`, favItem: data[i] };

      favsById[card.id] = card;
      favsByIndex[i] = card;
    }
    return {
      favsById,
      favsByIndex,
    };
  }

  drawFrame = () => {
    const nextState = update(this.state, this.pendingUpdateFn);
    this.setState(nextState);
    this.pendingUpdateFn = undefined;
    this.requestedFrame = undefined;
  }

  moveTag = (id, afterId) => {
    const { favsById, favsByIndex } = this.state;
    const card = favsById[id];
    const afterCard = favsById[afterId];
    const cardIndex = favsByIndex.indexOf(card);
    const afterIndex = favsByIndex.indexOf(afterCard);
    if (card) {
      this.scheduleUpdate({
        favsByIndex: {
          $splice: [[cardIndex, 1], [afterIndex, 0, card]],
        },
      });
    }
  }

  scheduleUpdate = (updateFn) => {
    this.pendingUpdateFn = updateFn;
    if (!this.requestedFrame) {
      this.requestedFrame = requestAnimationFrame(this.drawFrame);
    }
  }

  dropEnded = () => {
    this.props.orderChanged(
      this.state.favsByIndex, [], this.props.favType, this.props.selectedBroker,
    );
  }

  openRenamePopUp = (favItem) => {
    this.props.uiActions.toggleRenameFavoritesPopup(favItem);
  };

  openColourPopUp = (favItem) => {
    this.props.uiActions.toggleChangeFavoritesColourPopup(favItem);
  };

  isInScope = (favItem) => {
    if (favItem && favItem.status) {
      if (favItem.status === 'DELETED' || favItem.status === 'UNAVAILABLE') {
        return false;
      }
    }

    return isInScope(favItem, this.props.scope, `${this.props.selectedBroker.deskId},${this.props.selectedBroker.brokerId}`);
  };

 panelIcon = (favType) => {
   const { icon = '' } = favouritesIcons.find((a) => a.text === favType);
   let iconType = '';
   switch (icon) {
     case 'user':
       iconType = <UserOutlined />;
       break;
     case 'dollar':
       iconType = <DollarOutlined />;
       break;
     case 'calendar':
       iconType = <CalendarOutlined />;
       break;
     case 'book':
       iconType = <BookOutlined />;
       break;
     case 'bank':
       iconType = <BankOutlined />;
       break;
     default:
       iconType = <BankOutlined />;
       break;
   }
   return (
     <Tooltip placement="right" mouseLeaveDelay={0} title={`${favType}s (to hide go to settings)`}>
       {iconType}
     </Tooltip>
   );
 }

 createFavorites() {
   const { favsByIndex } = this.state;

   const draggableTag = (favListItem) => (
     <DraggableTag
       key={favListItem.id}
       id={favListItem.id}
       text={favListItem.text}
       moveTag={this.moveTag}
       favItem={favListItem.favItem}
       selectedBroker={this.props.selectedBroker}
       onClose={this.props.onClose}
       onClick={this.props.onClick}
       dropEnded={this.dropEnded}
       favType={this.props.favType}
       openRenamePopUp={this.openRenamePopUp}
       openColourPopUp={this.openColourPopUp}
       isInScope={this.isInScope}
       backgroundColour={favListItem.backgroundColour}
       canDrag={this.props.canDrag}
       settings={this.props.preferences.settings}
     />
   );

   return (
     <div className="favorite-list">
       <div className="favourite">
         {this.props.favList && this.props.favList.length > 0 && this.panelIcon(this.props.favType)}
         <div>
           {favsByIndex && favsByIndex.map((favItem, index) => draggableTag(favItem, index))}
         </div>
       </div>

     </div>
   );
 }

 render() {
   return this.createFavorites();
 }
}

const mapDispatchToProps = (dispatch) => ({
  uiActions: bindActionCreators(uiActions, dispatch),
});

FavoritesContainer.defaultProps = {
  scope: {},
  canDrag: true,
};

FavoritesContainer.propTypes = {
  favType: PropTypes.string.isRequired,
  favList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedBroker: PropTypes.shape().isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  orderChanged: PropTypes.func.isRequired,
  scope: PropTypes.shape(),
  uiActions: PropTypes.shape().isRequired,
  canDrag: PropTypes.bool,
  preferences: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ user }) => ({
  preferences: user.preferences,
});
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
