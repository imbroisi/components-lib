import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Accordion } from './Accordion';
import { Button } from '../Button';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do acordeão',
    },
    expanded: {
      control: false,
      description: 'Controla se está aberto (use com onChange para controle externo)',
    },
    onChange: {
      action: 'onChange',
      description: 'Chamado quando o usuário abre/fecha',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Aberto por padrão',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o acordeão',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: 'Seção 1',
    children: 'Conteúdo do acordeão. Clique no título para expandir ou recolher.',
  },
};

export const DefaultExpanded: Story = {
  args: {
    title: 'Aberto por padrão',
    defaultExpanded: true,
    children: 'Este acordeão começa expandido.',
  },
};

/**
 * Acordeão controlado por um botão: use a prop `expanded` com `onChange`
 * para abrir/fechar pelo botão.
 */
export const AbrirFecharPorBotao: Story = {
  render: function AbrirFecharPorBotaoStory() {
    const [expanded, setExpanded] = useState(false);
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            variant="outlined"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? 'Fechar acordeão' : 'Abrir acordeão'}
          </Button>
        </div>
        <Accordion
          title="Abrir/fechar pelo botão acima"
          expanded={expanded}
          onChange={(_, isExpanded) => setExpanded(isExpanded)}
        >
          Conteúdo do acordeão. Você pode abrir e fechar clicando no título ou
          no botão acima.
        </Accordion>
      </div>
    );
  },
};
