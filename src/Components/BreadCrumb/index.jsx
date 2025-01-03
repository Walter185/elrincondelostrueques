import React from 'react'
import { Link } from 'react-router-dom'

export default function BreadCrumb({ currentPage }) {

    switch (currentPage) { 
        case 'All':
            return (
                <div className='container pt-4 ps-5 pb-1'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                        <li className="breadcrumb-item active">Trueques</li>
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
        case 'Mascotas':
        case 'Servicios':
            return (
                <div className='container pt-4 ps-5 pb-1'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                        <li className="breadcrumb-item"><Link to="/category/All">Trueques</Link></li>
                        <li className="breadcrumb-item active">{currentPage}</li>
                    </ol>
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
