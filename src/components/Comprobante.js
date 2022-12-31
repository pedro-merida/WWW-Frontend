import React, { Component } from 'react'
import comprobante from '../mocking/comprobante'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useCookies } from "react-cookie";
import {useLazyQuery, useQuery, useMutation, gql} from '@apollo/client';

const GET_COMPROBANTE = gql`query GetComprobante($getComprobanteId: ID!) {
  getComprobante(id: $getComprobanteId) {
    id
    fecha_prestamo
    prestamos {
      id
      lugar
      ejemplar {
        id
        libro {
          titulo
          tipo
          autor
        }
      }
      fecha_devol_real
      fecha_devolucion
    }
    usuario {
        nombre
        apellido
        rut
        direccion
        telefono
        correo
    }
    bibliotecario {
        nombre
        apellido
        rut
    }
  }
}`;
function Comprobante (){
  let { id } = useParams();
  const [cookies, setCookie] = useCookies(["user"]);
  const [cookies_biblio, setCookieBiblio] = useCookies(["biblio"]);

  const { loading, error, data} = useQuery(GET_COMPROBANTE, {
    variables: { getComprobanteId: id },
  });
  console.log(data);
  return <ComprobanteComponent usuario={cookies.user} biblio={cookies_biblio.biblio} data={data} loading={loading} error={error}></ComprobanteComponent>
}
class ComprobanteComponent extends Component {
    constructor(props){
        super(props);
        this.calcularFecha = this.calcularFecha.bind(this);
    }
    calcularFecha = (fecha) => {
        return moment(fecha).format('MMM DD YYYY, h:mm:ss a');
    } 
  render() {
    let data = this.props.data;
    let loading = this.props.loading;
    let error = this.props.error;
    let usuario = this.props.data;
    let biblio = this.props.biblio;
    return (
        <div className="card bg-primary-gradient shadow">
          <div className="card-body">
        
            <div className="container mb-5 mt-1">
              <div className="text-left">
                          <Link to="/"><button type="button" className="btn btn-sm btn-primary px-3 mb-3 shadow"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                          </svg>Volver</button></Link>
              </div>
            
            {(usuario || biblio) ? loading ? <p class="text-center">Cargando...</p> : error ? <p class="text-center">Ha ocurrido un error. Inténtelo nuevamente</p> : 
            <div>
              <div className="row d-flex align-items-baseline">
                <div className="col-xl-9">
                  <p style={{color: "#7e8d9f", fontSize: "20px"}}>Comprobante  <strong>ID: {data.getComprobante.id}</strong></p>
                </div>
                <div className="col-xl-3 float-end">
                  <a className="btn btn-light text-capitalize border-0" data-mdb-ripple-color="dark"><i
                      className="bi bi-printer"></i> Imprimir</a>
                  <a className="btn btn-light text-capitalize" data-mdb-ripple-color="dark"><i
                      className="bi bi-file-pdf"></i> Exportar</a>
                </div>
                <hr/>
              </div>
      
              <div className="container">
                <div className="col-md-12">
                  <div className="text-center">
                    <i className="fab fa-mdb fa-4x ms-0" style={{color:"#5d9fc5"}}></i>
                  </div>
                </div>
    
                <div className="row">
                  <div className="col-xl-8">
                    <ul className="list-unstyled">
                      <li className="text-muted"> <span className="fw-bold">Datos de usuario</span></li>
                      <li className="text-muted"><span >{data.getComprobante.usuario.nombre} {data.getComprobante.usuario.apellido}</span></li>
                      <li className="text-muted">{data.getComprobante.usuario.rut}</li>
                      <li className="text-muted">{data.getComprobante.usuario.direccion}</li>
                      <li className="text-muted"><i className="bi bi-telephone-fill me-1"></i>{data.getComprobante.usuario.telefono}</li>
                      <li className="text-muted"><i className="bi bi-envelope-fill me-1"></i>{data.getComprobante.usuario.correo}</li>
                    </ul>

                    <ul className="list-unstyled">
                      <li className="text-muted"> <span className="fw-bold">Datos de bibliotecario</span></li>
                      <li className="text-muted"><span>{data.getComprobante.bibliotecario.nombre} {data.getComprobante.bibliotecario.apellido}</span></li>
                      <li className="text-muted">{data.getComprobante.bibliotecario.rut}</li>
                    </ul>
                  </div>
                
                  <div className="col-xl-4">
                    <p className="text-muted">Comprobante</p>
                    <ul className="list-unstyled">
                      <li className="text-muted"><i className="fas fa-circle" style={{color:"#84B0CA"}}></i> <span
                          className="fw-bold">ID:</span> {data.getComprobante.id}</li>
                      <li className="text-muted"><i className="fas fa-circle" style={{color:"#84B0CA"}}></i> <span
                          className="fw-bold">Fecha de préstamo: </span>{this.calcularFecha(data.getComprobante.fecha_prestamo)}</li>
                    </ul>
                  </div>
                </div>
      
                <div className="row my-2 mx-1 justify-content-center">
                  <table className="table table-striped table-borderless">
                    <thead style={{backgroundColor:"#80558C"}} className="text-white">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Préstamo</th>
                        <th scope="col">Título</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Ejemplar</th>
                        <th scope="col">Lugar</th>
                        <th scope="col">Fecha de devolución</th>
                        <th scope="col">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {data.getComprobante.prestamos.map((prestamo, index) => 
                        
                        <tr className="align-middle">
                            
                          <th scope="row">{index+1}</th>
                          <td>{prestamo.id}</td>
                          <td>{prestamo.ejemplar.libro.titulo}</td>
                          <td>{prestamo.ejemplar.libro.autor}</td>
                          <td>{prestamo.ejemplar.libro.tipo}</td>
                          <td>{prestamo.ejemplar.id}</td>
                          <td>{prestamo.lugar}</td>
                          <td>{this.calcularFecha(prestamo.fecha_devolucion)}</td>
                          <td>{prestamo.fecha_devol_real === null ? <span class="badge bg-warning">Pendiente</span>: <span class="badge bg-success">Devuelto</span>}</td>
                        
                        </tr>
                        
                      )}
                    </tbody>
                  </table>
                </div>
              
                <div className="row">
                  <div className="col-xl-8">
                    <p className="ms-3">Los préstamos no entregados a tiempo conllevan una sanción del triple del tiempo de atraso en que no podrá realizar solicitudes</p>
      
                  </div>
                  <div className="col-xl-3">
                    <ul className="list-unstyled">
                    
                      <li className="text-muted ms-3"><span className="text-black me-4">Libros en casa</span>15 días</li>
                      <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Libros en sala</span>15 horas</li>
                      <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Multimedia en casa</span>7 días</li>
                      <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Multimedia en sala</span>3 horas</li>
                    </ul>
                  </div>
                </div>

                <hr></hr>
              
                <div className="row">
                  <div className="col-xl-10">
                    <p>¡Gracias por su visita!</p>
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

export default Comprobante