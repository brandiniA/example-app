import React, { useState } from 'react';

// Componentes simples para el ejemplo
const Sidebar: React.FC = () => (
  <div style={{ 
    backgroundColor: '#f0f5ff', 
    padding: '15px', 
    borderRadius: '6px',
    border: '1px solid #d6e4ff',
    height: '100%'
  }}>
    <h3 style={{ color: '#1890ff', margin: '0 0 15px 0' }}>Sidebar</h3>
    <ul style={{ 
      listStyle: 'none', 
      padding: 0, 
      margin: 0,
      color: 'black'
    }}>
      <li style={{ padding: '8px 0', borderBottom: '1px solid #d6e4ff' }}>Elemento 1</li>
      <li style={{ padding: '8px 0', borderBottom: '1px solid #d6e4ff' }}>Elemento 2</li>
      <li style={{ padding: '8px 0', borderBottom: '1px solid #d6e4ff' }}>Elemento 3</li>
      <li style={{ padding: '8px 0' }}>Elemento 4</li>
    </ul>
  </div>
);

const MainContent: React.FC = () => (
  <div style={{ 
    backgroundColor: '#fff', 
    padding: '15px', 
    borderRadius: '6px',
    border: '1px solid #d9d9d9',
    height: '100%'
  }}>
    <h3 style={{ color: 'black', margin: '0 0 15px 0' }}>Contenido Principal</h3>
    <p style={{ color: 'black' }}>
      Este es el contenido principal de la página. Aquí iría el contenido más importante.
    </p>
    <p style={{ color: 'black' }}>
      Podemos incluir texto, imágenes, formularios o cualquier otro elemento que necesitemos.
    </p>
  </div>
);

const Notifications: React.FC = () => (
  <div style={{ 
    backgroundColor: '#f6ffed', 
    padding: '15px', 
    borderRadius: '6px',
    border: '1px solid #b7eb8f',
    height: '100%'
  }}>
    <h3 style={{ color: '#52c41a', margin: '0 0 15px 0' }}>Notificaciones</h3>
    <div style={{ 
      backgroundColor: '#fff', 
      padding: '10px', 
      borderRadius: '4px',
      marginBottom: '10px',
      border: '1px solid #d9d9d9'
    }}>
      <p style={{ color: 'black', margin: 0 }}>Nueva actualización disponible</p>
    </div>
    <div style={{ 
      backgroundColor: '#fff', 
      padding: '10px', 
      borderRadius: '4px',
      border: '1px solid #d9d9d9'
    }}>
      <p style={{ color: 'black', margin: 0 }}>Tienes 3 mensajes sin leer</p>
    </div>
  </div>
);

// Componente de layout de tres columnas
const ThreeColumnLayout: React.FC<{
  leftColumn: React.ReactNode;
  middleColumn: React.ReactNode;
  rightColumn: React.ReactNode;
}> = ({ leftColumn, middleColumn, rightColumn }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      minHeight: '300px'
    }}>
      <div>{leftColumn}</div>
      <div>{middleColumn}</div>
      <div>{rightColumn}</div>
    </div>
  );
};

// Componente de layout mejorado usando children para la columna del medio
const ThreeColumnLayoutImproved: React.FC<{
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  children: React.ReactNode;
}> = ({ leftColumn, rightColumn, children }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      minHeight: '300px'
    }}>
      <div>{leftColumn}</div>
      <div>{children}</div>
      <div>{rightColumn}</div>
    </div>
  );
};

export const ThreeColumnLayoutExample: React.FC = () => {
  const [showImproved, setShowImproved] = useState(false);
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setShowImproved(!showImproved)}
          style={{
            padding: '8px 16px',
            backgroundColor: showImproved ? '#52c41a' : '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {showImproved ? "Ver Versión Original" : "Ver Versión Mejorada"}
        </button>
      </div>
      
      {!showImproved ? (
        <div>
          <h3 style={{ color: '#1890ff' }}>Layout de Tres Columnas</h3>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const ThreeColumnLayout = ({ leftColumn, middleColumn, rightColumn }) => {
    return (
        <div className="three-column">
            <div>{leftColumn}</div>
            <div>{middleColumn}</div>
            <div>{rightColumn}</div>
        </div>
    )
}`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
            <ThreeColumnLayout 
              leftColumn={<Sidebar />}
              middleColumn={<MainContent />}
              rightColumn={<Notifications />}
            />
          </div>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <h4 style={{ color: '#1890ff', marginTop: 0 }}>Uso:</h4>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`<ThreeColumnLayout
    leftColumn={<Sidebar />}
    middleColumn={<MainContent />}
    rightColumn={<Notifications />}
/>`}
            </pre>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Beneficios:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>El componente de layout solo se preocupa por la estructura</li>
              <li>Puedes pasar cualquier componente en cada columna</li>
              <li>Clara separación entre estructura y contenido</li>
              <li>Fácil de extender sin modificar el componente de layout</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#52c41a' }}>Layout Mejorado con Children</h3>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const ThreeColumnLayout = ({ leftColumn, children, rightColumn }) => {
    return (
        <div className="three-column">
            <div>{leftColumn}</div>
            <div>{children}</div>
            <div>{rightColumn}</div>
        </div>
    )
}`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
            <ThreeColumnLayoutImproved 
              leftColumn={<Sidebar />}
              rightColumn={<Notifications />}
            >
              <MainContent />
            </ThreeColumnLayoutImproved>
          </div>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <h4 style={{ color: '#52c41a', marginTop: 0 }}>Uso:</h4>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`<ThreeColumnLayout
    leftColumn={<Sidebar />}
    rightColumn={<Notifications />}
>
    <MainContent />
</ThreeColumnLayout>`}
            </pre>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Beneficios adicionales:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>Sintaxis más limpia para el contenido principal</li>
              <li>Destaca visualmente qué contenido es el principal</li>
              <li>Mantiene todos los beneficios del patrón original</li>
              <li>Mejor legibilidad del código</li>
            </ul>
          </div>
        </div>
      )}
      
      <div style={{ 
        backgroundColor: '#f6ffed', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #b7eb8f',
        marginTop: '30px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>🚀 Próximo Paso</h4>
        <p style={{ margin: 0, color: 'black' }}>
          Una preocupación común con este patrón es el rendimiento. En la siguiente sección veremos cómo 
          funciona realmente el renderizado condicional con elementos como props.
        </p>
      </div>
    </div>
  );
};
