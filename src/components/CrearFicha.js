import React, { useRef }  from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import emailjs from '@emailjs/browser';
import { useCookies } from "react-cookie";
import {useLazyQuery, useQuery, useMutation, gql} from '@apollo/client';

const ADD_USUARIO = gql `mutation AddUsuario($input: UsuarioInput) {
    addUsuario(input: $input) {
      id
    }
  }`

export const CrearFicha = () => {

    const form = useRef();

    const [addUsuario, {loading: loading_add, error: error_add, data: data_add}] = useMutation(ADD_USUARIO);
  
    const sendEmail = (datos) => {
        console.log(datos);
      emailjs.send('service_t756lik', 'template_vqyke7f', datos, 'ZSAb3XgGnbWvnxOz4')
    };

    return <CrearFichaComponents addUsuario={addUsuario} form={form} sendEmail={sendEmail} loading_add={loading_add} error_add={error_add} data_add={data_add} ></CrearFichaComponents>
};

class CrearFichaComponents extends React.Component{
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
        disabled: true,
        data: this.props.data_add
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }

    enviarMail = async (e) => {
        //colocar lo del alert
        e.preventDefault();

        this.setState({ open: true });

        var huella = await e.target.user_huella.value.slice(1,-1).split(', ');
        for (var i in huella){
            huella[i] = (huella[i] === 'true');
        }

        await this.props.addUsuario({variables: {
            input: {
                apellido: await e.target.user_apellido.value,
                correo: await e.target.user_email.value,
                direccion: await e.target.user_direccion.value,
                huella: huella,
                nombre: await e.target.user_nombre.value,
                rut: await e.target.user_rut.value,
                telefono: parseInt(e.target.user_telefono.value)
            }
        }})

        await this.state.data;
        var datos = {user_email: e.target.user_email.value, id: await this.state.data.addUsuario.id}

        
        this.props.sendEmail(datos);
    }
    handleChange = (e) => {
        const value = e.target.value;

        if (value==="") {
            this.setState({
                disabled: true})
        } else {
            this.setState({
                disabled: false})
        }
    }
    handleOpen = () => this.setState({ open: true });

    handleClose = () => this.setState({ open: false });

    handleClick = () => this.setState({ open: true });

    render() {
        const { open } = this.state;
        return(
            <>
                <div>
                    <div className="container py-0">
                        <div className="p-2 p-lg-3 rounded-3 bg-primary-gradient shadow-sm" data-aos="fade-up" data-aos-duration="1000">
                          <div className="text-left">
                            <Link to="/"><button type="button" className="btn btn-sm btn-primary px-3 mb-3 shadow"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            </svg>Volver</button></Link>
                          </div>
                            <div className="m-4 m-lg-5 text-center">
                                <h1 className="display-5 fw-bold">Crear ficha de usuario</h1>
                            </div>
                            <section className="h-100 h-custom">
                                <div className="container h-100 p-5">
                                <div className="row d-flex justify-content-left align-items-center h-100">
                                    <div className="col">
                                            <div className="py-2">
                                                <form ref={this.props.form} onSubmit={this.enviarMail}>
                                                    <div className="row py-2">
                                                        <div className="col-md-6">
                                                            <label for="firstname">Nombre</label>
                                                            <input type="text" defaultValue="" className="bg-light form-control" name = "user_nombre"/>
                                                        </div>
                                                        <div className="col-md-6 pt-md-0 pt-3">
                                                            <label for="lastname">Apellido</label>
                                                            <input type="text" defaultValue="" className="bg-light form-control" name = "user_apellido"/>
                                                        </div>
                                                    </div>
                                                    <div className="row py-2">
                                                        <div className="col-md-6">
                                                            <label for="email">Email</label>
                                                            <input type="text" defaultValue="" className="bg-light form-control" name = "user_email"/>
                                                        </div>
                                                        <div className="col-md-6 pt-md-0 pt-3">
                                                            <label for="phone">Numero de telefono</label>
                                                            <input type="text" defaultValue="" className="bg-light form-control" name = "user_telefono"/>
                                                        </div>
                                                    </div>
                                                    <div className="row py-2">
                                                        <div className="col-md-6">
                                                            <label for="rut">RUT</label>
                                                            <input type="text" defaultValue="" className="bg-light form-control" name = "user_rut"/>
                                                        </div>
                                                        <div className="col-md-6 pt-md-0 pt-3">
                                                            <label for="direccion">Dirección</label>
                                                            <input type="text" defaultValue="" className="bg-light form-control" name = "user_direccion"/>
                                                        </div>
                                                    </div>
                                                    <div className="row py-2">
                                                        <div className="col-md-6">
                                                            <label for="huella">Huella digital</label>
                                                            <input type="text" defaultValue="" className="bg-light form-control" name = "user_huella"/>
                                                        </div>
                                                    </div>
                                                    
                                                    <div style={{float: "right"}} className="py-3 pb-4 border-bottom">
                                                        <button className="btn btn-primary mr-3" type ="submit">Crear ficha</button>
                                                        <button className="btn border button">Cancelar</button>
                                                    </div>
                                                </form>
                                            </div>

                                    </div>
                                </div>
                                </div>
                            </section>
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
                    Correo de confirmacion enviado
                </MuiAlert>
            </Snackbar>
            </>
        )
    }
}

export default CrearFicha