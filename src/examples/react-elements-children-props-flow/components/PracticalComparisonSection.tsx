import React, { useState } from 'react';
import { RenderCounter } from './RenderCounter';

// Componente para mostrar código
const CodeBlock = ({ code }: { code: string }) => (
  <div style={{ 
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    padding: '20px',
    borderRadius: '6px',
    overflowX: 'auto',
    marginBottom: '20px'
  }}>
    <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
      {code}
    </pre>
  </div>
);

// Componente que simula ser lento
const VerySlowComponent: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#fff2f0', 
      borderRadius: '6px',
      border: '1px solid #ffccc7',
      marginBottom: '10px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h4 style={{ color: '#ff4d4f', margin: 0 }}>VerySlowComponent</h4>
        <RenderCounter name="VerySlowComponent" color="#ff4d4f" />
      </div>
      <p style={{ margin: 0, color: 'black' }}>
        Este componente simula ser muy lento para renderizar.
      </p>
    </div>
  );
};

// Componente que muestra un bloque que se mueve con el scroll
const MovingBlock: React.FC<{ position: number }> = ({ position }) => (
  <div style={{ 
    position: 'sticky',
    top: '10px',
    padding: '10px',
    backgroundColor: '#e6f7ff',
    borderRadius: '6px',
    border: '1px solid #91caff',
    width: '100%',
    transform: `translateY(${position}px)`,
    transition: 'transform 0.1s',
    zIndex: 10,
    marginBottom: '20px'
  }}>
    <h4 style={{ color: '#1890ff', margin: '0 0 10px 0' }}>MovingBlock</h4>
    <p style={{ margin: 0, color: 'black' }}>
      Este bloque se mueve según la posición de scroll: {position}px
    </p>
  </div>
);

// Implementación problemática
const ProblematicImplementation: React.FC = () => {
  const [position, setPosition] = useState(0);
  const renderCount = React.useRef(0);
  
  // Incrementar contador de renderizados en cada render
  renderCount.current += 1;
  
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const calculated = Math.min(e.currentTarget.scrollTop / 5, 100);
    setPosition(calculated);
  };
  
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h4 style={{ color: '#ff4d4f', margin: 0 }}>Problemático</h4>
        <RenderCounter name="Problemático" color="#ff4d4f" />
      </div>
      
      <div 
        style={{ 
          height: '150px', 
          overflowY: 'auto',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          padding: '10px'
        }}
        onScroll={onScroll}
      >
        <MovingBlock position={position} />
        <VerySlowComponent />
        <div style={{ height: '300px' }}></div> {/* Espacio para scroll */}
      </div>
    </div>
  );
};

// Implementación con content prop
const ContentPropImplementation: React.FC = () => {
  const [position, setPosition] = useState(0);
  const renderCount = React.useRef(0);
  
  // Incrementar contador de renderizados en cada render
  renderCount.current += 1;
  
  // Definimos el componente "lento" fuera del componente que tiene el estado
  const slowComponent = <VerySlowComponent />;
  
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const calculated = Math.min(e.currentTarget.scrollTop / 5, 100);
    setPosition(calculated);
  };
  
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h4 style={{ color: '#fa8c16', margin: 0 }}>Con prop content</h4>
        <RenderCounter name="ContentProp" color="#fa8c16" />
      </div>
      
      <div 
        style={{ 
          height: '150px', 
          overflowY: 'auto',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          padding: '10px'
        }}
        onScroll={onScroll}
      >
        <MovingBlock position={position} />
        {slowComponent}
        <div style={{ height: '300px' }}></div> {/* Espacio para scroll */}
      </div>
    </div>
  );
};

// Implementación con children
const ChildrenImplementation: React.FC = () => {
  const slowComponent = <VerySlowComponent />;
  const renderCount = React.useRef(0);
  renderCount.current += 1;
  
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h4 style={{ color: '#52c41a', margin: 0 }}>Con children</h4>
        <RenderCounter name="Children" color="#52c41a" />
      </div>
      
      <ScrollableContainer>
        {slowComponent}
      </ScrollableContainer>
    </div>
  );
};

// Componente contenedor para la implementación con children
const ScrollableContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [position, setPosition] = useState(0);
  const renderCount = React.useRef(0);
  
  // Incrementar contador de renderizados en cada render
  renderCount.current += 1;
  
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const calculated = Math.min(e.currentTarget.scrollTop / 5, 100);
    setPosition(calculated);
  };
  
  return (
    <div>
      <RenderCounter name="Contenedor" color="#722ed1" />
      
      <div 
        style={{ 
          height: '150px', 
          overflowY: 'auto',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          padding: '10px',
          marginTop: '10px'
        }}
        onScroll={onScroll}
      >
        <MovingBlock position={position} />
        {children}
        <div style={{ height: '300px' }}></div> {/* Espacio para scroll */}
      </div>
    </div>
  );
};

