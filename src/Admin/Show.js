import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from "react-router-dom";
import db, { getAllProductsbyOwner, DeleteFile, storage } from "../Firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import "./Show.css"
import { ref } from "firebase/storage";

const MySwal = withReactContent(Swal);

const ThumbnailImage = styled.img`
  max-width: 100px;
  height: auto;
`;

const Show = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "productos", id);
    const productData = products.find((product) => product.id === id);

    // Delete images from storage
    for (const url of productData.imgUrls) {
      const imageRef = ref(storage, url);
      await DeleteFile(imageRef);
    }

    // Delete product document
    await deleteDoc(productDoc);

    // Refresh the products list
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
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
        deleteProduct(id).then(() => {
          Swal.fire("Borrado!", "El archivo ha sido borrado.", "success");
          navigate("/show")
        });
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
    <div className="contenedor_show">
      <h3>Panel Administrador</h3>
      <button className="Boton">
        <Nav.Link href="/create">Crear Nuevo Aviso</Nav.Link>
      </button>
      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Previsualización</th>
              <th>Nombre del Producto</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <ThumbnailImage src={product.imgUrls[0]} alt={product.nombreProducto} />
                </td>
                <td>{product.nombreProducto}</td>
                <td>
                  <Link to={`/edit/${product.id}`} className="btn btn-light">
                    <i className="fas fa-pencil"></i>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => confirmDelete(product.id)}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
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
