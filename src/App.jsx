import { useState } from 'react'
import reactLogo from './assets/IMG_0767.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo" alt="React logo" />
        </a>
      </div>
      <h1>Ignacio Javier Aramayo</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
            que onda perrito malvado 
        </button>
        <p>
          Tengo que editar <code>src/App.jsx</code> para guardar los cambios en esta mini pagina
        </p>
      </div>
      <p className="read-the-docs">
        Si hago click en los logos se abren otras paginas
      </p>
    </>
  )
}

export default App
