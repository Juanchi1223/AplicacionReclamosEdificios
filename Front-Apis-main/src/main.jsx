import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReclamosApp } from './ReclamosApp'
import { BrowserRouter } from 'react-router-dom'
import VerEdificio from './Componentes/edificio/VerEdificio'
import AgregarEdificio from './Componentes/edificio/AgregarEdificio'
import { VerUsuarios } from './Componentes/usuarios/VerUsuarios'
import { AgregarAdmin } from './Componentes/usuarios/agregarUsuarios/AgregarAdmin'
import { Login } from './Componentes/login/Login'
import { HomeAdmin } from './Componentes/home/HomeAdmin'
import { Home } from './Componentes/home/Home'
import { HomeCliente } from './Componentes/home/HomeCliente'
import { ActualizarReclamosUnidad } from './Componentes/reclamos/actualizarReclamo/actualizarReclamoUnidad'
import { AgregarReclamo } from './Componentes/reclamos/AgregarReclamo'
import { ActualizarUnidad } from './Componentes/unidad/ActualizarUnidad'
import { VerUnidades } from './Componentes/unidad/VerUnidades'
import AgregarReclamoGeneral from './Componentes/reclamos/AgregarReclamo/AgregarReclamoGeneral'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>

     <ReclamosApp></ReclamosApp>
     
    </React.StrictMode>
  </BrowserRouter>
 
)
