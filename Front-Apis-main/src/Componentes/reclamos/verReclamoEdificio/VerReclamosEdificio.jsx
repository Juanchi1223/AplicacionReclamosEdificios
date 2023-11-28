import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import "../../../styles/generalStyle.css"

export const VerReclamosEdificio = () => {
    
    const [reclamos, setReclamos] = useState([]);

    const [edificios, setEdificios] = useState([])
    const [edificio, setEdificio] = useState({})
    


    useEffect(() => {
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }   
        }

        fetch(`http://localhost:8080/api/edificios`, settings)
        .then((response) => {
            if (!response.ok){
                console.log('ALGO PASO MAL', response.status)
            }
            return response.json()
        }).then((data) => {
            setEdificios(data)
        }).catch((error) => {
            console.log("ERROR")
        })   
    },[])

    const handleBuscar = async (val)=>{
        

        if (!Number.isInteger(parseInt(val))){
            setReclamos([])
            return null;
        }

        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/reclamo/?idEdificio=${val}`, settings)
        .then((response) => {
            if (!response.ok){
                console.log('ALGO PASO MAL', response.status)
            }  
          return response.json()
        }).then((data) => {
            if (data.length === 0){
                window.alert(`El edificio con id ${val} no fue encontrado`)
            }
            setReclamos(data)
        }).catch((error) => {
            console.log("ERROR")
        })
    }

    const buscarFecha = (fecha) =>{
        const date = new Date(fecha + (1 * 24 * 60 * 60 * 1000)) // LE AGREGO UN DIA PORQ SE GUARDA UN DIAS MENOS EN EL BACKEND
        
        return date.toLocaleDateString();
    }

    return ( 
        <div>
            <div>
                <Link to='/home'>
                    <button className="backButton">Back</button>
                </Link>
            </div>

            <div className="buscador">
                {/* <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                <button onClick={handleBuscar}>Buscar</button> */}
                <select onChange={(e) => handleBuscar(e.target.value)}>
                    <option value="null">Selecione edificio</option>
                    {edificios.map(edi => (<option value={edi.idEdificio}>{edi.direccion}</option>))}
                </select>
            </div>

        <table className="tablaUsuario">
            <thead>
                <tr>
                    <th>Descripcion</th>
                    <th>Lugar</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Mensaje</th>
                    <th>Edificio</th>
                    <th>Usuario</th>
                </tr>
            </thead>
             <tbody>
                {reclamos.map(r  => (
                    <tr key={r.idReclamo}>
                        <td>{r.descripcion}</td>
                        <td>{r.lugar}</td>
                        <td>{buscarFecha(r.fecha)}</td>
                        <td>{r.estado}</td>
                        <td>{r.mensaje}</td>
                        <td>{r.idEdificio}</td>
                        <td>{r.usuario}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div> 
    );
}