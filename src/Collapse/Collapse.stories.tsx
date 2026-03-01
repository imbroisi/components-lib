import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Collapse } from './Collapse';
import { Button } from '../Button';

const LINKS = [
  { id: 1, label: 'Google', href: 'https://www.google.com' },
  { id: 2, label: 'Material-UI', href: 'https://mui.com' },
  { id: 3, label: 'React', href: 'https://react.dev' },
];

const meta: Meta<typeof Collapse> = {
  title: 'Components/Collapse',
  component: Collapse,
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

type Story = StoryObj<typeof Collapse>;

export const Default: Story = {
  args: {
    in: true,
    children: (
      <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 4 }}>
        Conteúdo do Collapse. Altere a prop &quot;in&quot; nos controles para
        expandir/recolher.
      </div>
    ),
  },
};

export const Recolhido: Story = {
  args: {
    in: false,
    children: (
      <div style={{ padding: 16, background: '#f5f5f5' }}>
        Este conteúdo está recolhido (in=false).
      </div>
    ),
  },
};

/**
 * Collapse controlado por um botão usando a prop `in`.
 */
export const AbrirFecharPorBotao: Story = {
  render: function AbrirFecharPorBotaoStory() {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button variant="outlined" onClick={() => setOpen((prev) => !prev)}>
            {open ? 'Recolher' : 'Expandir'}
          </Button>
        </div>
        <Collapse in={open}>
          <div
            style={{
              padding: 16,
              background: '#e3f2fd',
              borderRadius: 4,
              border: '1px solid #90caf9',
            }}
          >
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {LINKS.map((link) => (
                <li key={link.id} style={{ marginBottom: 4 }}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1976d2' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Collapse>
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
          <Collapse in={open} orientation="horizontal" timeout={300}>
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
          </Collapse>
        </div>
      </div>
    );
  },
};
