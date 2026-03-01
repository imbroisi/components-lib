import MuiCollapse from '@mui/material/Collapse';
import type { CollapseListProps } from './CollapseList.types';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useState, useRef, useEffect, useCallback } from 'react';
import './CollapseList.css';

/**
 * CollapseList baseado no MUI Collapse.
 * Exibe ou esconde o conteúdo com animação. Use a prop `in` para controlar.
 * Use onClose + containerRef para fechar ao clicar fora (containerRef = ref do div que envolve o gatilho e a lista).
 * Ao abrir, o foco vai para o item selecionado. Setas do teclado navegam (pré-seleção); Enter seleciona o item em foco.
 * Se a prop background não for passada, o fundo do dropdown usa a cor do irmão anterior no DOM (elemento logo acima).
 * A largura do dropdown também é herdada do irmão anterior quando disponível.
 */
export function CollapseList({
  list,
  value,
  onSelect,
  in: inProp = false,
  orientation = 'vertical',
  background,
  hoverBackground,
  selectedBackground,
  focusBackground,
  labelColor,
  onClose,
  containerRef,
}: CollapseListProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefsRef = useRef<(HTMLElement | null)[]>([]);
  const [inheritedBackground, setInheritedBackground] = useState<string | null>(null);
  const [inheritedWidth, setInheritedWidth] = useState<string | null>(null);

  // get inherited background and width from the previous sibling
  useEffect(() => {
    const prev = rootRef.current?.previousElementSibling as HTMLElement | null;
    if (!prev) return;
    const style = window.getComputedStyle(prev);
    if (background === undefined) {
      const bg = style.backgroundColor;
      setInheritedBackground(bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' ? bg : null);
    }
    const w = style.width;
    setInheritedWidth(w && w !== 'auto' ? w : null);
  }, [background, inProp]);

  // handle mouse down outside the component to close the list
  useEffect(() => {
    if (!inProp || !onClose) return;

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (listRef.current?.contains(target)) return;
      const el = containerRef?.current ?? listRef.current;
      if (el && !el.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [inProp, onClose, containerRef]);

  // handle escape key to close the list
  useEffect(() => {
    if (!inProp || !onClose) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [inProp, onClose]);

  // focus the selected or first item when the list is opened
  const focusSelectedOrFirst = useCallback(() => {
    const index = value
      ? list.findIndex((i) => i.name === value)
      : 0;
    const targetIndex = index >= 0 ? index : 0;
    itemRefsRef.current[targetIndex]?.focus();
  }, [list, value]);

  // handle keyboard navigation in the list
  const handleListKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const isVertical = orientation === 'vertical';
      const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
      const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
      const currentIndex = itemRefsRef.current.findIndex(
        (r) => r && r === document.activeElement,
      );

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const idx = currentIndex >= 0 ? currentIndex : 0;
        const name = list[idx]?.name;
        if (name) onSelect(name);
        return;
      }

      if (event.key !== nextKey && event.key !== prevKey) return;

      event.preventDefault();
      const step = event.key === nextKey ? 1 : -1;
      const nextIndex =
        currentIndex < 0
          ? event.key === nextKey
            ? 0
            : list.length - 1
          : (currentIndex + step + list.length) % list.length;
      itemRefsRef.current[nextIndex]?.focus();
    },
    [orientation, list.length, list, onSelect],
  );

  // const handleListItemClick = (name: string) => {
  //   onSelect(name);
  // };

  // const itemHeightValue = typeof itemHeight === 'number' ? `${itemHeight}px` : itemHeight;
  const valueStyle: React.CSSProperties & Record<string, string> = {
    // ['--collapse-list-item-height' as string]: itemHeightValue,
  };

  if (background !== undefined) valueStyle.backgroundColor = background;
  else if (inheritedBackground) valueStyle.backgroundColor = inheritedBackground;
  if (inheritedWidth) valueStyle.width = inheritedWidth;
  if (hoverBackground !== undefined) valueStyle['--collapse-list-hover-bg'] = hoverBackground;
  if (selectedBackground !== undefined) valueStyle['--collapse-list-selected-bg'] = selectedBackground;
  if (focusBackground !== undefined) valueStyle['--collapse-list-focus-bg'] = focusBackground;

  return (
    <div ref={rootRef} className="CollapseList-root">
      <div ref={listRef} className="CollapseList-value"style={valueStyle}>
        <MuiCollapse in={inProp} orientation={orientation} onEntered={focusSelectedOrFirst}>
          <List component="nav" aria-label="main mailbox folders" onKeyDown={handleListKeyDown}>
            {
              list.map((item, index) => (
                <ListItemButton
                  key={item.name}
                  ref={(el) => { itemRefsRef.current[index] = el; }}
                  className="CollapseList-itemButton"
                  selected={value === item.name}
                  onClick={() => onSelect(item.name)}
                  disableRipple
                >
                  <ListItemText
                    primary={
                      <span className="CollapseList-label" style={{ color: labelColor || 'white' }}>
                        {item.label}
                      </span>}
                  />
                </ListItemButton>
              ))
            }
          </List>
        </MuiCollapse>
      </div>
    </div>
  );
}
