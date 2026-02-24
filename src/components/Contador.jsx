import "../estilos/Contador.css";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

function Contador({ cantidad, restar, sumar }) {

  return (
    <div className="contenedor-contador">
      <div className="contador">
        <button className="botones-contador" onClick={() => restar()}>
          <FaMinus />
        </button>
        <div>{cantidad}</div>
        <button className="botones-contador" onClick={() => sumar()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default Contador;
