/* eslint max-classes-per-file: ["error", 2] */
/* eslint-disable react/no-multi-comp */
import { Tabs } from 'antd';
import { DragSource, DropTarget } from 'react-dnd';
import { Component, Children } from 'react';
import PropTypes from 'prop-types';

class TabNode extends Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      children,
    } = this.props;

    return connectDragSource(
      connectDropTarget(children),
    );
  }
}

const cardTarget = {
  drop(props, monitor) {
    const dragKey = monitor.getItem().index;
    const hoverKey = props.index;

    if (dragKey === hoverKey) {
      return;
    }

    props.moveTabNode(dragKey, hoverKey);
    // eslint-disable-next-line no-param-reassign
    monitor.getItem().index = hoverKey;
  },
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const WrapTabNode = DropTarget(
  'DND_NODE',
  cardTarget,
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    'DND_NODE',
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(TabNode),
);

class DraggableTabs extends Component {
  moveTabNode = (dragKey, hoverKey) => {
    const newOrder = this.props.tabOrder.slice();
    const { children } = this.props;

    Children.forEach(children, (c) => {
      if (newOrder.indexOf(c.key) === -1) {
        newOrder.push(c.key);
      }
    });

    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);

    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragKey);
    this.props.orderChanged(newOrder);
  }

  renderTabBar = (props, DefaultTabBar) => (
    <DefaultTabBar {...props}>
      {(node) => (
        <WrapTabNode
          key={node.key}
          index={node.key}
          moveTabNode={this.moveTabNode}
        >
          {node}
        </WrapTabNode>
      )}
    </DefaultTabBar>
  );

  render() {
    const order = this.props.tabOrder;
    const { children } = this.props;

    const tabs = [];
    Children.forEach(children, (c) => {
      tabs.push(c);
    });

    const orderTabs = tabs.slice().sort((a, b) => {
      const orderA = order.indexOf(a.key);
      const orderB = order.indexOf(b.key);

      if (orderA !== -1 && orderB !== -1) {
        return orderA - orderB;
      }
      if (orderA !== -1) {
        return -1;
      }
      if (orderB !== -1) {
        return 1;
      }

      const ia = tabs.indexOf(a);
      const ib = tabs.indexOf(b);

      return ia - ib;
    });
    const { orderChanged, tabOrder, ...rest } = this.props;
    return (
      <Tabs
        renderTabBar={this.renderTabBar}
        {...rest}
      >
        {orderTabs}
      </Tabs>
    );
  }
}

export default DraggableTabs;

DraggableTabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  orderChanged: PropTypes.func.isRequired,
  tabOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TabNode.propTypes = {
  children: PropTypes.shape().isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};
