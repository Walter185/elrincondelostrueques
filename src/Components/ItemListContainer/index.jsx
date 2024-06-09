import {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { getAllProducts, getProductsByCategory, getProductsByName } from '../../Firebase/firebase';
import BreadCrumb from "../BreadCrumb";
import Card from "../ItemListContainer/Card";
import Loader from "../Loader";
import "./ItemListContainer.css"

export default function ItemListContainer(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    let {categoryid, searchid} = useParams();

    useEffect(() => {
        setLoading(true);
        if(searchid){
            getProductsByName(searchid).then((response) => {
                setProducts(response);
              }).catch((error) => alert(error)
              ).finally( () => setLoading(false));
        } else{
            if(categoryid === "All"){
                getAllProducts().then((response) => {
                    setProducts(response);
                  }).catch((error) => alert(error)
                  ).finally( () => setLoading(false));
            } else{
                getProductsByCategory(categoryid).then((response) => {
                    setProducts(response);
                  }).catch((error) => alert(error)
                  ).finally( () => setLoading(false));
            }
        }
    }, [categoryid, searchid]);

    return (
        <>
        <BreadCrumb currentPage={categoryid || "Búsqueda"}/>

        {loading ?
            <Loader/>
        :   
            <>
            {(products.length !== 0) ?
                <div className="container d-flex flex-wrap justify-content-center mb-4" id="cont">
                    {products.map((product) => <Card key={product.id} product={product}/>)}
                </div>
            :
                <div className="container text-center" >
                    <p className="m-4">No hubo resultados</p>
                    <br/>
                    <Link to="/" className="mx-auto my-5"><button id="noresult"className="btn btn-primary">Ir a Inicio</button></Link>
                </div>
            }
            </>
        }
        </>
    );
}