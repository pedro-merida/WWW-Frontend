import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Inicio from './components/Inicio';
import ComoSolicitar from './components/ComoSolicitar';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';
import Solicitudes from './components/Solicitudes'
import MisSolicitudes from './components/MisSolicitudes';
import MisPrestamos from './components/MisPrestamos';
import Prestamos from './components/Prestamos';
import SolicitudesGestionadas from './components/SolicitudesGestionadas';
import PrestamosCreados from './components/PrestamosCreados';
import AgregarPrestamo from './components/AgregarPrestamo';
import Configuracion from './components/Configuracion';
import Comprobante from './components/Comprobante';
import CrearFicha from './components/CrearFicha';
import Activacion from './components/Activacion';
import moment from 'moment';
import { useCookies } from "react-cookie";
export const GET_USUARIO = gql`query GetUsuario($getUsuarioId: ID!) {
  getUsuario(id: $getUsuarioId) {
    nombre
    rut
    carrito {
      id
    }
  }
}`;

export function GetUsuario(){
  const [cookies, setCookie] = useCookies(["user"]);
  const [cookies_biblio, setCookieBiblio] = useCookies(["biblio"]);

  const { loading: loading_user, error: error_user, data: data_user } = useQuery(GET_USUARIO, {
    variables: { getUsuarioId: cookies.user},
  });

  return {loading_user, error_user, data_user}
}
class App extends React.Component {
  render() {
    return(
      /*<div>
      <AppRouter/>
      <NavBar/>
      </div>*/

      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/como-solicitar" element={<ComoSolicitar/>} />
          <Route path="/catalogo" element={<Catalogo/>}></Route>
          <Route path="/carrito" element={<Carrito/>}></Route>
          <Route path="/solicitudes" element={<Solicitudes/>}></Route>
          <Route path="/prestamos" element={<Prestamos/>}></Route>
          <Route path="/mis-solicitudes" element={<MisSolicitudes/>}></Route>
          <Route path="/mis-prestamos" element={<MisPrestamos/>}></Route>
          <Route path="/solicitudes-gestionadas" element={<SolicitudesGestionadas/>}></Route>
          <Route path="/prestamos-creados" element={<PrestamosCreados/>}></Route>
          <Route path="/generar-prestamo" element={<AgregarPrestamo/>}></Route>
          <Route path="/configuracion" element={<Configuracion/>}></Route>
          <Route path="/comprobante/:id" element={<Comprobante/>}></Route>
          <Route path="/crear-ficha" element={<CrearFicha/>}></Route>
          <Route path="/activacion/:id" element={<Activacion/>}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
