import React, { useState } from 'react';

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

export const ElementsVsComponentsSection: React.FC = () => {
  const [showElementObject, setShowElementObject] = useState(false);

  return (
    <div>
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
            <strong> Un elemento es un objeto simple</strong> que describe lo que debe verse en la UI.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
        <div style={{ 
          flex: '1 1 400px', 
          backgroundColor: '#f0f5ff', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #d6e4ff'
        }}>
          <h3 style={{ color: '#1890ff', marginTop: 0 }}>Componente</h3>
          <p style={{ color: 'black' }}>
            Un <strong>componente</strong> es simplemente una función que retorna elementos (JSX). 
            Lo especial es que React interpreta su retorno y genera la interfaz a partir de ello.
          </p>
          <CodeBlock code={`// Componente funcional mínimo
const Parent = () => {
  return <Child />;
};`} />
        </div>

        <div style={{ 
          flex: '1 1 400px', 
          backgroundColor: '#f6ffed', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #b7eb8f'
        }}>
          <h3 style={{ color: '#52c41a', marginTop: 0 }}>Elemento</h3>
          <p style={{ color: 'black' }}>
            Un <strong>elemento</strong> es un objeto simple que describe lo que debe verse en la UI. 
            Puede representar una etiqueta del DOM o un componente.
          </p>
          <CodeBlock code={`// Objeto elemento (lo que React procesa)
{
  type: Child,
  props: {},
  // ...otros datos internos de React
}`} />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: 'black' }}>JSX y React.createElement</h3>
        <p style={{ color: 'black' }}>
          JSX es solo azúcar sintáctico para llamadas a <code>React.createElement</code>. Cuando escribimos JSX, 
          el compilador lo transforma en llamadas a esta función que crea los objetos elemento.
        </p>
        
        <div style={{ 
          backgroundColor: '#f0f5ff', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #d6e4ff',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: '#1890ff', margin: '0 0 10px 0' }}>Equivalencia JSX y React.createElement</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h5 style={{ color: '#1890ff' }}>JSX:</h5>
              <div style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                <pre style={{ margin: 0, color: '#333', overflow: 'auto', textAlign: 'left' }}>
{`<div className="container">
  <h1>Título</h1>
  <Child name="valor" />
</div>`}
                </pre>
              </div>
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <h5 style={{ color: '#1890ff' }}>Equivalente con React.createElement:</h5>
              <div style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                <pre style={{ margin: 0, color: '#333', overflow: 'auto', textAlign: 'left' }}>
{`React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Título'),
  React.createElement(Child, { name: 'valor' })
)`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: 'black' }}>¿Cómo funcionan los re-renders?</h3>
        <p style={{ color: 'black' }}>
          Cada vez que el estado o las props de un componente cambian, React ejecuta de nuevo su función (re-render). 
          Construye un <strong>árbol virtual</strong> de todos los elementos antes y después, y los compara ("diffing") 
          para decidir qué cambia en el DOM real.
        </p>

        <button 
          onClick={() => setShowElementObject(!showElementObject)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {showElementObject ? "Ocultar proceso de comparación" : "Ver proceso de comparación"}
        </button>

        {showElementObject && (
          <div style={{ 
            backgroundColor: '#e6f7ff', 
            padding: '20px', 
            borderRadius: '6px',
            border: '1px solid #91caff',
            marginTop: '20px'
          }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#1890ff' }}>🔍 Proceso de Comparación de React</h4>
            <p style={{ margin: '0 0 15px 0', color: 'black' }}>
              Cuando React necesita actualizar la UI, compara los objetos elemento <strong>anteriores</strong> y <strong>nuevos</strong> 
              de cada componente usando un proceso de dos pasos:
            </p>
            
            <div style={{ 
              backgroundColor: '#f0f5ff', 
              padding: '15px', 
              borderRadius: '6px',
              border: '1px solid #d6e4ff',
              marginBottom: '15px'
            }}>
              <h5 style={{ margin: '0 0 10px 0', color: '#1890ff' }}>📋 Tabla de Decisión de React</h5>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#e6f7ff' }}>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #d9d9d9', color: '#1890ff' }}>Comparación</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #d9d9d9', color: '#1890ff' }}>Acción de React</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #d9d9d9', color: '#1890ff' }}>Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: '#f6ffed' }}>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9', fontWeight: 'bold' }}>Referencia igual</td>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>Omite actualización</td>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>No toca DOM ni subárbol</td>
                  </tr>
                  <tr style={{ backgroundColor: '#fff2f0' }}>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9', fontWeight: 'bold' }}>Referencia diferente</td>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>→ Revisa type</td>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>Continúa análisis</td>
                  </tr>
                  <tr style={{ backgroundColor: '#fff7e6' }}>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9', paddingLeft: '30px' }}>Type igual</td>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>Actualiza props</td>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>Re-renderiza componente</td>
                  </tr>
                  <tr style={{ backgroundColor: '#fff2f0' }}>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9', paddingLeft: '30px' }}>Type diferente</td>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>Desmonta y monta</td>
                    <td style={{ padding: '12px', border: '1px solid #d9d9d9' }}>Reemplaza subárbol completo</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <CodeBlock code={`// Ejemplo de componente con estado
const Parent = () => {
  const [state, setState] = React.useState(0);
  return <Child />;
};

// React usa Object.is() para comparar referencias de objetos
// y decide qué actualizar basándose en la tabla anterior`} />
          </div>
        )}
      </div>

      <div style={{ 
        backgroundColor: '#fff7e6', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #ffd591',
        margin: '20px 0'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#fa8c16' }}>💡 Implicaciones para el rendimiento</h4>
        <p style={{ margin: 0, color: 'black' }}>
          Entender estos conceptos es fundamental para optimizar el rendimiento de nuestras aplicaciones React. 
          Si pasamos elementos como props (en lugar de crearlos dentro del componente), estos mantienen su 
          referencia entre renderizados, lo que puede evitar re-renderizados innecesarios de componentes hijos.
        </p>
      </div>
    </div>
  );
};
