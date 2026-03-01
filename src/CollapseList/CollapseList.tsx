import type { CSSProperties, ReactNode } from 'react';
import MuiCollapse from '@mui/material/Collapse';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useState, useRef, useEffect, useCallback } from 'react';
import './CollapseList.css';

export type CollapseListOrientation = 'vertical' | 'horizontal';

export interface CollapseListProps {
  list: { name: string; label: string | ReactNode }[];
  value: string | null;
  onSelect: (name: string) => void;
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  background?: string;
  hoverBackground?: string;
  selectedBackground?: string;
  focusBackground?: string;
  labelColor?: string;
}

/**
 * CollapseList based on MUI Collapse.
 * Shows or hides content with animation. Use the `open` prop to control.
 * Use onClose: click outside the wrapper (trigger + list) triggers onClose. The trigger is passed as children.
 * On open, focus goes to the selected item. Arrow keys navigate; Enter selects the focused item.
 * If the background prop is not passed, the dropdown background and width are inherited from the previous sibling in the DOM.
 */
export function CollapseList({
  list,
  value,
  onSelect,
  open,
  children,
  onClose,
  background,
  hoverBackground,
  selectedBackground,
  focusBackground,
  labelColor,
}: CollapseListProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
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
  }, [background, open]);

  // handle mouse down outside the component to close the list (wrapper = trigger + list)
  useEffect(() => {
    if (!open || !onClose) return;
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapperRef.current?.contains(target)) return;
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
  const valueStyle: React.CSSProperties & Record<string, string> = {};

  if (background !== undefined) valueStyle.backgroundColor = background;
  else if (inheritedBackground) valueStyle.backgroundColor = inheritedBackground;
  if (inheritedWidth) valueStyle.width = inheritedWidth;
  if (hoverBackground !== undefined) valueStyle['--collapse-list-hover-bg'] = hoverBackground;
  if (selectedBackground !== undefined) valueStyle['--collapse-list-selected-bg'] = selectedBackground;
  if (focusBackground !== undefined) valueStyle['--collapse-list-focus-bg'] = focusBackground;

  return (
    <div ref={wrapperRef} className="CollapseList-wrapper">
      {children}
      <div ref={rootRef} className="CollapseList-root">
        <div ref={listRef} className="CollapseList-value" style={valueStyle}>
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
                      <span className="CollapseList-label" style={{ color: labelColor || 'white' }}>
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
    </div>
  );
}
