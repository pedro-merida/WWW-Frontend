import React, { Component } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DevolucionPrestamo from './DevolucionPrestamo';
import {Link} from 'react-router-dom';
import { fabClasses, Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import prestamos_casa from '../mocking/prestamos_vencidos_casa';
import prestamos_sala from '../mocking/prestamos_vencidos_sala';
import moment from 'moment';
import { useCookies } from "react-cookie";
import {useLazyQuery, useQuery, useMutation, gql} from '@apollo/client';
import emailjs from '@emailjs/browser';

const PRESTAMOS = gql`query GetPrestamosVencidos($lugar: String) {
    getPrestamosVencidos(lugar: $lugar) {
        id_prestamo
      fecha_devolucion
      fecha_prestamo
      titulo
      unit
      duration
      lugar
      comprobante
      autor
      ejemplar
    }
  }`

  const GET_PRESTAMO = gql`query GetPrestamo($getPrestamoId: ID!) {
    getPrestamo(id: $getPrestamoId) {
      usuario {
        correo
        nombre
        apellido
      }
      id
      fecha_devolucion
      ejemplar {
        libro {
          titulo
        }
      }
    }
  }`
function Prestamos(props){
    const [cookies, setCookie] = useCookies(["biblio"]);
    //const [cookies_biblio, setCookieBiblio] = useCookies(["biblio"]);

    const sendEmail = (datos) => {
        console.log(datos);
        emailjs.send('service_t756lik', 'template_hoytyq7', datos, 'ZSAb3XgGnbWvnxOz4')
    };

    const { loading, error, data} = useQuery(PRESTAMOS, {
        variables: { lugar: "Sala Lectura" },
    });

    const { loading: loading_casa, error: error_casa, data: data_casa} = useQuery(PRESTAMOS, {
        variables: { lugar: "Casa" },
    });

    const { loading: loading_multi, error: error_multi, data: data_multi} = useQuery(PRESTAMOS, {
        variables: { lugar: "Sala Multimedia" },
    });

    const [getPrestamo, { loading: loading_prestamo, error: error_prestamo, data: data_prestamo }] = useLazyQuery(GET_PRESTAMO, {
        onCompleted: someData => {
            var datos = {correo: someData.getPrestamo.usuario.correo, nombre: someData.getPrestamo.usuario.nombre,
            apellido: someData.getPrestamo.usuario.apellido, libro: someData.getPrestamo.ejemplar.libro.titulo, fecha_devolucion: moment(someData.getPrestamo.fecha_devolucion).format('MMM DD YYYY, h:mm:ss a')};
            
            sendEmail(datos);
            console.log(someData);
        }
    });
    console.log(data);
    
    if(data_casa){
        var checked = Array(data_casa.getPrestamosVencidos.length).fill({isChecked: false});
        
        console.log(checked);
      }

    return <PrestamosComponent error_prestamo={error_prestamo} getPrestamo={getPrestamo} checked={checked} bibliotecario={cookies.biblio} data_casa={data_casa} error_casa={error_casa} loading_casa={loading_casa} data_multi={data_multi} error_multi={error_multi} loading_multi={loading_multi} data={data} error={error} loading={loading}></PrestamosComponent>
}

class PrestamosComponent extends Component {
    componentDidMount() {
        AOS.init();
    }

    constructor(props) {
        super(props);
    
        this.state = {
          tabIndex: 0,
          open: false,
          setTabIndex: 0,
            checked: this.props.checked,
            checkAll: false,
            items_selected: []
        };
    
        this.handleTabChange= this.handleTabChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.calcularFecha = this.calcularFecha.bind(this);
        this.selectAll = this.selectAll.bind(this);
        
    }

    calcularFecha = (fecha) => {
        return moment(fecha).format('MMM DD YYYY, h:mm:ss a');
    } 
    handleTabChange = (event, newTabIndex) => {
        this.setState({
            tabIndex: newTabIndex,
        }
        )
    };

    handleChange = (e, prestamo, index) => {

        let items_selected = [...this.state.items_selected];
        var ids = items_selected.map(prestamo => prestamo.id_prestamo);
        const list = this.state.checked;
        if (e.target.checked){
            list[index] = {isChecked: true};
            items_selected.push(prestamo);
        }
        else{
            list[index] = {isChecked: false};
            
            var index2 = ids.indexOf(prestamo.id_prestamo);
            items_selected.splice(index2,1);
            
        }
        console.log(list);
        console.log(items_selected);
        this.setState({
            checked: list
        })

        this.setState({items_selected})
    }

    enviarRecordatorio = () => {
        const items = this.state.items_selected;
        for (var item in items){
            var prestamo = items[item];
            
            this.props.getPrestamo({variables: {
                getPrestamoId: prestamo.id_prestamo
            }});

            if(!this.props.error_prestamo){
                this.setState({ open: true })
            }
        }
    }
    selectAll = (e) => {
        const list = this.state.checked;

        let items_selected = [...this.state.items_selected];
        var ids = items_selected.map(prestamo => prestamo.id_prestamo);


        if(e.target.checked){
            for (var i in list){
                list[i] = {isChecked: true};
                items_selected.push(this.props.data_casa.getPrestamosVencidos[i]);
            }
        }

        else{
            for (var i in list){
                var index2 = ids.indexOf(this.props.data_casa.getPrestamosVencidos[i].id_prestamo);
                items_selected.splice(index2,1);
                list[i] = {isChecked: false};
            }
        }

        console.log(list);
        console.log(items_selected);
        this.setState({
            checked: list
        })

        this.setState({items_selected})
    }
    handleOpen = () => this.setState({ open: true });

    handleClose = () => this.setState({ open: false });

    handleClick = () => this.setState({ open: true });
    render() {
        let bibliotecario = this.props.bibliotecario;
        let data = this.props.data;
        let error = this.props.error;
        let loading = this.props.loading;

        let data_casa = this.props.data_casa;
        let error_casa = this.props.error_casa;
        let loading_casa = this.props.loading_casa;

        let data_multi = this.props.data_multi;
        let error_multi = this.props.error_multi;
        let loading_multi = this.props.loading_multi;
    return (
        <div>
            <header>
                <div className="container">
                    <div className="p-2 p-lg-3 rounded-3 bg-primary-gradient shadow-sm" data-aos="fade-up" data-aos-duration="1000">
                        <div className="text-left">
                            <Link to="/"><button type="button" className="btn btn-sm btn-primary px-3 mb-3 shadow"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            </svg>Volver</button></Link>
                        </div>
                        <div className="m-4 m-lg-5 text-center">
                            <h1 className="display-5 fw-bold">Préstamos</h1>

                            <div className="row justify-content-center">
                                
                                <div className="col-lg-4 col-xl-2">
                                    <Link to="/generar-prestamo"><button type="button" className="btn btn-sm btn-primary mb-3 shadow">Generar</button></Link>
                                </div>

                                <div className="col-lg-4 col-xl-2">
                                    <button type="button" href="#devolucion" data-bs-target="#devolucion" data-bs-toggle="modal" className="btn btn-sm btn-primary mb-3 shadow">Devolver</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="h-100 h-custom">
                <div className="container h-100 py-5">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <Box>
                            <Box>
                                <Tabs value={this.state.tabIndex} onChange={this.handleTabChange} variant="fullWidth">
                                    <Tab className="fw-bold" label="Préstamos vencidos en sala" />
                                    <Tab className="fw-bold" label="Préstamos vencidos en domicilio" />
                                </Tabs>
                            </Box>
                            <Box sx={{ padding: 2 }}>
                                {this.state.tabIndex === 0 && (
                                    <Box>
                                        <div className="table-responsive">
                                            {(loading || loading_multi) ? <p class="text-center">Cargando...</p> : (error || error_multi) ? <p class="text-center">Ha ocurrido un error. Intentelo nuevamente</p> : <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="h5">Libro</th>
                                                        <th scope="col">Ejemplar</th>
                                                        <th scope="col">Lugar</th>
                                                        <th scope="col">Hora de préstamo</th>
                                                        <th scope="col">Hora de devolución</th>
                                                        <th scope="col">Horas vencido</th>
                                                        <th scope="col"></th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.getPrestamosVencidos.map((prestamo, index) =>
                                                        <tr key={index}>
                                                            <th scope="row">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="flex-column ms-4">
                                                                        <p className="mb-2">{prestamo.titulo}</p>
                                                                        <p className="mb-0">{prestamo.autor}</p>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                                <td className="align-middle">
                                                                    <p className="mb-0" style={{fontWeight: "500"}}>{prestamo.ejemplar}</p>
                                                                </td>
                                                                <td className="align-middle">
                                                                    <p className="mb-0" style={{fontWeight: "500"}}>{prestamo.lugar}</p>
                                                                </td>
                                                                <td className="align-middle">
                                                                    <p className="mb-0" style={{fontWeight: "500"}}>{this.calcularFecha(prestamo.fecha_prestamo)}</p>
                                                                </td>
                                                                <td className="align-middle">
                                                                    <p className="mb-0" style={{fontWeight: "500"}}>{this.calcularFecha(prestamo.fecha_devolucion)}</p>
                                                                </td>
                                                                <td className="align-middle">
                                                                    <p className="mb-0" style={{fontWeight: "500"}}>{prestamo.duration} {prestamo.unit}</p>
                                                                </td>
                                                                <td className="align-middle">
                                                                    <Link to={"/comprobante/"+prestamo.comprobante}><button type="button" className="btn btn-sm btn-secondary my-2 shadow">Ver comprobante</button></Link>
                                                                </td>
                                                        </tr>
                                                    )}
                                                    {data_multi.getPrestamosVencidos.map((prestamo_multi, index_multi) =>
                                                        <tr key={index_multi}>
                                                            <th scope="row">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="flex-column ms-4">
                                                                        <p className="mb-2">{prestamo_multi.titulo}</p>
                                                                        <p className="mb-0">{prestamo_multi.autor}</p>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                                <td className="align-middle">
                                                                    <p className="mb-0" style={{fontWeight: "500"}}>{prestamo_multi.ejemplar}</p>
                                                                </td>
                                                                <td className="align-middle">
                                                                    <p className="mb-0" style={{fontWeight: "500"}}>{prestamo_multi.lugar}</p>
                                                                </td>
                                                                <td className="align-middle">
                                                                    <p className="mb-0" style={{fontWeight: "500"}}>{this.calcularFecha(prestamo_multi.fecha_prestamo)}</p>
                                                                </td>
                                                                <td className="align-middle">
                                                                    <p className="mb-0" style={{fontWeight: "500"}}>{this.calcularFecha(prestamo_multi.fecha_devolucion)}</p>
                                                                </td>
                                                                <td className="align-middle">
                                                                    <p className="mb-0" style={{fontWeight: "500"}}>{prestamo_multi.duration} {prestamo_multi.unit}</p>
                                                                </td>
                                                                <td className="align-middle">
                                                                    <Link to={"/comprobante/"+prestamo_multi.comprobante}><button type="button" className="btn btn-sm btn-secondary my-2 shadow">Ver comprobante</button></Link>
                                                                </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>}
                                        </div>
                                    </Box>
                                )}
                            {this.state.tabIndex === 1 && (
                            <Box>
                                <table className="table table-hover">       
                                    <tr>
                                        <td colSpan={4}>
                                            <div className="row justify-content-between">
                                                <div className="col-lg-4 col-xl-2">
                                                    <input className="form-check-input" onChange={this.selectAll} type="checkbox" value="" id="selectall"/>
                                                    <label className='px-2'>Seleccionar todo</label>
                                                </div>
                                                <div className="col-lg-4 col-xl-2">
                                                    <button type="button" onClick = {this.enviarRecordatorio} className="btn btn-sm btn-warning mb-3 shadow">Enviar recordatorio</button>
                                                </div>
                                             </div>
                                        </td>
                                    </tr>
                                </table>
                                
                                <div className="table-responsive">
                                    {loading_casa ? <p class="text-center">Cargando...</p> : error_casa ? <p class="text-center">Ha ocurrido un error. Intentelo nuevamente</p> :
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="h5">Libro</th>
                                                <th scope="col">Ejemplar</th>
                                                <th scope="col">Fecha de préstamo</th>
                                                <th scope="col">Fecha de devolución</th>
                                                <th scope="col">Días vencido</th>
                                                <th scope="col"></th>
                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data_casa.getPrestamosVencidos.map((prestamo, index) =>
                                                <tr>
                                                    <th scope="row">
                                                        <div className="d-flex align-items-center">
                                                            <td className="align-middle">
                                                                { this.state.checked ? 
                                                                    <div class="form-check-md">
                                                                        <input class="form-check-input" onChange={(e) => this.handleChange(e, prestamo, index)} checked={this.state.checked[index].isChecked} type="checkbox" value="" id="flexCheckDefault" name={prestamo.titulo}/>
                                                                    </div> : <p>Cargando...</p>}
                                                            </td>
                                                            <div className="flex-column ms-4">
                                                                <p className="mb-2">{prestamo.titulo}</p>
                                                                <p>{prestamo.autor}</p>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <td className="align-middle">
                                                        <p className="mb-0" style={{fontWeight: "500"}}>{prestamo.ejemplar}</p>
                                                    </td>
                                                    <td className="align-middle">
                                                        <p className="mb-0" style={{fontWeight: "500"}}>{this.calcularFecha(prestamo.fecha_prestamo)}</p>
                                                    </td>
                                                    <td className="align-middle">
                                                        <p className="mb-0" style={{fontWeight: "500"}}>{this.calcularFecha(prestamo.fecha_devolucion)}</p>
                                                    </td>
                                                    <td className="align-middle">
                                                        <p className="mb-0" style={{fontWeight: "500"}}>{prestamo.duration} {prestamo.unit}</p>
                                                    </td>
                                                    <td className="align-middle">
                                                        <Link to={"/comprobante/"+prestamo.comprobante}><button type="button"  className="btn btn-sm btn-secondary my-2 shadow">Ver comprobante</button></Link>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>}
                                </div>
                                </Box>
                                )}
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                open={this.state.open}
                onClose={this.handleClose}
                autoHideDuration={3000}
                >
                
                <MuiAlert
                    onClose={this.handleClose}
                    severity="success"
                    elevation={6}
                    variant="filled"
                >
                    Recordatorios enviados exitosamente
                </MuiAlert>
            </Snackbar>
        <DevolucionPrestamo/>
        </section>

        </div>
    )
  }
}

export default Prestamos