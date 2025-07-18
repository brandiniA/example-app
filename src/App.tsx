import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router'

function App() {

  const linkStyle: React.CSSProperties = {
    padding: '10px 20px', 
    backgroundColor: '#646cff', 
    color: 'white', 
    borderRadius: '4px', 
    textDecoration: 'none',
    fontWeight: 'bold'
  }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="navigation" style={{ marginTop: '2rem' }}>
        <h2>Examples</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/hoc" style={linkStyle}>
            HOC Example
          </Link>
          <Link to="/render" style={linkStyle}>
            Render Props Example
          </Link>
          <Link to="/slot" style={linkStyle}>
            Slot Example
          </Link>
          <Link to="/portal" style={linkStyle}>
            Portal Example  
          </Link>
          <Link to="/optimization" style={linkStyle}>
            Optimization Example  
          </Link>
        </div>
      </div>
      
    </>
  )
}

export default App
