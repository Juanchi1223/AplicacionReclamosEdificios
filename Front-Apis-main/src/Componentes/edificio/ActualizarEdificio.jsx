import { useState } from 'react'
import { Link, useNavigate} from "react-router-dom";
import "../../styles/generalStyle.css"

export const ActualizarEdificio = () => {
    const edi = JSON.parse(sessionStorage.getItem("update"))
    
    const [ciudad, setCiudad] = useState(edi.ciudad);
    const [postal, setPostal] = useState(edi.codigoPostal);
    const [direccion, setDireccion] = useState(edi.direccion);
    const [pais, setPais] = useState(edi.pais);

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
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
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          }
        }

        await fetch(`http://localhost:8080/api/edificio/${edi.idEdificio}`, settings)
        .then((response) => {
            if (!response.ok){
                alert("ERROR", response.status)
            }
            else{
                console.log("SE ENVIO LA INFO")
            }
            sessionStorage.removeItem("update")
            navigate("/edificio", { state: location.state });
        }).catch(err => console.error(`Error: ${err}`))
      };

    return ( 
        <div>
          <Link to="/edificio">
            <button className='backButton'>Back</button>
          </Link>
        <h3>Actualizar Edificio</h3>

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Ingresa la ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)}/>
            <input type="text" placeholder="Ingresa el codigo postal" value={postal} onChange={(e) => setPostal(e.target.value)}/>
            <input type="text" placeholder="Ingresa la direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
            <input type="text" placeholder="Ingresa el pais"  value={pais} onChange={(e) => setPais(e.target.value)}/>

            <button type="submit">Actualizar Edificio</button>
        </form>
    </div>
     );
}
 
export default ActualizarEdificio;