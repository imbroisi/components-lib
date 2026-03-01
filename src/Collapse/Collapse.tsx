import { forwardRef } from 'react';
import MuiCollapse from '@mui/material/Collapse';
import type { CollapseProps } from './Collapse.types';

/**
 * Collapse baseado no MUI Collapse.
 * Exibe ou esconde o conteúdo com animação. Use a prop `in` para controlar.
 */
export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  function Collapse(
    {
      children,
      in: inProp = false,
      orientation = 'vertical',
      timeout = 'auto',
      collapsedSize = '0px',
    },
    ref
  ) {
    return (
      <MuiCollapse
        ref={ref}
        in={inProp}
        orientation={orientation}
        timeout={timeout}
        collapsedSize={collapsedSize}
      >
        {children}
      </MuiCollapse>
    );
  }
);
