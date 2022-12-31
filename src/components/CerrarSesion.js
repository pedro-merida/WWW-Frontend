import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import {Link} from 'react-router-dom';
class CerrarSesion extends React.Component {
    state = { expanded: false }
    constructor(props) {
      super(props);

  
      this.handleClick = this.handleClick.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.onTrigger = this.onTrigger.bind(this);
    }

    onTrigger = () => {
        var log = 0;
        this.props.childToParentClose(log);

    };
    handleClose = () => this.setState({ open: false });

    handleClick = () => {
        this.props.childToParentClose();
        this.setState({ open: true })
    };

    render() {
        return(
            <>
                <div className="modal fade" role="dialog" tabIndex="-1" id="cerrar-sesion" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Cerrar sesión</h4><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="card">
                                    <div className="card-body text-center d-flex flex-column align-items-center">
                                        <p>¿Desea cerrar la sesión actual?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-sm btn-light" type="button" data-bs-dismiss="modal">Volver</button>
                                <Link to="/"><button onClick = {this.handleClick} className="btn btn-sm btn-success" type="button" data-bs-dismiss="modal">Confirmar</button></Link>
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
                    autoHideDuration={2000}
                    >
                    
                    <MuiAlert
                        onClose={this.handleClose}
                        severity="success"
                        elevation={6}
                        variant="filled"
                    >
                        Su sesión se ha cerrado exitósamente
                    </MuiAlert>
                </Snackbar>
</>
        )
    }
}
export default CerrarSesion;