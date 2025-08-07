import React, { useState } from 'react';
import { RenderCounter } from './RenderCounter';

// Componente encapsulado con su propio estado
const EncapsulatedModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ 
      border: '1px solid #52c41a', 
      borderRadius: '6px', 
      padding: '15px',
      backgroundColor: '#f6ffed'
    }}>
      <h5 style={{ color: 'black', margin: '0 0 10px 0' }}>✅ Modal Encapsulado</h5>
      <button 
        onClick={() => setIsOpen(true)}
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#52c41a', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          marginBottom: '10px'
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
            <h3 style={{ color: 'black' }}>Modal Encapsulado</h3>
            <p style={{ color: 'black' }}>Este modal solo afecta a su propio componente.</p>
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
      
      <RenderCounter name="EncapsulatedModal" />
    </div>
  );
};

const VerySlowComponentRight = () => {
  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#f6ffed', 
      borderRadius: '6px',
      border: '1px solid #b7eb8f',
      margin: '10px 0'
    }}>
      <h5 style={{ color: 'black', margin: '0 0 10px 0' }}>🦥 VerySlowComponent (Encapsulado)</h5>
      <p style={{ color: 'black', margin: 0, fontSize: '14px' }}>
        Componente pesado que NO se re-renderiza cuando cambia el estado del modal (estado encapsulado).
      </p>
      <RenderCounter name="VerySlowComponent (Encapsulado)" />
    </div>
  );
};

const OtherStuffRight = () => {
  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#f6ffed', 
      borderRadius: '6px',
      border: '1px solid #b7eb8f',
      margin: '10px 0'
    }}>
      <h5 style={{ color: 'black', margin: '0 0 10px 0' }}>📦 OtherStuff (Encapsulado)</h5>
      <p style={{ color: 'black', margin: 0, fontSize: '14px' }}>
        Otro componente que permanece estable cuando cambia el estado del modal.
      </p>
      <RenderCounter name="OtherStuff (Encapsulado)" />
    </div>
  );
};

export const EncapsulatedStateExample = () => {
  return (
    <div style={{ 
      border: '1px solid #52c41a', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: '#f6ffed',
      marginTop: '20px'
    }}>
      <h4 style={{ color: '#52c41a', marginBottom: '20px', textAlign: 'center' }}>
        ✅ Estado Encapsulado
      </h4>
      
      <EncapsulatedModal />
      <VerySlowComponentRight />
      <OtherStuffRight />
      
      <div style={{ 
        backgroundColor: '#f6ffed', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #b7eb8f',
        marginTop: '20px'
      }}>
        <h5 style={{ margin: '0 0 10px 0', color: 'black' }}>✅ Beneficio</h5>
        <p style={{ margin: 0, color: 'black', fontSize: '14px' }}>
          Cuando cambia el estado del modal, SOLO el componente EncapsulatedModal se re-renderiza. 
          Los otros componentes permanecen estables.
        </p>
      </div>
    </div>
  );
};
