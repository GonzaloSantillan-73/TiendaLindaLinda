import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Contador from "./Contador";
import "../estilos/ItemDetalles.css";
import { contextCarrito } from "../context/contextCarrito";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

function ItemDetalles() {
  const { agregarAlCarrito } = useContext(contextCarrito);
  const [cantidad, setCantidad] = useState(1);
  const [persona, setPersona] = useState(null);

  const id = useParams().id;

  useEffect(() => {
    const docRef = doc(db, "productos", id);
    getDoc(docRef).then((res) => {
      console.log(res.data());
      setPersona({ ...res.data(), id: res.id });
    });
  }, []);

  if (!persona) {
    return <div style={{ textAlign: "center" }}>Esperando datos...</div>;
  }

  const restar = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1);
    }
  };

  const sumar = () => {
    if (cantidad < persona.stock) {
      setCantidad((prev) => prev + 1);
    }
  };

  return (
    <>
      {persona ? (
        <div className="Contenedor-ItemDetalles">
          <img src={persona.foto} alt="" />
          <div className="contenedor-datos">
            <h2>
              <strong>
                {persona.nombre} {persona.apellido}
              </strong>
            </h2>
            <p>Color: {persona.color}</p>
            <p>Precio: {persona.precio}$</p>
            <p>Stock: {persona.stock}</p>
            <Contador
              cantidad={cantidad}
              restar={restar}
              sumar={sumar}
            />
            <button
              className="boton-añadir-al-carrito"
              onClick={() => agregarAlCarrito(persona, cantidad, id)}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      ) : (
        <div>Persona no encontrada</div>
      )}
    </>
  );
}

export default ItemDetalles;
