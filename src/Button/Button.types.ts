import type { ReactNode, MouseEvent } from 'react';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> {
  /** Conteúdo do botão */
  children: ReactNode;
  /** Variante visual */
  variant?: ButtonVariant;
  /** Cor do botão */
  color?: ButtonColor;
  /** Tamanho */
  size?: ButtonSize;
  /** Desabilitado */
  disabled?: boolean;
  /** Botão de largura total */
  fullWidth?: boolean;
  /** Callback de clique */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
