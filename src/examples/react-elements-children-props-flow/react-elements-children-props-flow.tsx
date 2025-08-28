import React from 'react';
import { Link } from 'react-router';
import { ElementsVsComponentsSection } from './components/ElementsVsComponentsSection';
import { RenderingProblemSection } from './components/RenderingProblemSection';
import { ContentPropSolutionSection } from './components/ContentPropSolutionSection';
import { ChildrenAsPropSection } from './components/ChildrenAsPropSection';
import { PracticalComparisonSection } from './components/PracticalComparisonSection';

export const ReactElementsChildrenPropsFlow = () => {
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
          ✨ React — Elementos, Children como Props y Re-renderizados
        </h1>
        <p style={{ margin: 0, color: 'black', fontSize: '16px' }}>
          Un recorrido progresivo para entender la optimización de componentes
        </p>
      </div>

      {/* Sección 1: Elementos vs Componentes */}
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
          1. Elementos vs Componentes en React
        </h2>
        
        <ElementsVsComponentsSection />

        <div style={{ 
          backgroundColor: '#f6ffed', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #b7eb8f',
          marginTop: '30px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>🚀 Próximo Paso</h4>
          <p style={{ margin: 0, color: 'black' }}>
            Ahora que entendemos la diferencia entre elementos y componentes, vamos a ver cómo esto afecta
            al rendimiento en un escenario real: un área con scroll que contiene componentes costosos.
          </p>
        </div>
      </section>

      {/* Sección 2: El problema del área con scroll */}
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
          2. El Problema del Área con Scroll
        </h2>
        
        <RenderingProblemSection />

        <div style={{ 
          backgroundColor: '#f6ffed', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #b7eb8f',
          marginTop: '30px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>🚀 Próximo Paso</h4>
          <p style={{ margin: 0, color: 'black' }}>
            Ahora que hemos identificado el problema, veamos cómo podemos resolverlo extrayendo el estado
            y pasando los componentes costosos como props.
          </p>
        </div>
      </section>

      {/* Sección 3: Solución con content prop */}
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
          3. Extrayendo Estado y Pasando Contenido como Prop
        </h2>
        
        <ContentPropSolutionSection />

        <div style={{ 
          backgroundColor: '#f6ffed', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #b7eb8f',
          marginTop: '30px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>🚀 Próximo Paso</h4>
          <p style={{ margin: 0, color: 'black' }}>
            La solución funciona, pero podemos mejorar la sintaxis y legibilidad usando el prop especial
            <code> children</code> en lugar de un prop personalizado como <code>content</code>.
          </p>
        </div>
      </section>

      {/* Sección 4: Children como Props */}
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
          4. Children como Props - Una Forma Más Elegante
        </h2>
        
        <ChildrenAsPropSection />

        <div style={{ 
          backgroundColor: '#f6ffed', 
          padding: '15px', 
          borderRadius: '6px',
          border: '1px solid #b7eb8f',
          marginTop: '30px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>🚀 Próximo Paso</h4>
          <p style={{ margin: 0, color: 'black' }}>
            Para finalizar, comparemos las diferentes soluciones para entender mejor cuándo usar cada enfoque.
          </p>
        </div>
      </section>

      {/* Sección 5: Comparación práctica */}
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
          color: '#eb2f96',
          borderBottom: '2px solid #eb2f96',
          paddingBottom: '10px'
        }}>
          5. Comparación Práctica de Enfoques
        </h2>
        
        <PracticalComparisonSection />
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
            <h4 style={{ color: '#1890ff', marginBottom: '15px' }}>🎯 Elementos y Componentes</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Un componente es una función que retorna elementos</li>
              <li>Un elemento es un objeto simple que describe la UI</li>
              <li>JSX es azúcar sintáctico para React.createElement</li>
              <li>React compara elementos para decidir qué actualizar</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#fa8c16', marginBottom: '15px' }}>🏗️ Optimización con Props</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Extrae estado a componentes específicos</li>
              <li>Pasa componentes lentos como props (ej. <code>content</code>)</li>
              <li>Mantén la misma referencia de objeto entre re-renders</li>
              <li>Aísla los componentes que necesitan re-renderizarse</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#52c41a', marginBottom: '15px' }}>⚡ Children como Props</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>Forma elegante y nativa de pasar componentes como props</li>
              <li>Permite composición natural similar a HTML</li>
              <li>Mantiene los mismos beneficios de rendimiento</li>
              <li>Habilita patrones como wrappers y slots</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9'
          }}>
            <h4 style={{ color: '#ff4d4f', marginBottom: '15px' }}>⚠️ Re-renderizados</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'black' }}>
              <li>React compara referencias de objeto</li>
              <li>Si son iguales, omite la actualización</li>
              <li>Si son diferentes pero el tipo es igual, actualiza props</li>
              <li>Si el tipo es diferente, desmonta y monta de nuevo</li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: '#e6f7ff', 
          padding: '20px', 
          borderRadius: '6px',
          border: '1px solid #91caff',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#1890ff' }}>💡 Tip Final</h3>
          <p style={{ margin: 0, fontSize: '16px', color: 'black', marginBottom: '10px' }}>
            <strong>Primero identifica el problema de re-renderizado:</strong> cuando un componente con estado frecuentemente actualizado contiene componentes costosos.
          </p>
          <p style={{ margin: 0, fontSize: '16px', color: 'black', marginBottom: '10px' }}>
            <strong>Luego aplica la solución:</strong> pasa los componentes costosos como props (usando <code>content</code> o una prop personalizada).
          </p>
          <p style={{ margin: 0, fontSize: '16px', color: 'black' }}>
            <strong>Finalmente, mejora la legibilidad:</strong> usa <code>children</code> como una forma más elegante y nativa de React para lograr el mismo resultado.
          </p>
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

export default ReactElementsChildrenPropsFlow;
