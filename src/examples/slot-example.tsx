import type { CSSProperties } from "react"
import { useState } from "react"
import { Slot } from "../components/slot"
import { Slot as RadixSlot } from "@radix-ui/react-slot"

// Enhanced Button Component with asChild support using LOCAL Slot
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ 
  asChild = false, 
  variant = 'primary', 
  size = 'medium', 
  children, 
  style,
  ...props 
}) => {
  const baseStyles: CSSProperties = {
    padding: size === 'small' ? '6px 12px' : size === 'large' ? '12px 24px' : '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    backgroundColor: 
      variant === 'primary' ? '#3b82f6' : 
      variant === 'danger' ? '#ef4444' : '#6b7280',
    color: 'white',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.2s ease',
    ...style
  }

  if (asChild) {
    return (
      <Slot {...props} style={baseStyles}>
        {children}
      </Slot>
    )
  }

  return (
    <button {...props} style={baseStyles}>
      {children}
    </button>
  )
}

// Enhanced Button Component with asChild support using RADIX Slot
interface RadixButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const RadixButton: React.FC<RadixButtonProps> = ({ 
  asChild = false, 
  variant = 'primary', 
  size = 'medium', 
  children, 
  style,
  ...props 
}) => {
  const baseStyles: CSSProperties = {
    padding: size === 'small' ? '6px 12px' : size === 'large' ? '12px 24px' : '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    backgroundColor: 
      variant === 'primary' ? '#22c55e' : 
      variant === 'danger' ? '#f97316' : '#8b5cf6',
    color: 'white',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.2s ease',
    ...style
  }

  if (asChild) {
    return (
      <RadixSlot {...props} style={baseStyles}>
        {children}
      </RadixSlot>
    )
  }

  return (
    <button {...props} style={baseStyles}>
      {children}
    </button>
  )
}

// Card Component with asChild support
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const Card: React.FC<CardProps> = ({ asChild = false, children, style, ...props }) => {
  const baseStyles: CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    ...style
  }

  if (asChild) {
    return (
      <RadixSlot {...props} style={baseStyles}>
        {children}
      </RadixSlot>
    )
  }

  return (
    <div {...props} style={baseStyles}>
      {children}
    </div>
  )
}

// Badge Component with asChild support
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ 
  asChild = false, 
  variant = 'info', 
  children, 
  style, 
  ...props 
}) => {
  const baseStyles: CSSProperties = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: 
      variant === 'success' ? '#10b981' : 
      variant === 'warning' ? '#f59e0b' : 
      variant === 'error' ? '#ef4444' : '#3b82f6',
    color: 'white',
    ...style
  }

  if (asChild) {
    return (
      <RadixSlot {...props} style={baseStyles}>
        {children}
      </RadixSlot>
    )
  }

  return (
    <span {...props} style={baseStyles}>
      {children}
    </span>
  )
}

// Example data for the interactive demo
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: '📱' },
  { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' }
]

// Style for text content to override root's center alignment
const textContentStyle: CSSProperties = {
    textAlign: 'left'
};

