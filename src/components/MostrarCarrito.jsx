import { useContext } from "react";
import { contextCarrito } from "../context/contextCarrito";
import "../estilos/MostrarCarrito.css";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

function MostrarCarrito() {
  const { carrito, calcularTotal, eliminar, vaciar } =
    useContext(contextCarrito);

  return (
    <div className="contenedor-carrito">
      {carrito.length == 0 ? (
        <div className="carrito-vacio">El carrito esta vacio</div>
      ) : (
        <div className="contenedor-carrito-productos">
          <button className="boton-vaciarCarrito" onClick={() => vaciar()}>Vaciar carrito</button>
          {carrito.map((producto) => (
            <div className="card-carrito" key={producto.id}>
              <div className="contenedor-img">
                <img className="img-carrito" src={producto.foto} alt="" />
              </div>
              <div className="card-datos">
                <h3>
                  {producto.nombre} {producto.apellido}
                </h3>
                <p>{producto.color}</p>
                <p>{producto.precio}$</p>
                <p>{producto.cantidad}</p>
              </div>
              <h2 className="h2-total">
                {producto.precio * producto.cantidad}$
              </h2>
              <IoMdClose
                onClick={() => eliminar(producto.id)}
                className="boton-eliminar-carrito"
              />
            </div>
          ))}
        </div>
      )}
      {carrito.length > 0 ? (
        <div className="mostrarTotal">
          <h2>Total: {calcularTotal()}$</h2>
          <Link className="boton-comprar" to="/checkout">
            checkout
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MostrarCarrito;
