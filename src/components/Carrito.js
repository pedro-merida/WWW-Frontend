import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import carrito from '../mocking/carrito'
import { Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import { useCookies, withCookies } from "react-cookie";
import {useLazyQuery, useQuery, useMutation, gql} from '@apollo/client';
import { GET_USUARIO } from '../App';
import { GetUsuario } from '../App';
import moment from 'moment';

const GET_CARRITO = gql`query GetCarrito($usuario: String) {
  getCarrito(usuario: $usuario) {
    id
    solicitudes {
      id
      libro {
        id
        titulo
        autor
        tipo
      }
      lugar
      fecha_reserva
      fecha_estimada
    }
  }
}`;

const ADD_SOLICITUD = gql`mutation AddSolicitud($input: SolicitudInput) {
  addSolicitud(input: $input) {
    id
  }
}`;

const DELETE_SOLICITUD = gql`mutation DeleteLibroInCarrito($deleteLibroInCarritoId: ID!) {
  deleteLibroInCarrito(id: $deleteLibroInCarritoId) {
    message
  }
}`;

const RESET_CARRITO = gql`mutation Mutation($resetCarritoId: ID!) {
  resetCarrito(id: $resetCarritoId) {
    message
  }
}`

function LibroCarrito(props){
  var libro = props.libro.libro;
  var fecha_reserva = moment(props.libro.fecha_reserva);
  var fecha_estimada = moment(props.libro.fecha_estimada);

  const [deleteSolicitud, { data, loading, error}] = useMutation(DELETE_SOLICITUD);

  const eliminar = (e) => {
    console.log(props.libro.id);
    deleteSolicitud({variables: {deleteLibroInCarritoId: props.libro.id}});
    props.refetch();
    window.location.reload();
  }

  return (
  <tr key={props.index}>
  <th scope="row">
    <div className="d-flex align-items-center">
      <div className="flex-column ms-4">
        <p className="mb-2">{libro.titulo}</p>
        <p className="mb-0">{libro.autor}</p>
      </div>
    </div>
  </th>
  <td className="align-middle">
    <p className="mb-0" style={{fontWeight: "500;"}}>{libro.tipo}</p>
  </td>
  <td className="align-middle">
    <p className="mb-0" style={{fontWeight: "500;"}}>{props.libro.lugar}</p>
  </td>
  <td className="align-middle">
    <p className="mb-0" style={{fontWeight: "500;"}}>{fecha_reserva.format("MM/DD/YYYY HH:mm:ss")}</p>
  </td>
  <td className="align-middle">
    <p className="mb-0" style={{fontWeight: "500;"}}>{fecha_estimada.format("MM/DD/YYYY HH:mm:ss")}</p>
  </td>
  <td className="align-middle">
      <button type="button" onClick={eliminar} style={{background: "var(--bs-danger)"}} className="border-0 bs-icon-md bs-icon-circle shadow d-flex justify-content-center align-items-center me-2 bs-icon btn-block btn-md"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
      </button>
  </td>
</tr>)
}

function Carrito(){
  const [cookies, setCookie] = useCookies(["user"]);
  const [cookies_biblio, setCookieBiblio] = useCookies(["biblio"]);

  const { loading, error, data, refetch} = useQuery(GET_CARRITO, {
    variables: { usuario: cookies.user},
    });
  
  const [addSolicitud, { data: data_sol, loading: loading_sol, error: error_sol}] = useMutation(ADD_SOLICITUD);

  const [resetCarrito, { data: data_car, loading: loading_car, error: error_car}] = useMutation(RESET_CARRITO);

  console.log(data);
  return <CarritoComponent resetCarrito = {resetCarrito} refetch = {refetch} addSolicitud = {addSolicitud} data_sol={data_sol} loading_sol={loading_sol} error_sol={error_sol} usuario={cookies.user} loading={loading} error={error} data={data}></CarritoComponent>

}

class CarritoComponent extends React.Component{
  componentDidMount() {
    AOS.init();
  }
  state = { expanded: false }
    constructor(props) {
      super(props);
  
      this.state = {
        collapseMenu: true,
        open: false,
        startDate: new Date(),
        today: new Date(),
        
      };
  
      this.handleClick = this.handleClick.bind(this);
      this.handleClose = this.handleClose.bind(this);

    }

    handleOpen = () => this.setState({ open: true });

    handleClose = () => this.setState({ open: false });

    handleClick = () => this.setState({ open: true });
    
    enviarSolicitudes = (e) => {
      e.preventDefault();
      var error = false;
      var data = this.props.data.getCarrito.solicitudes;
      for (var solicitud in this.props.data.getCarrito.solicitudes){
        console.log(data[solicitud]);

        this.props.addSolicitud({variables: {input: {fecha_reserva: data[solicitud].fecha_reserva, lugar: data[solicitud].lugar, id_libro: data[solicitud].libro.id, id_usuario: this.props.usuario}}})

        if(this.props.error_sol){
          error = true;
        }
      }

      if (!error){
        this.setState({ open: true });

        //Reset carrito
        this.props.resetCarrito({variables: {
          resetCarritoId: this.props.data.getCarrito.id
        }});
        window.location.reload()
      }
    }

    render(){
        const { open } = this.state;
        //let carrito = this.props.data; 
        let data = this.props.data;
        let usuario = this.props.usuario;
        let error = this.props.error;
        let loading = this.props.loading;
        console.log(data);
        return(
            <>
              <div>
                <div className="container py-0">
                  <div className="p-2 p-lg-3 rounded-3 bg-primary-gradient shadow-sm" data-aos="fade-up" data-aos-duration="1000">
                    <div className="text-left">
                      <Link to="/"><button type="button" className="btn btn-sm btn-primary px-3 mb-3 shadow"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                      </svg>Volver</button></Link>
                    </div>
                    { usuario ? <div> 
                    <div className="m-4 m-lg-5 text-center">
                      <h1 className="display-5 fw-bold">Carrito de libros</h1>
                    </div>
                    <hr></hr>
                    <div className="container h-100 py-5">
                      <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                          <div className="table-responsive">
                            {loading ? <p class="text-center">Cargando...</p> : error ? <p class="text-center">Ha ocurrido un error. Inténtelo nuevamente</p> : data.getCarrito.solicitudes===null ? <p class="text-center">No hay solicitudes</p> :
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th scope="col" className="h5">Libros a solicitar</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Lugar</th>
                                    <th scope="col">Fecha de reserva</th>
                                    <th scope="col">Fecha devolución estimada</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.getCarrito.solicitudes.map((solicitud, index) =>
                                    <LibroCarrito refetch={this.props.refetch} index={index} libro={solicitud}></LibroCarrito>
                                    )
                                  }
                                </tbody>
                              </table>}
                          </div>
                          <div className="card-body p-4">
                            <div className="row justify-content-end">
                              <div className="col-lg-4 col-xl-2">
                                <button onClick ={this.enviarSolicitudes} type="button" className="btn btn-primary btn-block btn-md shadow">
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
                                      Sus solicitudes han sido confirmadas
                                  </MuiAlert>
                                </Snackbar>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div> : <p class="text-center">No tiene acceso a esta página</p>}
                  </div> 
                </div>

                <section className="h-100 h-custom">
              </section>
              </div>
            </>
        )
    }
}

export default Carrito