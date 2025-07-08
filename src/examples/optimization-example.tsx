import React, { lazy, useState, useMemo, useCallback } from 'react';
import { Routes, Route, Link } from 'react-router';

// Importamos las páginas usando lazy loading
const LazyPage1 = lazy(() => import('../components/lazy-page-1.tsx'));
const LazyPage2 = lazy(() => import('../components/lazy-page-2.tsx'));
const LazyPage3 = lazy(() => import('../components/lazy-page-3.tsx'));

// Componentes para el ejemplo de React.memo
// Componente hijo sin memoización
const RegularChild = ({ name }: { name: string }) => {
  console.log('Renderizando RegularChild');
  return (
    <div style={{ padding: '10px', border: '1px solid #d9d9d9', margin: '10px 0' }}>
      <p>Componente Regular: {name}</p>
    </div>
  );
};

// Componente hijo con memoización
const MemoizedChild = React.memo(({ name }: { name: string }) => {
  console.log('Renderizando MemoizedChild');
  return (
    <div style={{ padding: '10px', border: '1px solid #91caff', margin: '10px 0' }}>
      <p>Componente Memoizado: {name}</p>
    </div>
  );
});

// Componente ejemplo de memoización
const MemoExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Usuario');
  
  return (
    <div>
      <h4>Contador: {count}</h4>
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
          borderRadius: '4px' 
        }}
      >
        Cambiar Nombre
      </button>
      
      <div style={{ marginTop: '20px' }}>
        <p>Abre la consola para ver los logs de renderizado</p>
        <RegularChild name={name} />
        <MemoizedChild name={name} />
      </div>
    </div>
  );
};

// Datos para el ejemplo de useMemo
const largeList = [
  { id: 1, name: 'React', category: 'frontend', popularity: 'alta' },
  { id: 2, name: 'Angular', category: 'frontend', popularity: 'media' },
  { id: 3, name: 'Vue', category: 'frontend', popularity: 'media' },
  { id: 4, name: 'Svelte', category: 'frontend', popularity: 'baja' },
  { id: 5, name: 'Node.js', category: 'backend', popularity: 'alta' },
  { id: 6, name: 'Express', category: 'backend', popularity: 'alta' },
  { id: 7, name: 'Django', category: 'backend', popularity: 'media' },
  { id: 8, name: 'Flask', category: 'backend', popularity: 'media' },
  { id: 9, name: 'Laravel', category: 'backend', popularity: 'media' },
  { id: 10, name: 'Spring', category: 'backend', popularity: 'alta' },
  { id: 11, name: 'MongoDB', category: 'database', popularity: 'alta' },
  { id: 12, name: 'MySQL', category: 'database', popularity: 'alta' },
  { id: 13, name: 'PostgreSQL', category: 'database', popularity: 'alta' },
  { id: 14, name: 'SQLite', category: 'database', popularity: 'media' },
  { id: 15, name: 'Redis', category: 'database', popularity: 'media' },
];

// Componente que filtra la lista usando useMemo
const FilteredList = ({ keyword, filterType }: { keyword: string, filterType: string }) => {
  console.log(`Renderizando FilteredList con keyword: ${keyword}, filterType: ${filterType}`);
  
  // Usamos useMemo para memorizar el resultado del filtrado
  const filteredItems = useMemo(() => {
    console.log(`Calculando filtrado para: ${keyword} (${filterType})`);
    
    // Simulamos un cálculo costoso
    const startTime = performance.now();
    while (performance.now() - startTime < 50) {
      // Bloquea el hilo por 50ms para simular un cálculo pesado
    }
    
    return largeList.filter(item => {
      if (!keyword) return true;
      return item[filterType as keyof typeof item]
        .toString()
        .toLowerCase()
        .includes(keyword.toLowerCase());
    });
  }, [keyword, filterType]); // Solo recalcula cuando keyword o filterType cambian
  
  return (
    <div style={{ marginTop: '15px' }}>
      <h4>Resultados ({filteredItems.length})</h4>
      <ul style={{ 
        listStyle: 'none', 
        padding: '10px', 
        maxHeight: '200px', 
        overflowY: 'auto', 
        border: '1px solid #d9d9d9', 
        borderRadius: '4px'
      }}>
        {filteredItems.map(item => (
          <li key={item.id} style={{ 
            padding: '8px', 
            margin: '4px 0', 
            backgroundColor: '#f9f9f9', 
            borderRadius: '4px' 
          }}>
            <strong>{item.name}</strong> - {item.category} (Popularidad: {item.popularity})
          </li>
        ))}
      </ul>
    </div>
  );
};

