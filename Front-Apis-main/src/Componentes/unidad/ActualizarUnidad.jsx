import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/generalStyle.css"

export const ActualizarUnidad = () => {
    const unidad = JSON.parse(sessionStorage.getItem("update"))

    const [duenos, setDuenos] = useState([]);
    const [dueno, setDueno] = useState(unidad.idDueno)

    const [piso, setPiso] = useState(unidad.piso);
    const [depto, setDepto] = useState(unidad.departamento);
    const [estado, setEstado] = useState(unidad.estado);

    const [edificios, setEdificios] = useState([])
    const [edificio, setEdificio] = useState(unidad.idEdificio)
   
    const navigate = useNavigate();

    useEffect(() => {
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

        const body = { idDueno:dueno, piso, departamento:depto, estado, idEdificio:edificio }

        setDueno('');
        setPiso('');
        setDepto('');
        setEstado('');
        setEdificio();
        
        const settings = {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          }
        }
  
        await fetch(`http://localhost:8080/api/unidad/${unidad.idUnidad}`, settings)
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
                <button className="backButton">Back</button>
            </Link>
        <h3>Actualizar Unidad</h3>

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

            <button type="submit">Actualizar</button>

        </form>
    </div> );

}
