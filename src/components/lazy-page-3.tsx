import { useEffect, useState } from 'react';

const LazyPage3 = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos una carga de datos
    setTimeout(() => {
      setData(['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4', 'Elemento 5']);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Página 3</h2>
      <p>Esta es la tercera página cargada de manera perezosa con React.lazy</p>
      
      <div style={{ 
        backgroundColor: '#f6ffed', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3>Lista de datos</h3>
        
        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {data.map((item, index) => (
              <li 
                key={index}
                style={{
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        
        <p style={{ marginTop: '15px', fontSize: '14px' }}>
          Esta página simula la carga de datos desde una API, pero el componente completo solo se carga cuando el usuario navega a esta ruta.
        </p>
      </div>
    </div>
  );
};

export default LazyPage3; 