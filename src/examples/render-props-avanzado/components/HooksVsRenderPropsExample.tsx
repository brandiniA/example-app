import React, { useState, useEffect, memo } from 'react';

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

// Componente costoso que no debería re-renderizarse con cada cambio de tamaño
const ExpensiveReport: React.FC = () => {
  // Simulamos un cálculo costoso
  React.useEffect(() => {
    const start = performance.now();
    // Simulación de operación costosa
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    const end = performance.now();
    console.log(`ExpensiveReport cálculo: ${end - start}ms`);
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#f6ffed', 
      padding: '15px', 
      borderRadius: '6px',
      border: '1px solid #b7eb8f',
      marginBottom: '10px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#52c41a', margin: 0 }}>ExpensiveReport</h4>
        <RenderCounter name="ExpensiveReport" color="#52c41a" />
      </div>
      <p style={{ color: 'black', margin: '10px 0 0 0' }}>
        Este componente simula cálculos costosos que no deberían repetirse innecesariamente.
      </p>
    </div>
  );
};

// Memoized version
const MemoizedExpensiveReport = memo(ExpensiveReport);

// Custom hook para detectar el tamaño de la ventana
const useResizeDetector = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return width;
};

// Componente con render props para detectar el tamaño
const ResizeDetector: React.FC<{
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
    <>
      {children(width)}
    </>
  );
};

// Componente responsivo con hooks
const LayoutWithHooks: React.FC = () => {
  const windowWidth = useResizeDetector();
  
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <RenderCounter name="Layout" color="#fa8c16" />
        <span style={{ color: 'black', marginLeft: '10px' }}>
          Ancho actual: {windowWidth}px
        </span>
      </div>
      
      {windowWidth > 600 ? <WideLayout /> : <NarrowLayout />}
      <ExpensiveReport />
    </div>
  );
};

// Componente responsivo con render props
const LayoutWithRenderProps: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <RenderCounter name="Layout" color="#fa8c16" />
      </div>
      
      <ResizeDetector>
        {(width) => (
          <>
            <div style={{ marginBottom: '10px', color: 'black' }}>
              Ancho actual: {width}px
            </div>
            {width > 600 ? <WideLayout /> : <NarrowLayout />}
          </>
        )}
      </ResizeDetector>
      
      <ExpensiveReport />
    </div>
  );
};

// Componente optimizado con hooks
const ResponsiveSection = memo(function ResponsiveSection() {
  const width = useResizeDetector();
  
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <RenderCounter name="ResponsiveSection" color="#722ed1" />
        <span style={{ color: 'black', marginLeft: '10px' }}>
          Ancho actual: {width}px
        </span>
      </div>
      
      {width > 600 ? <WideLayout /> : <NarrowLayout />}
    </>
  );
});

const LayoutWithOptimizedHooks: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <RenderCounter name="Layout" color="#fa8c16" />
      </div>
      
      <ResponsiveSection />
      <MemoizedExpensiveReport />
    </div>
  );
};

