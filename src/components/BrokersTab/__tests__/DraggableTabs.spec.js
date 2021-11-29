import {
  render, fireEvent, waitFor, getByText,
} from 'test-utils/testUtils';
import { act } from 'react-dom/test-utils';
import { DndProvider } from 'react-dnd';
import { TestBackend } from 'react-dnd-test-backend';

import { Tabs } from 'antd';
import DraggableTabs from '../DraggableTabs';

const defaultProps = {
  hideAdd: true,
  onChange: jest.fn(),
  type: 'editable-card',
  onEdit: jest.fn(),
  orderChanged: jest.fn(),
  tabOrder: [],
  activeKey: '1',
};

describe('<DraggableTabs/>', () => {
  test('renders snapshot as expected', async () => {
    const { container } = render(
      <DndProvider backend={TestBackend}>
        <DraggableTabs {...defaultProps}>
          <Tabs.TabPane key="t1" tab="Tab1"><div>Tab 1</div></Tabs.TabPane>
          <Tabs.TabPane key="t2" tab="Tab2"><div>Tab 2</div></Tabs.TabPane>
        </DraggableTabs>
      </DndProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  test.skip('Drag and drop', async () => {
    act(() => {
      render(
        <DndProvider backend={TestBackend}>
          <DraggableTabs {...defaultProps}>
            <Tabs.TabPane key="t1" tab="Tab1"><div>Tab 1</div></Tabs.TabPane>
            <Tabs.TabPane key="t2" tab="Tab2"><div>Tab 2</div></Tabs.TabPane>
          </DraggableTabs>
        </DndProvider>,
      );
    });

    const dragSource = await waitFor(() => getByText(document.body, 'Tab1'));
    const dropTarget = await waitFor(() => getByText(document.body, 'Tab2'));

    fireEvent.dragStart(dragSource);
    fireEvent.dragOver(dropTarget);
    fireEvent.drop(dropTarget);
    fireEvent.dragEnd(dragSource);

    expect(defaultProps.orderChanged).toHaveBeenCalled();
  });
});
