import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'Variante visual do botão',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'],
      description: 'Cor do botão',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Botão ocupa toda a largura',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Botão',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined',
    variant: 'outlined',
    color: 'primary',
  },
};

export const Text: Story = {
  args: {
    children: 'Text',
    variant: 'text',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'contained',
    color: 'secondary',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'small',
    variant: 'contained',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'large',
    variant: 'contained',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    variant: 'contained',
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width',
    fullWidth: true,
    variant: 'contained',
  },
};

export const WithClick: Story = {
  args: {
    children: 'Clique me',
    variant: 'contained',
    onClick: () => alert('Clicado!'),
  },
};
