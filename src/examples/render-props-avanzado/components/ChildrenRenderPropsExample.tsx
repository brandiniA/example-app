import React, { useState, useEffect } from 'react';

// Componente para contar renderizados
const RenderCounter: React.FC<{ name: string; color?: string }> = ({ name, color = '#1890ff' }) => {
  const renderCount = React.useRef(0);
  
  // Incrementar contador de renderizados en cada render
  renderCount.current += 1;
  
  return (
    <div style={{ 
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 8px', 
      backgroundColor: '#fff',
      borderRadius: '4px',
      border: `1px solid ${color}`,
      marginRight: '8px',
      marginBottom: '8px'
    }}>
      <span style={{ 
        marginRight: '6px',
        color: 'black',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        {name}:
      </span>
      <span style={{ 
        backgroundColor: color,
        color: 'white',
        padding: '2px 6px',
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {renderCount.current} renders
      </span>
    </div>
  );
};

// Componentes para el ejemplo
const WideLayout: React.FC = () => (
  <div style={{ 
    backgroundColor: '#e6f7ff', 
    padding: '15px', 
    borderRadius: '6px',
    border: '1px solid #91caff',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <h4 style={{ color: '#1890ff', margin: 0 }}>WideLayout</h4>
      <RenderCounter name="WideLayout" color="#1890ff" />
    </div>
  </div>
);

const NarrowLayout: React.FC = () => (
  <div style={{ 
    backgroundColor: '#fff2f0', 
    padding: '15px', 
    borderRadius: '6px',
    border: '1px solid #ffccc7',
    marginBottom: '10px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h4 style={{ color: '#ff4d4f', margin: 0 }}>NarrowLayout</h4>
      <RenderCounter name="NarrowLayout" color="#ff4d4f" />
    </div>
  </div>
);

// Ejemplo 1: Enfoque con callback
const ResizeDetectorWithCallback: React.FC<{
  onWidthChange: (width: number) => void;
}> = ({ onWidthChange }) => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      onWidthChange(newWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onWidthChange]);
  
  return (
    <div style={{ 
      backgroundColor: '#f0f5ff', 
      padding: '15px', 
      borderRadius: '6px',
      border: '1px solid #d6e4ff',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h4 style={{ color: '#1890ff', margin: '0 0 5px 0' }}>ResizeDetector</h4>
        <p style={{ margin: 0, color: 'black' }}>
          Ancho actual: {width}px
        </p>
      </div>
      <RenderCounter name="ResizeDetector" color="#1890ff" />
    </div>
  );
};

// Ejemplo 2: Enfoque con children como render prop
const ResizeDetectorWithChildren: React.FC<{
  children: (width: number) => React.ReactNode;
}> = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div style={{ 
      backgroundColor: '#f0f5ff', 
      padding: '15px', 
      borderRadius: '6px',
      border: '1px solid #d6e4ff',
      marginBottom: '10px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
          <h4 style={{ color: '#1890ff', margin: '0 0 5px 0' }}>ResizeDetector (children)</h4>
          <p style={{ margin: 0, color: 'black' }}>
            Ancho actual: {width}px
          </p>
        </div>
        <RenderCounter name="ResizeDetector" color="#1890ff" />
      </div>
      
      <div style={{ marginTop: '10px' }}>
        {children(width)}
      </div>
    </div>
  );
};

export const ChildrenRenderPropsExample: React.FC = () => {
  const [step, setStep] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setStep((step + 1) % 2)}
          style={{
            padding: '8px 16px',
            backgroundColor: step === 0 ? '#ff4d4f' : '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {step === 0 ? "Ver Problema con Callbacks" : "Ver Solución con Children"}
        </button>
      </div>
      
      {step === 0 ? (
        <div>
          <h3 style={{ color: '#ff4d4f' }}>❌ Problema: Duplicación de Estado con Callbacks</h3>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const ResizeDetector = ({ onWidthChange }) => {
  const [width, setWidth] = useState()

  useEffect(() => {
    const listener = () => {
      const w = window.innerWidth
      setWidth(w)
      onWidthChange(w)
    }
    window.addEventListener('resize', listener)
  }, [])

  return ...
}`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
            <p style={{ color: 'black', marginBottom: '15px' }}>
              Redimensiona la ventana para ver cómo se actualiza el ancho. Observa los contadores de renderizado.
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <ResizeDetectorWithCallback onWidthChange={setWindowWidth} />
              
              <div style={{ marginBottom: '10px' }}>
                <RenderCounter name="Layout" color="#52c41a" />
              </div>
              
              {windowWidth > 600 ? <WideLayout /> : <NarrowLayout />}
            </div>
            
            <div style={{ 
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              padding: '20px',
              borderRadius: '6px',
              marginBottom: '20px',
              overflowX: 'auto'
            }}>
              <h4 style={{ color: '#ff4d4f', marginTop: 0 }}>Consumidor:</h4>
              <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const Layout = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  return (
    <>
      <ResizeDetector onWidthChange={setWindowWidth} />
      {windowWidth > 600 ? <WideLayout /> : <NarrowLayout />}
    </>
  )
}`}
              </pre>
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Problemas:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>El consumidor debe duplicar la gestión de estado (<code>windowWidth</code>)</li>
              <li>Cada cambio de estado provoca re-renderizados en todo el componente Layout</li>
              <li>La comunicación entre componentes es más compleja de lo necesario</li>
              <li>Si hay múltiples consumidores, cada uno debe implementar su propia gestión de estado</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#52c41a' }}>✅ Solución: Children como Render Props</h3>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const ResizeDetector = ({ children }) => {
  const [width, setWidth] = useState()

  useEffect(() => {
    const listener = () => setWidth(window.innerWidth)
    window.addEventListener('resize', listener)
  }, [])

  return children(width)
}`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
            <p style={{ color: 'black', marginBottom: '15px' }}>
              Redimensiona la ventana para ver cómo se actualiza el ancho. Observa los contadores de renderizado.
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <ResizeDetectorWithChildren>
                {(width) => (
                  <>
                    <div style={{ marginBottom: '10px' }}>
                      <RenderCounter name="Layout" color="#52c41a" />
                    </div>
                    {width > 600 ? <WideLayout /> : <NarrowLayout />}
                  </>
                )}
              </ResizeDetectorWithChildren>
            </div>
            
            <div style={{ 
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              padding: '20px',
              borderRadius: '6px',
              marginBottom: '20px',
              overflowX: 'auto'
            }}>
              <h4 style={{ color: '#52c41a', marginTop: 0 }}>Consumidor:</h4>
              <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const Layout = () => {
  return (
    <ResizeDetector>
      {(windowWidth) =>
        windowWidth > 600 ? <WideLayout /> : <NarrowLayout />
      }
    </ResizeDetector>
  )
}`}
              </pre>
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Beneficios:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>No hay duplicación de estado en el consumidor</li>
              <li>La sintaxis es más limpia y declarativa</li>
              <li>El estado se gestiona en un solo lugar (ResizeDetector)</li>
              <li>Solo se re-renderizan los componentes que realmente dependen del ancho</li>
            </ul>
          </div>
        </div>
      )}
      
      <div style={{ 
        backgroundColor: '#f6ffed', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #b7eb8f',
        marginTop: '30px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>🚀 Próximo Paso</h4>
        <p style={{ margin: 0, color: 'black' }}>
          Ahora que entendemos cómo usar children como render props, veremos cómo los hooks 
          han reemplazado muchos casos de uso de render props y cuándo cada enfoque es más adecuado.
        </p>
      </div>
    </div>
  );
};
