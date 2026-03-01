import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CollapseList } from './CollapseList';
import { Button } from '../Button';

const LIST = [
  { name: 'google', label: <div style={{ color: 'red' }}>Google</div> },
  { name: 'mui', label: 'Material-UI' },
  { name: 'react', label: 'React' },
];

const meta: Meta<typeof CollapseList> = {
  title: 'Components/CollapseList',
  component: CollapseList,
  tags: ['autodocs'],
  argTypes: {
    list: {
      description: 'List of items. Each item: `{ name: string; label: string | ReactNode }`.',
      control: false,
    },
    value: {
      control: 'text',
      description: 'Name of the selected item. `string | null`.',
    },
    onSelect: {
      action: 'onSelect',
      description: 'Called when an item is selected (click or Enter/Space).',
    },
    open: {
      control: 'boolean',
      description: 'Set the state of CollapseList open/close.',
    },
    children: {
      description: 'Content just above the list. Click outside the wrapper triggers onClose.',
      control: false,
    },
    onClose: {
      action: 'onClose',
      description: 'Called when closing (click outside, Escape).',
    },
    background: { control: 'color', description: 'Dropdown background color.' },
    hoverBackground: { control: 'color', description: 'Item background color on hover.' },
    selectedBackground: { control: 'color', description: 'Selected item background color.' },
    focusBackground: { control: 'color', description: 'Focused item background color (keyboard).' },
    labelColor: { control: 'color', description: 'Label text color.' },
  },
};

export default meta;

type Story = StoryObj<typeof CollapseList>;

/**
 * CollapseList with trigger passed as children. Click outside the wrapper or press Escape to close the list.
 */
export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    return (
      <div style={{ backgroundColor: 'white', height: '200px' }}>
        <CollapseList
          value={selectedItem ?? null}
          open={open}
          list={LIST}
          onClose={() => setOpen(false)}
          onSelect={setSelectedItem}
        >


          <div
            style={{
              width: '100%',
              backgroundColor: 'orange',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <div>12345</div>
            <div>
              <Button
                variant="outlined"
                onClick={() => setOpen((prev) => !prev)}
                style={{ border: 0 }}
              >
                Click to open
              </Button>
            </div>
          </div>


        </CollapseList>


        ABCDEFGHIJKLMNOPQRSTUVWXYZ
      </div>
    );
  },
};
