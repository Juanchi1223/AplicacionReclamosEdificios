import { useState } from 'react'
import { Link, useNavigate} from "react-router-dom";
import "../../styles/generalStyle.css"


export const AgregarEdificio = () => {

    const [ciudad, setCiudad] = useState('');
    const [postal, setPostal] = useState('');
    const [direccion, setDireccion] = useState('');
    const [pais, setPais] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        const body = { ciudad, codigoPostal:postal, direccion, pais };
        
        setCiudad('');
        setPostal('');
        setDireccion('');
        setPais('');
        
        if(body.ciudad == '' && body.postal == '' && body.direccion == '' && body.pais == ''){
          window.alert("FALTA COMPLETAR CAMPOS")
          return null;
        }

        const settings = {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          }
        }

        await fetch('http://localhost:8080/api/edificio', settings)
        .then((response) => {
            if (!response.ok){
                alert("ERROR", response.status)
            }
            else{
                console.log("SE ENVIO LA INFO")
            }
            navigate("/edificio", { state: location.state });
        }).catch(err => console.error(`Error: ${err}`))
      };
    
      return (
        <div>
          <Link to="/edificio">
            <button className='backButton'>Back</button>
          </Link>
        <h3>Agregar Edificio</h3>

        <form onSubmit={handleSubmit}>

            <input type="text" placeholder="Ingresa la ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)}/>
            <input type="text" placeholder="Ingresa el codigo postal" value={postal} onChange={(e) => setPostal(e.target.value)}/>
            <input type="text" placeholder="Ingresa la direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
            <input type="text" placeholder="Ingresa el pais"  value={pais} onChange={(e) => setPais(e.target.value)}/>

            <button type="submit">Agregar Edificio</button>

        </form>

      

        
    </div>
      )
    }

export default AgregarEdificio;