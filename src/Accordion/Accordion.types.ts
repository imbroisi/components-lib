import type { ReactNode, ChangeEvent } from 'react';

export interface AccordionProps {
  /** Título do acordeão (cabeçalho clicável) */
  title: ReactNode;
  /** Conteúdo exibido quando expandido */
  children: ReactNode;
  /** Controla se está expandido (modo controlado). Use com onChange para abrir/fechar externamente. */
  expanded?: boolean;
  /** Expansão inicial (modo não controlado) */
  defaultExpanded?: boolean;
  /** Callback quando a expansão muda */
  onChange?: (event: ChangeEvent<{}>, expanded: boolean) => void;
  /** Desabilita o acordeão */
  disabled?: boolean;
}
