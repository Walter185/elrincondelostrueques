import React, { useState, useEffect } from "react";
import { getUltimosProductos } from "../../Firebase/firebase";


const UltimosProductos = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getUltimosProductos();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);


  return (
    <div>
      <h2>Últimos 4 Productos Agregados:</h2>
      <ul>
        {products.map(producto => (
          <li key={producto.id}>
            {producto.nombreProducto} - {producto.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UltimosProductos;
