import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import solicitudes_gestionadas from '../mocking/solicitudes_gestionadas';
import moment from 'moment';
import { useCookies } from "react-cookie";
import {useLazyQuery, useQuery, useMutation, gql} from '@apollo/client';

const SOLICITUDES_GESTIONADAS = gql`query GetSolicitudesByBibliotecario($bibliotecario: String) {
    getSolicitudesByBibliotecario(bibliotecario: $bibliotecario) {
      libro {
        titulo
        autor
        tipo
      }
      fecha_reserva
      lugar
      estado_solicitud
    }
  }`

function SolicitudesGestionadas(props){

    const [cookies, setCookie] = useCookies(["biblio"]);
    //const [cookies_biblio, setCookieBiblio] = useCookies(["biblio"]);

    const { loading, error, data} = useQuery(SOLICITUDES_GESTIONADAS, {
        variables: { bibliotecario: cookies.biblio },
    });

    console.log(data);
    return <SolicitudesGestionadasComponent bibliotecario={cookies.biblio} data={data} error={error} loading={loading}></SolicitudesGestionadasComponent>
}

class SolicitudesGestionadasComponent extends React.Component{
    componentDidMount() {
        AOS.init();
    }

    constructor(props) {
        super(props);
        
        this.calcularFecha = this.calcularFecha.bind(this);
      }
  
        calcularFecha = (fecha) => {
            return moment(fecha).format('MMM DD YYYY, h:mm:ss a');
        } 
    
    render() {
        let bibliotecario = this.props.bibliotecario;
        let data = this.props.data;
        let error = this.props.error;
        let loading = this.props.loading;
        return(
            <div>
                <div className="container py-0">
                    <div className="p-2 p-lg-3 rounded-3 bg-primary-gradient shadow-sm" data-aos="fade-up" data-aos-duration="1000">
                        <div className="text-left">
                            <Link to="/"><button type="button" className="btn btn-sm btn-primary px-3 mb-3 shadow"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            </svg>Volver</button></Link>
                        </div>
                        {bibliotecario ?
                        <div>
                            <div className="m-4 m-lg-5 text-center">
                                <h1 className="display-5 fw-bold">Solicitudes gestionadas</h1>
                            </div>
                            <div className="container h-100 py-5">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col">
                                        <div className="table-responsive">
                                            {loading ? <p class="text-center">Cargando...</p> : error ? <p class="text-center">Ha ocurrido un error. Inténtelo nuevamente</p> : <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="h5">Libro</th>
                                                        <th scope="col">Tipo</th>
                                                        <th scope="col">Lugar</th>
                                                        <th scope="col">Fecha de reserva</th>
                                                        
                                                        <th scope="col">Estado de la solicitud</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.getSolicitudesByBibliotecario.map((solicitudes, index) =>
                                                        <tr key={index}>
                                                            <th scope="row">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="flex-column ms-4">
                                                                    <p className="mb-2">{solicitudes.libro.titulo}</p>
                                                                    <p className="mb-0">{solicitudes.libro.autor}</p>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <td className="align-middle">
                                                                <p className="mb-0" style={{fontWeight: "500"}}>{solicitudes.libro.tipo}</p>
                                                            </td>
                                                            <td className="align-middle">
                                                                <p className="mb-0" style={{fontWeight: "500"}}>{solicitudes.lugar}</p>
                                                            </td>
                                                            <td className="align-middle">
                                                                <p className="mb-0" style={{fontWeight: "500"}}>{this.calcularFecha(solicitudes.fecha_reserva)}</p>
                                                            </td>
                                        
                                                            <td className="align-middle">
                                                                {solicitudes.estado_solicitud === true ? <h5><span className="badge bg-success">Gestionada</span></h5>:
                                                                <h5><span className="badge bg-warning">No gestionada</span></h5>}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <p class="text-center">No tiene acceso a esta página</p>}
                    </div>
                </div>      
            </div>
        )
    }
}

export default SolicitudesGestionadas