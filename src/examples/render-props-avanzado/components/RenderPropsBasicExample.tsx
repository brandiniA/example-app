import React, { useState } from 'react';

// Componentes de iconos simples para el ejemplo
const HomeIcon = ({ color = 'black', size = 'medium' }: { color?: string, size?: string }) => (
  <div style={{ 
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color,
    fontSize: size === 'large' ? '20px' : '16px',
    marginLeft: '8px'
  }}>
    <span>🏠</span>
    <span style={{ marginLeft: '4px', fontSize: '12px' }}>
      [color={color}, size={size}]
    </span>
  </div>
);

const HomeIconHovered = ({ color = 'black', size = 'medium' }: { color?: string, size?: string }) => (
  <div style={{ 
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color,
    fontSize: size === 'large' ? '20px' : '16px',
    marginLeft: '8px',
    fontWeight: 'bold'
  }}>
    <span>🏠</span>
    <span style={{ marginLeft: '4px', fontSize: '12px' }}>
      [HOVERED, color={color}, size={size}]
    </span>
  </div>
);

// Botón problemático con cloneElement
const ButtonWithCloneElement: React.FC<{
  appearance?: 'primary' | 'secondary';
  size?: 'medium' | 'large';
  icon: React.ReactElement;
}> = ({ appearance = 'secondary', size = 'medium', icon }) => {
  // Aunque definimos el estado de hover, no podemos usarlo efectivamente con el ícono
  const [, setIsHovered] = useState(false);
  
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };
  
  // Usamos type assertion para evitar errores de TypeScript con la propagación de props
  const clonedIcon = React.cloneElement(icon, {
    ...defaultIconProps,
    ...(icon.props as object),
  });
  
  return (
    <button 
      style={{
        padding: size === 'large' ? '12px 24px' : '8px 16px',
        backgroundColor: appearance === 'primary' ? '#1890ff' : 'white',
        color: appearance === 'primary' ? 'white' : '#1890ff',
        border: appearance === 'primary' ? 'none' : '1px solid #1890ff',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 'bold'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Submit {clonedIcon}
      {/* Nota: isHovered cambia pero el ícono no puede reaccionar a este cambio */}
    </button>
  );
};

// Definición de tipo para las props de iconos
type IconProps = {
  size?: string;
  color?: string;
};

// Solución: Botón con render props
const ButtonWithRenderProps: React.FC<{
  appearance?: 'primary' | 'secondary';
  size?: 'medium' | 'large';
  renderIcon: (defaultProps: IconProps, state: { isHovered: boolean }) => React.ReactNode;
}> = ({ appearance = 'secondary', size = 'medium', renderIcon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const defaultIconProps: IconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };
  
  return (
    <button 
      style={{
        padding: size === 'large' ? '12px 24px' : '8px 16px',
        backgroundColor: appearance === 'primary' ? '#1890ff' : 'white',
        color: appearance === 'primary' ? 'white' : '#1890ff',
        border: appearance === 'primary' ? 'none' : '1px solid #1890ff',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 'bold'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Submit {renderIcon(defaultIconProps, { isHovered })}
    </button>
  );
};

export const RenderPropsBasicExample: React.FC = () => {
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
          {step === 0 ? "Ver Problema con cloneElement" : step === 1 ? "Ver Solución con Render Props" : "Ver Ejemplo Completo"}
        </button>
      </div>
      
      {step === 0 ? (
        <div>
          <h3 style={{ color: '#ff4d4f' }}>❌ Problema con cloneElement y Compartir Estado</h3>
          
          <div style={{ 
            backgroundColor: '#fff2f0', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ffccc7',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ff4d4f' }}>El Problema en Detalle</h4>
            <p style={{ margin: '0 0 10px 0', color: 'black' }}>
              En la sección anterior vimos cómo <code>cloneElement</code> puede inyectar props por defecto 
              (como tamaño o color) en un elemento. Sin embargo, este enfoque tiene una limitación crítica:
            </p>
            <p style={{ margin: 0, color: 'black' }}>
              <strong>No hay forma de compartir el estado interno del componente con el elemento clonado.</strong> 
              Por ejemplo, si nuestro botón tiene un estado de <code>hover</code> y queremos que el ícono 
              cambie cuando el usuario pasa el cursor sobre el botón, <code>cloneElement</code> no puede 
              transmitir este estado al ícono.
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
{`// ❌ Elemento como prop + cloneElement (solo funciona bajo supuestos estrictos)
const Button = ({ appearance = 'secondary', size = 'medium', icon }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
    // ❌ No podemos pasar isHovered aquí de forma efectiva
  };

  const clonedIcon = React.cloneElement(icon, {
    ...defaultIconProps,
    ...icon.props,
  });

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Submit {clonedIcon}
    </button>
  );
};`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
            <p style={{ color: 'black', marginBottom: '15px' }}>
              Pasa el cursor sobre estos botones. Aunque el botón detecta el hover, <strong>el ícono no puede reaccionar</strong> 
              porque el estado de hover está aislado dentro del componente Button y no se puede compartir efectivamente con el ícono.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <ButtonWithCloneElement appearance="primary" icon={<HomeIcon />} />
              <ButtonWithCloneElement appearance="secondary" icon={<HomeIcon />} />
              <ButtonWithCloneElement appearance="secondary" size="large" icon={<HomeIcon />} />
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: '#f9f0ff', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #d3adf7',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#722ed1' }}>¿Por qué ocurre esto?</h4>
            <p style={{ margin: 0, color: 'black' }}>
              Cuando usamos <code>cloneElement</code>, el clonado ocurre durante el renderizado inicial, 
              pero el estado de hover cambia <strong>después</strong> de ese renderizado. El ícono ya está 
              clonado con las props iniciales y no "ve" los cambios de estado posteriores. Para que el ícono 
              reaccione al hover, necesitaríamos alguna forma de pasar el estado actual al ícono en cada cambio.
            </p>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Problemas:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>El estado de hover existe en el botón pero <strong>está aislado del ícono</strong></li>
              <li>Se hacen <strong>supuestos rígidos</strong> sobre los props que acepta el ícono</li>
              <li>Si cambias de librería de íconos y sus props son diferentes, el botón fallará</li>
              <li>No hay forma de que el ícono reaccione al estado del botón (hover, focus, etc.)</li>
            </ul>
          </div>
        </div>
      ) : step === 1 ? (
        <div>
          <h3 style={{ color: '#fa8c16' }}>🛠️ Solución: Render Props</h3>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const Button = ({ size, appearance, renderIcon }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Submit {renderIcon(defaultIconProps, { isHovered })}
    </button>
  );
};`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <ButtonWithRenderProps 
                appearance="primary" 
                renderIcon={(props) => <HomeIcon {...props} />} 
              />
              <ButtonWithRenderProps 
                appearance="secondary" 
                renderIcon={(props, state) => 
                  state.isHovered ? <HomeIconHovered {...props} /> : <HomeIcon {...props} />
                } 
              />
              <ButtonWithRenderProps 
                appearance="secondary" 
                size="large" 
                renderIcon={(props, state) => 
                  <HomeIcon {...props} color={state.isHovered ? "red" : props.color} />
                } 
              />
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
            <h4 style={{ color: '#fa8c16', marginTop: 0 }}>Uso:</h4>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`// Ícono simple que usa los props por defecto
<Button renderIcon={(props) => <HomeIcon {...props} />} />

// Cambiar íconos cuando hay hover
<Button
  renderIcon={(props, state) =>
    state.isHovered ? <HomeIconHovered {...props} /> : <HomeIcon {...props} />
  }
/>

// Aplicar estilos al hacer hover
<Button
  renderIcon={(props, state) => (
    <HomeIcon {...props} color={state.isHovered ? "red" : props.color} />
  )}
/>`}
            </pre>
          </div>
          
          <div style={{ 
            backgroundColor: '#f6ffed', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #b7eb8f',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#52c41a' }}>¿Cómo soluciona esto el problema de compartir estado?</h4>
            <p style={{ margin: 0, color: 'black' }}>
              Con render props, el renderizado del ícono ocurre <strong>en cada ciclo de renderizado</strong> del botón. 
              Cuando el estado de hover cambia, el botón se re-renderiza y llama a la función <code>renderIcon</code> con 
              el estado actualizado. Esto significa que el ícono siempre tiene acceso al estado más reciente y puede 
              reaccionar a él, a diferencia de <code>cloneElement</code> que solo ocurre una vez.
            </p>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Beneficios:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>Todo es explícito: no hay sobrescrituras ocultas, ni supuestos</li>
              <li>El consumidor adapta los valores según necesite</li>
              <li>El estado del botón (hover) ahora es compartible con el ícono</li>
              <li>Fácil de adaptar a diferentes librerías de íconos</li>
              <li>El ícono puede reaccionar dinámicamente a los cambios de estado del botón</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#52c41a' }}>✅ Ejemplo Completo</h3>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const Button = ({ size = 'medium', appearance = 'secondary', renderIcon }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Submit {renderIcon(defaultIconProps, { isHovered })}
    </button>
  );
};`}
            </pre>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'black' }}>Demostración Interactiva:</h4>
            <p style={{ color: 'black', marginBottom: '15px' }}>
              Pasa el cursor sobre los botones para ver cómo el estado de hover se comparte con los íconos:
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <ButtonWithRenderProps 
                appearance="primary" 
                renderIcon={(props, state) => 
                  state.isHovered ? <HomeIconHovered {...props} /> : <HomeIcon {...props} />
                } 
              />
              <ButtonWithRenderProps 
                appearance="secondary" 
                renderIcon={(props, state) => 
                  <HomeIcon {...props} color={state.isHovered ? "red" : props.color} />
                } 
              />
              <ButtonWithRenderProps 
                appearance="secondary" 
                size="large" 
                renderIcon={(props, state) => 
                  state.isHovered ? 
                    <HomeIconHovered {...props} color="red" /> : 
                    <HomeIcon {...props} />
                } 
              />
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'black' }}>
              <strong>Resultados:</strong>
            </p>
            <ul style={{ color: 'black' }}>
              <li>El ícono <strong>hereda los valores por defecto</strong> del Button (<code>size</code>, <code>color</code>)</li>
              <li>Los consumidores pueden <strong>sobrescribir</strong> o <strong>traducir</strong> esos valores</li>
              <li>El estado del Button como hover ahora es <strong>compartible y trazable</strong></li>
              <li>La comunicación entre componentes es explícita y clara</li>
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
          Ahora que entendemos cómo usar render props para compartir estado y configuración, 
          veremos cómo podemos usar <code>children</code> como una render prop para lograr 
          una sintaxis aún más limpia.
        </p>
      </div>
    </div>
  );
};
