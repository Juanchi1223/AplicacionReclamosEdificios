import { Link } from 'react-router-dom'; 
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/generalStyle.css"

export const AgregarAdmin = () => {

    const [nombre, setNombre] = useState('')
    const [nombreUs, setNombreUs] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [email, setEmail] = useState('')
    const [direcion, setDirecion] = useState('')
    const [telefono, setTelefono] = useState(0)

    const navigate = useNavigate();
    const location = useLocation();

    const handleSumbit = async (e) => {
        e.preventDefault();

        const body = {nombre, nombreUs, contraseña, email, direcion, telefono}

        console.log(body)

        setNombre('')
        setNombreUs('')
        setContraseña('')
        setEmail('')
        setDirecion('')
        setTelefono(0)

        const settings = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch('http://localhost:8080/api/admin', settings)
        .then((response) => {
            if (!response.ok){
                alert("ERROR", response.status)
            }
            else{
                console.log("SE ENVIO LA INFO")
            }
            return response.json()
        }).catch(err => console.error(`Error: ${err}`))

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
                <h2>Agergar Usuario</h2>
                <form onSubmit={handleSumbit}>
                    <input type='text' placeholder='Ingresar nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                    <input type='text' placeholder='Ingresar usuario' value={nombreUs} onChange={(e) => setNombreUs(e.target.value)}/>
                    <input type='text' placeholder='Ingresar contraseña' value={contraseña} onChange={(e) => setContraseña(e.target.value)}/>
                    <input type='text' placeholder='Ingresar email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type='text' placeholder='Ingresar direcion' value={direcion} onChange={(e) => setDirecion(e.target.value)}/>
                    <input type='text' placeholder='Ingresar telefono' value={telefono === 0 ? "" : telefono} onChange={(e) => setTelefono(e.target.value)}/>

                    <button type='submit'>Enviar</button>
                </form>
            </div>
        </div>
    )
}