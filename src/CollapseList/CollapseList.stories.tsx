import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef } from 'react';
import { CollapseList } from './CollapseList';
import { Button } from '../Button';

const LIST = [
  { name: 'google', label: 'Google' },
  { name: "mui", label: 'Material-UI' },
  { name: "react", label: 'React' },
];

const meta: Meta<typeof CollapseList> = {
  title: 'Components/CollapseList',
  component: CollapseList,
  tags: ['autodocs'],
  argTypes: {
    in: {
      control: 'boolean',
      description: 'Se true, o conteúdo está expandido/visível',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Direção da transição',
    },
    timeout: {
      control: 'select',
      options: ['auto', 300, 500, 1000],
      description: 'Duração da animação (ms ou "auto")',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CollapseList>;

export const Default: Story = {
  args: {
    in: true,
    list: LIST,
  },
};

export const Recolhido: Story = {
  args: {
    in: false,
    list: LIST,
  },
};

/**
 * CollapseList controlado por um botão usando a prop `in`.
 */
export const AbrirFecharPorBotao: Story = {
  render: function AbrirFecharPorBotaoStory() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div style={{ backgroundColor: 'pink', height: '120vh' }}>
        <div>
          <div ref={containerRef} style={{ width: '100%', backgroundColor: 'orange', color: 'white', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0' }}>
            <div>
              12345
            </div>
            <div>
              <Button
                variant="outlined"
                onClick={() => setOpen((prev) => !prev)} style={{ border: 0 }}>
                ABCD
              </Button>
            </div>
          </div>

          <CollapseList
            value={selectedItem ?? null}
            in={open}
            list={LIST}
            onClose={() => setOpen(false)}
            containerRef={containerRef}
            onSelect={setSelectedItem}
          />

        </div>

        ABCDEFGHIJKLMNOPQRSTUVWXYZ
      </div>
    );
  },
};

export const Horizontal: Story = {
  render: function HorizontalStory() {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button
          variant="outlined"
          onClick={() => setOpen((prev) => !prev)}
          style={{ marginBottom: 8 }}
        >
          {open ? 'Recolher' : 'Expandir'} horizontal
        </Button>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <CollapseList in={open} orientation="horizontal">
            <div
              style={{
                padding: 12,
                background: '#f3e5f5',
                borderRadius: 4,
                whiteSpace: 'nowrap',
              }}
            >
              Conteúdo em collapse horizontal
            </div>
          </CollapseList>
        </div>
      </div>
    );
  },
};
