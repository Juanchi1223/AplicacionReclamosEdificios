import { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../../styles/generalStyle.css"
import "../../../styles/actulizarReclamo.css"

export const ActualizarReclamosUnidad = () => {

    const reclamo = JSON.parse(sessionStorage.getItem("update"))

    const descripcion = reclamo.descripcion
    const idEdificio = reclamo.idEdificio
    const idUsuario = reclamo.idUsuario
    const unidad = reclamo.unidad

    const [unidadNombre, setUnidadNombre] = useState('')
    const [edificio, setEdificio] = useState('')
    const [usuario, setUsuario] = useState('')

    const [url, setUrl] = useState();

    const [estado, setEstado] = useState(reclamo.estado);
    const [mensaje, setMensaje] = useState(reclamo.mensaje);

    const navigate = useNavigate();

    useEffect(() => {
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        fetch(`http://localhost:8080/api/reclamoUnidadSinRef/${reclamo.idReclamo}`, settings)
        .then((response) => {
            if(!response.ok){
                console.log('ALGO PASO', response.status)
            }
            return response.json()
        })
        .then((data) => {
            setEdificio(data.idEdificio)
            setUsuario(data.usuario)
            setUnidadNombre(data.unidad)
        })
        .catch((error) => {
            console.log("ERROR")
        })

        buscarLaFoto(reclamo.idReclamo)
    },[])
 
    const buscarLaFoto = async ( idReclamo ) => {
        var fotoArray;

        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/imagenreclamo/reclamo/${idReclamo}`, settings)
        .then((response) => {
            if(!response.ok)
                console.log('ALGO PASO MAL', response.status)
            return response.json()
        }).then((data) => {
            fotoArray = data
        }).catch((error) => {
            console.log("ERROR")
        })

        getUrl(fotoArray[0].id)
    }

    const getUrl = async (id) =>{
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/imagenreclamo/${id}`, settings)
        .then((response) => {
            if(!response.ok)
                console.log('ALGO PASO MAL', response.status)
            return response.blob()
        }).then((data) => {
            const u = URL.createObjectURL(data)
            setUrl(u)
        }).catch((error) => {
            console.log("ERROR ACA", error)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(estado === null || mensaje === ''){
            window.alert("Faltan parametros a ingresar")
            return null
        }

        const nuevoReclamo = { descripcion, idEdificio, idUsuario, unidad, estado, mensaje }

        setEstado('');
        setMensaje('');

        const settings = {
            method: "PUT",
            body: JSON.stringify(nuevoReclamo),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/reclamoUnidad/${reclamo.idReclamo}`, settings)
        .then((response) => {
            if(!response.ok){
                console.log('ALGO PASO', response.status)
            }
            console.log(response.status)
            navigate('/reclamos')
        })
        .catch((error) => {
            console.log("ERROR")
        })

        sessionStorage.removeItem("update")

    };

    const buscarFecha = (fecha) =>{
        if(fecha === null || fecha === 0){
            return null
        }

        const date = new Date(fecha) // LE AGREGO UN DIA PORQ SE GUARDA UN DIAS MENOS EN EL BACKEND
        
        return date.toLocaleDateString();
    }

    return ( <div>
        <Link to='/reclamos'>
            <button className="backButtonReclamos">Back</button>
        </Link>
        <h3>Actualizar Estado Reclamo Unidad</h3>

        <div className="informacion">
            <div className="items">Descripcion: {reclamo.descripcion}</div>
            <div className="items">Unidad: {unidadNombre}</div>
            <div className="items">Fecha: {buscarFecha(reclamo.fecha)}</div>
            <div className="items">Edificio: {edificio}</div>
            <div className="items">Usuario: {usuario}</div>
        
            <form onSubmit={handleSubmit}>
                <div className="items">
                    <>Estado:  </>
                    <select onChange={(e) => setEstado(e.target.value)}>
                        <option value="null">Selecione estado</option>
                        <option value="Nuevo">Nuevo</option>
                        <option value="Abierto">Abierto</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Desestimado">Desestimado</option>
                        <option value="Anulado">Anulado</option>
                        <option value="Terminado">Terminado</option>
                    </select>                
                </div>
                <div className="items">
                    <>Mensaje: </>    
                    <input type="text" placeholder="Ingresa el mensaje"  value={mensaje} onChange={(e) => setMensaje(e.target.value)}/>
                </div>
                <button type="submit" className="bottonReclamo">Actulizar</button>
            </form>

            <div>
                <img src={url ? url : null} width="300" height="250"/>
            </div>
        </div>
    </div> );
}