import React from 'react';
import { Link } from 'react-router';
import { 
  ComponentTree, 
  MemoizationExample, 
  CustomHooksExample,
  StateHierarchyDiagram,
  StateEncapsulationExample
} from './components';

// Componente principal
export const ReactFundamentalsExample = () => {
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
          ✨ React — Estado, Re-renderizados y Optimización
        </h1>
        <p style={{ margin: 0, color: 'black', fontSize: '16px' }}>
          Guía práctica para desarrolladores con experiencia
        </p>
      </div>

      {/* Sección 1: Actualizaciones de Estado y Re-renderizados */}
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
          1. Actualizaciones de Estado y Re-renderizados
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Teoría</h3>
          <p style={{ color: 'black' }}>
            En React, cada actualización de estado provoca que el <strong>componente propietario</strong> 
            y todos sus hijos se re-rendericen, incluso aquellos que no usan ese estado. React nunca 
            re-renderiza hacia arriba en el árbol, solo "hacia abajo" desde el punto donde se actualizó el estado.
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
              <strong>Solo los componentes por debajo de donde cambia el estado se re-renderizan.</strong> 
              Los de arriba permanecen igual.
            </p>
          </div>
        </div>
        
        <ComponentTree />
        
        <div style={{ 
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          padding: '20px',
          borderRadius: '6px',
          marginTop: '20px',
          overflowX: 'auto'
        }}>
          <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// Ejemplo de flujo de re-renderizados
function App() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Ocultar" : "Mostrar"} Dialog
      </button>
      {visible && <Dialog />}
      <VerySlowComponent />
      <OtherComponent />
    </div>
  );
}

// Al actualizar 'visible' en App, TODOS los hijos se re-renderizan:
// - Dialog (usa el estado)
// - VerySlowComponent (no usa el estado)
// - OtherComponent (no usa el estado)`}
          </pre>
        </div>
      </section>

      {/* Sección 2: Props, Estado y Memoización */}
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
          2. Props, Estado y Memoización
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Teoría</h3>
          <p style={{ color: 'black' }}>
            Los cambios en las props <strong>solo importan</strong> para el re-renderizado si el componente 
            está envuelto en <code>React.memo</code>. Normalmente, cuando el estado cambia alto en el árbol, 
            React re-renderiza todos los hijos—aunque tengan las mismas props.
          </p>
          
          <div style={{ 
            backgroundColor: '#fff7e6', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ffd591',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>💡 Memoización</h4>
            <p style={{ margin: 0, color: 'black' }}>
              <code>React.memo</code> solo evita el re-renderizado si las <strong>props permanecen iguales</strong>. 
              Si cambia alguna prop, el re-renderizado ocurre normalmente.
            </p>
          </div>
        </div>
        
        <MemoizationExample />
        
        <div style={{ 
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          padding: '20px',
          borderRadius: '6px',
          marginTop: '20px',
          overflowX: 'auto'
        }}>
          <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// Componente con memoización
const MemoizedComponent = React.memo(({ name, count }) => {
  console.log('Renderizando MemoizedComponent');
  return (
    <div>
      <p>Componente Memoizado: {name}</p>
      <p>Contador: {count}</p>
    </div>
  );
});

// Solo se re-renderiza si 'name' o 'count' cambian
// No se re-renderiza si otros estados del padre cambian`}
          </pre>
        </div>
      </section>

      {/* Sección 3: Moviendo Estado Hacia Abajo */}
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
          3. Moviendo Estado Hacia Abajo
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Teoría</h3>
          <p style={{ color: 'black' }}>
            Cuando el estado vive alto en el árbol de componentes, cada actualización hace que todos los 
            descendientes se re-rendericen, incluso si la mayoría no necesita ese valor. La solución es 
            <strong>mover el estado hacia abajo</strong> al componente más pequeño que realmente lo necesita.
          </p>
          
          <div style={{ 
            backgroundColor: '#f6ffed', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #b7eb8f',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>✅ Beneficios</h4>
            <ul style={{ margin: 0, color: 'black' }}>
              <li>Aísla los re-renderizados</li>
              <li>Mantiene el resto de la app rápido</li>
              <li>Mejor performance general</li>
              <li>Más predecible</li>
            </ul>
          </div>
        </div>
        
        <StateHierarchyDiagram />
        
        <StateEncapsulationExample />
        
        <div style={{ 
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          padding: '20px',
          borderRadius: '6px',
          marginTop: '20px',
          overflowX: 'auto'
        }}>
          <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// ❌ Estado alto en el árbol (problemático)
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)} />
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
      <VerySlowComponent />
      <OtherStuff />
    </div>
  );
};

