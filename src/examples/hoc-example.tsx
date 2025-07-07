import type { CSSProperties } from "react"
import { Button, type ButtonProps } from "../components/button"
import { useState, useEffect } from "react"
import { CardExample } from "../components/card-example"
import { SpinnerCard } from "../components/spinner-card"

const withStyles = <P extends ButtonProps>(Component: React.ComponentType<P>) => {
    return (props: P) => {
        const style: CSSProperties = {
            color: 'red',
            fontSize: '20px',
            backgroundColor: 'green',
            ...props?.style || {},
        }

        return <Component {...props} style={style} />
    }
}

const StyledButton = withStyles(Button)

// Fix linter errors by replacing 'any' with proper types
interface LoaderProps {
    [key: string]: unknown;
    size: 'small' | 'medium' | 'large'
}

const withLoader = <P extends LoaderProps>(Component: React.ComponentType<P>) => {
    return (props: P) => {
        const [isLoading, setIsLoading] = useState(true)

        useEffect(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }, [])

        return isLoading ? <SpinnerCard size={props.size} /> : <Component {...props} />
    }
}

const CardWithLoader1 = withLoader(CardExample)
const CardWithLoader2 = withLoader(CardExample)
const CardWithLoader3 = withLoader(CardExample)

// Style for text content to override root's center alignment
const textContentStyle: CSSProperties = {
    textAlign: 'left'
};

export const HocExample = () => {
  return (
    <div className="hoc-container" style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '0 20px'
    }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Higher-Order Components (HOC) Example</h1>
        
        <section className="info-section" style={{ 
          marginBottom: '30px',
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          color: '#333'
        }}>
            <h2 style={{ textAlign: 'center' }}>¿Qué son los Componentes de Orden Superior?</h2>
            <p style={textContentStyle}>
                Un Componente de Orden Superior (HOC) es un patrón que permite la reutilización de lógica al envolver un componente y 
                agregarle funcionalidades adicionales. Este patrón es útil para:
            </p>
            <ul style={textContentStyle}>
                <li>Aplicar lógica compartida a múltiples componentes.</li>
                <li>Mantener los componentes limpios y enfocados en una única responsabilidad.</li>
                <li>Mejorar la separación de responsabilidades en aplicaciones grandes.</li>
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
            <h2 style={{ textAlign: 'center' }}>¿Por qué usar Componentes de Orden Superior?</h2>
            <ul style={textContentStyle}>
                <li><strong>Reutilización:</strong> Evita repetir la lógica en múltiples componentes.</li>
                <li><strong>Separación de Responsabilidades:</strong> Extrae la lógica no relacionada con la UI en HOCs.</li>
                <li><strong>Mejorar Componentes Dinámicamente:</strong> Modifica componentes sin cambiar su implementación.</li>
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
            <h2 style={{ textAlign: 'center' }}>Implementación en React</h2>
            <h3 style={textContentStyle}>Aplicación de Lógica a Otro Componente</h3>
            <p style={textContentStyle}>Podemos aplicar lógica a otro componente mediante:</p>
            <ol style={textContentStyle}>
                <li>Recibir otro componente como argumento.</li>
                <li>Aplicar lógica adicional al componente pasado.</li>
                <li>Retornar el mismo componente o uno nuevo con la lógica agregada.</li>
            </ol>
        </section>

        <section className="info-section" style={{ 
          marginBottom: '30px',
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          color: '#333'
        }}>
            <h2 style={{ textAlign: 'center' }}>Ventajas y Desventajas de los Componentes de Orden Superior</h2>
            <div style={{ marginBottom: '20px' }}>
                <h3 style={textContentStyle}>Ventajas</h3>
                <p style={textContentStyle}><strong>Separación de Responsabilidades:</strong></p>
                <ul style={textContentStyle}>
                    <li>Los HOCs centralizan la lógica reutilizable, reduciendo la duplicación de código y los errores potenciales.</li>
                </ul>
                <p style={textContentStyle}><strong>Reutilización de Código:</strong></p>
                <ul style={textContentStyle}>
                    <li>Los HOCs permiten extender fácilmente los componentes con cambios mínimos en su lógica principal.</li>
                </ul>
            </div>
            <div>
                <h3 style={textContentStyle}>Desventajas</h3>
                <p style={textContentStyle}><strong>Colisiones de Nombres:</strong></p>
                <ul style={textContentStyle}>
                    <li>Un HOC puede sobrescribir accidentalmente las props de un componente envuelto. Para evitarlo, siempre mezcla o renombra las props correctamente.</li>
                </ul>
                <p style={textContentStyle}><strong>Problemas de Legibilidad:</strong></p>
                <ul style={textContentStyle}>
                    <li>Cuando varios HOCs envuelven un componente, puede ser difícil rastrear qué HOC agrega cada prop, lo que dificulta la depuración.</li>
                </ul>
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
            <h2 style={{ textAlign: 'center' }}>Implementación de HOC</h2>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={textContentStyle}>Ejemplo 1: HOC para Agregar Estilos</h3>
              <p style={textContentStyle}>Este componente utiliza el patrón HOC para envolver un botón y aplicarle estilos personalizados.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
                <StyledButton>Styled Button</StyledButton>
                <Button>Default Button</Button>
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
            <h2 style={{ textAlign: 'center' }}>Aplicación Avanzada de HOC</h2>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={textContentStyle}>Ejemplo 2: HOC para Agregar Indicador de Carga</h3>
              <p style={textContentStyle}>Este ejemplo muestra cómo usar un HOC para añadir un indicador de carga a componentes tipo Card con diferentes tamaños.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '15px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <CardWithLoader1 size="large" />
                <CardWithLoader2 size="medium" />
                <CardWithLoader3 size="small" />
            </div>
        </section>
    </div>
    )
}