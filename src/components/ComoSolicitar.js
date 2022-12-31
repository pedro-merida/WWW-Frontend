import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';

class ComoSolicitar extends React.Component{
    componentDidMount() {
        AOS.init();
    }

    render() {

        ;
        return(
            <div>
                <header >
                    <div className="container py- 5">
                        <div className="p-4 p-lg-5 rounded-3 bg-primary-gradient shadow-sm" data-aos="fade-up" data-aos-duration="1000">
                            <div className="text-left">
                                <Link to="/"><button type="button" className="btn btn-sm btn-primary px-3 mb-3 shadow"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>Volver</button></Link>
                            </div>
                            <div className="m-4 m-lg-5 text-center">
                                <h1 className="display-5 fw-bold">¿Cómo puedo solicitar un libro?</h1>
                                <p className="fs-4">Aquí aprenderas los detalles y los pasos para poder solicitar los libros disponibles en nuestra biblioteca</p>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="pt-4">
                    <div className="container px-lg-5" data-aos="fade-up" data-aos-duration="1000">
                        <div className="row gx-lg-5">
                            <div className="col-lg-6 col-xxl-4 mb-5">
                                <div className="card bg-primary-gradient border-0 h-100 shadow">
                                    <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-5">
                                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-file-person"></i></div>
                                        <h2 className="fs-4 fw-bold">Crear una cuenta de usuario</h2>
                                        <p className="mb-0">Para conseguir una cuenta, debes acercarte al mesón de la biblioteca, con el fin de que el bibliotecario llene tu ficha.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xxl-4 mb-5">
                                <div className="card bg-primary-gradient border-0 h-100 shadow">
                                    <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-5 ">
                                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-envelope"></i></div>
                                        <h2 className="fs-4 fw-bold">Activar cuenta de usuario</h2>
                                        <p className="mb-0">Una vez que el bibliotecario llene tu ficha, te llegará un correo para activar tu cuenta.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xxl-4 mb-5">
                                <div className="card bg-primary-gradient border-0 h-100 shadow">
                                    <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-5 ">
                                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-box-arrow-in-right"></i></div>
                                        <h2 className="fs-4 fw-bold">Acceder a tu cuenta</h2>
                                        <p className="mb-0">Puedes ver el catálogo con o sin cuenta, pero para solicitar nuestros libros necesitas estar autenticado.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xxl-4 mb-5">
                                <div className="card bg-primary-gradient border-0 h-100 shadow">
                                    <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-5 ">
                                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-bag-plus-fill"></i></div>
                                        <h2 className="fs-4 fw-bold">Agregar libros al carro</h2>
                                        <p className="mb-0">Al realizar tus búsquedas en el catálogo, podrás agregar todos los libros que desees solicitar.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xxl-4 mb-5">
                                <div className="card bg-primary-gradient border-0 h-100 shadow">
                                    <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-5 ">
                                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-list-check"></i></div>
                                        <h2 className="fs-4 fw-bold">Realizar solicitud</h2>
                                        <p className="mb-0">Una vez tengas tu carro listo, puedes seleccionar si tus ejemplares son para domicilio o en sala, para luego confirmar la solicitud.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xxl-4 mb-5">
                                <div className="card bg-primary-gradient border-0 h-100 shadow">
                                    <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-5 ">
                                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-book"></i></div>
                                        <h2 className="fs-4 fw-bold">Conseguir préstamo</h2>
                                        <p className="mb-0">Para ir a buscar tus libros, debes esperar a que el bibliotecario acepte tu solicitud. Una vez aceptada, debes acercarte al mesón para recibir los libros y el comprobante de préstamo.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card bg-primary-gradient border-0 h-100 shadow">
                                <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-5 ">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-clipboard2-check"></i></div>
                                    <h2 className="fs-4 fw-bold">¡Listo!</h2>
                                    <p className="mb-0">Ya hecho el préstamo, solo queda disfrutar de tus libros y entregarlos antes de la fecha límite</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ComoSolicitar