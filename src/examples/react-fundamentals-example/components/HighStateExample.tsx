import React, { useState } from 'react';
import { RenderCounter } from './RenderCounter';

// Componente que demuestra estado alto en el árbol
const HighStateComponent = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
  return (
    <div style={{ 
      border: '1px solid #ff4d4f', 
      borderRadius: '6px', 
      padding: '15px',
      backgroundColor: '#fff2f0'
    }}>
      <h5 style={{ color: 'black', margin: '0 0 10px 0' }}>❌ Modal con Estado Alto</h5>
      <button 
        onClick={onToggle}
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#ff4d4f', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          marginBottom: '10px'
        }}
      >
        {isOpen ? 'Cerrar' : 'Abrir'} Modal
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
            <h3 style={{ color: 'black' }}>Modal con Estado Alto</h3>
            <p style={{ color: 'black' }}>Este modal causa re-renderizados en TODOS los componentes.</p>
            <button 
              onClick={onToggle}
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
      
      <RenderCounter name="HighStateComponent" />
    </div>
  );
};

const VerySlowComponentLeft = () => {
  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#fff7e6', 
      borderRadius: '6px',
      border: '1px solid #ffd591',
      margin: '10px 0'
    }}>
      <h5 style={{ color: 'black', margin: '0 0 10px 0' }}>🦥 VerySlowComponent (Alto)</h5>
      <p style={{ color: 'black', margin: 0, fontSize: '14px' }}>
        Componente pesado que se re-renderiza cuando cambia el estado del modal (estado alto).
      </p>
      <RenderCounter name="VerySlowComponent (Alto)" />
    </div>
  );
};

const OtherStuffLeft = () => {
  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#fff7e6', 
      borderRadius: '6px',
      border: '1px solid #ffd591',
      margin: '10px 0'
    }}>
      <h5 style={{ color: 'black', margin: '0 0 10px 0' }}>📦 OtherStuff (Alto)</h5>
      <p style={{ color: 'black', margin: 0, fontSize: '14px' }}>
        Otro componente que se re-renderiza innecesariamente cuando cambia el estado del modal.
      </p>
      <RenderCounter name="OtherStuff (Alto)" />
    </div>
  );
};

export const HighStateExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ 
      border: '1px solid #ff4d4f', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: '#fff2f0',
      marginTop: '20px'
    }}>
      <h4 style={{ color: '#ff4d4f', marginBottom: '20px', textAlign: 'center' }}>
        ❌ Estado Alto en el Árbol
      </h4>
      
      <HighStateComponent isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <VerySlowComponentLeft />
      <OtherStuffLeft />
      
      <div style={{ 
        backgroundColor: '#fff2f0', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #ffccc7',
        marginTop: '20px'
      }}>
        <h5 style={{ margin: '0 0 10px 0', color: 'black' }}>⚠️ Problema</h5>
        <p style={{ margin: 0, color: 'black', fontSize: '14px' }}>
          Cuando cambia el estado del modal, TODOS los componentes se re-renderizan innecesariamente.
        </p>
      </div>
    </div>
  );
};
