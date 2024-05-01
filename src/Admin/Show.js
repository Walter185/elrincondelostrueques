import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db, { getAllProducts, getAllProductsbyOwner } from "../Firebase/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";

const Div = styled.div`
    margin-left: 2px;
    margin-right: 2px !important;
`;
const TH = styled.th`
    max-width: 30px;
    max-height: 30px;
`;
const TD = styled.td`
    max-width: 30px;
    max-height: 30px;
`;
const MySwal = withReactContent(Swal)

const Show = () => {
    const [products, setProducts] = useState([]);
    // const productsCollection = collection(db, "productos")

    // const getProductos = async () => {
    //     const data = await getDocs(productsCollection)
    //     SetProducts(
    //         data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //     )
    // }

    const deleteProduct = async (id) => {
        const productDoc = doc(db, "productos", id)
        await deleteDoc(productDoc)
        getAllProducts()
    }

    const confirmDelete = (id) => {
        Swal.fire({
            name: 'Estás seguro?',
            text: "No podrás recuperar lo borrado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
                Swal.fire(
                    'Borrado!',
                    'El archivo ha sido borrado.',
                    'success'
                )
            }
        })

    }

    useEffect(() => {
        const fetchProductos = async () => {
          const productsData = await getAllProductsbyOwner();
          setProducts(productsData);
        };
    
        fetchProductos();
      }, []);

    return (
        <Div>
            <div className="row">
                <h3>Panel del administrador</h3>
                <div className="col">
                    <Button>
                        <Link to="/create">Crear nuevo aviso</Link>
                    </Button>


                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <TH>Nombre del Producto</TH>
                                <TH>Descripcion</TH>
                                <TH>Categoria</TH>
                                <TH>Departamento</TH>
                                <TH>E/B</TH>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <TD>{product.nombreProducto}</TD>
                                    <TD>{product.description}</TD>
                                    <TD>{product.category}</TD>
                                    <TD>{product.departamento}</TD>
                                    <TD>
                                        <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i>Editar</Link><span>   </span>
                                        <button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i>Borrar</button>
                                    </TD>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Div>

    )
}

export default Show;