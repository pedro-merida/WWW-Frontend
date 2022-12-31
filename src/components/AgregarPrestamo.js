import React, { Component } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useCookies } from "react-cookie";
import {useLazyQuery, useQuery, useMutation, gql} from '@apollo/client';
import ejemplares_reservados from '../mocking/ejemplares_reservados';

const ADD_PRESTAMO = gql `mutation AddPrestamo($input: PrestamoInput) {
    addPrestamo(input: $input) {
      id
    }
  }`

const VALIDACION_USUARIO = gql`query ValidacionRutUsuario($rut: String, $huella: [Boolean]) {
    ValidacionRutUsuario(rut: $rut, huella: $huella) {
      usuario
      validacion
    }
  }`

const ADD_COMPROBANTE = gql`mutation AddComprobante($input: ComprobanteInput) {
    addComprobante(input: $input) {
      id
    }
  }`

const PRESTAMOS_RESERVADOS = gql`query Query($estado: String) {
    getEjemplaresByEstado(estado: $estado) {
      id
      estado
    }
  }`
function AgregarPrestamo(){
    const [cookies, setCookie] = useCookies(["biblio"]);
    const [validacionUsuario, { loading, error, data }] = useLazyQuery(VALIDACION_USUARIO, {
        onCompleted: someData => {
            console.log(someData.ValidacionRutUsuario.usuario);
        }
    });

    const [addPrestamo, {loading: loading_prestamo, error: error_prestamo, data: data_prestamo}] = useMutation(ADD_PRESTAMO);

    const {loading: loading_res, data: data_res, error: error_res} = useQuery(PRESTAMOS_RESERVADOS, {
        variables: { estado: "Reservado" },
    });
    const [addComprobante, {loading: loading_comp, error: error_comp, data: data_comp}] = useMutation(ADD_COMPROBANTE);

    return <AgregarPrestamoComponent error_res={error_res} data_res={data_res} loading_res={loading_res} error_comp={error_comp} addComprobante={addComprobante} data_comp={data_comp} biblio={cookies.biblio} addPrestamo={addPrestamo} validacionUsuario={validacionUsuario} data={data} loading={loading} error={error}></AgregarPrestamoComponent>
}
class AgregarPrestamoComponent extends Component {
    componentDidMount() {
        AOS.init();
    }

    constructor(props) {
        super(props);

        this.state = {
            serviceList: [{ service: "", lugar: "Casa"}],
            open: false,
            startDate: new Date(),
            today: new Date(),
            rut: "",
            huella: "",
            data_validacion: this.props.data,
            data_comp: this.props.data_comp
        };

        this.handleServiceChange = this.handleServiceChange.bind(this);
        this.handleServiceRemove = this.handleServiceRemove.bind(this);
        this.handleServiceAdd = this.handleServiceAdd.bind(this);
        this.handleLugarChange = this.handleLugarChange.bind(this);
        this.validarUsuario = this.validarUsuario.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        
    }

    handleRutChange = (e) => {
        this.setState({
            rut: e.target.value
        })
    }

    handleHuellaChange = (e) => {
        this.setState({
            huella: e.target.value
        })
    }
    validarUsuario = (e) => {
        e.preventDefault();
        var rut = this.state.rut;
        var huella = this.state.huella.slice(1,-1).split(', ');
        for (var i in huella){
            huella[i] = (huella[i] === 'true');
        }

        this.props.validacionUsuario({variables: {
            rut: rut,
            huella: huella
        }})

        //console.log(rut);
        //console.log(huella);
    }
    onFormSubmit = async (e) => {
        e.preventDefault();
        var rut = await e.target.rut.value;
        var huella = await e.target.huella.value.slice(1,-1).split(', ');
        for (var i in huella){
            huella[i] = (huella[i] === 'true');
        }
        var fecha = moment(this.state.startDate, "MM/DD/YYYY HH:mm:ss").format();
        var ejemplares = this.state.serviceList;

        await this.props.addComprobante({variables: {
            input: {
              bibliotecario: this.props.biblio,
              fecha_prestamo: fecha,
              usuario: this.state.data_validacion.ValidacionRutUsuario.usuario
            }
        }})

        await this.state.data_comp;

        //console.log(this.state.data_comp);
        for (var j in ejemplares){
            this.props.addPrestamo({variables: {
                input: {
                  bibliotecario: this.props.biblio,
                  comprobante: await this.state.data_comp.addComprobante.id,
                  ejemplar: ejemplares[j].service,
                  fecha_prestamo: fecha,
                  lugar: ejemplares[j].lugar,
                  usuario: this.state.data_validacion.ValidacionRutUsuario.usuario
                }
              }})
        }
        
        await this.props.error_comp;

        if(!this.props.error_comp){
            this.setState({ open: true });
        }

    }
    handleClose = () => this.setState({ open: false });

    handleClick = () => this.setState({ open: true });
    handleServiceChange = (e, index) => {
        const value = e.target.value;
        const list = [...this.state.serviceList];
        list[index].service = value;
        console.log(value);
        this.setState({
            serviceList: list
        })

        console.log(list);
        };

    handleLugarChange = (e, index) => {
        const value = e.target.value;
        const list = [...this.state.serviceList];
        list[index].lugar = value;
        console.log(value);
        this.setState({
            serviceList: list
        })

        console.log(list);
        };


    handleServiceRemove = (index) => {
        const list = [...this.state.serviceList];
        list.splice(index, 1);
        this.setState({
            serviceList: list
        })
        
        };

