import React from 'react';
import libreria from '../images/Libreria.jpg';
import meson from '../images/meson2.jpg';
import background from '../images/blob.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';

export default class Inicio extends React.Component {
    componentDidMount() {
        AOS.init();
    }
  render() {
    return (
        <header className="bg-primary-gradient">
        <div className="container py-5">
            <div className="row py-5" data-aos="fade-up" data-aos-duration="1000">
                <div className="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-end mb-4">
                    <div style={{maxWidth: '450px'}}>
                        <h1 className="display-5 fw-bold">CATÁLOGO</h1>
                        <p className="my-3">En la biblioteca de Estación Central tenemos una gran variedad de libros disponibles, los cuales puedes solicitar a domicilio o en sala.</p>
                        <div className="justify-content-center align-items-center align-content-center align-self-center">
                            <Link to="/catalogo"><button className="btn btn-primary text-center shadow d-flex justify-content-center align-items-center" type="button">Ir</button></Link></div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="p-5 mx-lg-5" style={{backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize:"contain", backgroundPosition: "center"}}><img className="rounded img-fluid shadow w-100 fit-cover" style={{minHeight: '300px'}} src={libreria} width={354} height={585}/></div>
                </div>
            </div>

            <div className="row py-5" data-aos="fade-up" data-aos-duration="700">
                <div className="col-md-6 mb-4">
                    <div className="p-5 mx-lg-5" style={{backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize:"contain", backgroundPosition: "center"}}><img className="rounded img-fluid shadow w-100 fit-cover" style={{minHeight: '300px'}} src={meson} width={354} height={585}/></div>
                </div>
                <div className="col-md-6 col-xl-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-end mb-4">
                    <div style={{maxWidth: '450px'}}>
                        <h1 className="display-5 fw-bold">¿CÓMO SOLICITAR?</h1>
                        <p className="my-3">Debes acceder con tu cuenta de usuario, la cual puedes pedir directamente en el mesón y debes activar con un link enviado a tu correo electrónico.<br/>Al ingresar con tu cuenta, podrás comenzar a agregar libros desde el catálogo.</p>
                        <div className="justify-content-between align-items-center"><Link to="/como-solicitar"><button className="btn btn-primary shadow justify-content-center align-items-center" type="button">Más información</button></Link></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    )
  }
}


