import React, { useState } from 'react';
import { RenderCounter } from './RenderCounter';

// Componente para demostrar el flujo de re-renderizados
export const ComponentTree = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ 
      border: '1px solid #d9d9d9', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: 'white',
      marginTop: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h4 style={{ margin: 0, color: 'black' }}>Árbol de Componentes</h4>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#1890ff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px' 
          }}
        >
          {isOpen ? 'Cerrar' : 'Abrir'} Modal
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <RenderCounter name="App" />
        <div style={{ marginLeft: '20px' }}>
          <RenderCounter name="Button" />
          {isOpen && <RenderCounter name="Modal" />}
          <RenderCounter name="VerySlowComponent" />
          <RenderCounter name="OtherStuff" />
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#f6ffed', 
        padding: '10px', 
        borderRadius: '4px', 
        marginTop: '15px',
        border: '1px solid #b7eb8f',
        fontSize: '14px'
      }}>
        <p style={{ margin: 0, color: 'black' }}>
          <strong>Observación:</strong> Todos los componentes se re-renderizan cuando cambia el estado del modal, 
          incluso aquellos que no usan ese estado.
        </p>
      </div>
    </div>
  );
};
