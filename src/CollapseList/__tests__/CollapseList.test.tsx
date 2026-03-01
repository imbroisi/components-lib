/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CollapseList } from '..';

describe('CollapseList', () => {
  it('esconde o conteúdo quando in é false', () => {
    render(
      <CollapseList in={false}>
        <span>Conteúdo oculto</span>
      </CollapseList>
    );
    expect(screen.getByText('Conteúdo oculto')).toBeInTheDocument();
  });

  it('mostra o conteúdo quando in é true', () => {
    render(
      <CollapseList in>
        <span>Conteúdo visível</span>
      </CollapseList>
    );
    expect(screen.getByText('Conteúdo visível')).toBeInTheDocument();
  });

  it('renderiza children', () => {
    render(
      <CollapseList in>
        <div data-testid="child">Filho</div>
      </CollapseList>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Filho');
  });
});
