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

// Implementación optimizada con children
const ScrollableWithMovingBlockChildren: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        <h4 style={{ color: '#722ed1', margin: 0 }}>Contenedor (con children)</h4>
        <RenderCounter name="Contenedor" color="#722ed1" />
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

export const ChildrenAsPropSection: React.FC = () => {
  const [showExplicit, setShowExplicit] = useState(false);
  const renderCount = React.useRef(0);
  renderCount.current += 1;
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: 'black' }}>¿Qué significa "children como prop"?</h3>
        <p style={{ color: 'black' }}>
          Una vez entendido el problema de re-renderizado y cómo pasando componentes como props lo solucionamos,
          <strong> children es simplemente una forma más elegante y nativa de React</strong> para lograr lo mismo.
          En React, <code>children</code> es solo una prop especial que viene integrada en JSX para facilitar
          la composición de componentes de forma más natural.
        </p>
        
        <div style={{ 
          backgroundColor: '#f9f0ff', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #d3adf7',
          margin: '20px 0'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#722ed1' }}>💡 Concepto Clave</h4>
          <p style={{ margin: 0, color: 'black' }}>
            En React, los props son solo un objeto pasado como primer argumento al componente. El prop <code>children</code> no es especial, 
            solo es una convención. Puedes nombrarlo como quieras, pero <code>children</code> habilita la composición natural en JSX.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setShowExplicit(!showExplicit)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#722ed1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {showExplicit ? "Mostrar anidamiento JSX" : "Mostrar prop explícito"}
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
        <div style={{ 
          flex: '1 1 400px', 
          backgroundColor: showExplicit ? '#f0f5ff' : '#f9f0ff', 
          padding: '20px', 
          borderRadius: '8px',
          border: `1px solid ${showExplicit ? '#d6e4ff' : '#d3adf7'}`
        }}>
          <h3 style={{ color: showExplicit ? '#1890ff' : '#722ed1', marginTop: 0 }}>
            {showExplicit ? 'Children explícito como prop' : 'Children anidado con JSX'}
          </h3>
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #d9d9d9',
            marginBottom: '15px'
          }}>
            <pre style={{ margin: 0, color: '#333', overflow: 'auto', textAlign: 'left' }}>
{showExplicit ? 
`// Pasando explícitamente como prop
<Parent children={<Child />} />` : 
`// Usando anidamiento JSX (más común)
<Parent>
  <Child />
</Parent>`}
            </pre>
          </div>
          <p style={{ color: 'black' }}>
            {showExplicit ? 
              'Aquí pasamos el componente Child explícitamente como prop children.' : 
              'Esta es la forma más común y legible de usar children, similar a HTML.'}
          </p>
        </div>

        <div style={{ 
          flex: '1 1 400px', 
          backgroundColor: '#f6ffed', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #b7eb8f'
        }}>
          <h3 style={{ color: '#52c41a', marginTop: 0 }}>Objeto generado</h3>
          <p style={{ color: 'black' }}>
            <strong>Ambas formas generan exactamente el mismo objeto:</strong>
          </p>
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <pre style={{ margin: 0, color: '#333', overflow: 'auto', textAlign: 'left' }}>
{`{
  type: Parent,
  props: {
    children: {
      type: Child,
      // ...otros datos internos de React
    }
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: 'black' }}>Comparativa rápida</h3>
        
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '15px',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#e6f7ff' }}>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #d9d9d9' }}>Sintaxis</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #d9d9d9' }}>Cómo lo escribes</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #d9d9d9' }}>Cómo lo interpreta React</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #d9d9d9' }}>Prop personalizada</td>
                <td style={{ padding: '10px', border: '1px solid #d9d9d9' }}><code>&lt;Parent child=&#123;&lt;Child/&gt;&#125; /&gt;</code></td>
                <td style={{ padding: '10px', border: '1px solid #d9d9d9' }}><code>&#123; props: &#123; child: ... &#125; &#125;</code></td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #d9d9d9' }}>Prop explícita <code>children</code></td>
                <td style={{ padding: '10px', border: '1px solid #d9d9d9' }}><code>&lt;Parent children=&#123;&lt;Child/&gt;&#125;/&gt;</code></td>
                <td style={{ padding: '10px', border: '1px solid #d9d9d9' }}><code>&#123; props: &#123; children: ... &#125; &#125;</code></td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #d9d9d9' }}>Children anidados con JSX</td>
                <td style={{ padding: '10px', border: '1px solid #d9d9d9' }}><code>&lt;Parent&gt;&lt;Child/&gt;&lt;/Parent&gt;</code></td>
                <td style={{ padding: '10px', border: '1px solid #d9d9d9' }}><code>&#123; props: &#123; children: ... &#125; &#125;</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#722ed1' }}>✅ Aplicando children a nuestro ejemplo anterior</h3>
        <p style={{ color: 'black', marginBottom: '15px' }}>
          Ahora que entendemos qué son los children, podemos aplicar este concepto a nuestro ejemplo de la sección anterior.
          En lugar de usar una prop personalizada <code>content</code>, usamos <code>children</code> para lograr el mismo resultado
          pero con una sintaxis más clara y natural:
        </p>
        
        <CodeBlock code={`// ✅ SOLUCIÓN MEJORADA: Usando children en lugar de content
const OptimizedContainer = ({ children }) => {
  // Estado que cambia frecuentemente
  const [position, setPosition] = useState(0);
  
  const handleScroll = (e) => {
    setPosition(e.currentTarget.scrollTop);
  };
  
  return (
    <div onScroll={handleScroll}>
      {/* Solo este componente se re-renderiza */}
      <MovingElement position={position} />
      
      {/* Los children mantienen su referencia entre renders */}
      {children}
    </div>
  );
};

// Uso (más limpio y natural):
const App = () => {
  return (
    <OptimizedContainer>
      <ExpensiveComponent1 />
      <ExpensiveComponent2 />
      <ExpensiveComponent3 />
    </OptimizedContainer>
  );
};`} />
        
        <p style={{ color: 'black' }}>
          <strong>Beneficio:</strong> Usando la prop <code>children</code> logramos el mismo resultado de optimización
          pero con una sintaxis más clara y natural, similar a HTML. Esto hace que nuestro código sea más legible y 
          mantenible, mientras seguimos evitando re-renderizados innecesarios.
        </p>
      </div>

      <div style={{ marginTop: '30px', borderTop: '1px solid #e8e8e8', paddingTop: '30px' }}>
        <h3 style={{ color: '#722ed1' }}>✅ Ejemplo práctico: Solución con children</h3>
        <p style={{ color: 'black', marginBottom: '20px' }}>
          Aplicando lo que hemos aprendido, podemos mejorar el ejemplo de la sección anterior
          usando <code>children</code> en lugar de <code>content</code>:
        </p>

        <p style={{ color: 'black' }}>
          <strong>Renderizados del componente App:</strong> {renderCount.current}
        </p>
        
        <ScrollableWithMovingBlockChildren>
          <div>
            <VerySlowComponent />
            <BunchOfStuff />
            <OtherStuffAlsoComplicated />
          </div>
        </ScrollableWithMovingBlockChildren>
        
        <p style={{ color: 'black', marginTop: '15px' }}>
          <strong>Beneficio:</strong> Usando la prop <code>children</code> logramos el mismo resultado 
          pero con una sintaxis más clara y natural, similar a HTML. <strong>Observa los contadores de renderizado</strong> - 
          cuando haces scroll, solo el contenedor se re-renderiza, mientras que los componentes hijos mantienen su cuenta.
        </p>
        
        <div style={{ 
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          padding: '20px',
          borderRadius: '6px',
          marginTop: '20px',
          overflowX: 'auto'
        }}>
          <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// Versión antigua: content como prop
const App = () => {
  const slowComponents = (
    <>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
  return (
    <ScrollableWithMovingBlock content={slowComponents} />
  );
};

// Con children (nueva versión):
const App = () => {
  return (
    <ScrollableWithMovingBlock>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </ScrollableWithMovingBlock>
  );
};`}
          </pre>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#fff7e6', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #ffd591',
        margin: '20px 0'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#fa8c16' }}>💡 Ventajas de children sobre props personalizadas</h4>
        <p style={{ margin: 0, color: 'black' }}>
          Usar <code>children</code> en lugar de props personalizadas como <code>content</code>:
        </p>
        <ul style={{ marginTop: '10px', marginBottom: '0', color: 'black' }}>
          <li>Hace que la composición sea más natural y clara visualmente, similar a HTML</li>
          <li>Es una convención estándar que todos los desarrolladores de React conocen</li>
          <li>Mantiene los mismos beneficios de rendimiento que vimos en la sección anterior</li>
          <li>Permite patrones más avanzados como componentes de layout y slots</li>
        </ul>
      </div>
    </div>
  );
};
