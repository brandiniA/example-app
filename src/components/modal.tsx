import { createPortal } from 'react-dom';
import type { ReactNode, CSSProperties, MouseEvent } from 'react';

interface ModalProps {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  overlayStyle?: CSSProperties;
  containerStyle?: CSSProperties;
}

export const Modal = ({ open, children, onClose, overlayStyle = {}, containerStyle = {} }: ModalProps) => {
  if (!open) return null;
  
  const defaultOverlayStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    ...overlayStyle
  };
  
  const defaultContainerStyle: CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: 'black',
    ...containerStyle
  };
  
  // Cierra el modal cuando se hace clic en el overlay
  const handleOverlayClick = (e: MouseEvent) => {
    // Solo ejecuta onClose si está definido y si el clic fue directamente en el overlay
    if (onClose && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Evita que los clics dentro del contenido del modal se propaguen al overlay
  const handleContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };
  
  return createPortal(
    <div 
      style={defaultOverlayStyle}
      onClick={handleOverlayClick}
    >
      <div 
        style={defaultContainerStyle}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>,
    document.getElementById('portal-container')!
  );
}; 