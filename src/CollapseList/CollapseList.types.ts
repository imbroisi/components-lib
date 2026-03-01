import type { ReactNode, RefObject } from 'react';

export type CollapseListOrientation = 'vertical' | 'horizontal';

export interface CollapseListProps {
  /** Se true, o conteúdo está visível (expandido); se false, recolhido */
  in?: boolean;
  /** Orientação da transição */
  orientation?: CollapseListOrientation;
  /** Duração da transição em ms, ou 'auto' para calcular pela altura */
  timeout?: 'auto' | number | { enter?: number; exit?: number };
  /** Altura (vertical) ou largura (horizontal) quando recolhido */
  collapsedSize?: number | string;

  /** Altura de cada item da lista (ex.: 48 para 48px ou '40px') */
  itemHeight?: number | string;

  /** Cor ou valor CSS do fundo do dropdown (ex.: '#fff', 'white', 'transparent') */
  background?: string;

  /** Cor ou valor CSS do fundo no hover do item (ex.: 'rgba(0,0,0,0.04)', '#f5f5f5') */
  hoverBackground?: string;

  /** Cor ou valor CSS do fundo do item selecionado (ex.: 'rgba(0,0,0,0.08)', '#e3f2fd') */
  selectedBackground?: string;

  /** Cor ou valor CSS do fundo ao navegar com setas do teclado (item em foco) */
  focusBackground?: string;

  /** Cor ou valor CSS da cor do texto do item.label no CollapseList */
  labelColor?: string;

  /** Lista de itens com nome e label (ex.: [{ name: 'google', label: 'Google' }]) */
  list: {
    name: string;
    label: string;
  }[];

  /** Chamado quando há clique fora do componente (para fechar). Use com containerRef para incluir o gatilho (ex.: containerRef={containerRef}) e fechar ao clicar fora do container. */
  onClose?: () => void;
  /** Ref do container que inclui o gatilho e a lista. Se passado, clique fora deste container dispara onClose. */
  containerRef?: RefObject<HTMLElement | null>;

  /** Valor selecionado (ex.: 'google') */
  value: string | null;

  /** Chamado quando um item é selecionado (ex.: setSelectedItem('google')) ou fechado (ex.: setOpen(false)) */
  onSelect: (name: string) => void;
}
