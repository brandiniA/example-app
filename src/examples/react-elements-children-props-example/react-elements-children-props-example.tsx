import { Link } from 'react-router';
import { ElementsVsComponents } from './components/ElementsVsComponents';
import { ChildrenAsPropExample } from './components/ChildrenAsPropExample';
import { 
  ScrollableWithMovingBlockExample,
  ScrollableWithMovingBlockChildren,
  VerySlowComponent,
  BunchOfStuff,
  OtherStuffAlsoComplicated
} from './components/ScrollableWithMovingBlockExample';
import { RenderCounter } from './components/RenderCounter';

// Componente principal
export const ReactElementsChildrenPropsExample = () => {
  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: 'black' }}>
          ✨ React — Elementos, Children como Props y Re-renderizados
        </h1>
        <p style={{ margin: 0, color: 'black', fontSize: '16px' }}>
          Entendiendo la composición y optimización en React
        </p>
      </div>

      {/* Sección 1: Elementos vs Componentes */}
      <section style={{ 
        marginBottom: '40px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#1890ff',
          borderBottom: '2px solid #1890ff',
          paddingBottom: '10px'
        }}>
          1. Elementos vs Componentes en React
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Conceptos Fundamentales</h3>
          <p style={{ color: 'black' }}>
            En React, es crucial entender la diferencia entre <strong>elementos</strong> y <strong>componentes</strong>. 
            Esta distinción es clave para comprender cómo funciona React internamente y cómo optimizar nuestras aplicaciones.
          </p>
          
          <div style={{ 
            backgroundColor: '#e6f7ff', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #91caff',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>🔍 Concepto Clave</h4>
            <p style={{ margin: 0, color: 'black' }}>
              <strong>Un componente es una función</strong> que retorna elementos (JSX).
              <strong>Un elemento es un objeto simple</strong> que describe lo que debe verse en la UI.
            </p>
          </div>
        </div>
        
        <ElementsVsComponents />
      </section>

      {/* Sección 2: El problema del área con scroll */}
      <section style={{ 
        marginBottom: '40px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#fa8c16',
          borderBottom: '2px solid #fa8c16',
          paddingBottom: '10px'
        }}>
          2. El Problema del Área con Scroll y Props como Solución
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Descripción del problema</h3>
          <p style={{ color: 'black' }}>
            En aplicaciones React complejas, es común tener áreas con scroll que contienen múltiples componentes costosos.
            El problema surge cuando el estado que controla elementos visuales (como la posición de un elemento animado) 
            se actualiza frecuentemente, provocando re-renderizados innecesarios de todos los componentes hijos.
          </p>
          
          <div style={{ 
            backgroundColor: '#fff2f0', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ffccc7',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>⚠️ Problema</h4>
            <p style={{ margin: 0, color: 'black' }}>
              Cuando el estado vive en el mismo componente que contiene elementos costosos, 
              <strong> cada actualización de estado provoca re-renderizados de todos los hijos</strong>, 
              incluso aquellos que no dependen de ese estado, causando una experiencia lenta.
            </p>
          </div>

          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginTop: '20px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <h4 style={{ color: '#ff4d4f', marginTop: 0 }}>❌ Implementación Problemática</h4>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// ❌ PROBLEMA: Todo se re-renderiza cuando cambia position
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
};`}
            </pre>
          </div>
          
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

          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginTop: '20px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <h4 style={{ color: '#52c41a', marginTop: 0 }}>✅ Solución: Pasar componentes como props</h4>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// ✅ SOLUCIÓN: Separar componentes y pasar contenido como prop
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
};`}
            </pre>
          </div>
        </div>
        
        <ScrollableWithMovingBlockExample />
      </section>

      {/* Sección 3: Children como Props - Una forma más elegante */}
      <section style={{ 
        marginBottom: '40px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#52c41a',
          borderBottom: '2px solid #52c41a',
          paddingBottom: '10px'
        }}>
          3. Children como Props - Una Forma Más Elegante
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>¿Qué significa "children como prop"?</h3>
          <p style={{ color: 'black' }}>
            Una vez entendido el problema de re-renderizado y cómo pasando componentes como props lo solucionamos,
            <strong> children es simplemente una forma más elegante y nativa de React</strong> para lograr lo mismo.
            En React, <code>children</code> es solo una prop especial que viene integrada en JSX para facilitar
            la composición de componentes de forma más natural.
          </p>
          
          <div style={{ 
            backgroundColor: '#fff7e6', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ffd591',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>💡 Ventajas de children sobre props personalizadas</h4>
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
        
        <ChildrenAsPropExample />
        
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#52c41a' }}>✅ Aplicando children a nuestro ejemplo anterior</h3>
          <p style={{ color: 'black', marginBottom: '15px' }}>
            Ahora que entendemos qué son los children, podemos aplicar este concepto a nuestro ejemplo de la sección anterior.
            En lugar de usar una prop personalizada <code>content</code>, usamos <code>children</code> para lograr el mismo resultado
            pero con una sintaxis más clara y natural:
          </p>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <h4 style={{ color: '#52c41a', marginTop: 0 }}>✅ Solución mejorada: Usando children</h4>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// ✅ SOLUCIÓN MEJORADA: Usando children en lugar de content
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
};`}
            </pre>
          </div>
          
          <p style={{ color: 'black' }}>
            <strong>Beneficio:</strong> Usando la prop <code>children</code> logramos el mismo resultado de optimización
            pero con una sintaxis más clara y natural, similar a HTML. Esto hace que nuestro código sea más legible y 
            mantenible, mientras seguimos evitando re-renderizados innecesarios.
          </p>
        </div>
        
        <div style={{ marginTop: '40px', borderTop: '1px solid #e8e8e8', paddingTop: '30px' }}>
          <h3 style={{ color: '#52c41a' }}>✅ Ejemplo práctico: Solución con children</h3>
          <p style={{ color: 'black', marginBottom: '20px' }}>
            Aplicando lo que hemos aprendido, podemos mejorar el ejemplo de la sección anterior
            usando <code>children</code> en lugar de <code>content</code>:
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
      </section>



      {/* Resumen y Tips */}
      <section style={{ 
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '30px',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#6c757d'
        }}>
          📚 Resumen y Mejores Prácticas
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#1890ff', marginBottom: '15px' }}>🎯 Elementos y Componentes</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Un componente es una función que retorna elementos</li>
              <li>Un elemento es un objeto simple que describe la UI</li>
              <li>JSX es azúcar sintáctico para React.createElement</li>
              <li>React compara elementos para decidir qué actualizar</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#fa8c16', marginBottom: '15px' }}>🏗️ Optimización con Props</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Extrae estado a componentes específicos</li>
              <li>Pasa componentes lentos como props (ej. <code>content</code>)</li>
              <li>Mantén la misma referencia de objeto entre re-renders</li>
              <li>Aísla los componentes que necesitan re-renderizarse</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#52c41a', marginBottom: '15px' }}>⚡ Children como Props</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Forma elegante y nativa de pasar componentes como props</li>
              <li>Permite composición natural similar a HTML</li>
              <li>Mantiene los mismos beneficios de rendimiento</li>
              <li>Habilita patrones como wrappers y slots</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#ff4d4f', marginBottom: '15px' }}>⚠️ Re-renderizados</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>React compara referencias de objeto</li>
              <li>Si son iguales, omite la actualización</li>
              <li>Si son diferentes pero el tipo es igual, actualiza props</li>
              <li>Si el tipo es diferente, desmonta y monta de nuevo</li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: '#e6f7ff', 
          padding: '20px', 
          borderRadius: '6px',
          border: '1px solid #91caff',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#1890ff' }}>💡 Tip Final</h3>
          <p style={{ margin: 0, fontSize: '16px', color: 'black', marginBottom: '10px' }}>
            <strong>Primero identifica el problema de re-renderizado:</strong> cuando un componente con estado frecuentemente actualizado contiene componentes costosos.
          </p>
          <p style={{ margin: 0, fontSize: '16px', color: 'black', marginBottom: '10px' }}>
            <strong>Luego aplica la solución:</strong> pasa los componentes costosos como props (usando <code>content</code> o una prop personalizada).
          </p>
          <p style={{ margin: 0, fontSize: '16px', color: 'black' }}>
            <strong>Finalmente, mejora la legibilidad:</strong> usa <code>children</code> como una forma más elegante y nativa de React para lograr el mismo resultado.
          </p>
        </div>
      </section>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <Link to="/" style={{ 
          padding: '10px 20px', 
          backgroundColor: '#1890ff', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}>
          ← Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default ReactElementsChildrenPropsExample;