export const HooksVsRenderPropsExample: React.FC = () => {
  const [example, setExample] = useState(0);
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setExample(0)}
          style={{
            padding: '8px 16px',
            backgroundColor: example === 0 ? '#1890ff' : '#f5f5f5',
            color: example === 0 ? 'white' : 'black',
            border: '1px solid #d9d9d9',
            borderRadius: '4px 0 0 4px',
            cursor: 'pointer'
          }}
        >
          Hooks Básico
        </button>
        <button 
          onClick={() => setExample(1)}
          style={{
            padding: '8px 16px',
            backgroundColor: example === 1 ? '#52c41a' : '#f5f5f5',
            color: example === 1 ? 'white' : 'black',
            border: '1px solid #d9d9d9',
            borderLeft: 'none',
            cursor: 'pointer'
          }}
        >
          Render Props
        </button>
        <button 
          onClick={() => setExample(2)}
          style={{
            padding: '8px 16px',
            backgroundColor: example === 2 ? '#722ed1' : '#f5f5f5',
            color: example === 2 ? 'white' : 'black',
            border: '1px solid #d9d9d9',
            borderLeft: 'none',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer'
          }}
        >
          Hooks Optimizado
        </button>
      </div>
      
      <div style={{ 
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        padding: '20px',
        borderRadius: '6px',
        marginBottom: '20px',
        overflowX: 'auto'
      }}>
        {example === 0 ? (
          <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const useResizeDetector = () => {
  const [width, setWidth] = useState()

  useEffect(() => {
    const listener = () => setWidth(window.innerWidth)
    window.addEventListener('resize', listener)
  }, [])

  return width
}

const Layout = () => {
  const windowWidth = useResizeDetector()
  return (
    <>
      {windowWidth > 600 ? <WideLayout /> : <NarrowLayout />}
      <ExpensiveReport /> {/* Se re-renderiza en cada resize */}
    </>
  )
}`}
          </pre>
        ) : example === 1 ? (
          <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const Layout = () => {
  return (
    <>
      <ResizeDetector>
        {(width) => (width > 600 ? <WideLayout /> : <NarrowLayout />)}
      </ResizeDetector>
      <ExpensiveReport /> {/* No se re-renderiza con los cambios de width */}
    </>
  )
}`}
          </pre>
        ) : (
          <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const ResponsiveSection = React.memo(function ResponsiveSection() {
  const width = useResizeDetector()
  return width > 600 ? <WideLayout /> : <NarrowLayout />
})

const Layout = () => {
  return (
    <>
      <ResponsiveSection />
      <ExpensiveReport /> {/* No se re-renderiza con los cambios de width */}
    </>
  )
}`}
          </pre>
        )}
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: example === 0 ? '#1890ff' : example === 1 ? '#52c41a' : '#722ed1' }}>
          {example === 0 ? '❌ Hooks Básico - Problema de Re-renderizado' : 
           example === 1 ? '✅ Render Props - Aislamiento de Actualizaciones' : 
           '✅ Hooks Optimizado - Componentes Encapsulados'}
        </h3>
        
        <p style={{ color: 'black', marginBottom: '15px' }}>
          Redimensiona la ventana para ver cómo se comportan los contadores de renderizado en cada enfoque.
        </p>
        
        <div style={{ 
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px'
        }}>
          {example === 0 ? (
            <LayoutWithHooks />
          ) : example === 1 ? (
            <LayoutWithRenderProps />
          ) : (
            <LayoutWithOptimizedHooks />
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: 'black' }}>Comparación de Enfoques</h3>
        
        <div style={{ 
          backgroundColor: '#fff7e6', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #ffd591',
          marginBottom: '15px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#fa8c16' }}>⚠️ Hooks Básico</h4>
          <p style={{ margin: '0 0 10px 0', color: 'black' }}>
            <strong>Problema:</strong> Cada cambio en <code>windowWidth</code> re-renderiza todo el componente <code>Layout</code>, 
            incluyendo <code>ExpensiveReport</code> que no depende de ese estado.
          </p>
          <p style={{ margin: 0, color: 'black' }}>
            <strong>Ventajas:</strong> API simple y directa, fácil de entender y usar.
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: '#f6ffed', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #b7eb8f',
          marginBottom: '15px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#52c41a' }}>✅ Render Props</h4>
          <p style={{ margin: '0 0 10px 0', color: 'black' }}>
            <strong>Solución:</strong> Solo la parte dentro de la función render se actualiza con los cambios de ancho. 
            <code>ExpensiveReport</code> queda fuera del árbol reactivo y no se re-renderiza.
          </p>
          <p style={{ margin: 0, color: 'black' }}>
            <strong>Ventajas:</strong> Aislamiento natural de actualizaciones, control preciso sobre qué se re-renderiza.
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: '#f9f0ff', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #d3adf7',
          marginBottom: '15px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#722ed1' }}>✅ Hooks Optimizado</h4>
          <p style={{ margin: '0 0 10px 0', color: 'black' }}>
            <strong>Solución:</strong> Encapsulamos la parte responsiva en su propio componente con <code>React.memo</code> 
            para evitar que los cambios de ancho afecten a los hermanos.
          </p>
          <p style={{ margin: 0, color: 'black' }}>
            <strong>Ventajas:</strong> Mantiene la ergonomía de los hooks mientras logra un aislamiento similar al de render props.
          </p>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#f6ffed', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #b7eb8f',
        marginTop: '30px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>✅ Conclusiones</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
          <li><strong>Hooks:</strong> Más limpios y directos para la mayoría de los casos de uso</li>
          <li><strong>Render Props:</strong> Mejores para aislar actualizaciones y controlar el árbol de renderizado</li>
          <li><strong>Enfoque Híbrido:</strong> Usar hooks con componentes bien estructurados y memoización puede dar lo mejor de ambos mundos</li>
          <li><strong>Elección:</strong> Depende del caso de uso, la complejidad del componente y los requisitos de rendimiento</li>
        </ul>
      </div>
    </div>
  );
};
