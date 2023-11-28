import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'; 
import "../../../styles/generalStyle.css"


export const ActualizarInquilino = () =>{
    const inquilino = JSON.parse(sessionStorage.getItem("update"));
    
    const [nombre, setNombre] = useState(inquilino.nombre)
    const [nombreUs, setNombreUs] = useState(inquilino.nombreUs)
    const [email, setEmail] = useState(inquilino.email)
    const [direcion, setDirecion] = useState(inquilino.direcion)
    const [telefono, setTelefono] = useState(inquilino.telefono)

    const [unidad, setUnidad] = useState({});
    const [unidades, setUnidades] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const settings = {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          }
        }
  
        fetch(`http://localhost:8080/api/unidades`, settings)
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
      },[])

    const handleSumbit = async (e) => {
        e.preventDefault();

        const body = {nombre, nombreUs, email, direcion, telefono, idUnidad:unidad}

        console.log(body)

        setNombre('')
        setNombreUs('')
        setEmail('')
        setDirecion('')
        setTelefono(0)
        setUnidad()

        const settings = {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/inquilino/${inquilino.idInquilino}`, settings)
        .then((response) => {
            if (!response.ok){
                alert("ERROR", response.status)
            }
            else{
                console.log("SE ENVIO LA INFO")
            }
            return response.json()
        }).catch(err => console.error(`Error: ${err}`))

        sessionStorage.removeItem("update")

        navigate("/usuario", { state: location.state });
    }

    return (
    <div>
        <div>
           <Link to="/usuario">
                <button className="backButton">Back</button>
            </Link>
        </div>
        <div>
            <h2>Actualizar Usuario</h2>
            <form onSubmit={handleSumbit}>

                <input type='text' placeholder='Ingresar nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                <input type='text' placeholder='Ingresar usuario' value={nombreUs} onChange={(e) => setNombreUs(e.target.value)}/>
                <input type='text' placeholder='Ingresar email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='text' placeholder='Ingresar direcion' value={direcion} onChange={(e) => setDirecion(e.target.value)}/>
                <input type='text' placeholder='Ingresar telefono' value={telefono === 0 ? "" : telefono} onChange={(e) => setTelefono(e.target.value)}/>
                <select onChange={(e) => setUnidad(e.target.value)}>
                    <option value="null">Selecione unidad</option>
                    {unidades.map(unidad => (<option value={unidad.idUnidad}>{unidad.piso + " " + unidad.departamento}</option>))}
                </select>
                <button type='submit'>Enviar</button>
            </form>
        </div>    
    </div>
    );
}