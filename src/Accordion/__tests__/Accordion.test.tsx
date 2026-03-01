/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '..';

describe('Accordion', () => {
  it('renderiza o título', () => {
    render(
      <Accordion title="Seção 1">
        <p>Conteúdo</p>
      </Accordion>
    );
    expect(screen.getByText('Seção 1')).toBeInTheDocument();
  });

  it('expande ao clicar no título', () => {
    render(
      <Accordion title="Clique para expandir">
        <p>Conteúdo expandido</p>
      </Accordion>
    );
    fireEvent.click(screen.getByText('Clique para expandir'));
    expect(screen.getByText('Conteúdo expandido')).toBeVisible();
  });

  it('chama onChange quando a expansão muda', () => {
    const handleChange = jest.fn();
    render(
      <Accordion title="Seção" onChange={handleChange}>
        Conteúdo
      </Accordion>
    );
    fireEvent.click(screen.getByText('Seção'));
    expect(handleChange).toHaveBeenCalledWith(expect.anything(), true);
  });
});
