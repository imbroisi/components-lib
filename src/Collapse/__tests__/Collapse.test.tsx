/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Collapse } from '..';

describe('Collapse', () => {
  it('esconde o conteúdo quando in é false', () => {
    render(
      <Collapse in={false}>
        <span>Conteúdo oculto</span>
      </Collapse>
    );
    expect(screen.getByText('Conteúdo oculto')).toBeInTheDocument();
  });

  it('mostra o conteúdo quando in é true', () => {
    render(
      <Collapse in>
        <span>Conteúdo visível</span>
      </Collapse>
    );
    expect(screen.getByText('Conteúdo visível')).toBeInTheDocument();
  });

  it('renderiza children', () => {
    render(
      <Collapse in>
        <div data-testid="child">Filho</div>
      </Collapse>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Filho');
  });
});
