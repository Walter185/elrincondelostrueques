import React from "react"
import sponsormp from "../../Assets/Img/sponsormp.png"
import "./Cafecito.css"

export const Cafecito = () => {
    return (
        <>  
        <div className="cafecito">
            <h4>Invitale un cafecito al Desarrollador</h4><br/>
                <img src={sponsormp} alt="Mercadopago" width={250}></img>
      </div>
        </>
    )
}