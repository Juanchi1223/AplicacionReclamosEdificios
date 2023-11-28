import { Link, useParams } from 'react-router-dom'; 
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/generalStyle.css"

export const ActualizarAdmin = () => {
    const administrador = JSON.parse(sessionStorage.getItem("update"));
    
    const [nombre, setNombre] = useState(administrador.nombre)
    const [nombreUs, setNombreUs] = useState(administrador.nombreUs)
    const [email, setEmail] = useState(administrador.email)
    const [direcion, setDirecion] = useState(administrador.direcion)
    const [telefono, setTelefono] = useState(administrador.telefono)

    const navigate = useNavigate();
    const location = useLocation();

    const handleSumbit = async (e) => {
        e.preventDefault();

        const body = {nombre, nombreUs, email, direcion, telefono}

        console.log(body)

        setNombre('')
        setNombreUs('')
        setEmail('')
        setDirecion('')
        setTelefono(0)

        const settings = {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/admin/${administrador.idAdmin}`, settings)
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
                    <button className='backButton'>Back</button>
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

                    <button type='submit'>Enviar</button>
                </form>
            </div>
    </div> 
    );
}