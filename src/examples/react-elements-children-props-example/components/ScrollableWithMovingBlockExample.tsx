import React, { useState } from 'react';

import { RenderCounter } from './RenderCounter';

// Exportamos los componentes que necesitamos usar directamente en otros archivos
export { ScrollableWithMovingBlockChildren, VerySlowComponent, BunchOfStuff, OtherStuffAlsoComplicated };

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

// Más componentes "lentos"
const BunchOfStuff: React.FC = () => (
  <div style={{ 
    padding: '20px', 
    backgroundColor: '#fff7e6', 
    borderRadius: '6px',
    border: '1px solid #ffd591',
    marginBottom: '10px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <h4 style={{ color: '#fa8c16', margin: 0 }}>BunchOfStuff</h4>
      <RenderCounter name="BunchOfStuff" color="#fa8c16" />
    </div>
    <p style={{ margin: 0, color: 'black' }}>
      Otro componente que simula ser costoso.
    </p>
  </div>
);

const OtherStuffAlsoComplicated: React.FC = () => (
  <div style={{ 
    padding: '20px', 
    backgroundColor: '#f6ffed', 
    borderRadius: '6px',
    border: '1px solid #b7eb8f',
    marginBottom: '10px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <h4 style={{ color: '#52c41a', margin: 0 }}>OtherStuffAlsoComplicated</h4>
      <RenderCounter name="OtherStuff" color="#52c41a" />
    </div>
    <p style={{ margin: 0, color: 'black' }}>
      Un tercer componente que simula ser pesado.
    </p>
  </div>
);

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
    // Calcular posición según el scroll
    const calculated = Math.min(e.currentTarget.scrollTop / 5, 100);
    setPosition(calculated);
  };
  
  return (
    <div style={{ marginBottom: '30px' }}>
      <h3 style={{ color: '#ff4d4f' }}>❌ Implementación Problemática</h3>
      <p style={{ color: 'black' }}>
        <strong>Renderizados:</strong> {renderCount.current}
      </p>
      <div 
        style={{ 
          height: '200px', 
          overflowY: 'auto',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          padding: '10px'
        }}
        onScroll={onScroll}
      >
        <MovingBlock position={position} />
        <VerySlowComponent />
        <BunchOfStuff />
        <OtherStuffAlsoComplicated />
        <div style={{ height: '500px' }}></div> {/* Espacio para scroll */}
      </div>
      <p style={{ color: 'black', marginTop: '10px' }}>
        <strong>Problema:</strong> Cada scroll dispara un update de estado y provoca que todos los componentes hijos se re-rendericen.
      </p>
    </div>
  );
};

// Implementación optimizada
const ScrollableWithMovingBlock: React.FC<{ content: React.ReactNode }> = ({ content }) => {
  const [position, setPosition] = useState(0);
  
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const calculated = Math.min(e.currentTarget.scrollTop / 5, 100);
    setPosition(calculated);
  };
  
  return (
    <div 
      style={{ 
        height: '200px', 
        overflowY: 'auto',
        border: '1px solid #d9d9d9',
        borderRadius: '6px',
        padding: '10px'
      }}
      onScroll={onScroll}
    >
      <MovingBlock position={position} />
      {content}
      <div style={{ height: '500px' }}></div> {/* Espacio para scroll */}
    </div>
  );
};

// Implementación optimizada con children
const ScrollableWithMovingBlockChildren: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [position, setPosition] = useState(0);
  
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const calculated = Math.min(e.currentTarget.scrollTop / 5, 100);
    setPosition(calculated);
  };
  
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h4 style={{ color: '#1890ff', margin: 0 }}>Contenedor (con children)</h4>
        <RenderCounter name="Contenedor" color="#1890ff" />
      </div>
      
      <div 
        style={{ 
          height: '200px', 
          overflowY: 'auto',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          padding: '10px'
        }}
        onScroll={onScroll}
      >
        <MovingBlock position={position} />
        {children}
        <div style={{ height: '500px' }}></div> {/* Espacio para scroll */}
      </div>
    </div>
  );
};

// Componente principal
export const ScrollableWithMovingBlockExample: React.FC = () => {
  // Definimos los componentes "lentos" fuera del componente que tiene el estado
  const slowComponents = (
    <>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
  
  const renderCount = React.useRef(0);
  renderCount.current += 1;
  
  // Incrementar contador de renderizados en cada render
  
  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: 'black' }}>El problema explicado</h3>
        <p style={{ color: 'black' }}>
          Cuando tenemos un área con scroll que contiene componentes costosos, cada evento de scroll 
          puede provocar actualizaciones de estado que causan re-renderizados innecesarios de todos los 
          componentes hijos, incluso aquellos que no dependen de ese estado.
        </p>
        <p style={{ color: 'black' }}>
          En el siguiente ejemplo, cada vez que ocurre un scroll, se actualiza la posición del bloque móvil 
          y <strong>todos</strong> los componentes hijos se re-renderizan, causando una experiencia lenta:
        </p>
      </div>
      
      <ProblematicImplementation />
      
      <div style={{ marginBottom: '30px', marginTop: '30px' }}>
        <h3 style={{ color: 'black' }}>Soluciones propuestas</h3>
        <p style={{ color: 'black' }}>
          Para resolver este problema, podemos extraer el estado y la lógica a un componente separado, y 
          pasar los componentes costosos como props. De esta forma, cuando el estado cambie, solo se 
          re-renderizará el componente que realmente necesita ese estado.
        </p>
      </div>
      
      <h3 style={{ color: '#52c41a', marginTop: '30px' }}>✅ Solución con prop content</h3>
      <p style={{ color: 'black' }}>
        <strong>Renderizados del componente App:</strong> {renderCount.current}
      </p>
      <ScrollableWithMovingBlock content={slowComponents} />
      <p style={{ color: 'black', marginTop: '10px' }}>
        <strong>Beneficio:</strong> Ahora, cuando el estado de ScrollableWithMovingBlock cambia, 
        <strong> solo este componente se re-renderiza</strong>. Los hijos "lentos" están afuera—pasados como props—y 
        React no los vuelve a renderizar, así que el scroll se mantiene fluido.
      </p>
    </div>
  );
};
