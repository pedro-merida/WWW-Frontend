import React, { Component } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import solicitudes_pendientes from '../mocking/solicitudes_pendientes';
import moment from 'moment';
import { useCookies } from "react-cookie";
import {useLazyQuery, useQuery, useMutation, gql} from '@apollo/client';

const GET_SOLICITUDES = gql`query GetSolicitudEstado($estadoSolicitud: Boolean) {
  getSolicitudEstado(estado_solicitud: $estadoSolicitud) {
    id
    libro {
      autor
      titulo
      tipo
      ejemplares {
        id
        ubicacion
      }
    }
    lugar
    fecha_reserva
  }
}`;

const UPDATE_SOLICITUD = gql`mutation UpdateSolicitud($updateSolicitudId: ID!, $input: SolicitudActualizar) {
  updateSolicitud(id: $updateSolicitudId, input: $input) {
    id
  }
}`
function Solicitudes(){
  const [cookies, setCookie] = useCookies(["biblio"]);
    //const [cookies_biblio, setCookieBiblio] = useCookies(["biblio"]);

    const { loading, error, data} = useQuery(GET_SOLICITUDES, {
        variables: { estadoSolicitud: false },
    });

    const [updateSolicitud, { data: data_up, loading: loading_up, error: error_up}] = useMutation(UPDATE_SOLICITUD);
    
    if(data){
      var ubicacion = Array(data.getSolicitudEstado.length).fill({ubicacion: "Seleccione ejemplar", ejemplar: null});
      
      console.log(ubicacion);
    }
    console.log(data);

  return <SolicitudesComponent updateSolicitud={updateSolicitud} data_up={data_up} loading_up={loading_up} error_up={error_up} ubicacion={ubicacion} biblio={cookies.biblio} data={data} loading={loading} error={error}></SolicitudesComponent>
}
class SolicitudesComponent extends React.Component{
    componentDidMount() {
        AOS.init();
    }
    state = { expanded: false }
    constructor(props) {
      super(props);
  
      this.state = {
        collapseMenu: true,
        open: false,
        isChanged: false,
        ubicacion: this.props.ubicacion,
        items_selected: []
      };
  
      this.handleClick = this.handleClick.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.calcularFecha = this.calcularFecha.bind(this);
      
    }h

      calcularFecha = (fecha) => {
          return moment(fecha).format('MMM DD YYYY, h:mm:ss a');
      } 
      
    handleChange = (index) => (e) => {
      const index_ejemplar = e.target.value;
      console.log(index_ejemplar);
      console.log(index);
      const list = this.state.ubicacion;
      if(index_ejemplar===""){
        list[index] = {ubicacion: "Seleccione ejemplar"};
      }
      else{
        list[index] = {ubicacion: this.props.data.getSolicitudEstado[index].libro.ejemplares[index_ejemplar].ubicacion, ejemplar: this.props.data.getSolicitudEstado[index].libro.ejemplares[index_ejemplar]};
      }
      this.setState({
        ubicacion: list
      })
    }

    handleAddItem = (e, solicitud, index) => {
      let items_selected = [...this.state.items_selected];
      var ids = items_selected.map(solicitud => solicitud.id);

      console.log(index);
      if(e.target.checked){
        items_selected.push(solicitud);
        
      }
      else{
        var index2 = ids.indexOf(solicitud.id);
        items_selected.splice(index2,1);
      }

      console.log(items_selected);

      this.setState({items_selected})
      
    }
    handleOpen = () => this.setState({ open: true });

    handleClose = () => this.setState({ open: false });

    handleClick = () => this.setState({ open: true });

