import type { CSSProperties, ReactNode } from 'react';
import MuiCollapse from '@mui/material/Collapse';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useState, useRef, useEffect, useCallback } from 'react';
import './CollapseList.scss';

export type CollapseListOrientation = 'vertical' | 'horizontal';

export interface CollapseListProps {
  list: { name: string; label: string | ReactNode }[];
  value: string | null;
  onSelect: (name: string) => void;
  open: boolean;
  onClose?: () => void;
  background?: string;
  labelColor?: string;
}

export function CollapseList({
  list,
  value,
  onSelect,
  open,
  onClose,
  background = 'blue',
  labelColor = '#ffffff',
}: CollapseListProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefsRef = useRef<(HTMLElement | null)[]>([]);

  // // get inherited background and width from the previous sibling
  // useEffect(() => {
  //   const prev = rootRef.current?.previousElementSibling as HTMLElement | null;
  //   if (!prev) return;
  //   const style = window.getComputedStyle(prev);
  //   if (background === undefined) {
  //     const bg = style.backgroundColor;
  //     setInheritedBackground(bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' ? bg : null);
  //   }
  //   const w = style.width;
  //   setInheritedWidth(w && w !== 'auto' ? w : null);
  // }, [background, open]);

  // handle mouse down outside the component to close the list
  useEffect(() => {
    if (!open || !onClose) return;
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const listEl = rootRef.current;
      const triggerContainer = listEl?.previousElementSibling as HTMLElement | null;

      // click inside the list -> ignore
      if (listEl && listEl.contains(target)) return;

      // click inside the trigger container (immediately above the list) -> ignore
      if (triggerContainer && triggerContainer.contains(target)) return;

      // click anywhere else -> close
      onClose();
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open, onClose]);

  // handle escape key to close the list
  useEffect(() => {
    if (!open || !onClose) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

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
      const nextKey = 'ArrowDown';
      const prevKey = 'ArrowUp';
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
    [list.length, list, onSelect],
  );

  // const handleListItemClick = (name: string) => {
  //   onSelect(name);
  // };

  // const itemHeightValue = typeof itemHeight === 'number' ? `${itemHeight}px` : itemHeight;
  // const valueStyle: React.CSSProperties & Record<string, string> = {};

  // if (background !== undefined) valueStyle.backgroundColor = background;

  return (
    <div ref={rootRef} className="CollapseList-root">
      <div
        ref={listRef}
        className="CollapseList-dropdown CollapseList-value"
        style={{ background }}
      >
        <MuiCollapse in={open} orientation="vertical" onEntered={focusSelectedOrFirst}>
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
                      <span className="CollapseList-label" style={{ color: labelColor }}>
                        {item.label}
                      </span>
                    }
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
