import React, { useState } from 'react'


export default function ItemCount({ stock = 0, onAddToCart }) {
    const [count, setCount] = useState(1);

    function HandleAdd(event) {
        if (count < stock) {
            setCount(count + 1);
        }
    }

    function HandleSubstract(event) {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-stretch mt-4">
                <div className="btn-group">
                    <button className="btn btn-outline-dark" type="button" onClick={HandleSubstract} disabled={count <= 1}>-</button>
                    <p className="fs-5 px-3 py-1 my-auto border border-dark border-start-0">{count}</p>
                    <button className="btn btn-outline-dark" type="button" onClick={HandleAdd} disabled={count >= stock}>+</button>
                </div>
            </div>
            <div>
                <button className="btn btn-primary border border-dark m-2" onClick={() => onAddToCart(count)}>Agregar a la consulta</button>
            </div>
        </>
    )
}