    gestionarSolicitudes = (e) => {
      var error =false;
      for (var solicitud in this.state.items_selected){
        var indexOf = this.props.data.getSolicitudEstado.indexOf(this.state.items_selected[solicitud]);
        console.log(indexOf);
        var ejemplar = this.state.ubicacion[indexOf].ejemplar.id;
        if (ejemplar === null){
          error = true;
          console.log("error uwu");
        }
        
        else{
          //console.log(this.state.items_selected[solicitud].id);
          //console.log(this.props.biblio);
          //console.log(ejemplar);
          this.props.updateSolicitud({variables: {
            updateSolicitudId: this.state.items_selected[solicitud].id,
            input: {
              bibliotecario: this.props.biblio,
              ejemplar: ejemplar,
              estado_solicitud: true,
            }
          }})

          if (this.props.error_up){
            error = true;
            console.log("error uwu");
          }
        }

        if(!error){
          this.setState({ open: true });
        }
      }
    }
    render() {
        const { open } = this.state;
        let biblio = this.props.biblio;
        let data = this.props.data;
        let loading = this.props.loading;
        let error = this.props.error;

        return(
            <>
                <header>
                    <div className="container py-0">
                        <div className="p-2 p-lg-3 rounded-3 bg-primary-gradient shadow-sm" data-aos="fade-up" data-aos-duration="1000">
                          <div className="text-left">
                            <Link to="/"><button type="button" className="btn btn-sm btn-primary px-3 mb-3 shadow"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            </svg>Volver</button></Link>
                          </div>

                          {biblio ? 
                            <div className="m-4 m-lg-5 text-center">
                                <h1 className="display-5 fw-bold">Solicitudes</h1>
                            </div> : <p class="text-center"> No tiene acceso a esta página</p>}
                        </div>
                    </div>
                </header>
                
                { biblio ?
                <section className="h-100 h-custom">
                <div className="container h-100 py-5">
                  <div className="row d-flex justify-content-left align-items-center h-100">
                    <div className="col">
                        <div className="d-flex justify-content-left align-items-center">
                            <span className="bs-icon-sm bs-icon-circle bs-icon-primary text-bg-warning shadow d-flex justify-content-center align-items-center me-2 bs-icon" style={{width: '30px', height: '30px'}}><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
                                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
                                </svg>
                            </span><h6 style={{paddingTop: "8px"}} className="fw-bold">Seleccione las solicitudes que quiere gestionar</h6>
                        </div>
                      <div className="table-responsive">
                      {loading ? <p class="text-center">Cargando...</p> : error ? <p class="text-center">Ha ocurrido un error. Inténtelo nuevamente</p> : data.getSolicitudEstado===null ? <p class="text-center">No hay solicitudes</p> : 
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col" className="h5">Libro</th>
                              <th scope="col">Tipo</th>
                              <th scope="col">Lugar</th>
                              <th scope="col">Fecha reserva</th>
                              <th scope="col">Ejemplar</th>
                              <th scope="col">Ubicacion</th>
                            </tr>
                          </thead>
                          <tbody>
                            
                            {data.getSolicitudEstado.map((solicitud, index0) =>
                                <tr key={index0}>
                                <th scope="row">
                                  <div className="d-flex align-items-center">
                                      <td className="align-middle">
                                          <div class="form-check-md">
                                              <input class="form-check-input" onChange={(e) => this.handleAddItem(e, solicitud, index0)} type="checkbox" value={solicitud.id} id="flexCheckDefault"/>
                                          </div>
                                      </td>
                                    <div className="flex-column ms-4">
                                      <p className="mb-2">{solicitud.libro.titulo}</p>
                                      <p className="mb-0">{solicitud.libro.autor}</p>
                                    </div>
                                  </div>
                                </th>
                                <td className="align-middle">
                                  <p className="mb-0" style={{fontWeight: "500"}}>{solicitud.libro.tipo}</p>
                                </td>
                                <td className="align-middle">
                                  <p className="mb-0" style={{fontWeight: "500"}}>{solicitud.lugar}</p>
                                </td>
                                <td className="align-middle">
                                  <p className="mb-0" style={{fontWeight: "500"}}>{this.calcularFecha(solicitud.fecha_reserva)}</p>
                                </td>
                                <td className="align-middle">
                                  <div className="col-sm-9">
                                      <select onChange={this.handleChange(index0)} className="form-select" aria-label="Default select example" required>
                                        <option selected value="">Seleccione un ejemplar</option>
                                          {solicitud.libro.ejemplares.map((ejemplar, index) => 
                                            <option value={index}>{ejemplar.id}</option>
                                          )}
                                      </select>
                                  </div>
                                </td>
                                {this.state.ubicacion ? <td className="align-middle">
                                  <p className="mb-0" style={{fontWeight: "500"}}>{this.state.ubicacion[index0].ubicacion}</p>
                                </td> : <td><p>Cargando...</p></td>}
                              </tr>
                              )}
                          </tbody>
                        </table>}
                      </div>

                      <div className="card-body p-4">
                          <div className="row justify-content-end">
                              <div className="col-lg-4 col-xl-2">
                              <button onClick = {this.gestionarSolicitudes} type="button" className="btn btn-primary btn-block btn-md shadow">
                                  <div className="d-flex justify-content-between">
                                  <span>Confirmar</span>
                                  </div>
                              </button>
                              <Snackbar
                                  anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "center"
                                  }}
                                  open={open}
                                  onClose={this.handleClose}
                                  autoHideDuration={2000}
                                  >
                                  
                                  <MuiAlert
                                      onClose={this.handleClose}
                                      severity="success"
                                      elevation={6}
                                      variant="filled"
                                  >
                                      Sus solicitudes han sido gestionadas
                                  </MuiAlert>
                              </Snackbar>
                              </div>
                          </div>
                      </div>

                    </div>
                  </div>
                </div>
              </section> : <div></div>}
            </>
        )
    }
}

export default Solicitudes