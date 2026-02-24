import '../estilos/Item.css'
import { Link } from 'react-router-dom'

function Item({ id, foto, nombre, apellido, precio }) {
  return (
    <div
      key={id}
      className='card' >
      <img src={foto} alt=""/>
      <div className='texto-card'>
        <h3>{nombre} {apellido}</h3>
        <p>{precio}$</p>
        <Link className='boton-ver-mas' to={`/item/${id}`}>Ver mas</Link>
      </div>
    </div>
  )
}

export default Item