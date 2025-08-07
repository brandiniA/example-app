import React, { useState } from 'react';
import { RenderCounter } from './RenderCounter';

// Componentes para el lado izquierdo (Estado Alto)
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

// Componentes para el lado derecho (Estado Encapsulado)
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

// Componente para la sección de estado alto
const HighStateSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ flex: 1 }}>
      <h5 style={{ color: '#ff4d4f', marginBottom: '15px', textAlign: 'center' }}>
        ❌ Estado Alto en el Árbol
      </h5>
      <HighStateComponent isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <VerySlowComponentLeft />
      <OtherStuffLeft />
    </div>
  );
};

// Componente para la sección de estado encapsulado
const EncapsulatedStateSection = () => {
  return (
    <div style={{ flex: 1 }}>
      <h5 style={{ color: '#52c41a', marginBottom: '15px', textAlign: 'center' }}>
        ✅ Estado Encapsulado
      </h5>
      <EncapsulatedModal />
      <VerySlowComponentRight />
      <OtherStuffRight />
    </div>
  );
};

export const StateEncapsulationExample = () => {
  return (
    <div style={{ 
      border: '1px solid #d9d9d9', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: 'white',
      marginTop: '20px'
    }}>
      <h4 style={{ color: 'black', marginBottom: '20px', textAlign: 'center' }}>
        🔄 Comparación: Estado Alto vs Encapsulado
      </h4>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <HighStateSection />
        <EncapsulatedStateSection />
      </div>
      
      <div style={{ 
        backgroundColor: '#e6f7ff', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #91caff',
        marginTop: '20px'
      }}>
        <h5 style={{ margin: '0 0 10px 0', color: 'black' }}>🔍 Observación</h5>
        <div style={{ color: 'black', fontSize: '14px' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Lado Izquierdo (Estado Alto):</strong> Cuando abres/cierras el modal, TODOS los componentes 
            se re-renderizan, incluyendo VerySlowComponent y OtherStuff.
          </p>
          <p style={{ margin: 0 }}>
            <strong>Lado Derecho (Estado Encapsulado):</strong> Cuando abres/cierras el modal, SOLO el componente 
            EncapsulatedModal se re-renderiza. VerySlowComponent y OtherStuff permanecen estables.
          </p>
        </div>
      </div>
    </div>
  );
};
