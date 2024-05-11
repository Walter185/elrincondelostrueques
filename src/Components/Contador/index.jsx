import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import db from "../../Firebase/firebase";
import "./Contador.css"

const Contador = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotalProductos = async () => {
      try {
        const productsRef = collection(db, "productos");
        const snapshot = await getDocs(productsRef);
        const totalProductos = snapshot.size;
        setTotal(totalProductos);
      } catch (error) {
        console.error("Error al obtener el total de productos:", error);
      }
    };

    // Llama a la función para obtener el total de productos cuando el componente se monta
    getTotalProductos();
  }, []);

  return (
    <div>
      <h2>Total de Trueques activos actualmente:  <b className="total">{total}</b></h2>
    </div>
  );
};

export default Contador;
