import React  from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";

class Configuracion extends React.Component{
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
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleClose = this.handleClose.bind(this);
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
                                <h1 className="display-5 fw-bold">Configuracion de cuenta</h1>
                            </div>
                            <section className="h-100 h-custom">
                                <div className="container h-100 p-5">
                                <div className="row d-flex justify-content-left align-items-center h-100">
                                    <div className="col">
                                            <div className="d-flex justify-content-center py-3 border-bottom">
                                            <img  style={{width:"100px", height:"100px"}} className="rounded-circle shadow-4-strong" alt="avatar2" src="https://i.pinimg.com/originals/30/8d/79/308d795c3cac0f8f16610f53df4e1005.jpg"/>
                                                <div className="pl-sm-4 px-3" id="img-section">
                                                    <b>Foto de perfil</b>
                                                    <p>Imagen tipo .png. Tamaño menor a 1MB</p>
                                                    <input class="form-control form-control-sm" type="file" id="formFile"></input>
                                                    {/*<button type="button" className="btn btn-primary border"><b>Subir archivo</b></button>*/}
                                                </div>
                                            </div>
                                            <div className="py-2">
                                                <div className="row py-2">
                                                    <div className="col-md-6">
                                                        <label for="firstname">Nombre</label>
                                                        <input type="text" defaultValue="McLovin" className="bg-light form-control"/>
                                                    </div>
                                                    <div className="col-md-6 pt-md-0 pt-3">
                                                        <label for="lastname">Apellido</label>
                                                        <input type="text" defaultValue="" className="bg-light form-control"/>
                                                    </div>
                                                </div>
                                                <div className="row py-2">
                                                    <div className="col-md-6">
                                                        <label for="email">Email</label>
                                                        <input type="text" defaultValue="McLovin@email.com" className="bg-light form-control"/>
                                                    </div>
                                                    <div className="col-md-6 pt-md-0 pt-3">
                                                        <label for="phone">Numero de telefono</label>
                                                        <input type="text" defaultValue="01-47-87441" className="bg-light form-control"/>
                                                    </div>
                                                </div>
                                                <div className="row py-2">
                                                    <div className="col-md-6">
                                                        <label for="email">RUT</label>
                                                        <input type="text" defaultValue="15.141.312-1" className="bg-light form-control" readOnly/>
                                                    </div>
                                                    <div className="col-md-6 pt-md-0 pt-3">
                                                        <label for="phone">Dirección</label>
                                                        <input type="text" defaultValue="892 Momona St." className="bg-light form-control"/>
                                                    </div>
                                                </div>
                                                <div className="row py-2">
                                                    <div className="col-md-6">
                                                        <label for="email">Contraseña</label>
                                                        <input type="password" defaultValue="McLovin" className="bg-light form-control" onChange={this.handleChange} placeholder="Este campo es obligatorio"/>
                                                    </div>
                                                    <div className="col-md-6 pt-md-0 pt-3">
                                                        <label for="phone">Confirmar contraseña</label>
                                                        <input type="password" className="bg-light form-control" disabled={this.state.disabled}/>
                                                    </div>
                                                </div>
                                                
                                                <div style={{float: "right"}} className="py-3 pb-4 border-bottom">
                                                    <button className="btn btn-primary mr-3" onClick={this.handleClick}>Guardar cambios</button>
                                                    <button className="btn border button">Cancelar</button>
                                                </div>
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
                    Cambios guardados exitosamente
                </MuiAlert>
            </Snackbar>
            </>
        )
    }
}

export default Configuracion