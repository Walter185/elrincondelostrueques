import React, { useState, useEffect, useContext } from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import db, { getAllProductsbyOwner } from "../Firebase/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import "./Show.css"

const MySwal = withReactContent(Swal);


const ThumbnailImage = styled.img`
  max-width: 100px;
  height: auto;
`;

const Show = () => {
  const [products, setProducts] = useState([]);

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "productos", id);
    await deleteDoc(productDoc);
    getAllProductsbyOwner(); 
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás recuperar lo borrado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire("Borrado!", "El archivo ha sido borrado.", "success");
      }
    });
  };

  useEffect(() => {
    const fetchProductos = async () => {
      const productsData = await getAllProductsbyOwner();
      setProducts(productsData);
    };

    fetchProductos();
  }, []);

  return (
    <div className="container">
      <h3>Panel del administrador</h3>
      <button className="Boton">
        <Nav.Link href="/create">Nuevo</Nav.Link>
      </button>
      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Nombre del Producto</th>
              <th>Categoria Publicada</th>
              <th>Categoria Deseada</th>
              <th>E/B</th>
              <th>Previsualización</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.nombreProducto}</td>
                <td>{product.category}</td>
                <td>{product.categoriaDeseada}</td>
                <td>
                  <Link to={`/edit/${product.id}`} className="btn btn-light">
                    <i className="fas fa-pencil"></i> Editar
                  </Link>
                  <button
                    onClick={() => confirmDelete(product.id)}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-trash"></i> Borrar
                  </button>
                </td>
                <td>
                  <ThumbnailImage src={product.imgUrl} alt={product.nombreProducto} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Show;
