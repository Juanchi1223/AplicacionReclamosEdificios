import { Home } from "./Componentes/home/Home"
import { Login } from "./Componentes/login/Login"
import { Route, Routes } from "react-router-dom"
import { VerUsuarios } from "./Componentes/usuarios/VerUsuarios"
import { AgregarAdmin } from "./Componentes/usuarios/agregarUsuarios/AgregarAdmin"
import AgregarDueno from "./Componentes/usuarios/agregarUsuarios/AgregarDueno"
import AgregarInquilino from "./Componentes/usuarios/agregarUsuarios/AgregarInquilino"
import VerEdificio from "./Componentes/edificio/VerEdificio"
import { ActualizarAdmin } from "./Componentes/usuarios/actualizarUsuarios/actualizarAdmin"
import { ActualizarDueno } from "./Componentes/usuarios/actualizarUsuarios/actualizarDueno"
import { ActualizarInquilino } from "./Componentes/usuarios/actualizarUsuarios/actualizarInquilino"
import { AgregarEdificio } from "./Componentes/edificio/AgregarEdificio"
import { ActualizarEdificio } from "./Componentes/edificio/ActualizarEdificio"
import { VerUnidades } from "./Componentes/unidad/VerUnidades"
import { AgregarUnidad } from "./Componentes/unidad/AgregarUnidad"
import { ActualizarUnidad} from "./Componentes/unidad/ActualizarUnidad"
import { VerReclamos } from "./Componentes/reclamos/VerReclamos"
import { AgregarReclamo } from "./Componentes/reclamos/AgregarReclamo"
import { ActualizarReclamosGeneral } from "./Componentes/reclamos/actualizarReclamo/actualizarReclamoGeneral"
import { ActualizarReclamosUnidad } from "./Componentes/reclamos/actualizarReclamo/actualizarReclamoUnidad"
import { VerReclamosEdificio } from "./Componentes/reclamos/verReclamoEdificio/VerReclamosEdificio"
import { VerReclamosID } from "./Componentes/reclamos/verReclamoID/VerReclamoID"

export const ReclamosApp = () => { 
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login> </Login>}> </Route>
        <Route path="/login" element={<Login> </Login>}> </Route>
        <Route path="/home" element={<Home> </Home>}> </Route>

        <Route path="/usuario" element={<VerUsuarios></VerUsuarios>}></Route>
        <Route path="/usuario/admin" element={<AgregarAdmin></AgregarAdmin>}></Route>
        <Route path="/usuario/dueno" element={<AgregarDueno></AgregarDueno>}></Route>
        <Route path="/usuario/inquilino" element={<AgregarInquilino></AgregarInquilino>}></Route>
        <Route path="/usuario/update_admin" element={<ActualizarAdmin></ActualizarAdmin>}></Route>
        <Route path="/usuario/update_dueno" element={<ActualizarDueno></ActualizarDueno>}> </Route>
        <Route path="/usuario/update_inqui" element={<ActualizarInquilino></ActualizarInquilino>}></Route>

        <Route path="/edificio" element={<VerEdificio></VerEdificio>}></Route>
        <Route path="/edificio/add_edificio" element={<AgregarEdificio></AgregarEdificio>}></Route>
        <Route path="/edificio/update_edificio" element={<ActualizarEdificio></ActualizarEdificio>}></Route>

        <Route path="/unidad" element={<VerUnidades></VerUnidades>}></Route>
        <Route path="/unidad/add_unidad" element={<AgregarUnidad></AgregarUnidad>}></Route>
        <Route path="/unidad/update_unidad" element={<ActualizarUnidad></ActualizarUnidad>}></Route>
      
        <Route path="/reclamos" element={<VerReclamos></VerReclamos>}></Route>
        <Route path="/reclamos/add_reclamo" element={<AgregarReclamo></AgregarReclamo>}></Route>
        <Route path="/reclamos/update_rg" element={<ActualizarReclamosGeneral></ActualizarReclamosGeneral>}></Route>
        <Route path="/reclamos/update_ru" element={<ActualizarReclamosUnidad></ActualizarReclamosUnidad>}></Route>
        <Route path="/reclamos/edificio" element={<VerReclamosEdificio></VerReclamosEdificio>}></Route>
        <Route path="/reclamos/id" element={<VerReclamosID></VerReclamosID>}></Route>
      </Routes>
    </div>
  )
}

