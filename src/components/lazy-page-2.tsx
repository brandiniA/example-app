import { useState } from 'react';

const LazyPage2 = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Página 2</h2>
      <p>Esta es la segunda página cargada de manera perezosa con React.lazy</p>
      
      <div style={{ 
        backgroundColor: '#fff1f0', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <p>
          Contador: <strong>{count}</strong>
        </p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Incrementar
        </button>
        <p style={{ marginTop: '10px', fontSize: '14px' }}>
          Este componente tiene estado y funcionalidad, pero solo se carga cuando se necesita.
        </p>
      </div>
    </div>
  );
};

export default LazyPage2; 