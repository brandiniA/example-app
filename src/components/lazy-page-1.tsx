
const LazyPage1 = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Página 1</h2>
      <p>Esta es la primera página cargada de manera perezosa con React.lazy</p>
      <div style={{ 
        backgroundColor: '#e6f7ff', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <p>
          Esta página solo se carga cuando el usuario navega a ella, 
          lo que ayuda a reducir el tamaño del bundle inicial.
        </p>
      </div>
    </div>
  );
};

export default LazyPage1; 