// Componente ejemplo para useMemo
const UseMemoExample = () => {
  const [keyword, setKeyword] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h4>Filtrar por:</h4>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button 
            onClick={() => setFilterType('name')}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: filterType === 'name' ? '#1890ff' : '#f0f0f0', 
              color: filterType === 'name' ? 'white' : 'black', 
              border: 'none', 
              borderRadius: '4px' 
            }}
          >
            Nombre
          </button>
          <button 
            onClick={() => setFilterType('category')}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: filterType === 'category' ? '#1890ff' : '#f0f0f0', 
              color: filterType === 'category' ? 'white' : 'black', 
              border: 'none', 
              borderRadius: '4px' 
            }}
          >
            Categoría
          </button>
          <button 
            onClick={() => setFilterType('popularity')}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: filterType === 'popularity' ? '#1890ff' : '#f0f0f0', 
              color: filterType === 'popularity' ? 'white' : 'black', 
              border: 'none', 
              borderRadius: '4px' 
            }}
          >
            Popularidad
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="text" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder={`Buscar por ${filterType}...`}
            style={{ 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #d9d9d9', 
              width: '250px' 
            }}
          />
          
          <button 
            onClick={() => setCount(count + 1)}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#52c41a', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px' 
            }}
          >
            Contador: {count}
          </button>
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>
          (El botón contador no afecta el filtrado, solo demuestra que no se recalcula)
        </p>
      </div>
      
      <FilteredList keyword={keyword} filterType={filterType} />
    </div>
  );
};

// Componente para demostrar la diferencia entre useCallback y useMemo
const CallbackExample = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Implementación con useCallback nativo
  const handleClickWithCallback = useCallback(() => {
    console.log('Función con useCallback ejecutada, count:', count);
    return `Resultado: ${count}`;
  }, [count]);
  
  // Implementación equivalente usando useMemo
  const handleClickWithMemo = useMemo(() => {
    return () => {
      console.log('Función con useMemo ejecutada, count:', count);
      return `Resultado: ${count}`;
    };
  }, [count]);
  
  // Para mostrar el resultado en la UI
  const [callbackResult, setCallbackResult] = useState('');
  const [memoResult, setMemoResult] = useState('');
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h4>Comparación de useCallback vs useMemo para funciones</h4>
        <p>
          Contador: {count} | 
          <button 
            onClick={() => setCount(count + 1)}
            style={{ 
              padding: '4px 8px', 
              marginLeft: '10px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #d9d9d9',
              borderRadius: '4px'
            }}
          >
            Incrementar
          </button>
        </p>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Este input no afecta a las funciones"
          style={{ 
            padding: '8px', 
            borderRadius: '4px', 
            border: '1px solid #d9d9d9', 
            width: '250px',
            marginBottom: '15px'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ 
          flex: 1, 
          padding: '15px', 
          border: '1px solid #91caff', 
          borderRadius: '6px',
          backgroundColor: '#e6f7ff'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>useCallback</h4>
          <button 
            onClick={() => setCallbackResult(handleClickWithCallback())}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#1890ff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              marginBottom: '10px'
            }}
          >
            Ejecutar useCallback
          </button>
          <p>Resultado: {callbackResult}</p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            La referencia a esta función solo cambia cuando count cambia
          </p>
        </div>
        
        <div style={{ 
          flex: 1, 
          padding: '15px', 
          border: '1px solid #52c41a', 
          borderRadius: '6px',
          backgroundColor: '#f6ffed'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>useMemo ⟹ función</h4>
          <button 
            onClick={() => setMemoResult(handleClickWithMemo())}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#52c41a', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              marginBottom: '10px'
            }}
          >
            Ejecutar useMemo
          </button>
          <p>Resultado: {memoResult}</p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Implementación equivalente usando useMemo que retorna una función
          </p>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#f2f4f6', 
        padding: '15px', 
        borderRadius: '6px', 
        marginTop: '20px',
        border: '1px solid #d0d7de'
      }}>
        <p style={{ margin: '0 0 10px 0' }}>
          <strong>Observaciones:</strong>
        </p>
        <ul style={{ margin: '0' }}>
          <li>Ambas implementaciones se comportan de manera idéntica</li>
          <li>Las funciones solo se recrean cuando el contador cambia</li>
          <li>Cambiar el texto en el input no causa que las funciones se recreen</li>
          <li>Abre la consola para ver cuándo se ejecutan las funciones</li>
        </ul>
      </div>
    </div>
  );
};

