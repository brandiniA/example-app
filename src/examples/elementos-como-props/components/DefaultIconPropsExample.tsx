import React, { useState } from 'react';

// Componente de icono de carga
const Loading = ({ color = 'black', size = 'medium' }: { color?: string, size?: string }) => {
  return (
    <span style={{ 
      color, 
      fontSize: size === 'large' ? '20px' : '16px',
      marginLeft: '8px',
      display: 'inline-flex',
      alignItems: 'center'
    }}>
      <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        `
      }} />
      <span style={{ marginLeft: '4px', fontSize: '14px' }}>
        [color={color}, size={size}]
      </span>
    </span>
  );
};

// Botón problemático que no fusiona props
const ButtonBad: React.FC<{
  appearance?: 'primary' | 'secondary';
  size?: 'medium' | 'large';
  icon: React.ReactElement;
}> = ({ appearance = 'secondary', size = 'medium', icon }) => {
  // ❌ MAL: esto ignora las props del icono para siempre
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };
  
  const clonedIcon = React.cloneElement(icon, defaultIconProps);
  
  return (
    <button style={{
      padding: size === 'large' ? '12px 24px' : '8px 16px',
      backgroundColor: appearance === 'primary' ? '#1890ff' : 'white',
      color: appearance === 'primary' ? 'white' : '#1890ff',
      border: appearance === 'primary' ? 'none' : '1px solid #1890ff',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: 'bold'
    }}>
      Submit {clonedIcon}
    </button>
  );
};

// Botón correcto que fusiona props
const ButtonGood: React.FC<{
  appearance?: 'primary' | 'secondary';
  size?: 'medium' | 'large';
  icon: React.ReactElement;
}> = ({ appearance = 'secondary', size = 'medium', icon }) => {
  // ✅ BIEN: Define defaults basados en props del botón
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };
  
  // Defaults primero, luego props del icono → las props del consumidor ganan
  const mergedProps = { ...defaultIconProps, ...icon.props };
  const clonedIcon = React.cloneElement(icon, mergedProps);
  
  return (
    <button style={{
      padding: size === 'large' ? '12px 24px' : '8px 16px',
      backgroundColor: appearance === 'primary' ? '#1890ff' : 'white',
      color: appearance === 'primary' ? 'white' : '#1890ff',
      border: appearance === 'primary' ? 'none' : '1px solid #1890ff',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: 'bold'
    }}>
      Submit {clonedIcon}
    </button>
  );
};

export const DefaultIconPropsExample: React.FC = () => {
  const [step, setStep] = useState(0);
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setStep((step + 1) % 3)}
          style={{
            padding: '8px 16px',
            backgroundColor: step === 0 ? '#722ed1' : step === 1 ? '#ff4d4f' : '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {step === 0 ? "Ver el Problema" : step === 1 ? "Ver Implementación Incorrecta" : "Ver Implementación Correcta"}
        </button>
      </div>
      
      {step === 0 ? (
        <div>
          <h3 style={{ color: '#722ed1' }}>El Balance entre Flexibilidad y Control</h3>
          
          <div style={{ 
            backgroundColor: '#f9f0ff', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #d3adf7',
            margin: '20px 0'
          }}>
            <p style={{ margin: '0 0 10px 0', color: 'black' }}>
              En componentes como <code>Button</code>, pasar un <code>icon</code> como elemento ofrece flexibilidad... 
              quizá <strong>demasiada</strong>. Queremos control por defecto (colores, tamaños, estado "disabled") 
              sin obligar al consumidor a recordarlo siempre:
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
{`<Button appearance="primary" icon={<Loading color="white" />} />
<Button appearance="secondary" icon={<Loading color="black" />} />
<Button appearance="large" icon={<Loading size="large" />} />`}
            </pre>
          </div>
          
          <p style={{ color: 'black', marginBottom: '15px' }}>
            La mitad del tiempo se olvidará o se malentenderá. Necesitamos <strong>valores por defecto</strong> que 
            el <code>Button</code> pueda aplicar sin perder la capacidad de que el consumidor los <strong>sobre-escriba</strong>.
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>El Problema Ilustrado:</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
              <ButtonGood appearance="primary" icon={<Loading />} />
              <ButtonGood appearance="secondary" icon={<Loading />} />
              <ButtonGood appearance="secondary" size="large" icon={<Loading />} />
            </div>
            <p style={{ color: 'black' }}>
              Idealmente, queremos que los iconos tengan colores y tamaños adecuados automáticamente según 
              el <code>appearance</code> y <code>size</code> del botón, pero sin tener que especificarlo manualmente cada vez.
            </p>
          </div>
        </div>
      ) : step === 1 ? (
        <div>
          <h3 style={{ color: '#ff4d4f' }}>❌ Problema: Sobreescribir Props del Elemento</h3>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const Button = ({ appearance, size, icon }) => {
  // Assume \`icon\` is a valid React element
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };

  // ❌ MAL: esto ignora las props del icono para siempre
  const clonedIcon = React.cloneElement(icon, defaultIconProps);

  return <button>Submit {clonedIcon}</button>;
};`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
            <p style={{ color: 'black', marginBottom: '15px' }}>
              Observa cómo el color <code>red</code> no funciona porque los defaults sobreescriben la intención del usuario:
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
              <ButtonBad appearance="primary" icon={<Loading />} />
              <ButtonBad appearance="secondary" icon={<Loading />} />
              <ButtonBad appearance="secondary" size="large" icon={<Loading />} />
              <ButtonBad appearance="secondary" icon={<Loading color="red" />} />
            </div>
            <p style={{ color: 'black' }}>
              En el último botón, intentamos usar <code>color="red"</code> pero el color sigue siendo negro 
              porque la implementación sobreescribe completamente las props del icono.
            </p>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Problemas:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>Rompe la API del icono al ignorar las props pasadas por el consumidor</li>
              <li>No permite personalización más allá de los defaults</li>
              <li>Frustra a los desarrolladores que intentan personalizar el icono</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#52c41a' }}>✅ Solución: Fusionar Props</h3>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const Button = ({ appearance, size, icon }) => {
  // Assume \`icon\` is a valid React element
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };

  // Defaults primero, luego props del icono → consumidor gana
  const mergedProps = { ...defaultIconProps, ...icon.props };
  const clonedIcon = React.cloneElement(icon, mergedProps);

  return <button>Submit {clonedIcon}</button>;
};`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
            <p style={{ color: 'black', marginBottom: '15px' }}>
              Ahora el color <code>red</code> funciona correctamente porque las props del consumidor tienen prioridad:
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
              <ButtonGood appearance="primary" icon={<Loading />} />
              <ButtonGood appearance="secondary" icon={<Loading />} />
              <ButtonGood appearance="secondary" size="large" icon={<Loading />} />
              <ButtonGood appearance="secondary" icon={<Loading color="red" />} />
            </div>
            <p style={{ color: 'black' }}>
              En el último botón, <code>color="red"</code> funciona correctamente porque la implementación 
              fusiona las props en el orden correcto, permitiendo que las props del consumidor ganen.
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: '#fff7e6', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ffd591',
            marginBottom: '20px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>🔍 Regla de oro</h4>
            <p style={{ margin: 0, color: 'black' }}>
              Defaults primero, props del elemento después (<code>&#123; ...defaults, ...icon.props &#125;</code>).
              Así el consumidor siempre puede anular el default.
            </p>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Beneficios:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>Proporciona valores por defecto sensibles basados en el contexto</li>
              <li>Respeta la intención del consumidor permitiendo sobreescribir los defaults</li>
              <li>Mantiene la API del icono intacta</li>
              <li>Ofrece lo mejor de ambos mundos: defaults inteligentes y personalización</li>
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
        <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>✅ Buenas Prácticas</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
          <li>Deriva los defaults desde el <strong>estado/props</strong> del padre (p. ej., <code>appearance</code>, <code>size</code>, <code>disabled</code>)</li>
          <li>Deja que el <strong>consumidor</strong> tenga la última palabra al sobre-escribir</li>
          <li>No "congeles" la API del icono aplicando defaults sin fusionar</li>
        </ul>
      </div>
    </div>
  );
};
