import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import type { AccordionProps } from './Accordion.types';

const defaultExpandIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </svg>
);

/**
 * Acordeão baseado no MUI Accordion.
 * Use a prop `expanded` com `onChange` para controlar abertura/fechamento (ex.: por um botão).
 */
export function Accordion({
  title,
  children,
  expanded,
  defaultExpanded = false,
  onChange,
  disabled = false,
}: AccordionProps) {
  return (
    <MuiAccordion
      expanded={expanded}
      defaultExpanded={defaultExpanded}
      onChange={onChange}
      disabled={disabled}
      sx={{ display: expanded ? 'block' : 'none' }}
    >
      <MuiAccordionSummary expandIcon={defaultExpandIcon} sx={{ display: 'none' }}>
        {title}
      </MuiAccordionSummary>
      <MuiAccordionDetails>{children}</MuiAccordionDetails>
    </MuiAccordion>
  );
}
