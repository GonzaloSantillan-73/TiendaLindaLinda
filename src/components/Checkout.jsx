import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { contextCarrito } from "../context/contextCarrito"
import { collection,addDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { Link } from "react-router-dom"
import "../estilos/Checkout.css"

function Checkout(){
  const {register,handleSubmit}=useForm()
  const [pedidoId,setPedidoId] = useState()
  const {carrito, vaciar, calcularTotal} = useContext(contextCarrito)

  const comprar=(data)=>{
    const pedido={
      cliente: data,
      carrito: carrito,
      total: calcularTotal()
    }
    console.log(pedido)
    const pedidosRef = collection(db,"Pedidos")
    addDoc(pedidosRef,pedido)
      .then((doc)=>{
        setPedidoId(doc.id)
        vaciar()
      })
  }

  if(carrito.length==0 && !pedidoId){
    return(
      <>
        <h1>No puedes continuar con la compra...</h1>
        <h2>Parece que aun no has elegido ningun producto.</h2>
        <Link to="/">Volver al inicio</Link>
      </>
    )
  }

  if(pedidoId){
    return(
      <>
        <h1>Gracias por tu compra!!!</h1>
        <h2>Tu codigo de pedido es {pedidoId}</h2>
      </>
    )
  }

  return (
    <form className="form-checkout" onSubmit={handleSubmit(comprar)}>
      <input required type="text" placeholder="Ingresa tu nombre" {...register("nombre")}/>
      <input required type="email" placeholder="Ingresa tu correo" {...register("email")}/>
      <input required type="tel" placeholder="Ingresa tu telefono" {...register("telefono")}/>

      <button type="submit">Enviar</button>
    </form>
  )
}

export default Checkout