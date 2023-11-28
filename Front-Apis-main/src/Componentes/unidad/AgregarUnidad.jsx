import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/generalStyle.css"

export const AgregarUnidad = () => {

    const [piso, setPiso] = useState('');
    const [depto, setDepto] = useState('');
    const [estado, setEstado] = useState('');
    
    const [edificios, setEdificios] = useState([])
    const [edificio, setEdificio] = useState({})

    const [duenos, setDuenos] = useState([]);
    const [dueno, setDueno] = useState('')

    const navigate = useNavigate();

    useEffect(()=>{
      const settings = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        }
      }

      fetch(`http://localhost:8080/api/duenos`, settings)
      .then((response) => {
          if (!response.ok){
              console.log('ALGO PASO MAL', response.status)
          }
          return response.json()
      }).then((data) => {
          setDuenos(data)
      }).catch((error) => {
          console.log("ERROR")
      })

      fetch(`http://localhost:8080/api/edificios`, settings)
        .then((response) => {
            if (!response.ok){
                console.log('ALGO PASO MAL', response.status)
            }
            return response.json()
        }).then((data) => {
            setEdificios(data)
        }).catch((error) => {
            console.log("ERROR")
        })
    },[])

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(piso === '' || depto === '' || estado === "null")
      {
          window.alert("Faltan parametros a ingresar")
          return null
      }

      const nuevaUnidad = { idDueno:dueno, piso, departamento:depto, estado, idEdificio:edificio };      

      setPiso('');
      setDepto('');
      setEstado('');
      setDueno();
      setEdificio();
      
      const settings = {
        method: "POST",
        body: JSON.stringify(nuevaUnidad),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        }
      }

      await fetch(`http://localhost:8080/api/unidad`, settings)
        .then((response) => {
            if (!response.ok){
                console.log('ALGO PASO MAL', response.status)
            }
            else{
              navigate("/unidad")
            }
            return response.json()
        }).catch((error) => {
            console.log("ERROR")
        })
      };
    
      return (
        <div>
          <Link to="/unidad">
                <button className='backButton'>Back</button>
            </Link>
        <h3>Agregar Unidad</h3>

        <form onSubmit={handleSubmit}>

          <select onChange={(e) => setDueno(e.target.value)}>
            <option value="null">Selecione Dueno</option>
            {duenos.map(dueno => (<option value={dueno.idDueno}>{dueno.nombre}</option>))}
          </select>
          <input type="text" placeholder="Ingresa el piso" value={piso} onChange={(e) => setPiso(e.target.value)}/>
          <input type="text" placeholder="Ingresa el departamento" value={depto} onChange={(e) => setDepto(e.target.value)}/>

          <select onChange={(e) => setEstado(e.target.value)}>
            <option value="null">Selcione estado</option>
            <option value="Alquilado">Alquildado/a</option>
            <option value="Habitado">Habitado/a</option>
          </select>


          
          <select onChange={(e) => setEdificio(e.target.value)}>
            <option value="null">Selecione edificio</option>
            {edificios.map(edi => (<option value={edi.idEdificio}>{edi.direccion}</option>))}
          </select>
          <button type="submit">Agregar Unidad</button>

        </form>  
    </div>
      )
    }

export default AgregarUnidad;