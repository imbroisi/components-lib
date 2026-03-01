import type { ReactNode } from 'react';

export type CollapseOrientation = 'vertical' | 'horizontal';

export interface CollapseProps {
  /** Conteúdo exibido quando expandido */
  children: ReactNode;
  /** Se true, o conteúdo está visível (expandido); se false, recolhido */
  in?: boolean;
  /** Orientação da transição */
  orientation?: CollapseOrientation;
  /** Duração da transição em ms, ou 'auto' para calcular pela altura */
  timeout?: 'auto' | number | { enter?: number; exit?: number };
  /** Altura (vertical) ou largura (horizontal) quando recolhido */
  collapsedSize?: number | string;
}
