import React, { useState } from 'react';
import { RenderCounter } from './RenderCounter';

// Componente lento simulado
const VerySlowComponent = () => {
  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#fff7e6', 
      borderRadius: '6px',
      border: '1px solid #ffd591',
      margin: '10px 0'
    }}>
      <h5 style={{ color: 'black', margin: '0 0 10px 0' }}>🦥 Componente Lento</h5>
      <p style={{ color: 'black', margin: 0, fontSize: '14px' }}>
        Este componente simula un componente pesado que no debería re-renderizarse 
        cuando cambia el estado del modal.
      </p>
      <RenderCounter name="VerySlowComponent" />
    </div>
  );
};

// Otro componente
const OtherStuff = () => {
  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#f0f5ff', 
      borderRadius: '6px',
      border: '1px solid #adc6ff',
      margin: '10px 0'
    }}>
      <h5 style={{ color: 'black', margin: '0 0 10px 0' }}>📦 Otros Componentes</h5>
      <p style={{ color: 'black', margin: 0, fontSize: '14px' }}>
        Este componente tampoco debería re-renderizarse cuando cambia el estado del modal.
      </p>
      <RenderCounter name="OtherStuff" />
    </div>
  );
};

// Componente para demostrar mover estado hacia abajo
export const ButtonWithModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ 
      border: '1px solid #d9d9d9', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: 'white',
      marginTop: '20px'
    }}>
      <h4 style={{ color: 'black' }}>Estado Movido Hacia Abajo</h4>
      <p style={{ color: 'black' }}>El estado del modal ahora está en este componente específico.</p>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <button 
            onClick={() => setIsOpen(true)}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#1890ff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              width: '100%'
            }}
          >
            Abrir Modal
          </button>
          
          {isOpen && (
            <div style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}>
              <div style={{ 
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                minWidth: '300px'
              }}>
                <h3 style={{ color: 'black' }}>Modal</h3>
                <p style={{ color: 'black' }}>Este modal solo afecta a este componente.</p>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#ff4d4f', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px' 
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
          
          <RenderCounter name="ButtonWithModal" />
        </div>
        
        <div style={{ flex: 1 }}>
          <VerySlowComponent />
          <OtherStuff />
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#f6ffed', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #b7eb8f',
        marginTop: '20px'
      }}>
        <h5 style={{ margin: '0 0 10px 0', color: 'black' }}>✅ Beneficios Demostrados</h5>
        <ul style={{ margin: 0, color: 'black', fontSize: '14px' }}>
          <li><strong>ButtonWithModal</strong> se re-renderiza cuando cambia el estado del modal</li>
          <li><strong>VerySlowComponent</strong> NO se re-renderiza (contador permanece igual)</li>
          <li><strong>OtherStuff</strong> NO se re-renderiza (contador permanece igual)</li>
          <li>Los componentes pesados permanecen estables y mantienen su performance</li>
        </ul>
      </div>
    </div>
  );
};
