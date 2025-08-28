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

export const RenderingProblemSection: React.FC = () => {
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
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: 'black' }}>El problema explicado</h3>
        <p style={{ color: 'black' }}>
          Cuando tenemos un área con scroll que contiene componentes costosos, cada evento de scroll 
          puede provocar actualizaciones de estado que causan re-renderizados innecesarios de todos los 
          componentes hijos, incluso aquellos que no dependen de ese estado.
        </p>
        
        <div style={{ 
          backgroundColor: '#fff2f0', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #ffccc7',
          margin: '20px 0'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>⚠️ El Problema</h4>
          <p style={{ margin: 0, color: 'black' }}>
            Cuando el estado vive en el mismo componente que contiene elementos costosos, 
            <strong> cada actualización de estado provoca re-renderizados de todos los hijos</strong>, 
            incluso aquellos que no dependen de ese estado, causando una experiencia lenta.
          </p>
        </div>
      </div>

      <CodeBlock code={`// ❌ PROBLEMA: Todo se re-renderiza cuando cambia position
const ProblematicComponent = () => {
  // Estado que cambia frecuentemente (ej. en scroll, hover, etc.)
  const [position, setPosition] = useState(0);
  
  const handleScroll = (e) => {
    // Cada evento de scroll actualiza el estado
    setPosition(e.currentTarget.scrollTop);
  };
  
  return (
    <div onScroll={handleScroll}>
      {/* Este componente se re-renderiza en cada scroll */}
      <MovingElement position={position} />
      
      {/* Estos componentes costosos también se re-renderizan
          aunque no dependen de position */}
      <ExpensiveComponent1 />
      <ExpensiveComponent2 />
      <ExpensiveComponent3 />
    </div>
  );
};`} />

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: 'black' }}>Ejemplo Interactivo</h3>
        <p style={{ color: 'black' }}>
          En el siguiente ejemplo, cada vez que ocurre un scroll, se actualiza la posición del bloque móvil 
          y <strong>todos</strong> los componentes hijos se re-renderizan, causando una experiencia lenta.
          Observa los contadores de renderizado mientras haces scroll.
        </p>

        <div style={{ marginBottom: '30px' }}>
          <h4 style={{ color: '#ff4d4f' }}>❌ Implementación Problemática</h4>
          <p style={{ color: 'black' }}>
            <strong>Renderizados del componente:</strong> {renderCount.current}
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
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: 'black' }}>¿Por qué ocurre esto?</h3>
        <p style={{ color: 'black' }}>
          Este problema ocurre porque:
        </p>
        <ul style={{ color: 'black' }}>
          <li>Cada evento de scroll actualiza el estado (<code>position</code>)</li>
          <li>Cuando el estado cambia, React vuelve a ejecutar la función del componente</li>
          <li>Al re-ejecutar la función, se crean <strong>nuevas instancias</strong> de todos los elementos hijos</li>
          <li>React compara estas nuevas instancias con las anteriores y, al ser diferentes (diferentes referencias), los re-renderiza</li>
          <li>Los componentes costosos se re-renderizan innecesariamente, afectando el rendimiento</li>
        </ul>
      </div>
    </div>
  );
};
