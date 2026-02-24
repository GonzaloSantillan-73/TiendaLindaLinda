import Item from "./Item";
import { useState, useEffect } from "react";
import "../estilos/Lista.css";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

function Lista() {
  const [personas, setPersonas] = useState(null);

  const raza = useParams().raza;

  useEffect(() => {
    const productosRef = collection(db, "productos");

    const q = raza ? query(productosRef, where("color", "==", raza)) : productosRef

    getDocs(q).then((res) => {
      setPersonas(
        res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      );
    });
  }, [raza]);

  if(!personas){
    return(
      <div>Cargando...</div>
    )
  }

  return (
    <div className="contenedor">
      {personas && personas.length > 0
        ? personas.map((persona) => {
            return (
              <Item
                key={persona.id}
                id={persona.id}
                nombre={persona.nombre}
                apellido={persona.apellido}
                foto={persona.foto}
                precio={persona.precio}
              />
            );
          })
        : ""}
    </div>
  );
}

export default Lista;
