import React from 'react';

export const StateHierarchyDiagram = () => {
  return (
    <div style={{ 
      border: '1px solid #d9d9d9', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: 'white',
      marginTop: '20px'
    }}>
      <h4 style={{ color: 'black', marginBottom: '20px', textAlign: 'center' }}>
        📊 Diagrama de Jerarquía de Componentes
      </h4>
      
      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* Estado Alto en el Árbol (Problemático) */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h5 style={{ color: '#ff4d4f', marginBottom: '15px', textAlign: 'center' }}>
            ❌ Estado Alto en el Árbol
          </h5>
          <div style={{ 
            backgroundColor: '#fff2f0', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ffccc7'
          }}>
            <div style={{ 
              backgroundColor: '#ff4d4f', 
              color: 'white', 
              padding: '8px', 
              borderRadius: '4px',
              marginBottom: '10px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              App (estado: isOpen)
            </div>
            <div style={{ marginLeft: '20px', }}>
              <div style={{ 
                backgroundColor: '#ff7875', 
                color: 'white', 
                padding: '6px', 
                borderRadius: '4px',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                Button
              </div>
              <div style={{ 
                backgroundColor: '#ff7875', 
                color: 'white', 
                padding: '6px', 
                borderRadius: '4px',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                Modal
              </div>
              <div style={{ 
                backgroundColor: '#ff7875', 
                color: 'white', 
                padding: '6px', 
                borderRadius: '4px',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                VerySlowComponent
              </div>
              <div style={{ 
                backgroundColor: '#ff7875', 
                color: 'white', 
                padding: '6px', 
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                OtherStuff
              </div>
            </div>
            <div style={{ 
              backgroundColor: '#fff2f0', 
              padding: '10px', 
              borderRadius: '4px', 
              marginTop: '15px',
              border: '1px solid #ffccc7',
              fontSize: '12px'
            }}>
              <p style={{ margin: 0, color: 'black' }}>
                <strong>Problema:</strong> Cuando cambia isOpen, TODOS los componentes se re-renderizan
              </p>
            </div>
          </div>
        </div>

        {/* Estado Movido Hacia Abajo (Óptimo) */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h5 style={{ color: '#52c41a', marginBottom: '15px', textAlign: 'center' }}>
            ✅ Estado Movido Hacia Abajo
          </h5>
          <div style={{ 
            backgroundColor: '#f6ffed', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #b7eb8f'
          }}>
            <div style={{ 
              backgroundColor: '#52c41a', 
              color: 'white', 
              padding: '8px', 
              borderRadius: '4px',
              marginBottom: '10px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              App (sin estado)
            </div>
            <div style={{ marginLeft: '20px' }}>
              <div style={{ 
                backgroundColor: '#73d13d', 
                color: 'white', 
                padding: '8px', 
                borderRadius: '4px',
                marginBottom: '8px',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                ButtonWithModal (estado: isOpen)
              </div>
              <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
                <div style={{ 
                  backgroundColor: '#95de64', 
                  color: 'white', 
                  padding: '6px', 
                  borderRadius: '4px',
                  marginBottom: '8px',
                  textAlign: 'center'
                }}>
                  Button
                </div>
                <div style={{ 
                  backgroundColor: '#95de64', 
                  color: 'white', 
                  padding: '6px', 
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  Modal
                </div>
              </div>
              <div style={{ 
                backgroundColor: '#52c41a', 
                color: 'white', 
                padding: '6px', 
                borderRadius: '4px',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                VerySlowComponent
              </div>
              <div style={{ 
                backgroundColor: '#52c41a', 
                color: 'white', 
                padding: '6px', 
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                OtherStuff
              </div>
            </div>
            <div style={{ 
              backgroundColor: '#f6ffed', 
              padding: '10px', 
              borderRadius: '4px', 
              marginTop: '15px',
              border: '1px solid #b7eb8f',
              fontSize: '12px'
            }}>
              <p style={{ margin: 0, color: 'black' }}>
                <strong>Beneficio:</strong> Solo ButtonWithModal se re-renderiza, los demás permanecen estables
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#e6f7ff', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #91caff',
        marginTop: '20px'
      }}>
        <h5 style={{ margin: '0 0 10px 0', color: 'black' }}>🔍 Explicación del Cambio</h5>
        <div style={{ color: 'black', fontSize: '14px' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Antes:</strong> El estado <code>isOpen</code> vivía en el componente <code>App</code>, 
            causando que todos los componentes hijos se re-rendericen cuando cambiaba.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Después:</strong> Creamos un nuevo componente <code>ButtonWithModal</code> que contiene 
            tanto el botón como el modal, y movimos el estado <code>isOpen</code> allí.
          </p>
          <p style={{ margin: 0 }}>
            <strong>Resultado:</strong> Ahora solo <code>ButtonWithModal</code> se re-renderiza cuando cambia 
            el estado, mientras que <code>VerySlowComponent</code> y <code>OtherStuff</code> permanecen estables.
          </p>
        </div>
      </div>
    </div>
  );
};
