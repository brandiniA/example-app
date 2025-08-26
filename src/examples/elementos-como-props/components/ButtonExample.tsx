import React, { useState } from 'react';

// Componentes de iconos simples para el ejemplo
const Loading = ({ color = 'black', size = 'medium' }: { color?: string, size?: string }) => (
  <span style={{ 
    color, 
    fontSize: size === 'large' ? '20px' : '16px',
    marginLeft: '8px'
  }}>
    ⟳
  </span>
);

const Error = ({ color = 'red', size = 'medium' }: { color?: string, size?: string }) => (
  <span style={{ 
    color, 
    fontSize: size === 'large' ? '20px' : '16px',
    marginLeft: '8px'
  }}>
    ✖
  </span>
);

const Warning = ({ color = 'orange', size = 'medium' }: { color?: string, size?: string }) => (
  <span style={{ 
    color, 
    fontSize: size === 'large' ? '20px' : '16px',
    marginLeft: '8px'
  }}>
    ⚠
  </span>
);

const Avatar = ({ size = 'medium' }: { size?: string }) => (
  <span style={{ 
    backgroundColor: '#1890ff',
    color: 'white',
    borderRadius: '50%',
    width: size === 'large' ? '24px' : '18px',
    height: size === 'large' ? '24px' : '18px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '8px',
    fontSize: size === 'large' ? '14px' : '12px'
  }}>
    U
  </span>
);

// Ejemplo inicial simple del botón con estado de carga
const ButtonInitial: React.FC<{
  isLoading?: boolean;
}> = ({
  isLoading
}) => {
  return (
    <button style={{
      padding: '8px 16px',
      backgroundColor: '#1890ff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center'
    }}>
      Submit {isLoading ? <Loading /> : null}
    </button>
  );
};

// Ejemplo de botón con demasiadas props (evolución del problema)
const ButtonProblematic: React.FC<{
  isLoading?: boolean;
  iconLeftName?: string;
  iconLeftColor?: string;
  iconLeftSize?: string;
  isIconLeftAvatar?: boolean;
}> = ({
  isLoading,
  iconLeftName,
  iconLeftColor,
  iconLeftSize,
  isIconLeftAvatar
}) => {
  // Lógica compleja para determinar qué icono mostrar
  let iconToShow = null;
  
  if (isLoading) {
    iconToShow = <Loading color={iconLeftColor} size={iconLeftSize} />;
  } else if (iconLeftName === 'error') {
    iconToShow = <Error color={iconLeftColor} size={iconLeftSize} />;
  } else if (iconLeftName === 'warning') {
    iconToShow = <Warning color={iconLeftColor} size={iconLeftSize} />;
  } else if (isIconLeftAvatar) {
    iconToShow = <Avatar size={iconLeftSize} />;
  }
  
  return (
    <button style={{
      padding: '8px 16px',
      backgroundColor: '#1890ff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center'
    }}>
      Submit {iconToShow}
    </button>
  );
};

// Solución: Botón que acepta un elemento como prop
const ButtonSolution: React.FC<{
  icon?: React.ReactNode;
}> = ({ icon }) => {
  return (
    <button style={{
      padding: '8px 16px',
      backgroundColor: '#1890ff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center'
    }}>
      Submit {icon}
    </button>
  );
};

export const ButtonExample: React.FC = () => {
  const [step, setStep] = useState(0);
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setStep((step + 1) % 3)}
          style={{
            padding: '8px 16px',
            backgroundColor: step === 0 ? '#ff4d4f' : step === 1 ? '#fa8c16' : '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {step === 0 ? "Ver Evolución del Problema" : step === 1 ? "Ver Solución" : "Volver al Inicio"}
        </button>
      </div>
      
      {step === 0 ? (
        <div>
          <h3 style={{ color: '#ff4d4f' }}>❌ Problema Inicial</h3>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const Button = ({ isLoading }) => {
    return <button>Submit {isLoading ? <Loading /> : null}</button>
}`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <ButtonInitial isLoading={false} />
              <ButtonInitial isLoading={true} />
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Al principio esto funciona bien. Pero luego:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>El botón debe soportar <strong>diferentes iconos</strong>, no solo el de carga</li>
              <li>Los iconos deben permitir <strong>personalización de color</strong></li>
              <li>Se necesita agregar <strong>control de tamaño</strong></li>
              <li>Los iconos deben aparecer también en el <strong>lado izquierdo</strong>… e incluso avatares</li>
            </ul>
          </div>
        </div>
      ) : step === 1 ? (
        <div>
          <h3 style={{ color: '#fa8c16' }}>❌ Problema: Sobreconfiguración con Props</h3>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const Button = ({
    isLoading,
    iconLeftName,
    iconLeftColor,
    iconLeftSize,
    isIconLeftAvatar,
}) => {
    // Demasiadas props — difícil de mantener
    return ...
}`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <ButtonProblematic isLoading={true} iconLeftColor="white" />
              <ButtonProblematic iconLeftName="error" iconLeftColor="white" />
              <ButtonProblematic iconLeftName="warning" iconLeftColor="yellow" iconLeftSize="large" />
              <ButtonProblematic isIconLeftAvatar={true} />
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Problemas:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>Demasiadas props para configurar un simple icono</li>
              <li>La API es confusa y propensa a errores</li>
              <li>Cada nueva característica requiere más props</li>
              <li>El componente se vuelve difícil de mantener</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#52c41a' }}>✅ Solución: Pasar Elementos como Props</h3>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const Button = ({ icon }) => {
    return <button>Submit {icon}</button>
}`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <ButtonSolution icon={<Loading color="white" />} />
              <ButtonSolution icon={<Error color="white" />} />
              <ButtonSolution icon={<Warning color="yellow" size="large" />} />
              <ButtonSolution icon={<Avatar />} />
            </div>
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
{`<Button icon={<Loading />} />
<Button icon={<Error color="red" />} />
<Button icon={<Warning color="yellow" size="large" />} />
<Button icon={<Avatar />} />`}
            </pre>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Beneficios:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>API simple y clara con una sola prop</li>
              <li>El consumidor tiene control total sobre el estilo y apariencia del icono</li>
              <li>Fácil de extender sin modificar el componente Button</li>
              <li>Mejor separación de responsabilidades</li>
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
          Este concepto se puede aplicar a componentes más complejos como modales o layouts, 
          donde pasar elementos como props simplifica enormemente la API.
        </p>
      </div>
    </div>
  );
};
