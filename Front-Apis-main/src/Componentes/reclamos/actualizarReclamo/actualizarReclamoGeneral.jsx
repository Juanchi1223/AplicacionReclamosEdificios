import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../../styles/generalStyle.css"
import "../../../styles/actulizarReclamo.css"


export const ActualizarReclamosGeneral = () => {

    const reclamo = JSON.parse(sessionStorage.getItem("update"))

    const descripcion = reclamo.descripcion
    const lugar = reclamo.lugar

    const[idEdificio, setIdEdificio] = useState('')
    const[idUsuario, setIdUsuario] = useState('')

    const [estado, setEstado] = useState(reclamo.estado);
    const [mensaje, setMensaje] = useState(reclamo.mensaje);

    const [url, setUrl] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        fetch(`http://localhost:8080/api/reclamoGeneral/${reclamo.idReclamo}`, settings)
        .then((response) => {
            if (!response.ok){
                console.log('ALGO PASO MAL', response.status)
            }   
            return response.json()
        })
        .then((data) => {
            setIdEdificio(data.idEdificio)
            setIdUsuario(data.idUsuario)
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
        
        const nuevoReclamo = { descripcion, idEdificio, idUsuario, lugar, estado, mensaje };

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

        await fetch(`http://localhost:8080/api/reclamoGeneral/${reclamo.idReclamo}`, settings)
        .then((response) => {
        if (!response.ok){
            console.log('ALGO PASO MAL', response.status)
        }   
        else{
            navigate('/reclamos')
        }   
            return response.json()
        }).catch((error) => {
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

    return (
        <div>
        <Link to='/reclamos'>
            <button className="backButtonReclamos">Back</button>
        </Link>
        <h3 className="titulo">Actualizar Estado del Reclamo General</h3>

        <div className="informacion">
            <div className="items">Descripcion: {reclamo.descripcion}</div>
            <div className="items">Lugar: {reclamo.lugar}</div>
            <div className="items">Fecha: {buscarFecha(reclamo.fecha)}</div>
            <div className="items">Edificio: {reclamo.idEdificio}</div>
            <div className="items">Usuario: {reclamo.usuario}</div>
        
            <form onSubmit={handleSubmit}>
                <div className="items">
                    <>Estado:  </>
                    {/* <input type="text" placeholder="Ingresa el estado"  value={estado} onChange={(e) => setEstado(e.target.value)}/> */}
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
                <button type="submit" className="bottonReclamo">Actualizar</button>
            </form>

            <div>
                <img src={url ? url : null} width="300" height="250"/>
            </div>
        </div>    
    </div>
);
}