export const PracticalComparisonSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { name: "Comparar todos", color: "#eb2f96" },
    { name: "Problemático", color: "#ff4d4f" },
    { name: "Con prop content", color: "#fa8c16" },
    { name: "Con children", color: "#52c41a" }
  ];
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: 'black' }}>Comparación de los tres enfoques</h3>
        <p style={{ color: 'black' }}>
          Veamos una comparación lado a lado de las tres implementaciones que hemos discutido. 
          Observa los contadores de renderizado mientras haces scroll en cada uno.
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {tabs.map((tab, index) => (
          <button 
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === index ? tab.color : '#f5f5f5',
              color: activeTab === index ? 'white' : 'black',
              border: `1px solid ${activeTab === index ? tab.color : '#d9d9d9'}`,
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: activeTab === index ? 'bold' : 'normal'
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: activeTab === 0 ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr', 
        gap: '20px'
      }}>
        {(activeTab === 0 || activeTab === 1) && (
          <div style={{ 
            backgroundColor: '#fff2f0', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #ffccc7'
          }}>
            <h3 style={{ color: '#ff4d4f', marginTop: 0 }}>❌ Implementación Problemática</h3>
            <p style={{ color: 'black', marginBottom: '15px' }}>
              Estado y componentes costosos en el mismo componente.
            </p>
            <ProblematicImplementation />
            <p style={{ color: 'black', marginTop: '10px' }}>
              <strong>Problema:</strong> Cada scroll provoca re-renderizados de todos los componentes.
            </p>
          </div>
        )}
        
        {(activeTab === 0 || activeTab === 2) && (
          <div style={{ 
            backgroundColor: '#fff7e6', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #ffd591'
          }}>
            <h3 style={{ color: '#fa8c16', marginTop: 0 }}>✅ Implementación con prop content</h3>
            <p style={{ color: 'black', marginBottom: '15px' }}>
              Componente lento definido fuera y pasado como variable.
            </p>
            <ContentPropImplementation />
            <p style={{ color: 'black', marginTop: '10px' }}>
              <strong>Beneficio:</strong> Solo el contenedor se re-renderiza, no el componente lento.
            </p>
          </div>
        )}
        
        {(activeTab === 0 || activeTab === 3) && (
          <div style={{ 
            backgroundColor: '#f6ffed', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #b7eb8f'
          }}>
            <h3 style={{ color: '#52c41a', marginTop: 0 }}>✅ Implementación con children</h3>
            <p style={{ color: 'black', marginBottom: '15px' }}>
              Componente lento pasado como children para mejor legibilidad.
            </p>
            <ChildrenImplementation />
            <p style={{ color: 'black', marginTop: '10px' }}>
              <strong>Beneficio:</strong> Misma optimización pero con sintaxis más clara y natural.
            </p>
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#eb2f96' }}>Análisis de rendimiento</h3>
        
        <div style={{ 
          backgroundColor: '#fff0f6', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #ffadd2',
          marginTop: '15px'
        }}>
          <h4 style={{ color: '#eb2f96', marginTop: 0 }}>Conclusiones</h4>
          <ul style={{ color: 'black' }}>
            <li>
              <strong>Implementación problemática:</strong> Cada evento de scroll provoca re-renderizados de todos los componentes, 
              incluyendo los componentes costosos que no dependen del estado de scroll.
            </li>
            <li>
              <strong>Implementación con prop content:</strong> Solo el contenedor se re-renderiza cuando cambia el estado de scroll. 
              El componente lento mantiene su referencia y no se re-renderiza.
            </li>
            <li>
              <strong>Implementación con children:</strong> Funcionalmente idéntica a la implementación con prop content, 
              pero con una sintaxis más clara y natural, similar a HTML.
            </li>
          </ul>
        </div>
        
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h4 style={{ color: 'black', marginTop: 0 }}>¿Cuándo usar cada enfoque?</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#e6f7ff' }}>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #d9d9d9' }}>Enfoque</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #d9d9d9' }}>Cuándo usarlo</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #d9d9d9' }}>Ventajas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #d9d9d9', fontWeight: 'bold' }}>Props personalizadas</td>
                <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>Cuando necesitas múltiples "slots" de contenido</li>
                    <li>Cuando el nombre semántico es importante</li>
                    <li>Para APIs más explícitas</li>
                  </ul>
                </td>
                <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>Nombres descriptivos para cada slot</li>
                    <li>Más explícito sobre lo que se espera</li>
                    <li>Mejor para componentes complejos</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #d9d9d9', fontWeight: 'bold' }}>Children</td>
                <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>Para contenido principal de un componente</li>
                    <li>Cuando la composición es natural</li>
                    <li>Para wrappers y layouts</li>
                  </ul>
                </td>
                <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>Sintaxis más limpia y natural</li>
                    <li>Similar a HTML estándar</li>
                    <li>Mejor legibilidad</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
