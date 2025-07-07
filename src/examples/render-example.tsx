import type { CSSProperties } from "react"
import { useState } from "react"

// Dog breeds data
interface DogBreed {
  id: string;
  name: string;
  origin: string;
  size: string;
  temperament: string;
  lifespan: string;
  description: string;
  imageUrl: string;
}

const dogBreeds: DogBreed[] = [
  {
    id: "labrador",
    name: "Labrador Retriever",
    origin: "Canadá",
    size: "Grande",
    temperament: "Amigable, activo, sociable",
    lifespan: "10-12 años",
    description: "Una de las razas más populares, conocida por su inteligencia y naturaleza afable. Son excelentes perros de familia y de servicio.",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: "husky",
    name: "Husky Siberiano",
    origin: "Siberia, Rusia",
    size: "Mediano",
    temperament: "Amigable, alerta, enérgico",
    lifespan: "12-14 años",
    description: "Originalmente criados para tirar de trineos en climas fríos. Son conocidos por sus distintivos ojos azules y su personalidad juguetona.",
    imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: "bulldog",
    name: "Bulldog Francés",
    origin: "Francia",
    size: "Pequeño",
    temperament: "Juguetón, alerta, cariñoso",
    lifespan: "10-12 años",
    description: "Conocido por sus orejas de murciélago y su carácter afectuoso. Son excelentes compañeros para apartamentos y hogares pequeños.",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

// PC Peripherals data
interface Peripheral {
  id: string;
  name: string;
  category: string;
  connectivity: string;
  price: string;
  features: string[];
  description: string;
  imageUrl: string;
}

const peripherals: Peripheral[] = [
  {
    id: "keyboard",
    name: "Teclado Mecánico RGB",
    category: "Teclados",
    connectivity: "USB / Bluetooth",
    price: "$89.99",
    features: [
      "Switches mecánicos Cherry MX Brown",
      "Retroiluminación RGB personalizable",
      "Reposamuñecas desmontable",
      "N-Key rollover"
    ],
    description: "Teclado mecánico de alta calidad con switches táctiles que ofrecen una experiencia de escritura satisfactoria. Ideal para gaming y trabajo.",
    imageUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: "mouse",
    name: "Ratón Ergonómico Inalámbrico",
    category: "Ratones",
    connectivity: "Bluetooth / 2.4GHz",
    price: "$59.99",
    features: [
      "Sensor óptico de 16,000 DPI",
      "Batería recargable (60 horas de autonomía)",
      "6 botones programables",
      "Diseño ergonómico para uso prolongado"
    ],
    description: "Ratón inalámbrico de alta precisión con diseño ergonómico que reduce la fatiga durante largas sesiones de uso. Perfecto para gamers y profesionales.",
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: "headset",
    name: "Auriculares Gaming 7.1",
    category: "Audio",
    connectivity: "USB / Jack 3.5mm",
    price: "$129.99",
    features: [
      "Sonido envolvente 7.1",
      "Micrófono con cancelación de ruido",
      "Almohadillas de espuma viscoelástica",
      "Control de volumen en auricular"
    ],
    description: "Auriculares gaming con sonido envolvente 7.1 que te permiten ubicar con precisión a tus enemigos. Las almohadillas de espuma viscoelástica aseguran comodidad durante horas.",
    imageUrl: "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

// Dog Selector Component with Render Props
interface DogSelectorProps {
  render: (dog: DogBreed | null) => React.ReactNode;
}

const DogSelector: React.FC<DogSelectorProps> = ({ render }) => {
  
  const [selectedDog, setSelectedDog] = useState<DogBreed | null>(null);

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px', 
        marginBottom: '20px' 
      }}>
        {dogBreeds.map(dog => (
          <button 
            key={dog.id}
            onClick={() => setSelectedDog(dog)}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedDog?.id === dog.id ? '#4a6fa5' : '#f0f0f0',
              color: selectedDog?.id === dog.id ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {dog.name}
          </button>
        ))}
      </div>
      
      {/* Render prop utilization - child content is determined by the function passed */}
      {render(selectedDog)}
    </div>
  );
};

// Peripheral Selector With Children Component
interface PeripheralSelectorProps {
  children: (peripheral: Peripheral | null) => React.ReactNode;
}

const PeripheralSelector: React.FC<PeripheralSelectorProps> = ({ children }) => {
  const [selectedPeripheral, setSelectedPeripheral] = useState<Peripheral | null>(null);

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px', 
        marginBottom: '20px' 
      }}>
        {peripherals.map(peripheral => (
          <button 
            key={peripheral.id}
            onClick={() => setSelectedPeripheral(peripheral)}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedPeripheral?.id === peripheral.id ? '#4a6fa5' : '#f0f0f0',
              color: selectedPeripheral?.id === peripheral.id ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {peripheral.name}
          </button>
        ))}
      </div>
      
      {/* Using children as a function instead of render prop */}
      {children(selectedPeripheral)}
    </div>
  );
};

// DogDetails Component to show how the render prop is used
const DogDetails: React.FC<{ dog: DogBreed }> = ({ dog }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    }}>
      <img 
        src={dog.imageUrl} 
        alt={dog.name} 
        style={{ 
          width: '200px', 
          height: '200px', 
          objectFit: 'cover',
          borderRadius: '8px' 
        }} 
      />
      <div>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{dog.name}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: '8px' }}>
          <span style={{ fontWeight: 'bold' }}>Origen:</span>
          <span>{dog.origin}</span>
          
          <span style={{ fontWeight: 'bold' }}>Tamaño:</span>
          <span>{dog.size}</span>
          
          <span style={{ fontWeight: 'bold' }}>Temperamento:</span>
          <span>{dog.temperament}</span>
          
          <span style={{ fontWeight: 'bold' }}>Esperanza de vida:</span>
          <span>{dog.lifespan}</span>
        </div>
        <p style={{ marginTop: '15px', color: '#555' }}>{dog.description}</p>
      </div>
    </div>
  );
};

