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

// Implementación optimizada con content prop
const ScrollableWithMovingBlock: React.FC<{ content: React.ReactNode }> = ({ content }) => {
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
        <h4 style={{ color: '#1890ff', margin: 0 }}>Contenedor (con prop content)</h4>
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
        {content}
        <div style={{ height: '500px' }}></div> {/* Espacio para scroll */}
      </div>
    </div>
  );
};

export const ContentPropSolutionSection: React.FC = () => {
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
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: 'black' }}>La solución: Extraer estado y pasar contenido como prop</h3>
        <p style={{ color: 'black' }}>
          Para resolver el problema de re-renderizados innecesarios, podemos extraer el estado y la lógica a un componente separado, 
          y pasar los componentes costosos como props. De esta forma, cuando el estado cambie, solo se re-renderizará el componente 
          que realmente necesita ese estado.
        </p>
        
        <div style={{ 
          backgroundColor: '#f6ffed', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #b7eb8f',
          margin: '20px 0'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>✅ Solución</h4>
          <p style={{ margin: 0, color: 'black' }}>
            <strong>Pasar componentes como props</strong> (como <code>content</code>) es la clave para resolver este problema.
            Esto aísla los re-renderizados y mejora el rendimiento al mantener la misma referencia de objeto.
          </p>
        </div>
      </div>

      <CodeBlock code={`// ✅ SOLUCIÓN: Separar componentes y pasar contenido como prop
const OptimizedContainer = ({ content }) => {
  // Estado que cambia frecuentemente
  const [position, setPosition] = useState(0);
  
  const handleScroll = (e) => {
    setPosition(e.currentTarget.scrollTop);
  };
  
  return (
    <div onScroll={handleScroll}>
      {/* Solo este componente se re-renderiza */}
      <MovingElement position={position} />
      
      {/* El contenido mantiene su referencia entre renders */}
      {content}
    </div>
  );
};

// Uso:
const App = () => {
  // Componentes costosos definidos fuera del componente con estado
  const expensiveContent = (
    <>
      <ExpensiveComponent1 />
      <ExpensiveComponent2 />
      <ExpensiveComponent3 />
    </>
  );
  
  return <OptimizedContainer content={expensiveContent} />;
};`} />

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: 'black' }}>Ejemplo Interactivo</h3>
        <p style={{ color: 'black' }}>
          En este ejemplo, los componentes costosos se definen fuera del componente con estado y se pasan como prop <code>content</code>.
          Observa los contadores de renderizado mientras haces scroll.
        </p>

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

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: 'black' }}>¿Por qué funciona esta solución?</h3>
        <p style={{ color: 'black' }}>
          Esta solución funciona porque:
        </p>
        <ul style={{ color: 'black' }}>
          <li>Los componentes costosos se crean <strong>fuera</strong> del componente con estado</li>
          <li>Se pasan como prop (<code>content</code>) al componente que maneja el estado</li>
          <li>Cuando el estado cambia y el componente contenedor se re-renderiza, React ve que la prop <code>content</code> tiene la <strong>misma referencia</strong> que antes</li>
          <li>Al tener la misma referencia, React omite la actualización de esos componentes</li>
          <li>Solo se actualiza el componente MovingBlock que realmente depende del estado</li>
        </ul>
      </div>
    </div>
  );
};
