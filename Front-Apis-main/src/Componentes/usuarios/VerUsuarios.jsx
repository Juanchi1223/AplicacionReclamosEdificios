import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/tablaStyle.css"
import "../../styles/generalStyle.css"


export const VerUsuarios = () => {

    const [administradores, setAdministradores] = useState([{nombre:"Juan", nombreUs:"JCanestrari", email:"mail@gmail.com",direcion:"arenales 2057",telefono:1,idAdmin:0 }]);
    const [duenos, setDuenos] = useState([]);
    const [inquilino, setInquilinos] = useState([]);
    const nav = useNavigate();

    var token;

    useEffect(() => {
        token = sessionStorage.getItem("jwt")
        if(token === null){
            console.log('VOLVER A EL LOGIN')
        }
        obtenerAdministra();
        obtenerDueno();
        obtenerInquilinos();
    },[]);

    const obtenerAdministra = async () => {
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        await fetch('http://localhost:8080/api/admins', settings)
        .then((response) => {
            if (!response.ok){
                console.log('ALGO PASO MAL JAJA', response.status)
            }
            return response.json()
        }).then((data) => {
            setAdministradores(data)
        }).catch((error) => {
            console.log("ERROR")
        })
    }

    const obtenerDueno = async () => {
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }

        await fetch('http://localhost:8080/api/duenos', settings)
        .then((response)=>{
            if(!response.ok){
                console.log('ALGO PASO', response.status)
            }
            return response.json()
        }).then((data) => {
            setDuenos(data)
        }).catch((error) => {
            console.log("ERROR")
        })
    }

    const obtenerInquilinos = async () => {
        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }

        await fetch('http://localhost:8080/api/inquilinosSinRef', settings)
        .then((response) => {
            if(!response.ok){
                console.log('ALGO PASO', response.status)
            }
            return response.json() 
        }).then((data) => {
            setInquilinos(data)
        }).catch((error) => {
            console.log("ERROR")
        })
    }

    const handleEliminarAdmin = async (id) => {
        const settings = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/admin/${id}`, settings)
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

    const handleEliminarDueno = async (id) =>{
        const settings = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/dueno/${id}`, settings)
        .then((response) => {
            if(!response.ok){
                console.log('ALGO PASO', response.status)
            }
            console.log(response.text())
        })
        .catch((error) => {
            console.log("ERROR")
        })
        
        window.location.reload(true);
    }

    const handleEliminarInqui = async (id) =>{
        const settings = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/inquilino/${id}`, settings)
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
    
    const handleActualizarAdmin = (admin) => {
        sessionStorage.setItem("update", JSON.stringify(admin))
        nav('/usuario/update_admin')
    }

    const handleActualizarDueno = (dueno) =>{
        sessionStorage.setItem("update", JSON.stringify(dueno))
        nav('/usuario/update_dueno')
    } 
    
    const handleActualizarInquilino = (inquilino) =>{
        sessionStorage.setItem("update", JSON.stringify(inquilino))
        nav('/usuario/update_inqui')
    }

    return (
        <div>
            <div>
                <Link to="/home">
                    <button className="backButton">Back</button>
                </Link>
            </div>
            <div className="bodyUsuarios">
                <h2>Todos los usuarios</h2>
                <h3>Administradores: </h3>
                <div>
                    <Link to="/usuario/admin">
                        <button>AgregarUsuario</button>
                    </Link>
                </div>
                <table className="tablaUsuarios">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Direcion</th>
                            <th>Telefono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {administradores.map(usuario => (
                            <tr key={usuario.idAdmin}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.nombreUs}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.direcion}</td>
                                <td>{usuario.telefono}</td>
                                <td>{<button className='bottonActualizar' onClick={() => handleActualizarAdmin(usuario)}>Actualizar</button>}
                                {<button className='bottonEliminar' onClick={() => handleEliminarAdmin(usuario.idAdmin)}>Eliminar</button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr></hr>
                <h3>Duenos: </h3>
                <div>
                    <Link to="/usuario/dueno">
                        <button>AgregarUsuario</button>
                    </Link>
                </div>
                <table className="tablaUsuarios">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Direcion</th>
                            <th>Telefono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {duenos.map(usuario => (
                            <tr key={usuario.idDueno}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.nombreUs}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.direcion}</td>
                                <td>{usuario.telefono}</td>
                                <td>{<button className='bottonActualizar' onClick={() => handleActualizarDueno(usuario)}>Actualizar</button>}
                                {<button className='bottonEliminar' onClick={() => handleEliminarDueno(usuario.idDueno)}>Eliminar</button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr></hr>
                <h3>Inquilinos: </h3>
                <div>
                    <Link to="/usuario/inquilino">
                        <button>AgregarUsuario</button>
                    </Link>
                </div>
                <table className="tablaUsuarios">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Direcion</th>
                            <th>Telefono</th>
                            <th>Unidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquilino.map(usuario => (
                            <tr key={usuario.idInquilino}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.nombreUs}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.direcion}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.unidad}</td>
                                <td>{<button className='bottonActualizar' onClick={() => handleActualizarInquilino(usuario)}>Actualizar</button>}
                                {<button className='bottonEliminar' onClick={() => handleEliminarInqui(usuario.idInquilino)}>Eliminar</button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>       
    )
}