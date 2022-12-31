import React from 'react';
import {useLazyQuery, gql} from '@apollo/client';
import Modal from 'react-bootstrap/Modal';
import { withCookies, Cookies } from "react-cookie";

const VALIDACION_USUARIO = gql`query ValidacionUsuario($correo: String, $contrasenia: String) {
    ValidacionUsuario(correo: $correo, contrasenia: $contrasenia) {
      mensaje
      usuario
      bibliotecario
      validacion
      id
    }
  }`;

export default function Login(props){
    const [validarUsuario, { loading, error, data }] = useLazyQuery(VALIDACION_USUARIO, {
        onCompleted: someData => {
            console.log(someData);
            props.childToParent(someData.ValidacionUsuario);
        }
    });
    /*if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    
    if(data && !enviado){
        enviado = true;
        props.childToParent(data.ValidacionUsuario);
    }*/
    //console.log(data);
    return (
        <LoginComponent hookFunction={validarUsuario} closeModal = {props.closeModal} show={props.show} data={data}></LoginComponent>
    )
}

class LoginComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onTrigger = this.onTrigger.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    };

    /*handleChange = (e) => {
        this.setState({
            email: e.target.email.value,
            password: e.target.password.value
        });
    }*/

    onTrigger = (e) => {
        e.preventDefault();

        this.props.hookFunction({variables: {correo: e.target.email.value, contrasenia: e.target.password.value}});
        console.log(this.props.data);
        var resultados = this.props.data.ValidacionUsuario;

        if (resultados.usuario && resultados.validacion){
            this.props.closeModal()
        } 
        else if(resultados.bibliotecario && resultados.validacion){
            this.props.closeModal()
        }
    };

    handleSubmit = (event) => {
        this.setState({
            email: event.target.email.value,
            password: event.target.password.value
        })

        event.preventDefault();
    }

    render() {
        const hookFunction = this.props.hookFunction;
        const data = this.props.data;

        return(
            <>
                <Modal show={this.props.show} onHide={this.props.closeModal} role="dialog" tabIndex="-1" id="modal-1">
                    
                        {/*<div className="modal-content">*/}
                            <Modal.Header closeButton>
                                <Modal.Title>Iniciar sesión</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="card">
                                    <div className="card-body text-center d-flex flex-column align-items-center">
                                        <div className="bs-icon-xl bs-icon-circle bs-icon-primary shadow bs-icon my-4"><i class="bi bi-person"></i>
                                        </div>
                                        <form method="post" onSubmit={(e) => {e.preventDefault(); hookFunction({variables: {correo: e.target.email.value, contrasenia: e.target.password.value}}); }}>
                                            <div className="mb-3"><input class="form-control" type="email" name="email" placeholder="Correo"/></div>
                                            <div className="mb-3"><input class="form-control" type="password" name="password" placeholder="Contraseña"/></div>
                                            <div className="mb-3"><button class="btn btn-primary shadow d-block w-100" type="submit">Iniciar sesión</button></div>
                                        </form>

                                        {data ? <div class="alert alert-danger" role="alert">{(String(data.ValidacionUsuario.mensaje))}</div>:""}
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer><button className="btn btn-light" type="button" onClick={this.props.closeModal}>Cerrar</button></Modal.Footer>
                        {/*</div>*/}
                    
                </Modal>
            </>
        )
    }
}
//export default Login;