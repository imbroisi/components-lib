import React from 'react';
import MuiButton from '@mui/material/Button';
import type { ButtonProps } from './Button.types';

/**
 * Botão baseado no MUI Button com API simplificada para a biblioteca.
 */
export function Button({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </MuiButton>
  );
}
