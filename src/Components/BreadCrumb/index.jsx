import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Ol=styled.ol`
    --bs-breadcrumb-divider: '>';
`;

export default function BreadCrumb({ currentPage }) {

    switch (currentPage) { // fallthrough switch
        case 'All':
            return (
                <div className='container pt-4 ps-5 pb-1'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                        <li className="breadcrumb-item active">Productos</li>
                    </ol>
                </div>
            )
        case 'Tecnología':
        case 'Accesorios para Vehículos':
        case 'Salud':
        case 'Belleza y Cuidado Personal':
        case 'Deportes':
        case 'Hogar y Muebles':
        case 'Electrodomesticos':
        case 'Herramientas':
        case 'Contrucción':
        case 'Moda':
        case 'Juguetes':
        case 'Bebés':
        case 'Vehículos':
        case 'Servicios':
            return (
                <div className='container pt-4 ps-5 pb-1'>
                    <Ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                        <li className="breadcrumb-item"><Link to="/category/All">Productos</Link></li>
                        <li className="breadcrumb-item active">{currentPage}</li>
                    </Ol>
                </div>
            )
        case 'Checkout':
        case 'Orden':
        default:
            return (
                <div className='container pt-4 ps-5 pb-1'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                        <li className="breadcrumb-item active">{currentPage}</li>
                    </ol>
                </div>
            )
    }
}
