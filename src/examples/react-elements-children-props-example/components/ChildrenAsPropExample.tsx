import React, { useState } from 'react';

export const ChildrenAsPropExample: React.FC = () => {
  const [showExplicit, setShowExplicit] = useState(false);
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setShowExplicit(!showExplicit)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {showExplicit ? "Mostrar anidamiento JSX" : "Mostrar prop explícito"}
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
        <div style={{ 
          flex: '1 1 400px', 
          backgroundColor: showExplicit ? '#f0f5ff' : '#fff7e6', 
          padding: '20px', 
          borderRadius: '8px',
          border: `1px solid ${showExplicit ? '#d6e4ff' : '#ffd591'}`
        }}>
          <h3 style={{ color: showExplicit ? '#1890ff' : '#fa8c16', marginTop: 0 }}>
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

      <div style={{ 
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        padding: '20px',
        borderRadius: '6px',
        marginTop: '20px',
        overflowX: 'auto'
      }}>
        <h4 style={{ color: '#f9fafb', marginTop: 0 }}>Implementación básica:</h4>
        <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// Antes: usando un prop 'child' personalizado
const Parent = ({ child }) => {
  return child;
};

// Después: usando el prop estándar 'children'
const Parent = ({ children }) => {
  return children;
};

// Uso:
<Parent>
  <div>Este contenido se pasa como children</div>
</Parent>`}
        </pre>
      </div>

      <div style={{ 
        backgroundColor: '#fff7e6', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #ffd591',
        margin: '20px 0'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>💡 Beneficios</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
          <li>Mejora la legibilidad y la estructura.</li>
          <li>Al pasar elementos como props (incluyendo <code>children</code>), mantienen su referencia de objeto.</li>
          <li>Los re-renders en el padre <strong>no</strong> desencadenarán re-renders del hijo, a menos que el objeto del elemento cambie.</li>
          <li>Habilita patrones como wrappers de layout, slots y render props.</li>
        </ul>
      </div>
    </div>
  );
};
