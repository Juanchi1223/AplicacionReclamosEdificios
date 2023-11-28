import {Link} from "react-router-dom"
import { useEffect, useState } from "react";
import "../../../styles/generalStyle.css"

export const VerReclamosID = () => {
    const [reclamo, setReclamo] = useState("")
    const [value, setValue] = useState("");
    const [foto, setFoto] = useState([]);
    const [url, setUrl] = useState();

    const handleBuscar= async ()=>{

        if (!Number.isInteger(parseInt(value))){
            window.alert("Ingresa un numero")
            return null;
        }

        const settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            }
        }

        await fetch(`http://localhost:8080/api/reclamoSinRef/${value}`, settings)
        .then((response) => {
            if (!response.ok){
                console.log('ALGO PASO MAL', response.status)
                if(response.text !== null){
                    window.alert(`El reclamo con id ${value} no fue encontrado`)
                }
            }  
            return response.json()
        }).then((data) => {
            setReclamo(data)
        }).catch((error) => {
            console.log("ERROR")
        })

        var fotoArray;

        await fetch(`http://localhost:8080/api/imagenreclamo/reclamo/${value}`, settings)
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

    const buscarFecha = (fecha) =>{
        if (fecha === undefined){
            return null
        }
        const date = new Date(fecha)
        
        return date.toLocaleDateString();
    }

    return ( <div>
        
        <div>
            <div>
                <Link to='/home'>
                    <button className="backButton">Back</button>
                </Link>
            </div>

            <div className="buscador">
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                <button onClick={handleBuscar}>Buscar</button>
            </div>
        </div>
        <div className="informacion">
            <div>Descripcion: {reclamo.descripcion}</div>
            <div>Lugar: {reclamo.lugar}</div>
            <div>Fecha: {buscarFecha(reclamo.fecha)}</div>
            <div>Estado: {reclamo.estado}</div>
            <div>Mensaje: {reclamo.mensaje}</div>
            <div>Edificio: {reclamo.idEdificio}</div>
            <div>Usuario: {reclamo.usuario}</div>
        </div>
        <div>
            <img src={url ? url : null} width="350" height="350"/>
        </div>
    </div> );
}