import React, { useState } from 'react';

// Componente para demostrar React.memo
const MemoizedComponent = React.memo(({ name, count }: { name: string; count: number }) => {
  console.log(`Renderizando MemoizedComponent: ${name}`);
  return (
    <div style={{ 
      padding: '10px', 
      border: '1px solid #52c41a', 
      margin: '10px 0',
      backgroundColor: '#f6ffed',
      borderRadius: '4px'
    }}>
      <p style={{ color: 'black', margin: '0 0 5px 0' }}>Componente Memoizado: {name}</p>
      <p style={{ color: 'black', margin: 0 }}>Contador: {count}</p>
    </div>
  );
});

const RegularComponent = ({ name, count }: { name: string; count: number }) => {
  console.log(`Renderizando RegularComponent: ${name}`);
  return (
    <div style={{ 
      padding: '10px', 
      border: '1px solid #d9d9d9', 
      margin: '10px 0',
      backgroundColor: '#fafafa',
      borderRadius: '4px'
    }}>
      <p style={{ color: 'black', margin: '0 0 5px 0' }}>Componente Regular: {name}</p>
      <p style={{ color: 'black', margin: 0 }}>Contador: {count}</p>
    </div>
  );
};

// Componente para demostrar memoización
export const MemoizationExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Usuario');
  const [otherState, setOtherState] = useState(0);
  
  return (
    <div style={{ 
      border: '1px solid #d9d9d9', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: 'black',
      marginTop: '20px'
    }}>
      <h4 style={{ color: 'black' }}>Props, Estado y Memoización</h4>
      
      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#1890ff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          Incrementar Contador
        </button>
        <button 
          onClick={() => setName(name === 'Usuario' ? 'Nuevo Usuario' : 'Usuario')}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#52c41a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          Cambiar Nombre
        </button>
        <button 
          onClick={() => setOtherState(otherState + 1)}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#fa8c16', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px'
          }}
        >
          Otro Estado: {otherState}
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h5 style={{ color: 'black' }}>Componentes Regulares</h5>
          <RegularComponent name={name} count={count} />
          <RegularComponent name="Estático" count={0} />
        </div>
        <div style={{ flex: 1 }}>
          <h5 style={{ color: 'black' }}>Componentes Memoizados</h5>
          <MemoizedComponent name={name} count={count} />
          <MemoizedComponent name="Estático" count={0} />
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#fff7e6', 
        padding: '10px', 
        borderRadius: '4px', 
        marginTop: '15px',
        border: '1px solid #ffd591',
        fontSize: '14px'
      }}>
        <p style={{ margin: 0, color: 'black' }}>
          <strong>Observación:</strong> Abre la consola para ver cuándo se renderizan los componentes. 
          Los memoizados solo se re-renderizan cuando cambian sus props específicas.
        </p>
      </div>
    </div>
  );
};
