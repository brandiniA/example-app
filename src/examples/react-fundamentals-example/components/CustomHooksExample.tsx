import { useState, useEffect } from 'react';
import { RenderCounter } from './RenderCounter';

// Custom hook problemático que maneja modal y resize
const useProblematicHook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);
  
  // Este efecto actualiza el estado con cada resize del navegador
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize(); // Establecer valor inicial
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // width se actualiza en cada resize pero no se expone al componente
  console.log('Hook problemático - width:', width);
  
  // Solo retornamos funcionalidad del modal, pero el estado de width
  // sigue causando re-renderizados aunque no se use externamente
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  };
};

// Componente que usa el hook problemático
const ComponentWithProblematicHook = () => {
  const { isOpen, open, close } = useProblematicHook();
  
  return (
    <div style={{ 
      border: '1px solid #ff4d4f', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: '#fff2f0',
      marginTop: '20px'
    }}>
      <h4 style={{ color: 'black' }}>Componente con Hook Problemático</h4>
      <p style={{ color: 'black' }}>Este componente se re-renderiza en cada resize del navegador.</p>
      
      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={open}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#ff4d4f', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            marginRight: '10px'
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
              <h3 style={{ color: 'black' }}>Modal Problemático</h3>
              <p style={{ color: 'black' }}>Este modal funciona correctamente, pero el componente se re-renderiza con cada cambio de tamaño de ventana.</p>
              <button 
                onClick={close}
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
      </div>
      
      <RenderCounter name="Problemático" />
      
      <div style={{ 
        backgroundColor: '#fff2f0', 
        padding: '10px', 
        borderRadius: '4px', 
        marginTop: '15px',
        border: '1px solid #ffccc7',
        fontSize: '14px'
      }}>
        <p style={{ margin: 0, color: 'black' }}>
          <strong>Problema:</strong> El hook maneja estado interno de resize que no se usa, 
          pero cada cambio provoca re-renderizados del componente completo.
        </p>
      </div>
      
      <div style={{ 
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        padding: '10px',
        borderRadius: '4px',
        marginTop: '15px',
        fontSize: '12px',
        overflowX: 'auto'
      }}>
        <pre style={{ margin: 0, color: '#f9fafb', textAlign: 'left' }}>
{`// Hook problemático con estado no utilizado
const useProblematicHook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);
  
  // Este efecto actualiza el estado con cada resize
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Solo retornamos funcionalidad del modal, pero el estado de width
  // sigue causando re-renderizados aunque no se use externamente
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  };
};`}
        </pre>
      </div>
    </div>
  );
};

// Solución: Hook para modal extraído a componente
const ModalComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#52c41a', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          marginRight: '10px'
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
            <h3 style={{ color: 'black' }}>Modal Extraído</h3>
            <p style={{ color: 'black' }}>Este modal está aislado en su propio componente.</p>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#52c41a', 
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
      
      <RenderCounter name="ModalComponent" />
    </div>
  );
};

// Solución: Hook de resize extraído a subcomponente
const ResizeDetector = () => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div style={{ 
      padding: '8px', 
      backgroundColor: '#f6ffed', 
      borderRadius: '4px',
      fontSize: '12px',
      border: '1px solid #b7eb8f',
      color: 'black',
      marginTop: '10px'
    }}>
      <span>Ancho: {width}px</span>
      <RenderCounter name="ResizeDetector" />
    </div>
  );
};

const ComponentWithExtractedHook = () => {
  return (
    <div style={{ 
      border: '1px solid #52c41a', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: '#f6ffed',
      marginTop: '20px'
    }}>
      <h4 style={{ color: 'black' }}>Componente con Hook Extraído</h4>
      <p style={{ color: 'black' }}>El hook problemático ahora está aislado en subcomponentes.</p>
      <RenderCounter name="Extraído" />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <ModalComponent />
        <ResizeDetector />
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
          <strong>Solución:</strong> Solo los subcomponentes se re-renderizan cuando cambia su estado interno, 
          no todo el componente padre.
        </p>
      </div>
      
      <div style={{ 
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        padding: '10px',
        borderRadius: '4px',
        marginTop: '15px',
        fontSize: '12px',
        overflowX: 'auto'
      }}>
        <pre style={{ margin: 0, color: '#f9fafb', textAlign: 'left' }}>
{`// Solución: Extraer los hooks a componentes aislados
const ModalComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Abrir Modal</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Modal Extraído</h3>
            <button onClick={() => setIsOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

const ResizeDetector = () => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <div>Ancho: {width}px</div>;
};

// Componente padre que no se re-renderiza con los cambios de estado
// de los componentes hijos
const ComponentWithExtractedHook = () => {
  return (
    <div>
      <ModalComponent />
      <ResizeDetector />
    </div>
  );
};`}
        </pre>
      </div>
    </div>
  );
};

export const CustomHooksExample = () => {
  return (
    <>
      <ComponentWithProblematicHook />
      <ComponentWithExtractedHook />
    </>
  );
};
