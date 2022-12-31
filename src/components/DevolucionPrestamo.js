import React from 'react';

import { Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import ejemplares_casa from '../mocking/ejemplares_casa';
import ejemplares_sala_multimedia from '../mocking/ejemplares_sala_multimedia';
import ejemplares_sala_lectura from '../mocking/ejemplares_sala_lectura';
class DevolucionPrestamo extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          serviceList: [{ service: "" }],
          open: false,
        };
    
        this.handleServiceChange = this.handleServiceChange.bind(this);
        this.handleServiceRemove = this.handleServiceRemove.bind(this);
        this.handleServiceAdd = this.handleServiceAdd.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

        
    }

    handleClose = () => this.setState({ open: false });

    handleClick = () => this.setState({ open: true });
    handleServiceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...this.state.serviceList];
        list[index][name] = value;

        this.setState({
            serviceList: list
        })
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
            serviceList: [...this.state.serviceList, { service: "" }]
        })
      };

    render() {
        return(
            <>
                <div className="modal fade" role="dialog" tabIndex="-1" id="devolucion">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Devolver préstamos</h4><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="card">
                                    <div className="card-body d-flex flex-column">
                                        <p class="text-center">Ingrese el número de los ejemplares a devolver</p>

                                        <form className="d-flex flex-column bd-highlight mb-3 justify-content-start">
                                            <div className="form-field">
                                                <label htmlFor="ejemplar" className="fw-bold px-3">Ejemplares</label>
                                                {this.state.serviceList.map((singleService, index) => (
                                                <div key={index} className="container">
                                                    <div className = "row">
                                                        <div className="col-8 first-division">
                                                            <input
                                                                name="ejemplar"
                                                                type="text"
                                                                className="form-control mb-2"
                                                                id="ejemplar"
                                                                list="datalistOptions"
                                                                
                                                                onChange={(e) => this.handleServiceChange(e, index)}
                                                                required
                                                            />
                                                            <datalist id="datalistOptions">
                                                
                                                                {ejemplares_casa.data.getEjemplaresByEstado.map((ejemplar, index) => 
                                                                    <option value={ejemplar.id}/>
                                                                )}

                                                                {ejemplares_sala_multimedia.data.getEjemplaresByEstado.map((ejemplar, index) => 
                                                                    <option value={ejemplar.id}/>
                                                                )}

                                                                {ejemplares_sala_lectura.data.getEjemplaresByEstado.map((ejemplar, index) => 
                                                                    <option value={ejemplar.id}/>
                                                                )}
                                                                
                                                            </datalist>
                                                    
                                                    {this.state.serviceList.length - 1 === index && (
                                                        <button
                                                        type="button"
                                                        onClick={this.handleServiceAdd}
                                                        className="btn btn-primary btn-sm add-btn"
                                                        >
                                                        <span>Agregar</span>
                                                        </button>
                                                    )}
                                                    
                                                    </div>
                                                    <div className="col-2 second-division">
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
                                            </div>
                                            
                                            </form>   
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-sm btn-light shadow" type="button" data-bs-dismiss="modal">Cerrar</button> 
                                <button class="btn btn-sm btn-success shadow" onClick = {this.handleClick}type="submit" data-bs-dismiss="modal">Confirmar</button>
                            </div>
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
                    Préstamos devueltos exitosamente
                </MuiAlert>
            </Snackbar>
            </>
        )
    }
}
export default DevolucionPrestamo;