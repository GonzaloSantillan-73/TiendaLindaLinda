import "./App.css";
import Lista from "./components/Lista";
import Nav from "./components/Nav";
import MostrarCarrito from "./components/MostrarCarrito";
import ItemDetalles from "./components/ItemDetalles";
import Checkout from "./components/Checkout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { contextCarrito } from "./context/contextCarrito";
import { useEffect, useState } from "react";

function App() {
  // Inicializamos el carrito leyendo el localStorage.
  // Si hay datos guardados, los convertimos a código; si no, empezamos con un array vacío.
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Efecto vigía: Cada vez que la variable 'carrito' cambia, actualizamos el localStorage.
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Calcula el dinero total sumando el precio * cantidad de cada producto.
  const calcularTotal = () =>
    carrito.reduce((acc, prod) => {
      return acc + prod.cantidad * prod.precio;
    }, 0);

  // Lógica para agregar productos
  const agregarAlCarrito = (persona, cantidad, id) => {
    const producto = { ...persona, cantidad };

    // Si el producto ya está en el carrito, solo le sumamos la nueva cantidad.
    if (carrito.find((persona) => persona.id == id)) {
      let carritoActualizado = carrito.map((persona) => {
        if (persona.id == producto.id) {
          persona.cantidad += producto.cantidad;
          return persona;
        }
        return persona;
      });
      setCarrito([...carritoActualizado]);
    } else {
      // Si no existe, lo agregamos como un producto nuevo al final de la lista.
      setCarrito([...carrito, producto]);
    }
    console.log("Producto agregado.");
  };

  // Filtra el carrito para quedarse con todos los productos MENOS el que coincida con el ID.
  const eliminar = (id) => {
    const carritoActualizado = carrito.filter((persona) => persona.id !== id);
    setCarrito(carritoActualizado);
  };

  // Resetea el carrito a cero.
  const vaciar=()=>{
    setCarrito([])
  }

  return (
    <>
      {/* Envolvemos la app en el Provider para que todos los componentes tengan acceso a estas funciones */}
      <contextCarrito.Provider
        value={{ carrito, agregarAlCarrito, setCarrito, calcularTotal, eliminar, vaciar }}
      >
        <BrowserRouter>
          <Nav />

          {/* Aquí definimos qué componente se dibuja en cada URL */}
          <Routes>
            <Route path="/" element={<Lista />} />
            <Route path="/item/:id" element={<ItemDetalles />} />
            <Route path="/personas/:raza" element={<Lista />} />
            <Route path="/carrito" element={<MostrarCarrito />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>

        </BrowserRouter>
      </contextCarrito.Provider>
    </>
  );
}

export default App;