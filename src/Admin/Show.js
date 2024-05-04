import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import db, { getAllProductsbyOwner } from "../Firebase/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
const MySwal = withReactContent(Swal);

const Boton = styled.button`
height: 30px;
width: 150px;
margin-left: 20px;
background: yellow;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-weight: bolder;
border-radius: 10px;
margin-bottom: 20px;
margin-top: 10px;
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
      <div className="row">
        <h3>Panel del administrador</h3>
        <div className="col">
          <Boton>
          <Nav.Link href="/create">Nuevo</Nav.Link>
          </Boton>

          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Nombre del Producto</th>
                <th>Categoria Publicada</th>
                <th>Categoria Deseada</th>
                <th>Departamento</th>
                <th>E/B</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.nombreProducto}</td>
                  <td>{product.category}</td>
                  <td>{product.categoriaDeseada}</td>
                  <td>{product.departamento}</td>
                  <td>
                    <Link
                      to={`/edit/${product.id}`}
                      className="btn btn-light"
                    >
                      <i className="fas fa-pencil"></i> Editar
                    </Link>
                    <button
                      onClick={() => confirmDelete(product.id)}
                      className="btn btn-danger"
                    >
                      <i className="fas fa-trash"></i> Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Show;
