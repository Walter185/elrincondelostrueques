import { Link } from 'react-router-dom'
import "./Banner.css"

export default function BannerLink({ category }) {
    return (
        <Link to={category === "Productos" ? "/category/All" : `/${category}`}>
            <div className="textbanner-link" title={category}>
                <div className={category === "Productos" ? "textbanner img" : "textbanner mid img"} id={`banner${category}`}>
                    <div className="textbanner-text">
                        <p className="textbanner-title text-light"><b>{category}</b></p>
                        <button className="btn btn-outline-light textbanner-button">
                            {category === "Productos" ? "Ver todos los Trueques" : `Ver trueques para ${category}`}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
