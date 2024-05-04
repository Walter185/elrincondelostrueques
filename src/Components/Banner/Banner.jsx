import { Link } from 'react-router-dom'
import "./Banner.css"

export default function Banner({ category }) {
    return (
        <Link to={category === "Productos" ? "/category/All" : `/category/${category}`}>
            <div className="textbanner-link" title={category}>
                <div className={category === "Productos" ? "textbanner img" : "textbanner mid img"} id={`banner${category}`}>
                    {/* img as bg in css */}
                    <div className="textbanner-text" translate='no'>
                        <p className="textbanner-title text-light"><b>{category}</b></p>
                        <button className="btn btn-outline-light textbanner-button">
                        {category === "Productos" ? "Ver todos los Trueques" : `Ver trueques de ${category}`}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