export const SlotExample = () => {
    const [showLinks, setShowLinks] = useState(false)

    return (
        <div className="slot-container" style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '0 20px'
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Patrón asChild y Slot</h1>
            
            

            <section className="info-section" style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>¿Qué es asChild?</h2>
                <p style={textContentStyle}>
                    La prop <code>asChild</code> es un patrón que permite a un componente renderizar tu elemento 
                    en lugar de su etiqueta HTML predeterminada. En lugar de codificar algo como un <code>&lt;button&gt;</code> o 
                    <code>&lt;div&gt;</code>, el componente pasa todas sus props y comportamiento al elemento hijo que proporcionas.
                </p>
                <p style={textContentStyle}>Esto resuelve varios problemas:</p>
                <ul style={textContentStyle}>
                    <li>Evitas HTML inválido, como un <code>&lt;button&gt;</code> que contiene un <code>&lt;a&gt;</code>.</li>
                    <li>Obtienes control semántico de la salida.</li>
                    <li>Sigues beneficiándote de los estilos, manejadores de eventos y accesibilidad incorporados en el componente.</li>
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
                <h2 style={{ textAlign: 'center' }}>¿Qué es el Componente Slot?</h2>
                <p style={textContentStyle}>
                    El componente <code>Slot</code> es la utilidad clave que alimenta el comportamiento de <code>asChild</code>. 
                    Permite que los componentes deleguen la renderización y la inyección de comportamiento a un elemento hijo 
                    utilizando la función <code>cloneElement</code> de React.
                </p>
                <p style={textContentStyle}>Las responsabilidades principales del componente Slot son:</p>
                <ul style={textContentStyle}>
                    <li>Aceptar exactamente un elemento hijo.</li>
                    <li>Clonar ese elemento.</li>
                    <li>Inyectar props y ref del componente padre en el elemento clonado.</li>
                </ul>
            </section>
            <section className="info-section" style={{ 
                marginBottom: '30px',
                backgroundColor: '#e8f5e8',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333',
                border: '2px solid #4ade80'
            }}>
                <h2 style={{ textAlign: 'center' }}>Comparación: Slot Local vs Radix UI Slot</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                    <div>
                        <h3 style={textContentStyle}>🏠 Slot Local (Implementación Simple)</h3>
                        <ul style={textContentStyle}>
                            <li>Implementación básica y directa</li>
                            <li>Usa React.cloneElement</li>
                            <li>Manejo simple de props y refs</li>
                            <li>Ideal para casos de uso básicos</li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={textContentStyle}>⚡ Radix UI Slot (Implementación Robusta)</h3>
                        <ul style={textContentStyle}>
                            <li>Implementación más sofisticada</li>
                            <li>Mejor manejo de eventos compuestos</li>
                            <li>Soporte avanzado para refs</li>
                            <li>Optimizada para componentes complejos</li>
                            <li>Mantenida por el equipo de Radix UI</li>
                        </ul>
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
                <h2 style={{ textAlign: 'center' }}>Implementaciones de Slot: Código Comparativo</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                    <div>
                        <h3 style={textContentStyle}>🏠 Slot Local (Nuestro código)</h3>
                        <pre style={{
                            backgroundColor: '#1f2937',
                            color: '#f9fafb',
                            padding: '15px',
                            borderRadius: '6px',
                            overflowX: 'auto',
                            fontSize: '12px',
                            textAlign: 'left'
                        }}>
{`interface SlotProps {
    children: React.ReactElement;
    [key: string]: unknown;
}

export const Slot = React.forwardRef<
    unknown, 
    SlotProps
>(({ children, ...props }, ref) => {
    const child = React.Children.only(children);
    
    return React.cloneElement(child, {
        ...props,
        ...child.props,
        ref: ref,
    });
});`}
                        </pre>
                    </div>
                    
                    <div>
                        <h3 style={textContentStyle}>⚡ Radix UI Slot (Librería)</h3>
                        <pre style={{
                            backgroundColor: '#1e293b',
                            color: '#f1f5f9',
                            padding: '15px',
                            borderRadius: '6px',
                            overflowX: 'auto',
                            fontSize: '12px',
                            textAlign: 'left'
                        }}>
{`

import { Slot } from "@radix-ui/react-slot"

// Uso idéntico en nuestros componentes
<Slot {...props}>
    {children}
</Slot>`}
                        </pre>
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h3 style={textContentStyle}>🔧 Uso en Componentes (idéntico para ambos)</h3>
                    <pre style={{
                        backgroundColor: '#0f172a',
                        color: '#e2e8f0',
                        padding: '15px',
                        borderRadius: '6px',
                        overflowX: 'auto',
                        fontSize: '14px',
                        textAlign: 'left'
                    }}>
{`if (asChild) {
    return (
        <Slot {...props} style={baseStyles}>
            {children}
        </Slot>
    )
}

return <button {...props} style={baseStyles}>{children}</button>`}
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
                <h2 style={{ textAlign: 'center' }}>Beneficios de Usar asChild + Slot</h2>
                <ul style={textContentStyle}>
                    <li><strong>Elimina elementos envolventes:</strong> Previene el anidamiento extra de <code>&lt;div&gt;</code> o <code>&lt;button&gt;</code>.</li>
                    <li><strong>Mejora la corrección semántica:</strong> El elemento que renderizas es lo que realmente termina en el DOM.</li>
                    <li><strong>Mantiene la lógica y accesibilidad intactas:</strong> Manejadores de eventos, roles, refs... todo se preserva.</li>
                    <li><strong>Integración flexible:</strong> Perfecto para estilizar enlaces, disparadores personalizados, dropdowns y más.</li>
                </ul>
            </section>

            <section style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>Ejemplo 1: Comparación de Implementaciones</h2>
                <p style={textContentStyle}>
                    Compara cómo ambas implementaciones de Slot funcionan de manera similar pero con diferencias internas:
                </p>
                
                <div style={{ marginBottom: '25px' }}>
                    <h3 style={textContentStyle}>🏠 Usando Slot Local (Azul)</h3>
                    <div style={{ 
                        display: 'flex', 
                        gap: '15px', 
                        marginTop: '15px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <Button variant="primary">Botón Normal</Button>
                        <Button variant="secondary">Botón Secundario</Button>
                        
                        <Button asChild variant="primary">
                            <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                                Enlace como Botón
                            </a>
                        </Button>
                        
                        <Button asChild variant="secondary">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </Button>
                    </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <h3 style={textContentStyle}>⚡ Usando Radix UI Slot (Verde/Naranja/Morado)</h3>
                    <div style={{ 
                        display: 'flex', 
                        gap: '15px', 
                        marginTop: '15px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <RadixButton variant="primary">Botón Normal</RadixButton>
                        <RadixButton variant="secondary">Botón Secundario</RadixButton>
                        
                        <RadixButton asChild variant="primary">
                            <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                                Enlace como Botón
                            </a>
                        </RadixButton>
                        
                        <RadixButton asChild variant="secondary">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </RadixButton>
                    </div>
                </div>
                
                <div style={{ 
                    marginTop: '15px', 
                    padding: '15px', 
                    backgroundColor: '#fff3cd', 
                    borderRadius: '6px',
                    border: '1px solid #ffeaa7'
                }}>
                    <p style={{ ...textContentStyle, margin: 0, fontSize: '14px' }}>
                        💡 <strong>Observación:</strong> Ambas implementaciones producen el mismo resultado visual y funcional. 
                        La diferencia está en la robustez interna: Radix UI maneja casos edge más complejos y tiene mejor 
                        soporte para composición avanzada de eventos.
                    </p>
                </div>
            </section>

            <section style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>Ejemplo 2: Cards Flexibles</h2>
                <p style={textContentStyle}>
                    Los componentes Card pueden renderizar como <code>&lt;div&gt;</code> o como enlaces clicables:
                </p>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '20px', 
                    marginTop: '20px'
                }}>
                    {/* Card normal */}
                    <Card>
                        <h3 style={{ margin: '0 0 10px 0' }}>Card Normal</h3>
                        <p style={{ margin: '0', color: '#666' }}>
                            Esta es una card normal que se renderiza como un div.
                        </p>
                    </Card>
                    
                    {/* Card como enlace */}
                    <Card asChild>
                        <a 
                            href="https://reactjs.org/docs" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <h3 style={{ margin: '0 0 10px 0' }}>Card Enlace</h3>
                            <p style={{ margin: '0', color: '#666' }}>
                                Esta card es un enlace completo y clickeable.
                            </p>
                        </a>
                    </Card>
                </div>
            </section>

            <section style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>Ejemplo 3: Badges Interactivos</h2>
                <p style={textContentStyle}>
                    Los badges pueden funcionar como elementos estáticos o como botones/enlaces interactivos:
                </p>
                
                <div style={{ marginTop: '20px' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <h4 style={textContentStyle}>Badges Estáticos:</h4>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <Badge variant="success">Activo</Badge>
                            <Badge variant="warning">Pendiente</Badge>
                            <Badge variant="error">Error</Badge>
                            <Badge variant="info">Info</Badge>
                        </div>
                    </div>
                    
                    <div>
                        <h4 style={textContentStyle}>Badges Interactivos:</h4>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <Badge asChild variant="success">
                                <button onClick={() => alert('Badge clickeado!')}>
                                    Clickeable
                                </button>
                            </Badge>
                            
                            <Badge asChild variant="info">
                                <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                                    Enlace Badge
                                </a>
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>Ejemplo Interactivo: Comparación en Acción</h2>
                <p style={textContentStyle}>
                    Ambas implementaciones funcionan de manera idéntica. Alterna entre botones y enlaces para ver cómo 
                    ambos Slots manejan la transformación:
                </p>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button 
                        onClick={() => setShowLinks(!showLinks)}
                        variant="primary"
                        style={{ marginBottom: '20px' }}
                    >
                        {showLinks ? 'Mostrar como Botones' : 'Mostrar como Enlaces'}
                    </Button>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={textContentStyle}>🏠 Con Slot Local:</h3>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
                            {socialLinks.map((link) => (
                                showLinks ? (
                                    <Button 
                                        key={`local-${link.name}`} 
                                        asChild 
                                        variant="secondary"
                                    >
                                        <a 
                                            href={link.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            {link.icon} {link.name}
                                        </a>
                                    </Button>
                                ) : (
                                    <Button 
                                        key={`local-${link.name}`} 
                                        variant="secondary"
                                        onClick={() => alert(`Local Slot: Clicked ${link.name}!`)}
                                    >
                                        {link.icon} {link.name}
                                    </Button>
                                )
                            ))}
                        </div>

                        <h3 style={textContentStyle}>⚡ Con Radix UI Slot:</h3>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {socialLinks.map((link) => (
                                showLinks ? (
                                    <RadixButton 
                                        key={`radix-${link.name}`} 
                                        asChild 
                                        variant="secondary"
                                    >
                                        <a 
                                            href={link.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            {link.icon} {link.name}
                                        </a>
                                    </RadixButton>
                                ) : (
                                    <RadixButton 
                                        key={`radix-${link.name}`} 
                                        variant="secondary"
                                        onClick={() => alert(`Radix Slot: Clicked ${link.name}!`)}
                                    >
                                        {link.icon} {link.name}
                                    </RadixButton>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            <section className="info-section" style={{ 
                marginBottom: '30px',
                backgroundColor: '#fff3cd',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333',
                border: '1px solid #ffeaa7'
            }}>
                <h2 style={{ textAlign: 'center' }}>Mejores Prácticas Generales</h2>
                <ul style={textContentStyle}>
                    <li><strong>Usa asChild solo cuando necesites personalizar la etiqueta renderizada.</strong></li>
                    <li><strong>Siempre pasa un elemento React único y válido como hijo</strong> — no un fragmento o string.</li>
                    <li><strong>Usa forwardRef en componentes personalizados</strong> para asegurar el manejo adecuado de ref.</li>
                    <li><strong>Las props definidas por el hijo</strong> (ej. className personalizado o manejadores de eventos) sobrescribirán lo que el padre inyecta.</li>
                    <li><strong>Considera la accesibilidad:</strong> Asegúrate de que el elemento resultante sea semánticamente apropiado.</li>
                    <li><strong>Para proyectos enterprise o librerías públicas, considera usar Radix UI Slot.</strong></li>
                </ul>
            </section>
        </div>
    )
} 