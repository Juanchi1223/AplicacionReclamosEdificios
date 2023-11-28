import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AgregarReclamoGeneral = () => {

    const [descripcion, setDescripcion] = useState('');
    
    const [edificios, setEdificios] = useState([])
    const [edificio, setEdificio] = useState({})
    
    const [cliente, setCliente] = useState('')
    
    const [lugar, setLugar] = useState('');
    const [foto, setFoto] = useState([]);
    const estado = 'Nuevo'
    const mensaje = ''

    const navigate = useNavigate();

    useEffect(() => {
      const settings = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        }
      }

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


      const token = sessionStorage.getItem("jwt")
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      const nombreUs = decodedPayload.sub

      fetch(`http://localhost:8080/api/nombreUs/${nombreUs}`, settings)
      .then((response) => {
        if (!response.ok){
          console.log('ALGO PASO MAL', response.status)
        }
        return response.json()
      })
      .then((data) => {
        /* console.log(data) */
        setCliente(data.idAdmin)        
      })
      .catch((error) => {
        console.log("ERROR")
      })

    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = { descripcion, idEdificio:edificio, idUsuario:cliente, lugar, estado, mensaje };
        const bodyFoto = foto
        var idFoto;
        
        setDescripcion('');
        setLugar('');

      
        const settings = {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          }
        }

        await fetch(`http://localhost:8080/api/reclamoGeneral`, settings)
        .then((response) => {
            if (!response.ok){
              console.log('ALGO PASO MAL', response.status)
              window.alert(`El reclamoGeneral no tiene todos los parametros necesarios o estan erroneos`) 
            }
            return response.json()
        }).then((data) => {
            idFoto = data
        }).catch((error) => {
            console.log("ERROR")
        })

        const formData = new FormData();
        formData.append("archivo", bodyFoto);
        formData.append("id", idFoto)

        const settings2 = {
          method:"POST",
          body:formData,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        }
        }

        await fetch(`http://localhost:8080/api/imagenreclamo/subir`, settings2)
        .then((response) =>{
          if (!response.ok){
            console.log('ALGO PASO MAL', response.status)
          }
          else 
            window.alert(`RECLAMO GUARDADO CON EXITO, PARA CONSULTARLO EL ID ES ${idFoto}`) 
            navigate("/home")
        }).catch((error) =>{
          console.log('BLOQUE ERROR: ALGO PASO MAL', error)
        })
      };
    
      return (
        <div>
        <h3>Agregar Reclamo General</h3>

        <form onSubmit={handleSubmit}>

            <input type="text" placeholder="Ingresa el descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
            <select onChange={(e) => setEdificio(e.target.value)}>
              <option value="null">Selecione edificio</option>
              {edificios.map(edi => (<option value={edi.idEdificio}>{edi.direccion}</option>))}
            </select>    
            <input type="text" placeholder="Ingresa el lugar"  value={lugar} onChange={(e) => setLugar(e.target.value)}/>
            <input type='file' name='foto' accept='image/*' onChange={(e) => setFoto(e.target.files[0])}></input>
            <button type="submit">Agregar Reclamo</button>
        </form> 
    </div>
      )
    }

export default AgregarReclamoGeneral;