// ✅ Estado movido hacia abajo (óptimo)
const ButtonWithModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)} />
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </>
  );
};

const App = () => {
  return (
    <div>
      <ButtonWithModal />
      <VerySlowComponent />
      <OtherStuff />
    </div>
  );
};`}
          </pre>
        </div>
      </section>

      {/* Sección 4: El Peligro de Custom Hooks */}
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
          color: '#ff4d4f',
          borderBottom: '2px solid #ff4d4f',
          paddingBottom: '10px'
        }}>
          4. El Peligro de Custom Hooks
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Teoría</h3>
          <p style={{ color: 'black' }}>
            Los custom hooks pueden ocultar el estado, pero el estado sigue viviendo en el componente que usa el hook. 
            Cada actualización de estado dentro de un custom hook <strong>sigue provocando un re-render</strong> del 
            componente que lo usa, incluso si no se retorna ese estado.
          </p>
          
          <div style={{ 
            backgroundColor: '#fff2f0', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ffccc7',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>⚠️ Advertencia</h4>
            <p style={{ margin: 0, color: 'black' }}>
              <strong>Cualquier update de estado dentro de un hook (aunque esté anidado o no se retorne) 
              provoca un re-render del componente padre que lo usa!</strong>
            </p>
          </div>
        </div>
        
        <CustomHooksExample />
        
        <div style={{ 
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          padding: '20px',
          borderRadius: '6px',
          marginTop: '20px',
          overflowX: 'auto'
        }}>
          <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// ❌ Hook problemático
const useProblematicHook = () => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return { isOpen: false, open: () => {}, close: () => {} };
};

// ✅ Solución: Extraer a subcomponente
const ResizeDetector = () => {
  const [width, setWidth] = useState(0);
  // ... lógica de resize
  return <div>Ancho: {width}px</div>;
};

const ComponentWithExtractedHook = () => {
  return (
    <div>
      <ResizeDetector />
      {/* Solo este subcomponente se re-renderiza en resize */}
    </div>
  );
};`}
          </pre>
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
            <h4 style={{ color: '#1890ff', marginBottom: '15px' }}>🎯 Estado y Re-renderizados</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>React solo re-renderiza hacia abajo</li>
              <li>Cada actualización de estado afecta a todos los hijos</li>
              <li>Usa contadores de re-renderizados para debuggear</li>
              <li>Mueve estado cerca de donde se usa</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#52c41a', marginBottom: '15px' }}>⚡ Optimización</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>React.memo para componentes pesados</li>
              <li>useMemo para cálculos costosos</li>
              <li>useCallback para funciones como props</li>
              <li>Mide performance antes de optimizar</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#fa8c16', marginBottom: '15px' }}>🏗️ Arquitectura</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Extrae lógica con estado a subcomponentes</li>
              <li>Evita estado global innecesario</li>
              <li>Usa composición en lugar de herencia</li>
              <li>Mantén componentes pequeños y enfocados</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#ff4d4f', marginBottom: '15px' }}>⚠️ Custom Hooks</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Los hooks encapsulan pero no eliminan re-renderizados</li>
              <li>Extrae hooks problemáticos a subcomponentes</li>
              <li>Evita estado innecesario en hooks</li>
              <li>Usa useCallback/useMemo dentro de hooks cuando sea necesario</li>
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
          <p style={{ margin: 0, fontSize: '16px', color: 'black' }}>
            <strong>Mover el estado cerca de donde se usa suele ser mejor que depender de React.memo.</strong> 
            Es más simple y es más predecible.
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

export default ReactFundamentalsExample;