// Main component
export const OptimizationExample = () => {
  return (
    <div className="optimization-container" style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '0 20px'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Técnicas de Optimización en React</h1>
      
      <section className="info-section" style={{ 
        marginBottom: '30px',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        color: '#333'
      }}>
        <h2 style={{ textAlign: 'center' }}>Lazy Loading y Suspense</h2>
        
        <div style={{ textAlign: 'left' }}>
          <p>
            Lazy loading es una técnica de optimización de tu aplicación que permite partir el código en pequeños "chunks".
            En vez de cargar toda la aplicación de primeras, con lazy loading permite cargar solo lo que vayas necesitando,
            una parte específica de la app cuando realmente es requerida. Lo que ayuda a que las cargas iniciales mejoren.
          </p>
          
          <p>
            Si tu app tiene múltiples rutas, entonces lo lógico sería no cargar el JS completamente inicialmente.
            Así que usar esta técnica ayuda a cargarlo por partes.
          </p>
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
        <h2 style={{ textAlign: 'center' }}>Cómo Lazy Loading Funciona en React</h2>
        
        <div style={{ textAlign: 'left' }}>
          <p>
            React usa "React.lazy" para importar de manera dinámica componentes. Esta función permite cargar los componentes cuando son necesarios.
          </p>
          
          <p>
            React no maneja de manera automática el estado de "loading", ahí es donde entra React.Suspense. Este te permite especificar un fallback UI que será mostrado mientras el componente está cargando.
          </p>
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
        <h2 style={{ textAlign: 'center' }}>Ejemplo de Lazy Loading con React Router</h2>
        
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <p>
            A continuación se muestra un ejemplo de cómo usar React.lazy y Suspense con React Router para cargar páginas de forma dinámica:
          </p>
        </div>
        
        <div style={{ 
          border: '1px solid #d9d9d9', 
          borderRadius: '8px', 
          padding: '20px',
          backgroundColor: 'white'
        }}>
          <div>
            <nav style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '20px', 
              marginBottom: '20px' 
            }}>
              <Link to="page1" style={{ 
                padding: '8px 16px', 
                backgroundColor: '#1890ff', 
                color: 'white', 
                borderRadius: '4px', 
                textDecoration: 'none' 
              }}>
                Página 1
              </Link>
              <Link to="page2" style={{ 
                padding: '8px 16px', 
                backgroundColor: '#1890ff', 
                color: 'white', 
                borderRadius: '4px', 
                textDecoration: 'none' 
              }}>
                Página 2
              </Link>
              <Link to="page3" style={{ 
                padding: '8px 16px', 
                backgroundColor: '#1890ff', 
                color: 'white', 
                borderRadius: '4px', 
                textDecoration: 'none' 
              }}>
                Página 3
              </Link>
            </nav>
            
            <div style={{ 
              padding: '20px', 
              border: '1px solid #f0f0f0', 
              borderRadius: '4px', 
              minHeight: '200px'
            }}>
              <Routes>
                <Route path="page1" element={
                  <React.Suspense fallback={<div>...Loading</div>}>
                    <LazyPage1 />
                  </React.Suspense>
                } />
                <Route path="page2" element={
                  <React.Suspense fallback={<div>...Loading</div>}>
                    <LazyPage2 />
                  </React.Suspense>
                } />
                <Route path="page3" element={
                  <React.Suspense fallback={<div>...Loading</div>}>
                    <LazyPage3 />
                  </React.Suspense>
                } />
                <Route path="*" element={
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <p>Selecciona una página para ver el ejemplo de Lazy Loading</p>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: '#f6ffed', 
          padding: '15px', 
          borderRadius: '6px', 
          marginTop: '20px',
          border: '1px solid #b7eb8f'
        }}>
          <p style={{ margin: '0' }}>
            <strong>Nota:</strong> Cada página se carga solo cuando el usuario navega a ella, reduciendo el tamaño del bundle inicial y mejorando el rendimiento de carga.
          </p>
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
        <h2 style={{ textAlign: 'center' }}>Código del Ejemplo</h2>
        
        <div style={{ textAlign: 'left' }}>
          <pre style={{
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '15px',
            borderRadius: '6px',
            overflowX: 'auto',
            fontSize: '14px'
          }}>
{`// main.tsx (configuración del router principal)
const router = createBrowserRouter([
  // ... otras rutas
  {
    path: "/optimization/*",
    element: <OptimizationExample />,
  },
]);

// optimization-example.tsx
import React, { lazy } from 'react';
import { Routes, Route, Link } from 'react-router';

// Importamos las páginas usando lazy loading
const LazyPage1 = lazy(() => import('./components/lazy-page-1'));
const LazyPage2 = lazy(() => import('./components/lazy-page-2'));
const LazyPage3 = lazy(() => import('./components/lazy-page-3'));

export const OptimizationExample = () => {
  return (
    <div>
      <nav>
        <Link to="page1">Página 1</Link>
        <Link to="page2">Página 2</Link>
        <Link to="page3">Página 3</Link>
      </nav>
      
      <Routes>
        <Route path="page1" element={
          <React.Suspense fallback={<div>...Loading</div>}>
            <LazyPage1 />
          </React.Suspense>
        } />
        <Route path="page2" element={
          <React.Suspense fallback={<div>...Loading</div>}>
            <LazyPage2 />
          </React.Suspense>
        } />
        <Route path="page3" element={
          <React.Suspense fallback={<div>...Loading</div>}>
            <LazyPage3 />
          </React.Suspense>
        } />
      </Routes>
    </div>
  );
}`}
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
        <h2 style={{ textAlign: 'center' }}>Ventajas y Desventajas del Lazy Loading</h2>
        
        <div style={{ textAlign: 'left' }}>
          <div style={{ 
            backgroundColor: '#e6f7ff', 
            padding: '15px', 
            borderRadius: '6px', 
            marginTop: '20px',
            marginBottom: '30px',
            border: '1px solid #91caff'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Beneficios del Lazy Loading</h3>
            <ul>
              <li>Reduce el tamaño del bundle inicial</li>
              <li>Mejora el tiempo de carga inicial de la aplicación</li>
              <li>Carga componentes solo cuando son necesarios</li>
              <li>Optimiza el rendimiento en dispositivos con recursos limitados</li>
              <li>Menos consumo de ancho de banda</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: '#fff2f0', 
            padding: '15px', 
            borderRadius: '6px', 
            marginTop: '20px',
            border: '1px solid #ffccc7'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Desventajas del Lazy Loading</h3>
            <ul>
              <li><strong>Cambio en el diseño</strong> → Si el componente de fallback tiene un tamaño diferente, puede causar saltos en la interfaz.</li>
              <li><strong>Experiencia del usuario</strong> → Cargar un componente necesario de inmediato de forma diferida puede ralentizar la renderización.</li>
              <li><strong>Complejidad adicional</strong> → Requiere una configuración más elaborada y manejo de estados de carga.</li>
              <li><strong>Dependencia de red</strong> → Si la conexión es lenta, la experiencia puede deteriorarse con múltiples cargas diferidas.</li>
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
        <h2 style={{ textAlign: 'center' }}>¿Qué son los Chunks?</h2>
        
        <div style={{ textAlign: 'left' }}>
          <p>
            Los "chunks" son fragmentos de código en los que se divide tu aplicación durante el proceso de build. 
            Cuando utilizas lazy loading, Webpack (u otro bundler) separa automáticamente tu código en diferentes archivos 
            JavaScript que se cargarán bajo demanda.
          </p>
          
          <p>
            Cada vez que usas <code>React.lazy</code> e <code>import()</code>, estás indicando al bundler que ese módulo 
            debe separarse en su propio chunk, que será cargado solo cuando sea necesario.
          </p>

          <div style={{ 
            backgroundColor: '#f2f4f6', 
            padding: '15px', 
            borderRadius: '6px', 
            marginTop: '20px',
            border: '1px solid #d0d7de'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Resultado de un Build</h3>
            <p>Al ejecutar <code>yarn build</code>, verás que se generan múltiples archivos JavaScript en la carpeta <code>dist/assets</code>:</p>
            <div style={{
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              padding: '15px',
              borderRadius: '6px',
              overflowX: 'auto',
              fontSize: '14px',
              marginTop: '10px'
            }}>
              <pre style={{ margin: 0 }}>
{`dist/
  ├── assets/
  │   ├── index-Mg1dHNuq.js         # Bundle principal
  │   ├── index-MM7Kod2R.css        # Estilos principales
  │   ├── lazy-page-1-DWCuQxJi.js   # Chunk para LazyPage1
  │   ├── lazy-page-2-Ci3wVVMp.js   # Chunk para LazyPage2
  │   ├── lazy-page-3-MhqEEzDG.js   # Chunk para LazyPage3
  │   ├── react-CHdo91hT.svg        # Recursos estáticos
  │   └── vite.svg                  # Recursos estáticos
  └── index.html`}
              </pre>
            </div>
            <p style={{ marginTop: '15px' }}>
              Como puedes observar, cada página lazy se ha convertido en un archivo JavaScript independiente 
              que será cargado solo cuando el usuario navegue a esa ruta específica.
            </p>
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
        <h2 style={{ textAlign: 'center' }}>Memoización con React.memo y useMemo</h2>
        
        <div style={{ textAlign: 'left' }}>
          <p>
            Otro problema común de rendimiento en React son los re-renderizados innecesarios. Esto ocurre cuando un componente 
            se vuelve a renderizar sin que haya cambios visibles para el usuario, consumiendo recursos del sistema sin necesidad.
          </p>
          
          <div style={{ 
            backgroundColor: '#e6f7ff', 
            padding: '15px', 
            borderRadius: '6px', 
            marginTop: '20px',
            marginBottom: '20px',
            border: '1px solid #91caff'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Problemas comunes que resuelven React.memo y useMemo</h3>
            <ul>
              <li>Re-renderizados innecesarios de componentes</li>
              <li>Cálculos costosos repetidos (filtros de listas grandes, operaciones matemáticas complejas)</li>
              <li>Pérdida de rendimiento en aplicaciones con muchos componentes anidados</li>
            </ul>
          </div>
          
          <h3>¿Qué es React.memo?</h3>
          <p>
            <code>React.memo</code> es un Higher-Order Component (HOC) que memoriza un componente, lo que significa que solo 
            se vuelve a renderizar si hay un cambio en sus props. Actúa como una capa de optimización que evita renderizados 
            innecesarios cuando las props no han cambiado.
          </p>
          
          <div style={{ 
            backgroundColor: '#f2f4f6', 
            padding: '15px', 
            borderRadius: '6px', 
            marginTop: '20px',
            marginBottom: '20px',
            border: '1px solid #d0d7de'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>¿Cuándo usar React.memo?</h3>
            <ul>
              <li>Componentes funcionales que tengan mismos props, misma salida</li>
              <li>Componentes pesados como grandes listas o UI de elementos complejos</li>
              <li>Si el padre se re-renderiza constantemente pero los props de los hijos se mantienen igual</li>
            </ul>
          </div>
          
          <h3>Ejemplo Práctico de React.memo</h3>
          <p>
            A continuación se muestra un ejemplo donde un componente padre tiene un botón para aumentar un contador. 
            Tiene dos componentes hijos: uno usa React.memo y el otro no. Observa cómo el componente sin memo se 
            renderiza cada vez que el contador cambia, mientras que el componente con memo solo se renderiza cuando 
            sus props cambian.
          </p>
          
          <div style={{ 
            border: '1px solid #d9d9d9', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: 'white',
            marginTop: '20px'
          }}>
            <MemoExample />
          </div>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '15px',
            borderRadius: '6px',
            overflowX: 'auto',
            fontSize: '14px',
            marginTop: '20px'
          }}>
            <pre style={{ margin: 0 }}>
{`// Componente hijo sin memoización
const RegularChild = ({ name }) => {
  console.log('Renderizando RegularChild');
  return (
    <div style={{ padding: '10px', border: '1px solid #d9d9d9', margin: '10px 0' }}>
      <p>Componente Regular: {name}</p>
    </div>
  );
};

// Componente hijo con memoización
const MemoizedChild = React.memo(({ name }) => {
  console.log('Renderizando MemoizedChild');
  return (
    <div style={{ padding: '10px', border: '1px solid #91caff', margin: '10px 0' }}>
      <p>Componente Memoizado: {name}</p>
    </div>
  );
});

// Componente padre
const MemoExample = () => {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('Usuario');
  
  return (
    <div>
      <h4>Contador: {count}</h4>
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
          borderRadius: '4px' 
        }}
      >
        Cambiar Nombre
      </button>
      
      <div style={{ marginTop: '20px' }}>
        <p>Abre la consola para ver los logs de renderizado</p>
        <RegularChild name={name} />
        <MemoizedChild name={name} />
      </div>
    </div>
  );
};`}
            </pre>
          </div>
          
          <div style={{ 
            backgroundColor: '#f6ffed', 
            padding: '15px', 
            borderRadius: '6px', 
            marginTop: '20px',
            border: '1px solid #b7eb8f'
          }}>
            <p style={{ margin: '0' }}>
              <strong>Nota:</strong> Observa en la consola cómo el componente regular se renderiza cada vez que el contador 
              cambia, mientras que el componente memoizado solo se renderiza cuando cambia su prop 'name'.
            </p>
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
        <h2 style={{ textAlign: 'center' }}>Memoización con React.memo y useMemo</h2>
        
        <div style={{ textAlign: 'left' }}>
          {/* ... existing code ... */}
          
          <div style={{ 
            backgroundColor: '#fff2f0', 
            padding: '15px', 
            borderRadius: '6px', 
            marginTop: '30px',
            marginBottom: '20px',
            border: '1px solid #ffccc7'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>¿Cuándo NO usar React.memo?</h3>
            <ul>
              <li><strong>Si los props cambian frecuentemente</strong> → El costo de comparar props podría ser mayor que el beneficio</li>
              <li><strong>Componentes muy simples</strong> → La sobrecarga de la memoización puede superar el costo del re-renderizado</li>
              <li><strong>Cuando las props son objetos o funciones complejas</strong> → React.memo hace comparaciones superficiales por defecto</li>
            </ul>
          </div>
          
          <h3 style={{ marginTop: '30px' }}>¿Qué es useMemo?</h3>
          <p>
            <code>useMemo</code> es un Hook de React que permite memorizar el resultado de un cálculo costoso. 
            Guarda en caché el resultado de una función y solo lo recalcula cuando cambian sus dependencias.
          </p>
          
          <div style={{ 
            backgroundColor: '#f2f4f6', 
            padding: '15px', 
            borderRadius: '6px', 
            marginTop: '20px',
            marginBottom: '20px',
            border: '1px solid #d0d7de'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>¿Cuándo usar useMemo?</h3>
            <ul>
              <li>Procesar o filtrar datos, como ordenar una lista larga</li>
              <li>Calcular valores complejos basados en datos</li>
              <li>Transformar información recibida de una API antes de mostrarla</li>
              <li>Evitar cálculos repetidos en cada renderizado</li>
            </ul>
          </div>
          
          <h3>Ejemplo Práctico de useMemo</h3>
          <p>
            A continuación se muestra un ejemplo donde usamos <code>useMemo</code> para filtrar una lista 
            basada en una palabra clave. Observa cómo el cálculo costoso solo se realiza cuando cambia la 
            palabra clave o el tipo de filtro, pero no cuando cambia el contador.
          </p>
          
          <div style={{ 
            border: '1px solid #d9d9d9', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: 'white',
            marginTop: '20px'
          }}>
            <UseMemoExample />
          </div>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '15px',
            borderRadius: '6px',
            overflowX: 'auto',
            fontSize: '14px',
            marginTop: '20px'
          }}>
            <pre style={{ margin: 0 }}>
{`// Componente que filtra la lista usando useMemo
const FilteredList = ({ keyword, filterType }) => {
  console.log(\`Renderizando FilteredList con keyword: \${keyword}\`);
  
  // Usamos useMemo para memorizar el resultado del filtrado
  const filteredItems = useMemo(() => {
    console.log(\`Calculando filtrado para: \${keyword}\`);
    
    // Simulamos un cálculo costoso
    const startTime = performance.now();
    while (performance.now() - startTime < 50) {
      // Bloquea el hilo por 50ms para simular un cálculo pesado
    }
    
    return largeList.filter(item => {
      if (!keyword) return true;
      return item[filterType]
        .toString()
        .toLowerCase()
        .includes(keyword.toLowerCase());
    });
  }, [keyword, filterType]); // Solo recalcula cuando keyword o filterType cambian
  
  return (
    <div>
      <h4>Resultados ({filteredItems.length})</h4>
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.category} 
            (Popularidad: {item.popularity})
          </li>
        ))}
      </ul>
    </div>
  );
};`}
            </pre>
          </div>
          
          <div style={{ 
            backgroundColor: '#f6ffed', 
            padding: '15px', 
            borderRadius: '6px', 
            marginTop: '20px',
            border: '1px solid #b7eb8f'
          }}>
            <p style={{ margin: '0' }}>
              <strong>Nota:</strong> Observa en la consola cómo el cálculo costoso solo se ejecuta cuando 
              cambias la palabra clave o el tipo de filtro, pero no cuando incrementas el contador. Esto 
              demuestra cómo <code>useMemo</code> evita cálculos innecesarios.
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: '#fff2f0', 
            padding: '15px', 
            borderRadius: '6px', 
            marginTop: '30px',
            marginBottom: '20px',
            border: '1px solid #ffccc7'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>¿Cuándo NO usar useMemo?</h3>
            <ul>
              <li><strong>Cálculos simples</strong> → Para operaciones sencillas como <code>const total = a + b</code>, el costo de la memoización es mayor que el beneficio</li>
              <li><strong>Dependencias que cambian constantemente</strong> → Si las dependencias cambian en cada renderizado, no tiene sentido memorizar el resultado</li>
              <li><strong>Componentes pequeños o simples</strong> → La sobrecarga de la memoización puede superar el beneficio en componentes simples</li>
              <li><strong>Durante el desarrollo inicial</strong> → Es mejor implementar primero la funcionalidad y optimizar después si es necesario</li>
            </ul>
          </div>
          
          <h3 style={{ marginTop: '30px' }}>Mención Honorífica: useCallback</h3>
          <p>
            <code>useCallback</code> es un Hook muy relacionado con <code>useMemo</code>. De hecho, 
            <code>useCallback</code> no es más que un <code>useMemo</code> que retorna una función.
          </p>
          
          <p>
            Mientras que <code>useMemo</code> memoriza el <strong>resultado</strong> de una función, 
            <code>useCallback</code> memoriza la <strong>función en sí misma</strong>. Esto es especialmente 
            útil cuando pasamos funciones como props a componentes memoizados.
          </p>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '15px',
            borderRadius: '6px',
            overflowX: 'auto',
            fontSize: '14px',
            marginTop: '20px'
          }}>
            <pre style={{ margin: 0 }}>
{`// Así es como se usa useCallback
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b], // Solo se recrea si 'a' o 'b' cambian
);

// Y así es como se implementaría useCallback usando useMemo
// (Implementación conceptual, no código real de React)
function useCallback(callback, dependencies) {
  return useMemo(() => callback, dependencies);
}`}
            </pre>
          </div>
          
          <div style={{ 
            backgroundColor: '#e6f7ff', 
            padding: '15px', 
            borderRadius: '6px', 
            marginTop: '20px',
            border: '1px solid #91caff'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Sobre las dependencias</h3>
            <p>
              Tanto <code>useMemo</code> como <code>useCallback</code> reciben un array de dependencias como segundo argumento. 
              Es crucial incluir todas las variables que se usan dentro de la función y que podrían cambiar entre renderizados.
            </p>
            <p>
              Si omites dependencias, podrías tener resultados inconsistentes o bugs difíciles de detectar. 
              Por otro lado, si incluyes demasiadas dependencias innecesarias, perderás los beneficios de la memoización.
            </p>
            <p>
              El linter de React (ESLint con la regla exhaustive-deps) puede ayudarte a identificar las dependencias correctas.
            </p>
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
        <h2 style={{ textAlign: 'center' }}>Ejemplo comparativo</h2>
        
        <div style={{ textAlign: 'left' }}>
          <p>
            A continuación se muestra una comparación entre el uso de <code>useCallback</code> y su implementación 
            equivalente usando <code>useMemo</code>. Observa cómo ambas funciones solo se recrean cuando 
            cambia el contador, pero no cuando cambia el texto del input.
          </p>
          
          <div style={{ 
            border: '1px solid #d9d9d9', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: 'white',
            marginTop: '20px'
          }}>
            <CallbackExample />
          </div>
          
          <div style={{ 
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '15px',
            borderRadius: '6px',
            overflowX: 'auto',
            fontSize: '14px',
            marginTop: '20px'
          }}>
            <pre style={{ margin: 0 }}>
{`// Implementación con useCallback nativo
const handleClickWithCallback = useCallback(() => {
  console.log('Función con useCallback ejecutada, count:', count);
  return \`Resultado: \${count}\`;
}, [count]);

// Implementación equivalente usando useMemo
const handleClickWithMemo = useMemo(() => {
  return () => {
    console.log('Función con useMemo ejecutada, count:', count);
    return \`Resultado: \${count}\`;
  };
}, [count]);`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptimizationExample; 