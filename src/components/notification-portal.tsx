import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPortal = ({ 
  message, 
  type = 'info', 
  duration = 3000, 
  isOpen, 
  onClose 
}: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  
  useEffect(() => {
    setIsVisible(isOpen);
    
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Delay to allow animation to complete
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);
  
  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#3b82f6';
    }
  };
  
  const notificationStyle: CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: getBackgroundColor(),
    color: 'white',
    padding: '12px 16px',
    borderRadius: '4px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
    maxWidth: '300px',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    zIndex: 1100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };
  
  if (!isOpen && !isVisible) return null;
  
  return createPortal(
    <div style={notificationStyle}>
      <span>{message}</span>
      <button 
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          marginLeft: '10px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          padding: '0 5px'
        }}
      >
        ×
      </button>
    </div>,
    document.getElementById('portal-container')!
  );
}; 