// Peripheral Details Component
const PeripheralDetails: React.FC<{ peripheral: Peripheral }> = ({ peripheral }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    }}>
      <img 
        src={peripheral.imageUrl} 
        alt={peripheral.name} 
        style={{ 
          width: '200px', 
          height: '200px', 
          objectFit: 'cover',
          borderRadius: '8px' 
        }} 
      />
      <div>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{peripheral.name}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: '8px' }}>
          <span style={{ fontWeight: 'bold' }}>Categoría:</span>
          <span>{peripheral.category}</span>
          
          <span style={{ fontWeight: 'bold' }}>Conectividad:</span>
          <span>{peripheral.connectivity}</span>
          
          <span style={{ fontWeight: 'bold' }}>Precio:</span>
          <span>{peripheral.price}</span>
        </div>
        
        <div style={{ marginTop: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Características:</span>
          <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
            {peripheral.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        
        <p style={{ marginTop: '15px', color: '#555' }}>{peripheral.description}</p>
      </div>
    </div>
  );
};

// Style for text content to override root's center alignment
const textContentStyle: CSSProperties = {
    textAlign: 'left'
};

export const RenderExample = () => {
    return (
        <div className="render-props-container" style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '0 20px'
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Render Props Pattern Example</h1>
            
            
            <section className="info-section" style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>¿Qué es el Patrón Render Props?</h2>
                <p style={textContentStyle}>
                    Un Render Prop es una prop que se define como una función y que un componente usa para saber qué renderizar. Este patrón es útil para:
                </p>
                <ul style={textContentStyle}>
                    <li>Reutilizar lógica en varios componentes.</li>
                    <li>Separar responsabilidades, manteniendo la lógica separada de la renderización.</li>
                    <li>Solucionar problemas de los Componentes de Orden Superior (HOC) al pasar props explícitamente.</li>
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
                <h2 style={{ textAlign: 'center' }}>¿Por qué usar Render Props?</h2>
                <ul style={textContentStyle}>
                    <li><strong>Flexibilidad:</strong> Permite renderizar contenido dinámico basado en los datos pasados a un componente.</li>
                    <li><strong>Flujo de datos explícito:</strong> A diferencia de los HOC, todas las props son visibles en la lista de argumentos de la función de renderizado.</li>
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
                <h2 style={{ textAlign: 'center' }}>Ventajas y Desventajas del Patrón Render Props</h2>
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={textContentStyle}>Ventajas</h3>
                    <p style={textContentStyle}><strong>Reutilización de Código:</strong></p>
                    <ul style={textContentStyle}>
                        <li>Los componentes que usan render props pueden reutilizarse en múltiples casos de uso.</li>
                    </ul>
                    <p style={textContentStyle}><strong>Separación de Responsabilidades:</strong></p>
                    <ul style={textContentStyle}>
                        <li>El componente principal maneja la lógica, mientras que las props de renderizado se encargan de la visualización.</li>
                    </ul>
                    <p style={textContentStyle}><strong>Solución a Problemas de HOC:</strong></p>
                    <ul style={textContentStyle}>
                        <li>Al pasar props de forma explícita, no se inyectan implícitamente como en los HOC.</li>
                        <li>Todas las props que se pasan son visibles en la lista de argumentos de la función de renderizado, facilitando la depuración.</li>
                    </ul>
                </div>
                <div>
                    <h3 style={textContentStyle}>Desventajas</h3>
                    <p style={textContentStyle}><strong>Innecesario con Hooks:</strong></p>
                    <ul style={textContentStyle}>
                        <li>Los Hooks han cambiado la forma en la que agregamos reutilización y compartición de datos en los componentes, reemplazando en muchos casos la necesidad de Render Props.</li>
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
                <h2 style={{ textAlign: 'center' }}>Implementación de Render Props</h2>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={textContentStyle}>Ejemplo 1: Selector de Razas de Perros</h3>
                  <p style={textContentStyle}>Este componente utiliza el patrón Render Props con una prop dedicada llamada 'render' para mostrar información detallada sobre razas de perros seleccionadas.</p>
                </div>
                
                <DogSelector 
                  render={(selectedDog) => (
                    selectedDog ? (
                      <DogDetails dog={selectedDog} />
                    ) : (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '30px', 
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}>
                        <p>Selecciona una raza de perro para ver más detalles.</p>
                      </div>
                    )
                  )}
                />
                
            </section>

            <section style={{ 
                marginBottom: '30px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <h2 style={{ textAlign: 'center' }}>Alternativa: Usando Children como Function</h2>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={textContentStyle}>Ejemplo 2: Selector de Periféricos para PC</h3>
                  <p style={textContentStyle}>Otra forma de implementar el patrón Render Props es utilizando la prop 'children' como función. Este ejemplo muestra información sobre periféricos para computadoras.</p>
                </div>
                
                <PeripheralSelector>
                  {(selectedPeripheral) => (
                    selectedPeripheral ? (
                      <PeripheralDetails peripheral={selectedPeripheral} />
                    ) : (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '30px', 
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}>
                        <p>Selecciona un periférico para ver más detalles.</p>
                      </div>
                    )
                  )}
                </PeripheralSelector>
              </section>
          </div>
      )
}