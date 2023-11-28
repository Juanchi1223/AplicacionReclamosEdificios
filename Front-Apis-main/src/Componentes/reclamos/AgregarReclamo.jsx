import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AgregarReclamoGeneral } from "./AgregarReclamo/AgregarReclamoGeneral.jsx"
import { AgregarReclamoUnidad } from "./AgregarReclamo/AgregarReclamoUnidad.jsx"
import "../../styles/generalStyle.css"


export const AgregarReclamo = () =>{
    const [option, setOption] = useState("A");

     return (
        <div>
            <Link to='/home'>
                <button className="backButton">Back</button>
            </Link>
            
            <select onChange={(e) => setOption(e.target.value)}>
                <option value="A">Reclamo General</option>
                <option value="B">Reclamo Unidad</option>
            </select>
        
            {option === "A" ? <AgregarReclamoGeneral></AgregarReclamoGeneral>:<AgregarReclamoUnidad></AgregarReclamoUnidad>}
        </div>
     );
}