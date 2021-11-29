import { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { BgColorsOutlined, EditOutlined } from '@ant-design/icons';
import {
  Tag, Menu, Dropdown,
} from 'antd';
import {
  favorites, favouritesColours, executionVenueColours,
} from '../../utils/constants';

const style = {
  display: 'inline-block',
  cursor: 'move',
};
const ItemTypes = {
  DraggableTag: 'DraggableTag',
};

const DraggableTag = ({
  id, text, moveTag, favItem, favType, selectedBroker, onClose, onClick, dropEnded, openRenamePopUp,
  openColourPopUp, isInScope, canDrag, settings,
}) => {
  const ref = useRef(null);

  const [{ isDragging }, connectDrag] = useDrag({
    type: ItemTypes.DraggableTag,
    item: { id, favType },
    canDrag,
    collect: (monitor) => {
      const result = {
        isDragging: monitor.isDragging(),
      };
      return result;
    },
    end() {
      dropEnded();
    },
  });

  const [{ isOverAnother }, connectDrop] = useDrop({
    accept: ItemTypes.DraggableTag,
    collect: (monitor) => {
      const result = {
        isOverAnother: monitor.canDrop() && monitor.isOver({ shallow: true }),
      };
      return result;
    },
    hover({ id: draggedId, favType: draggedFavType }) {
      if (draggedId !== id && favType === draggedFavType) {
        moveTag(draggedId, id);
      }
    },
  });

  connectDrag(ref);
  connectDrop(ref);
  const opacity = isDragging && isOverAnother ? 0 : 1;
  const containerStyle = useMemo(() => ({ ...style, opacity }), [opacity]);

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => openRenamePopUp(favItem)}>
        <EditOutlined />
        <span>Rename</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => openColourPopUp(favItem)}>
        <BgColorsOutlined />
        <span>Edit Colour</span>
      </Menu.Item>
    </Menu>
  );

  const setStyle = (item, isClientTrader) => {
    if (!isInScope(item)) {
      return {
        backgroundColor: '#000000',
        borderColor: '#000000',
        opacity: '0.2',
        cursor: 'not-allowed',
      };
    }

    if (isClientTrader) {
      const colour = favouritesColours.find((element) => element.ID === Number(favItem.backgroundColour));
      if (colour && colour.VALUE) {
        return { backgroundColor: colour.VALUE, borderColor: colour.VALUE };
      }
    } else if (favType === favorites.EXECUTION_VENUE && settings.displayExecutionVenueColours === true) {
      const colour = executionVenueColours.find((element) => element.executionVenue === favItem.executionVenue);
      if (colour && colour.VALUE) {
        return { backgroundColor: colour.VALUE, borderColor: colour.VALUE };
      }
    }

    return { backgroundColor: favouritesColours[0].VALUE, borderColor: favouritesColours[0].VALUE };
  };

  /**
   * Render the favourites tag depending on the favType
   */
  const renderFavouritesTag = () => {
    if (favType === favorites.CLIENT_TRADER && isInScope(favItem)) {
      return (
        <Dropdown overlay={menu} trigger={['contextMenu']}>
          <Tag
            closable
            onClose={(event) => onClose(event)(favItem, [selectedBroker.deskId, selectedBroker.brokerId])}
            onClick={() => onClick(favItem, [selectedBroker.deskId, selectedBroker.brokerId])}
            style={setStyle(favItem, true)}
          >
            {text}
          </Tag>
        </Dropdown>
      );
    }

    if (favType === favorites.FIRMS) {
      return (
        <Tag
          onClick={() => onClick(favItem, [selectedBroker.deskId, selectedBroker.brokerId])}
          className={`firms-tag${favItem.isActive ? ' active' : ''}`}
        >
          {text}
        </Tag>
      );
    }

    return (
      <Tag
        closable
        onClose={(event) => onClose(event)(favItem, [selectedBroker.deskId, selectedBroker.brokerId])}
        onClick={() => onClick(favItem, [selectedBroker.deskId, selectedBroker.brokerId])}
        style={setStyle(favItem, false)}
      >
        {text}
      </Tag>
    );
  };

  return (
    <div ref={ref} style={containerStyle}>
      { renderFavouritesTag() }
    </div>
  );
};

DraggableTag.defaultProps = {
  openRenamePopUp: () => {},
  openColourPopUp: () => {},
  backgroundColour: '1',
};

DraggableTag.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  backgroundColour: PropTypes.string,
  favItem: PropTypes.shape().isRequired,
  selectedBroker: PropTypes.shape().isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  dropEnded: PropTypes.func.isRequired,
  moveTag: PropTypes.func.isRequired,
  favType: PropTypes.string.isRequired,
  openRenamePopUp: PropTypes.func,
  openColourPopUp: PropTypes.func,
  isInScope: PropTypes.func.isRequired,
  canDrag: PropTypes.bool.isRequired,
  settings: PropTypes.shape().isRequired,
};
export default DraggableTag;
