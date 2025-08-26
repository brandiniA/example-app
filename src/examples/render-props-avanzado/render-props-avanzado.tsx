import * as React from 'react';
import { Link } from 'react-router';
import { RenderPropsBasicExample } from './components/RenderPropsBasicExample';
import { ChildrenRenderPropsExample } from './components/ChildrenRenderPropsExample';
import { HooksVsRenderPropsExample } from './components/HooksVsRenderPropsExample';

export const RenderPropsAvanzado = () => {
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
          ✨ Render Props Avanzado
        </h1>
        <p style={{ margin: 0, color: 'black', fontSize: '16px' }}>
          Patrones avanzados de compartición de lógica en React
        </p>
      </div>

      {/* Sección 1: Render Props para Renderizar Elementos */}
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
          1. Render Props para Renderizar Elementos
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Objetivo</h3>
          <p style={{ color: 'black' }}>
            Entender cómo las render props permiten que un componente padre pase elementos y estado de forma explícita, 
            sin depender de <code>cloneElement</code> ni adivinar la API de props de un componente hijo.
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
              Un render prop es simplemente una <strong>función pasada como prop</strong> que retorna un elemento de React. 
              En lugar de darle al componente un elemento listo, le damos una función que sabe cómo renderizarlo.
            </p>
          </div>
        </div>
        
        <RenderPropsBasicExample />
      </section>

      {/* Sección 2: Children como Render Props */}
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
          2. Children como Render Props
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Objetivo</h3>
          <p style={{ color: 'black' }}>
            Aprender cómo el patrón "children como render props" permite que un componente comparta su estado interno 
            directamente con los hijos, evitando la duplicación de props/estado en los consumidores.
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
              En lugar de pasar elementos como <code>children</code>, podemos pasar una <strong>función como children</strong> 
              que recibe el estado interno del componente y decide qué renderizar.
            </p>
          </div>
        </div>
        
        <ChildrenRenderPropsExample />
      </section>

      {/* Sección 3: Hooks vs Render Props */}
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
          3. Hooks vs Render Props
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'black' }}>Objetivo</h3>
          <p style={{ color: 'black' }}>
            Comprender cómo los hooks han reemplazado muchos casos de uso de render props, pero también identificar 
            situaciones donde las render props siguen siendo útiles.
          </p>

          <div style={{ 
            backgroundColor: '#fff7e6', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ffd591',
            margin: '20px 0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>💡 Concepto Clave</h4>
            <p style={{ margin: 0, color: 'black' }}>
              Los hooks ofrecen una forma más limpia y simple de compartir lógica con estado, pero las render props 
              siguen siendo útiles en ciertos escenarios, especialmente para aislar actualizaciones y mejorar el rendimiento.
            </p>
          </div>
        </div>
        
        <HooksVsRenderPropsExample />
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
            <h4 style={{ color: '#1890ff', marginBottom: '15px' }}>🔍 Render Props Básicas</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Permiten pasar elementos y estado de forma explícita</li>
              <li>Evitan asumir la API de props de los componentes hijos</li>
              <li>Facilitan compartir estado como hover, focus, etc.</li>
              <li>Hacen que la comunicación entre componentes sea más clara</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#52c41a', marginBottom: '15px' }}>⚡ Children como Render Props</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Usa <code>children</code> como función en lugar de elementos</li>
              <li>Comparte estado interno directamente con los hijos</li>
              <li>Evita duplicar la gestión de estado en consumidores</li>
              <li>Simplifica la API de componentes que comparten lógica</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#fa8c16', marginBottom: '15px' }}>🔄 Hooks vs Render Props</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Los hooks reemplazan muchos casos de uso de render props</li>
              <li>Las render props siguen siendo útiles para aislamiento de actualizaciones</li>
              <li>Considera el rendimiento al elegir entre hooks y render props</li>
              <li>Puedes combinar ambos enfoques según el caso de uso</li>
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

export default RenderPropsAvanzado;
