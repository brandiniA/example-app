import React, { useState, memo } from 'react';

// Componente que muestra un contador de renderizados
const RenderCounter: React.FC<{ 
  name: string; 
  color?: string;
  children?: React.ReactNode;
}> = ({ name, color = '#1890ff', children }) => {
  const renderCount = React.useRef(0);
  
  // Incrementar contador de renderizados en cada render
  renderCount.current += 1;
  
  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#fff',
      borderRadius: '6px',
      border: `1px solid ${color}`,
      marginBottom: '10px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: children ? '10px' : '0'
      }}>
        <h4 style={{ margin: 0, color }}>{name}</h4>
        <span style={{ 
          backgroundColor: color,
          color: 'white',
          padding: '2px 8px',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          {renderCount.current} renders
        </span>
      </div>
      {children}
    </div>
  );
};

// Componente hijo memoizado
const MemoizedChild = memo(({ name }: { name: string }) => {
  return (
    <RenderCounter name={`MemoizedChild (${name})`} color="#52c41a">
      <p style={{ margin: 0, color: 'black' }}>
        Este componente está envuelto en React.memo
      </p>
    </RenderCounter>
  );
});

// Componente hijo normal
const RegularChild = ({ name }: { name: string }) => {
  return (
    <RenderCounter name={`RegularChild (${name})`} color="#fa8c16">
      <p style={{ margin: 0, color: 'black' }}>
        Este componente NO está memoizado
      </p>
    </RenderCounter>
  );
};

// Ejemplo de componente padre con children inline
const ParentWithInlineChildren: React.FC = () => {
  const [count, setCount] = useState(0);
  
  return (
    <RenderCounter name="ParentWithInlineChildren" color="#ff4d4f">
      <div>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}
        >
          Incrementar ({count})
        </button>
        
        <div style={{ marginLeft: '20px' }}>
          <MemoizedChild name="inline" />
          <RegularChild name="inline" />
        </div>
      </div>
    </RenderCounter>
  );
};

// Ejemplo de componente padre con children como props
const ParentWithChildrenAsProps: React.FC<{
  memoizedChild: React.ReactNode;
  regularChild: React.ReactNode;
}> = ({ memoizedChild, regularChild }) => {
  const [count, setCount] = useState(0);
  
  return (
    <RenderCounter name="ParentWithChildrenAsProps" color="#1890ff">
      <div>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}
        >
          Incrementar ({count})
        </button>
        
        <div style={{ marginLeft: '20px' }}>
          {memoizedChild}
          {regularChild}
        </div>
      </div>
    </RenderCounter>
  );
};

// Componente principal
export const RenderingOptimizationExample: React.FC = () => {
  // Crear los hijos fuera del render de ParentWithChildrenAsProps
  const memoizedChild = <MemoizedChild name="as prop" />;
  const regularChild = <RegularChild name="as prop" />;
  
  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: 'black' }}>Comparación de Estrategias de Renderizado</h3>
        <p style={{ color: 'black' }}>
          Haz clic en los botones para incrementar el contador en cada componente padre. 
          Observa cómo se comportan los componentes hijos en cada caso.
        </p>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
        <div style={{ 
          flex: '1 1 400px', 
          backgroundColor: '#fff2f0', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #ffccc7'
        }}>
          <h3 style={{ color: '#ff4d4f', marginTop: 0 }}>❌ Children creados inline</h3>
          <p style={{ color: 'black' }}>
            Cuando los children se crean dentro del render del padre, se crean nuevas instancias
            en cada renderizado. Esto provoca que incluso los componentes memoizados se vuelvan a renderizar.
          </p>
          <ParentWithInlineChildren />
        </div>
        
        <div style={{ 
          flex: '1 1 400px', 
          backgroundColor: '#e6f7ff', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #91caff'
        }}>
          <h3 style={{ color: '#1890ff', marginTop: 0 }}>✅ Children pasados como props</h3>
          <p style={{ color: 'black' }}>
            Cuando los children se crean fuera del render del padre y se pasan como props,
            mantienen su referencia entre renders. Los componentes memoizados no se re-renderizan.
          </p>
          <ParentWithChildrenAsProps 
            memoizedChild={memoizedChild}
            regularChild={regularChild}
          />
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        padding: '20px',
        borderRadius: '6px',
        marginTop: '20px',
        overflowX: 'auto'
      }}>
        <h4 style={{ color: '#f9fafb', marginTop: 0 }}>Visualización de qué se re-renderiza:</h4>
        <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// Tabla de comportamiento
| Escenario                 | ¿Cambia estado en Parent? | ¿Child se re-renderiza? | ¿MemoizedChild se re-renderiza? |
|---------------------------|:------------------------:|:----------------------:|:-------------------------------:|
| **Child creado inline**   |           Sí             |         Sí             |             Sí                |
| **Child pasado como prop**|           Sí             |         Sí             |             No                |

// Ejemplo de código
const SlowComponent = React.memo(() => {
  // Simula render costoso
  return <div>Muy lento...</div>;
});

const ParentInline = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Inc</button>
      <Child />
      <SlowComponent />
    </div>
  );
};

const ParentWithProp = ({ child }) => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Inc</button>
      {child}
      <SlowComponent />
    </div>
  );
};

// Uso con prop:
<ParentWithProp child={<Child />} />`}
        </pre>
      </div>
      
      <div style={{ 
        backgroundColor: '#f0f5ff', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #d6e4ff',
        margin: '20px 0'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#1890ff' }}>🔍 Explicación detallada</h4>
        <p style={{ margin: 0, color: 'black', marginBottom: '10px' }}>
          Cuando un componente se re-renderiza, todo el código dentro de su función se ejecuta nuevamente. Si creamos elementos JSX 
          dentro de la función del componente (inline), estos se crean como <strong>nuevos objetos</strong> en cada renderizado.
        </p>
        <p style={{ margin: 0, color: 'black', marginBottom: '10px' }}>
          Pero cuando pasamos elementos como props desde un componente padre, estos elementos se crean en el contexto del padre.
          Si el estado que cambia está en el componente hijo, el padre no se re-renderiza, por lo que los elementos mantienen 
          la misma referencia de objeto entre renderizados del hijo.
        </p>
        <p style={{ margin: 0, color: 'black' }}>
          React compara las referencias de los objetos elemento para decidir si necesita re-renderizar. Si la referencia 
          es la misma (Object.is devuelve true), React puede omitir la actualización de ese subárbol completo.
        </p>
      </div>
      
      <div style={{ 
        backgroundColor: '#f6ffed', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #b7eb8f',
        margin: '20px 0'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#52c41a' }}>💡 Conclusión</h4>
        <p style={{ margin: 0, color: 'black' }}>
          <strong>Si pasas un elemento como prop—en vez de crearlo inline—mantienes la misma referencia de objeto 
          entre renders, así React puede evitar re-renderizaciones innecesarias.</strong> Esto es especialmente 
          útil para componentes costosos o cuando necesitas optimizar el rendimiento.
        </p>
      </div>
    </div>
  );
};
