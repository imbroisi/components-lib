/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '..';

describe('Button', () => {
  it('renderiza o texto passado como children', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument();
  });

  it('chama onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('não chama onClick quando disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Clique
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('aplica variant contained por padrão', () => {
    render(<Button>Botão</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-contained');
  });

  it('aplica variant outlined quando informado', () => {
    render(<Button variant="outlined">Botão</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-outlined');
  });

  it('aplica size small quando informado', () => {
    render(<Button size="small">Botão</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-sizeSmall');
  });

  it('está disabled quando prop disabled é true', () => {
    render(<Button disabled>Botão</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
