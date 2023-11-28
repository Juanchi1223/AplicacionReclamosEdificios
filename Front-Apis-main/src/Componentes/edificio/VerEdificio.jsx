import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/tablaStyle.css"
import "../../styles/generalStyle.css"


const VerEdificio = () => {
    
    const [edificios, setEdificios] = useState([])
    const navigator = useNavigate()

    var token;

    useEffect(() => {
        token = sessionStorage.getItem("jwt")
        if(token === undefined){
            console.log(ERRROR)
        }
        obtenerEdificios();
    },[])

    const obtenerEdificios = async () =>{
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }

        await fetch('http://localhost:8080/api/edificios', settings)
        .then((response) =>{
            if(!response.ok)
                console.log("algo salio mal")
            return response.json()
        })
        .then((data) => {
            setEdificios(data)
        }).catch((error) => {
            console.log("ERROR")
        })
    }

    const handleActualizarEdificio = (edificio) =>{
        sessionStorage.setItem("update", JSON.stringify(edificio))
        navigator('/edificio/update_edificio')
    }

    const handleEliminarEdificio  = async (id) =>{
        const settings = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/edificio/${id}`, settings)
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

    return ( 
    <div>
        <div>
                <Link to="/home">
                    <button className="backButton">Back</button>
                </Link>
        </div>
        <div>
            <h2 className="headder">Ver Edificios</h2>
            <Link to="/edificio/add_edificio">
                    <button className="botonAgregar">Agregar Edificio</button>
            </Link>
            <table className="tablaUsuarios">
                    <thead>
                        <tr>
                            <th>Direcion</th>
                            <th>Ciudad</th>
                            <th>Codigo Postal</th>
                            <th>Pais</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {edificios.map(edificio => (
                            <tr key={edificio.idEdificio}>
                                <td>{edificio.direccion}</td>
                                <td>{edificio.ciudad}</td>
                                <td>{edificio.codigoPostal}</td>
                                <td>{edificio.pais}</td>
                                <td>{<button className="bottonActualizar" onClick={() => handleActualizarEdificio(edificio)}>Actualizar</button>}
                                {<button className="bottonEliminar" onClick={() => handleEliminarEdificio(edificio.idEdificio)}>Eliminar</button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    </div> 
    );
}
 
export default VerEdificio