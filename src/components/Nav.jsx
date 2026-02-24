import '../estilos/Nav.css'
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <>
      <header>
        <nav className='navegacion'>
          <ul className='lista'>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/personas/blanco">Blanco</Link></li>
            <li><Link to="/personas/negro">Negro</Link></li>
            <li><Link to="/personas/marron">Marron</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Nav