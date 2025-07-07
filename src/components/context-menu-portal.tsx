import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';

interface MenuItem {
  label: string;
  onClick: () => void;
  icon?: string;
}

interface ContextMenuProps {
  children: ReactNode;
  menuItems: MenuItem[];
}

export const ContextMenuPortal = ({ children, menuItems }: ContextMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleContextMenu = useCallback((e: ReactMouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    setPosition({ x: e.pageX, y: e.pageY });
  }, []);
  
  const handleClick = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);
  
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
  
  const menuStyle: CSSProperties = {
    position: 'absolute',
    top: position.y,
    left: position.x,
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    padding: '8px 0',
    minWidth: '150px',
    zIndex: 1000
  };
  
  const menuItemStyle: CSSProperties = {
    padding: '8px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.2s',
    color: '#333'
  };
  
  return (
    <div 
      onContextMenu={handleContextMenu}
      style={{ display: 'inline-block' }}
    >
      {children}
      {isOpen && createPortal(
        <div style={menuStyle}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={menuItemStyle}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
                setIsOpen(false);
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLDivElement).style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLDivElement).style.backgroundColor = 'transparent';
              }}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </div>
          ))}
        </div>,
        document.getElementById('portal-container')!
      )}
    </div>
  );
}; 