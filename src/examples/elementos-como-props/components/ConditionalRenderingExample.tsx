import React, { useState } from 'react';

// Componente para contar renderizados
const RenderCounter: React.FC<{ name: string; color?: string }> = ({ name, color = '#1890ff' }) => {
  const renderCount = React.useRef(0);
  
  // Incrementar contador de renderizados en cada render
  renderCount.current += 1;
  
  return (
    <div style={{ 
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 8px', 
      backgroundColor: '#fff',
      borderRadius: '4px',
      border: `1px solid ${color}`,
      marginRight: '8px',
      marginBottom: '8px'
    }}>
      <span style={{ 
        marginRight: '6px',
        color: 'black',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        {name}:
      </span>
      <span style={{ 
        backgroundColor: color,
        color: 'white',
        padding: '2px 6px',
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {renderCount.current} renders
      </span>
    </div>
  );
};

// Componente Footer para el ejemplo
const Footer: React.FC = () => (
  <div style={{ 
    padding: '15px', 
    backgroundColor: '#f0f5ff',
    borderRadius: '6px',
    border: '1px solid #d6e4ff'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 style={{ color: '#1890ff', margin: 0 }}>Footer</h3>
      <RenderCounter name="Footer" color="#1890ff" />
    </div>
    <p style={{ color: 'black', margin: '10px 0 0 0' }}>
      Este componente simula un footer con botones de acción.
    </p>
  </div>
);

// Componente de diálogo modal
const ModalDialog: React.FC<{
  children: React.ReactNode;
  footer: React.ReactNode;
}> = ({ children, footer }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: 'black', margin: '0' }}>Diálogo Modal</h2>
        <RenderCounter name="Modal" color="#722ed1" />
      </div>
      
      <div className="content" style={{ maxHeight: '300px', overflowY: 'auto', padding: '20px' }}>
        {children}
      </div>
      
      <div className="footer" style={{ padding: '15px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end' }}>
        {footer}
      </div>
    </div>
  );
};

export const ConditionalRenderingExample: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  
  // Incrementar contador de renderizados en cada render
  React.useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, [isDialogOpen]);
  
  // Crear el footer antes de la condición
  const footer = <Footer />;
  
  return (
    <div>
      <h3 style={{ color: '#fa8c16' }}>Renderizado Condicional y Rendimiento</h3>
      
      <div style={{ 
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        padding: '20px',
        borderRadius: '6px',
        marginBottom: '20px',
        overflowX: 'auto'
      }}>
        <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`import { useState } from "react"

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const footer = <Footer />

  return isDialogOpen ? (
    <ModalDialog footer={footer} />
  ) : null
}`}
        </pre>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
        <p style={{ color: 'black' }}>
          <strong>Renderizados del componente App:</strong> {renderCount}
        </p>
        
        <button 
          onClick={() => setIsDialogOpen(!isDialogOpen)}
          style={{
            padding: '8px 16px',
            backgroundColor: isDialogOpen ? '#ff4d4f' : '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {isDialogOpen ? "Cerrar Diálogo" : "Abrir Diálogo"}
        </button>
        
        {isDialogOpen ? (
          <ModalDialog footer={footer}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: 'black', margin: '0 0 15px 0' }}>Contenido del Diálogo</h3>
              <p style={{ color: 'black' }}>
                Observa los contadores de renderizado. Aunque <code>footer</code> se declara 
                fuera de la condición, el componente <code>Footer</code> solo se renderiza 
                cuando el diálogo está abierto.
              </p>
            </div>
          </ModalDialog>
        ) : (
          <div style={{ 
            backgroundColor: '#fff7e6', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ffd591'
          }}>
            <p style={{ color: 'black', margin: 0 }}>
              El diálogo está cerrado. Aunque <code>footer = &lt;Footer /&gt;</code> está declarado,
              el componente <code>Footer</code> no se renderiza hasta que el diálogo se abre.
            </p>
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h4 style={{ color: 'black' }}>Lo que realmente ocurre:</h4>
        <div style={{ 
          backgroundColor: '#f0f5ff', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #d6e4ff',
          marginBottom: '20px'
        }}>
          <p style={{ color: 'black', margin: '0 0 10px 0' }}>
            En React, cuando hacemos <code>const footer = &lt;Footer /&gt;</code>, lo único que creamos es un <strong>elemento</strong>:
            un objeto ligero en memoria que describe qué queremos renderizar.
          </p>
          <p style={{ color: 'black', margin: 0 }}>
            Esto <strong>no ejecuta la función <code>Footer</code> todavía</strong>.
            El renderizado real sucede únicamente cuando el <code>ModalDialog</code> lo devuelve en su <code>return</code>.
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          padding: '20px',
          borderRadius: '6px',
          marginBottom: '20px',
          overflowX: 'auto'
        }}>
          <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// Esto solo crea un objeto elemento, NO ejecuta Footer
const footer = <Footer />

// Equivalente a:
const footer = {
  type: Footer,
  props: {},
  // ...otros datos internos de React
}

// El componente Footer solo se ejecuta cuando se renderiza:
return isDialogOpen ? (
  <ModalDialog footer={footer} />
) : null`}
          </pre>
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#fa8c16' }}>Aplicación Práctica: Rutas</h3>
        
        <p style={{ color: 'black', marginBottom: '15px' }}>
          Este mismo principio explica por qué patrones como <code>React Router</code> son seguros.
          Pareciera que declaramos varias páginas al mismo tiempo, pero en realidad solo son <strong>objetos</strong> hasta que una ruta coincide.
        </p>
        
        <div style={{ 
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          padding: '20px',
          borderRadius: '6px',
          marginBottom: '20px',
          overflowX: 'auto'
        }}>
          <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const App = () => {
  return (
    <>
      <Route path="/some/path" element={<Page />} />
      <Route path="/other/path" element={<OtherPage />} />
    </>
  )
}

// Solo la ruta activa devolverá su elemento y se renderizará.`}
          </pre>
        </div>
        
        <p style={{ color: 'black', marginBottom: '15px' }}>
          Aunque no haya condición explícita, <strong>solo la ruta activa devolverá su elemento y se renderizará</strong>.
          Esto permite definir todas las rutas de nuestra aplicación sin preocuparnos por el rendimiento.
        </p>
      </div>
      
      <div style={{ 
        backgroundColor: '#f6ffed', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #b7eb8f',
        marginTop: '30px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>✅ Buenas Prácticas</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
          <li>No confundas "crear un elemento" con "renderizar un componente"</li>
          <li>Los elementos creados fuera de la condición son objetos livianos y seguros</li>
          <li>Si necesitas cálculos pesados para props, protégelos con condición o <code>useMemo</code></li>
          <li>Evita ejecutar lógica costosa dentro de JSX si el componente no se va a mostrar</li>
        </ul>
      </div>
      
      <div style={{ 
        backgroundColor: '#f6ffed', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #b7eb8f',
        marginTop: '30px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>🚀 Próximo Paso</h4>
        <p style={{ margin: 0, color: 'black' }}>
          Ahora que entendemos cómo funciona el renderizado condicional, veamos cómo podemos proporcionar 
          valores por defecto para elementos pasados como props.
        </p>
      </div>
    </div>
  );
};