    handleServiceAdd = () => {
        this.setState({
            serviceList: [...this.state.serviceList, { service: "", lugar: "Casa" }]
        })
    };

    handleChange(date) {
        this.setState({
          startDate: date
        })
      }
    render() {
        var data = this.props.data;
        var loading = this.props.loading;
        var error = this.props.error;

        var data_res = this.props.data_res;
        var error_res = this.props.error_res;
        var loading_res = this.props.loading_res;
    return (
        <div>
            <div>
                <div className="container py-0">
                    <div className="p-2 p-lg-3 rounded-3 bg-primary-gradient shadow-sm" data-aos="fade-up" data-aos-duration="1000">
                        <div className="text-left">
                        <Link to="/prestamos"><button type="button" className="btn btn-sm btn-primary px-3 mb-3 shadow"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>Volver</button></Link>
                        </div>
                        <div className="m-4 m-lg-5 text-center">
                            <h1 className="display-5 fw-bold">Generar préstamo</h1>
                        </div>

                        <form method="post" onSubmit={this.onFormSubmit}>

                        <h4>Usuario</h4>
                        <hr></hr>
    
                            <div className="mb-3 row">
                                <label for="inputRUT" className="col-sm-2 col-form-label">RUT</label>
                                <div className="col-sm-9">
                                    <input onChange={this.handleRutChange} name="rut" type="text" className="form-control" id="inputRUT"/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label for="inputHuella" className="col-sm-2 col-form-label">Huella digital</label>
                                <div className="col-sm-9">
                                <input onChange={this.handleHuellaChange} name="huella" type="text" className="form-control" id="inputHuella"/>
                                </div>
                            </div>
                            {this.state.data_validacion ? this.state.data_validacion.ValidacionRutUsuario.validacion===null ? <p>RUT no existe</p> : this.state.data_validacion.ValidacionRutUsuario.validacion ? <p>Cuenta validada</p> : <p>Ingrese huella nuevamente</p> : <p></p>}
                            <button
                                type="button"
                                onClick={this.validarUsuario}
                                className="btn btn-primary btn-sm mt-2 add-btn"
                                >
                                <span>Validar</span>
                                </button>
                            
                        <h4>Préstamo</h4>
                        <hr></hr>
                                
                            <div className="mb-3 row">
                                <label for="inputFecha" className="col-sm-2 col-form-label">Fecha de préstamo</label>
                                <div className="col-sm-9">
                                <DatePicker
                                        showTimeSelect
                                        className='form-control'
                                        minDate= {this.state.today}
                                        selected={ this.state.startDate }
                                        onChange={ this.handleChange }
                                        name="startDate"
                                        dateFormat="MM/dd/yyyy HH:mm:ss"
                                    />
                                </div>
                            </div>
                            
                            <h4>Ejemplares</h4>
                            <hr></hr>

                            {this.state.serviceList.map((singleService, index) => (
                                                <div key={index} className="container">
                                                    <div className="row">
                                                        <div className="col-10 mb-2">
                                                            <div className="d-flex flex-row justify-content-start align-items-center">
                                                            
                                                            <label for="inputAutor" className="form-label me-3">Ejemplar</label>
                                                            

                                                            
                                                            <input name={"input"+index} onChange={(e) => this.handleServiceChange(e,index)} type="text" className="form-control me-3" id="inputAutor" list="datalistOptions"/>
                                                            
                                                            <datalist id="datalistOptions">
                                                                        
                                                                    {loading_res ? <p>Cargando...</p> : data_res ?data_res.getEjemplaresByEstado.map((ejemplar, index) => 
                                                                        <option value={ejemplar.id}/>
                                                                    ) : <p></p>}
                                                            </datalist>
                                                            
                                                            

                                                            <label for="inputAutor" className="form-label me-3">Lugar</label>

                                                            <select name={"select"+index} onChange={(e) => this.handleLugarChange(e,index)} className="form-select me-3" aria-label="Default select example">
                    
                                                            <option selected value="Casa">Domicilio</option>
                                                            <option value="Sala Multimedia">Sala Multimedia</option>
                                                            <option value="Sala Lectura">Sala Lectura</option>
                                                            </select>
                                                            </div>
                                                    {this.state.serviceList.length - 1 === index && (
                                                        <button
                                                        type="button"
                                                        onClick={this.handleServiceAdd}
                                                        className="btn btn-primary btn-sm mt-2 add-btn"
                                                        >
                                                        <span>Agregar</span>
                                                        </button>
                                                    )}
                                                    
                                                    </div>
                                                    <div className="col-2 mb-2 second-division">
                                                    {this.state.serviceList.length !== 1 && (
                                                        <button
                                                        type="button"
                                                        onClick={() => this.handleServiceRemove(index)}
                                                        className="btn btn-outline-danger btn-sm remove-btn"
                                                        >
                                                        <span>Quitar</span>
                                                        </button>
                                                    )}
                                                    </div>
                                                    </div>
                                                </div>
                                                ))}
                            

                            <div className="d-grid d-md-flex justify-content-end pe-5">
                                {loading ? <div></div> : <button type="submit" /*onClick={this.handleClick}*/ className="btn btn-success mb-3 shadow">Generar</button>}
                            </div>
                        </form>
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
            autoHideDuration={2000}
            >
            
            <MuiAlert
                onClose={this.handleClose}
                severity="success"
                elevation={6}
                variant="filled"
            >
                Su préstamo ha sido generado
            </MuiAlert>
        </Snackbar>



        </div>
    )
    }
    }

export default AgregarPrestamo