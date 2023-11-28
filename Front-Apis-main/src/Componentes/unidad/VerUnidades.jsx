import { useEffect, useState } from 'react'
import { Link, useNavigate} from "react-router-dom";
import "../../styles/tablaStyle.css"
import "../../styles/generalStyle.css"

export const VerUnidades = () => {
    const [unidades, setUnidades] = useState([]);
    const navigate = useNavigate();

    var token;
    
    useEffect(() => {
        token = sessionStorage.getItem("jwt")
        obtenerUnidades();
    },[])

    const obtenerUnidades = async () =>{
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }

        await fetch('http://localhost:8080/api/unidadesSinRef', settings)
        .then((response) => {
            if (!response.ok){
                console.log('ALGO PASO MAL', response.status)
            }
            return response.json()
        }).then((data) => {
            setUnidades(data)
        }).catch((error) => {
            console.log("ERROR")
        })
    }

    const handleActualizarEdificio = (edificio) =>{
        sessionStorage.setItem("update", JSON.stringify(edificio))
        navigate('/unidad/update_unidad')
    }

    const handleEliminarEdificio = async (id) =>{
        const settings = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/unidad/${id}`, settings)
        .then((response) => {
            if (!response.ok){
                console.log('ALGO PASO MAL', response.status)
            }
            window.location.reload(true)
        }).catch((error) => {
            console.log("ERROR")
        })
    }

    return ( 
    <div>
        <div>
            <Link to="/home">
                <button className='backButton'>Back</button>
            </Link>
        </div>
        <div>
            <h2 className='headder'>Ver Unidades</h2>
            <Link to="/unidad/add_unidad">
                <button className="botonAgregar">Agregar Unidad</button>
            </Link>
            <table className="tablaUsuarios">
                    <thead>
                        <tr>
                            <th>Edificio</th>
                            <th>Piso</th>
                            <th>Departamento</th>
                            <th>Estado</th>
                            <th>Dueño</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unidades.map(unidad => (
                            <tr key={unidad.idUnidad}>
                                <td>{unidad.edificio}</td>
                                <td>{unidad.piso}</td>
                                <td>{unidad.departamento}</td>
                                <td>{unidad.estado}</td>
                                <td>{unidad.dueno}</td>
                                <td>{<button className="bottonActualizar" onClick={() => handleActualizarEdificio(unidad)}>Actualizar</button>}
                                {<button className="bottonEliminar" onClick={() => handleEliminarEdificio(unidad.idUnidad)}>Eliminar</button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    </div> 
    );
}
