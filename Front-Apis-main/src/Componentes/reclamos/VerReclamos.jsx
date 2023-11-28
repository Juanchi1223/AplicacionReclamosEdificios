import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/tablaStyle.css"
import "../../styles/generalStyle.css"

export const VerReclamos = () => {
    const [reclamos, setReclamos] = useState([])
    const [option, setOption] = useState();

    const navigator = useNavigate();

    useEffect(() => {
        obtenerReclamos();
    },[])

    const obtenerReclamos = async () =>{
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }
        await fetch('http://localhost:8080/api/reclamos2', settings)
        .then((response) => {
            if (!response.ok){
                console.log('ALGO PASO MAL', response.status)
            }
            return response.json()
        }).then((data) => {
            setReclamos(data)
            //setReclamosOriginal(data)
        }).catch((error) => {
            console.log("ERROR")
        })
    }

    const obtenerReclamoEstado = async ( estado ) =>{
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }
        await fetch(`http://localhost:8080/api/estadoreclamos/${estado}`, settings)
        .then((response) => {
            if (!response.ok){
                console.log('ALGO PASO MAL', response.status)
            }
            return response.json()
        }).then((data) => {
            setReclamos(data)
            //setReclamosOriginal(data)
        }).catch((error) => {
            console.log("ERROR")
        })
    }

    const buscarFecha = (fecha) =>{
        if(fecha === null || fecha === 0){
            return null
        }

        const date = new Date(fecha) // LE AGREGO UN DIA PORQ SE GUARDA UN DIAS MENOS EN EL BACKEND
        
        return date.toLocaleDateString();
    }

    const handleActualizar = async (reclamos) =>{
        //sessionStorage.setItem("update", JSON.stringify(reclamos))
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        if (reclamos.tipo === "General"){
            sessionStorage.setItem("update", JSON.stringify(reclamos))
            navigator('./update_rg')
        }
        else if(reclamos.tipo === "Unidad"){
            await fetch(`http://localhost:8080/api/reclamoUnidad/${reclamos.idReclamo}`, settings)
            .then((response) => {
                if (!response.ok){
                    console.log('ALGO PASO MAL', response.status)
                }
                return response.json()
            }).then((data) => {
                sessionStorage.setItem("update", JSON.stringify(data))
            }).catch((error) => {
                console.log("ERROR")
            })

            navigator('./update_ru')
        }
                
    }

    const handleEliminar = async (id, tipo) =>{
        const settings = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        var url;

        if(tipo === "General"){
            url = `http://localhost:8080/api/reclamoGeneral/${id}`;
        }
        else if (tipo === "Unidad"){
            url = `http://localhost:8080/api/reclamoUnidad/${id}`
        }

        await fetch(url, settings)
        .then((response) => {
            if(!response.ok){
                console.log('ALGO PASO', response.status)
            }
            console.log(response.status)
        })
        .catch((error) => {
            console.log("ERROR")
        })
    
        window.location.reload(true);
    }

    const handleChange = (e) =>{
        setOption(e)
        console.log(e !== "null")
    
        if (e !== "null"){
            obtenerReclamoEstado(e)
        }   
        else{
            obtenerReclamos()
        }
    }

    return ( 
    <div>
        <Link to="/home">
            <button className="backButton">Back</button>
        </Link>
        <div>
            <h3>Ver Reclamos</h3>
        </div>
        <div>
            <select onChange={(e) => handleChange(e.target.value)}>
                <option value="null">Todos</option>
                <option value="nuevo">Nuevo</option>
                <option value="Abierto">Abierto</option>
                <option value="en proceso">En Proceso</option>
                <option value="desestimado">Desestimado</option>
                <option value="anulado">Anulado</option>
                <option value="terminado">Terminado</option>
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
                    <th>Actions</th>
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
                        <td>{<button className="bottonActualizar" onClick={() => handleActualizar(r)}>Actualizar</button>} 
                        {<button className="bottonEliminar" onClick={() => handleEliminar(r.idReclamo, r.tipo)}>Eliminar</button>}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>  
    );
}