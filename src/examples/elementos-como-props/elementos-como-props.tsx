import React from 'react';
import { Link } from 'react-router';
import { ButtonExample } from './components/ButtonExample';
import { ModalDialogExample } from './components/ModalDialogExample';
import { ThreeColumnLayoutExample } from './components/ThreeColumnLayoutExample';
import { DefaultIconPropsExample } from './components/DefaultIconPropsExample';
import { ConditionalRenderingExample } from './components/ConditionalRenderingExample';

export const ElementosComoProps = () => {
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
          ✨ Elementos como Props
        </h1>
        <p style={{ margin: 0, color: 'black', fontSize: '16px' }}>
          Soluciones elegantes a problemas de configuración en React
        </p>
      </div>

      {/* Sección 1: El problema de la sobreconfiguración */}
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
          1. El Problema de la Sobreconfiguración
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Objetivo</h3>
          <p style={{ color: 'black' }}>
            Entender cómo la sobreconfiguración de componentes con props puede llevar a la complejidad y a funcionalidades difíciles de mantener.
          </p>

          <div style={{ 
            backgroundColor: '#fff2f0', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ffccc7',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>⚠️ El Problema</h4>
            <p style={{ margin: 0, color: 'black' }}>
              Cuando un componente necesita manejar múltiples variaciones y configuraciones, 
              puede terminar con demasiadas props específicas que lo hacen difícil de mantener.
            </p>
          </div>
        </div>
        
        <ButtonExample />
      </section>

      {/* Sección 2: Pasar elementos en lugar de props */}
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
          2. Pasar Elementos en Lugar de Props
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Objetivo</h3>
          <p style={{ color: 'black' }}>
            Aprender cómo simplificar la API de nuestros componentes pasando elementos React directamente como props.
          </p>

          <div style={{ 
            backgroundColor: '#e6f7ff', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #91caff',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>💡 Concepto Clave</h4>
            <p style={{ margin: 0, color: 'black' }}>
              En lugar de configurar componentes mediante múltiples props, acéptalos como <strong>elementos</strong>. 
              El consumidor tiene control total sobre el estilo, color y ubicación.
            </p>
          </div>
        </div>
        
        <ModalDialogExample />
      </section>

      {/* Sección 3: Children como azúcar sintáctico */}
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
          3. Children como Azúcar Sintáctico
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Objetivo</h3>
          <p style={{ color: 'black' }}>
            Comprender cómo la prop especial <code>children</code> nos permite una sintaxis más limpia y legible.
          </p>

          <div style={{ 
            backgroundColor: '#f6ffed', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #b7eb8f',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>💡 Concepto Clave</h4>
            <p style={{ margin: 0, color: 'black' }}>
              Cuando algo es la <strong>parte principal</strong> del componente, usar <code>children</code> es más limpio 
              que una prop dedicada. Recuerda que <code>children</code> no es más que una prop con sintaxis especial.
            </p>
          </div>
        </div>
        
        <ThreeColumnLayoutExample />
      </section>

      {/* Sección 4: Renderizado condicional y rendimiento */}
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
          4. Renderizado Condicional y Rendimiento
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Objetivo</h3>
          <p style={{ color: 'black' }}>
            Entender las implicaciones de rendimiento al usar elementos como props en renderizado condicional.
          </p>

          <div style={{ 
            backgroundColor: '#fff7e6', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ffd591',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>🔍 Concepto Clave</h4>
            <p style={{ margin: 0, color: 'black' }}>
              Crear elementos con JSX (<code>&lt;Component /&gt;</code>) solo crea objetos ligeros, 
              no ejecuta el componente. El renderizado real ocurre solo cuando React procesa estos elementos.
            </p>
          </div>
        </div>
        
        <ConditionalRenderingExample />
      </section>

      {/* Sección 5: Valores por defecto para elementos */}
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
          color: '#722ed1',
          borderBottom: '2px solid #722ed1',
          paddingBottom: '10px'
        }}>
          5. Valores por Defecto para Elementos
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Objetivo</h3>
          <p style={{ color: 'black' }}>
            Aprender a mantener la flexibilidad de los elementos como props mientras proporcionamos valores por defecto.
          </p>

          <div style={{ 
            backgroundColor: '#f9f0ff', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #d3adf7',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>💡 Concepto Clave</h4>
            <p style={{ margin: 0, color: 'black' }}>
              Usa <code>React.cloneElement(icon, newProps)</code> para inyectar props por defecto mientras 
              respetas las props originales del elemento.
            </p>
          </div>
        </div>
        
        <DefaultIconPropsExample />
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
            <h4 style={{ color: '#ff4d4f', marginBottom: '15px' }}>⚠️ Evitar</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Sobreconfigurar componentes con muchas props específicas</li>
              <li>Crear props para cada posible variación</li>
              <li>Ocultar valores por defecto sin documentación clara</li>
              <li>Romper la API de los elementos al aplicar defaults</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#52c41a', marginBottom: '15px' }}>✅ Preferir</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Pasar elementos completos como props</li>
              <li>Usar children para el contenido principal</li>
              <li>Mantener una API flexible y clara</li>
              <li>Respetar las props originales al clonar elementos</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#1890ff', marginBottom: '15px' }}>🔍 Recordar</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Los elementos son objetos ligeros, no componentes ejecutados</li>
              <li>Children es solo una prop con sintaxis especial</li>
              <li>El renderizado real ocurre cuando React procesa los elementos</li>
              <li>Al fusionar props, el orden importa (defaults primero, props del elemento después)</li>
            </ul>
          </div>
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

export default ElementosComoProps;
