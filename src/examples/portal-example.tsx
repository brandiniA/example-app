import type { CSSProperties } from "react"
import { useState } from "react"
import { ExampleModal } from "../components/example-modal"
import { TooltipPortal } from "../components/tooltip-portal"
import { NotificationPortal } from "../components/notification-portal"
import { ContextMenuPortal } from "../components/context-menu-portal"

// Style for text content to override root's center alignment
const textContentStyle: CSSProperties = {
    textAlign: 'left'
};

export const PortalExample = () => {
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    
    const handleShowNotification = () => setShowNotification(true);
    const handleCloseNotification = () => setShowNotification(false);
    
    const contextMenuItems = [
      { label: 'Editar', onClick: () => alert('Editar seleccionado'), icon: '✏️' },
      { label: 'Duplicar', onClick: () => alert('Duplicar seleccionado'), icon: '📋' },
      { label: 'Eliminar', onClick: () => alert('Eliminar seleccionado'), icon: '🗑️' },
    ];

    return (
        <div className="portal-container" style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '0 20px'
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>React Portal Example</h1>
            
            <section className="info-section" style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>¿Qué son los React Portals?</h2>
                <p style={textContentStyle}>
                    Un React Portal es una forma de reubicar un elemento de React a otra parte del DOM sin romper su vínculo con el componente que lo crea. En una aplicación típica, los elementos se renderizan dentro del nodo DOM definido por su componente padre; sin embargo, hay casos en los que necesitas sacarlos de ese contenedor —por ejemplo, colocarlos fuera del wrapper principal o incluso fuera de toda la aplicación React— y ahí es donde entra en juego un portal.
                </p>
                <p style={textContentStyle}>
                    Aunque el nodo aparece en una sección distinta del árbol DOM, el estado interno y la lógica del componente permanecen intactos, y sus métodos de ciclo de vida siguen comportándose exactamente igual.
                </p>
            </section>

            <section className="info-section" style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>Ventajas de React Portal</h2>
                <ul style={textContentStyle}>
                    <li><strong>Mayor flexibilidad:</strong> Permite renderizar componentes fuera de la jerarquía DOM actual, ideal para elementos UI complejos.</li>
                    <li><strong>Evita problemas de estilo:</strong> Soluciona limitaciones como overflow: hidden o conflictos de posicionamiento que afectarían a modales y tooltips.</li>
                    <li><strong>Interacción sin interrupciones:</strong> Preserva el estado y el manejo de eventos del componente, manteniendo la funcionalidad intacta aunque se renderice en otro lugar.</li>
                </ul>
            </section>

            <section className="info-section" style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>Sintaxis y Uso</h2>
                <p style={textContentStyle}>
                    El método <code>ReactDOM.createPortal()</code> se utiliza para crear un portal. Acepta dos argumentos:
                </p>
                <ul style={textContentStyle}>
                    <li>El elemento JSX o componente React que se va a renderizar.</li>
                    <li>El nodo DOM donde se debe renderizar el portal.</li>
                </ul>
                <p style={textContentStyle}>
                    Aquí hay un ejemplo básico de cómo usar un React Portal:
                </p>
                
                <div style={{ 
                    padding: '20px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '8px',
                    marginTop: '15px'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <button 
                            onClick={handleOpenModal}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Abrir Modal con Portal
                        </button>
                    </div>
                    
                    <pre style={{
                        backgroundColor: '#1f2937',
                        color: '#f9fafb',
                        padding: '15px',
                        borderRadius: '6px',
                        overflowX: 'auto',
                        fontSize: '14px',
                        textAlign: 'left'
                    }}>
{`// 1. Definir el componente Modal que usa createPortal
import { createPortal } from 'react-dom';
import type { ReactNode, CSSProperties } from 'react';

interface ModalProps {
  open: boolean;
  children: ReactNode;
  overlayStyle?: CSSProperties;
  containerStyle?: CSSProperties;
}

export const Modal = ({ open, children, overlayStyle = {}, containerStyle = {} }: ModalProps) => {
  if (!open) return null;
  
  const defaultOverlayStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    ...overlayStyle
  };
  
  const defaultContainerStyle: CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    ...containerStyle
  };
  
  return createPortal(
    <div style={defaultOverlayStyle}>
      <div style={defaultContainerStyle}>
        {children}
      </div>
    </div>,
    document.getElementById('portal-container')!
  );
};

// 2. Agregar div en index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- Portal container --> 
    <div id="portal-container"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

`}
                    </pre>
                </div>
            </section>

            <section className="info-section" style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>Casos de Uso para React Portal</h2>
                <p style={textContentStyle}>
                    React Portal es especialmente útil en escenarios donde un elemento necesita aparecer por encima de otros componentes o fuera del contenedor principal, y el renderizado normal del DOM interferiría con otras reglas de diseño o estilo.
                </p>
                
                <h3 style={{ ...textContentStyle, marginTop: '20px' }}>¿Por qué usar React Portal?</h3>
                <ul style={textContentStyle}>
                    <li><strong>Evitar problemas de z-index y visibilidad:</strong> Especialmente útil para modales y diálogos que necesitan aparecer por encima de todo el contenido.</li>
                    <li><strong>Superar limitaciones de <code>overflow: hidden</code>:</strong> Permite que elementos como tooltips y menús desplegables sean visibles incluso cuando sus componentes padre tienen overflow oculto.</li>
                    <li><strong>Mantener la accesibilidad y el contexto de React:</strong> Aunque el elemento se renderiza en otra parte del DOM, sigue formando parte del árbol de componentes de React.</li>
                    <li><strong>Posicionamiento sin restricciones:</strong> Ideal para elementos de UI como notificaciones, tooltips y menús contextuales que necesitan posicionarse libremente.</li>
                </ul>
                
                <h3 style={{ ...textContentStyle, marginTop: '20px' }}>Aplicaciones Comunes</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
                    <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>Modales y Diálogos</h4>
                        <p style={{ margin: '0', fontSize: '14px' }}>
                            Renderizados fuera del componente actual para evitar problemas de z-index y asegurar que aparezcan por encima de todo.
                        </p>
                    </div>
                    
                    <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>Tooltips</h4>
                        <p style={{ margin: '0', fontSize: '14px' }}>
                            Necesitan aparecer por encima de otros elementos y no deben ser limitados por el contenedor padre.
                        </p>
                    </div>
                    
                    <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>Notificaciones</h4>
                        <p style={{ margin: '0', fontSize: '14px' }}>
                            Aparecen típicamente en las esquinas de la pantalla, independientemente de dónde se generan.
                        </p>
                    </div>
                    
                    <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>Menús Contextuales</h4>
                        <p style={{ margin: '0', fontSize: '14px' }}>
                            Deben aparecer en ubicaciones específicas sin estar restringidos por la jerarquía de componentes.
                        </p>
                    </div>
                </div>
                
                <div style={{ marginTop: '30px' }}>
                    <h3 style={{ ...textContentStyle }}>Diagrama Visual: Cómo Funciona un Portal</h3>
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '20px', 
                        borderRadius: '8px', 
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        textAlign: 'center'
                    }}>
                        <pre style={{ 
                            display: 'inline-block', 
                            textAlign: 'left', 
                            backgroundColor: '#f8f9fa',
                            padding: '15px',
                            borderRadius: '6px',
                            fontSize: '14px'
                        }}>
{`
┌─────────────────────────────────────────────┐
│ Árbol de Componentes React                  │
│                                             │
│  ┌─────────────┐                            │
│  │ App         │                            │
│  │  ┌─────────┐│                            │
│  │  │Component││                            │
│  │  │         ││      ┌─────────────────┐   │
│  │  │ ┌─────┐ ││      │                 │   │
│  │  │ │Modal│─┼┼─────►│  Portal Content │   │
│  │  │ └─────┘ ││      │                 │   │
│  │  └─────────┘│      └─────────────────┘   │
│  └─────────────┘            ▲               │
│                             │               │
└─────────────────────────────┼───────────────┘
                              │
┌─────────────────────────────┼───────────────┐
│ Árbol DOM                   │               │
│                             │               │
│  ┌─────────────┐            │               │
│  │ <div id="root">          │               │
│  │  ┌─────────┐│            │               │
│  │  │<div>    ││            │               │
│  │  │         ││            │               │
│  │  └─────────┘│            │               │
│  └─────────────┘            │               │
│                             │               │
│  ┌─────────────┐            │               │
│  │ <div id="portal-container"> │               │
│  │  ┌─────────┐│            │               │
│  │  │<div>    │◄────────────┘               │
│  │  │ Modal   ││                            │
│  │  │ Content ││                            │
│  │  └─────────┘│                            │
│  └─────────────┘                            │
└─────────────────────────────────────────────┘
`}
                        </pre>
                    </div>
                </div>
            </section>

            <section className="info-section" style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>Manejo de la Propagación de Eventos</h2>
                <p style={textContentStyle}>
                    Un aspecto interesante de los React Portals es que la propagación de eventos sigue funcionando normalmente. Aunque un portal renderiza sus hijos en una parte diferente del DOM, eventos como onClick, onMouseEnter, etc., siguen siendo manejados en el árbol de componentes donde se origina el evento, no en el nodo DOM de destino.
                </p>
                <p style={textContentStyle}>
                    Sin embargo, en ocasiones es necesario evitar que ciertos eventos se propaguen, especialmente en componentes como modales donde queremos que un clic fuera del contenido cierre el modal pero no afecte a elementos subyacentes. Esto se puede lograr utilizando el método <code>stopPropagation</code>.
                </p>
                
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ ...textContentStyle }}>Ejemplo: Controlando la propagación en un Modal</h3>
                    <pre style={{
                        backgroundColor: '#1f2937',
                        color: '#f9fafb',
                        padding: '15px',
                        borderRadius: '6px',
                        overflowX: 'auto',
                        fontSize: '14px',
                        textAlign: 'left',
                        marginTop: '10px'
                    }}>
{`// Modal con manejo de propagación de eventos
export const Modal = ({ open, children, onClose, overlayStyle = {}, containerStyle = {} }) => {
  if (!open) return null;
  
  // Cierra el modal cuando se hace clic en el overlay
  const handleOverlayClick = (e) => {
    // Cierra el modal solo si se hace clic directamente en el overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Evita que los clics dentro del contenido del modal se propaguen al overlay
  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  
  return createPortal(
    <div 
      style={defaultOverlayStyle} 
      onClick={handleOverlayClick}
    >
      <div 
        style={defaultContainerStyle} 
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>,
    document.getElementById('portal-container')!
  );
};`}
                    </pre>
                </div>
                
                <p style={textContentStyle}>
                    En este ejemplo:
                </p>
                <ul style={textContentStyle}>
                    <li><code>handleOverlayClick</code> cierra el modal solo cuando se hace clic directamente en el fondo oscuro (overlay).</li>
                    <li><code>handleContentClick</code> detiene la propagación del evento para que los clics dentro del contenido del modal no lleguen al overlay.</li>
                    <li>Esta técnica permite que el modal se cierre al hacer clic fuera de él, pero no cuando se interactúa con su contenido.</li>
                </ul>
            </section>

            <section className="info-section" style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>Ejemplos Interactivos</h2>
                <p style={textContentStyle}>
                    A continuación, puedes ver ejemplos prácticos de los diferentes casos de uso de React Portal:
                </p>
                
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '16px', 
                    marginTop: '20px',
                    justifyContent: 'center'
                }}>
                    {/* Modal Example */}
                    <div style={{ 
                        flex: '1 1 200px', 
                        backgroundColor: 'white', 
                        padding: '20px', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '200px'
                    }}>
                        <h3 style={{ marginTop: 0 }}>Modal</h3>
                        <p style={{ textAlign: 'center', marginBottom: '15px' }}>
                            Un diálogo que aparece por encima de todo el contenido.
                        </p>
                        <button 
                            onClick={handleOpenModal}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Abrir Modal
                        </button>
                    </div>
                    
                    {/* Tooltip Example */}
                    <div style={{ 
                        flex: '1 1 200px', 
                        backgroundColor: 'white', 
                        padding: '20px', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '200px'
                    }}>
                        <h3 style={{ marginTop: 0 }}>Tooltip</h3>
                        <p style={{ textAlign: 'center', marginBottom: '15px' }}>
                            Información que aparece al pasar el ratón.
                        </p>
                        <TooltipPortal content="Este tooltip usa un portal para renderizarse fuera del flujo normal del DOM">
                            <button 
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Pasa el ratón aquí
                            </button>
                        </TooltipPortal>
                    </div>
                    
                    {/* Notification Example */}
                    <div style={{ 
                        flex: '1 1 200px', 
                        backgroundColor: 'white', 
                        padding: '20px', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '200px'
                    }}>
                        <h3 style={{ marginTop: 0 }}>Notificación</h3>
                        <p style={{ textAlign: 'center', marginBottom: '15px' }}>
                            Alertas que aparecen en la esquina de la pantalla.
                        </p>
                        <button 
                            onClick={handleShowNotification}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#f59e0b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Mostrar Notificación
                        </button>
                    </div>
                    
                    {/* Context Menu Example */}
                    <div style={{ 
                        flex: '1 1 200px', 
                        backgroundColor: 'white', 
                        padding: '20px', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '200px'
                    }}>
                        <h3 style={{ marginTop: 0 }}>Menú Contextual</h3>
                        <p style={{ textAlign: 'center', marginBottom: '15px' }}>
                            Menú que aparece al hacer clic derecho.
                        </p>
                        <ContextMenuPortal menuItems={contextMenuItems}>
                            <div 
                                style={{
                                    padding: '30px',
                                    backgroundColor: '#f3f4f6',
                                    borderRadius: '4px',
                                    cursor: 'context-menu',
                                    textAlign: 'center'
                                }}
                            >
                                Haz clic derecho aquí
                            </div>
                        </ContextMenuPortal>
                    </div>
                </div>
            </section>
            
            {/* Modal que se muestra cuando se hace clic en el botón */}
            <ExampleModal open={showModal} onClose={handleCloseModal} />
            
            {/* Notificación que se muestra cuando se hace clic en el botón */}
            <NotificationPortal 
                isOpen={showNotification}
                onClose={handleCloseNotification}
                message="¡Esta notificación usa un portal para renderizarse en la esquina de la pantalla!"
                type="success"
            />
        </div>
    )
} 