# Caso 16: Sistema de Préstamo en Biblioteca Municipal :books: 
La biblioteca de Estación Central (BEC) cuenta con una amplia colección de libros de todos los géneros literarios, además de una gran colección de documentos técnicos, lo que la transforma en un referente para los alumnos de colegios e instituciones de educación superior de la comuna, incluso prefiriéndola a las bibliotecas de sus correspondientes recintos estudiantiles. Desde hace un tiempo, la biblioteca también ha abierto sus puertas a los vecinos de la comuna.
Este recinto, además, cuenta con una extensa colección de multimedia incluyendo películas y documentales en formato de DVD y Blue Ray, además de variados registros auditivos (música, relatos, colección de sonidos, etc.).
Los bibliotecarios se encuentran capacitados para responder casi en la totalidad a las consultas de los usuarios de la biblioteca, por tener amplio conocimiento de la colección presente en las estanterías.

## Autores (Los ChocoLovers) :chocolate_bar:
* Pedro Mérida Álvarez
* Javiera Villarroel Toloza

## Pasos previos
1. Instalar dependencias con npm install
2. Correr codigo con npm start

## Credenciales para el inicio de sesión
Usuario:
* Correo: mclovin@email.com 
* Contraseña: 1

Bibliotecario:
* Correo: peter@bec.cl
* Contraseña: 1

## Consideraciones
Al recargar la pagina, la sesión iniciada (usuario o bibliotecario) se pierde

## Desarrollo
Para el desarrollo de este frontend se utilizo React apoyandose en Bootstrap.
En la carpeta de components se pueden ver los archivos de todas las vistas que se implementaron, tanto para los usuarios que piden los libros, como para los bibliotecarios, donde en muchas de ellas se utilizan mockings y maps para simular los datos del backend que se utilizarán para la integración. En algunas vistas (Principalmente las que tienen botones de confirmación y de aceptar) se implementaron alertas para informar al usuario de los cambios o las confirmaciones que este hace, pero estas no fueron hechas en forma de alerts, si no que se utilizaron snackbars en la parte inferior de la pantalla ya que consideramos que se veia mejor que un modal.

## ¿Cómo funciona?
El usuario puede realizar su solicitud agregando distintos libros al carrito, luego accede al carrito donde puede modificarlo (eliminar libros) y confirmar la solicitud.
El bibliotecario puede acceder a las solicitudes pendientes, donde selecciona aquellas que quiere gestionar y les asigna un ejemplar para luego confirmar.
En préstamos, puede revisar los préstamos vencidos para enviar recordatorio en caso de que sean a domicilio, nuevamente seleccionando aquellos que se quiere enviar recordatorio mediante correo. Además, se puede generar un préstamo agregando los ejemplares y llenando los datos del usuario.
Para devolver un préstamo, solo es necesario ingresar el id del ejemplar.

### Usuario cliente
El usuario (mclovin@email.com) que accede a la página, tiene las siguientes vistas disponibles:
* Inicio
* Catálogo: Aquí puede buscar los libros que desea. Para solicitarlos debe ver los detalles del libro y llenar los datos requeridos para agregar al carrito.
* Carrito: Aquí se pueden ver todos los libros que se han agregado para completar la solicitud.
* ¿Cómo solicitar?: Instrucciones para solicitar un libro
* Mis solicitudes: Las solicitudes que ha hecho el usuario
* Mis préstamos: Los préstamos del usuario
  * Comprobante: En préstamos, puede acceder a ver el comprobante de cada préstamo. 
* Configuración: Modificar telefono, dirección, correo, foto de perfil, etc.
* Cerrar sesión: Cierra la sesión del usuario

### Bibliotecario
* Inicio
* Solicitudes: Aquí accede a ver todas las solicitudes pendientes para asignarles un ejemplar
* Préstamos: Aquí se pueden ver los préstamos vencidos en sala y en domicilio, en estos últimos se da la posibilidad de enviar recordatorio a todos los préstamos seleccionados
  * Generar préstamo: Se puede generar un préstamo agregando todos los ejemplares que se han solicitado para el préstamo junto a otros datos del usuario
  *  Devolver préstamo: Se abre un modal para ingresar los ejemplares para devolver (se muestran solo los que estan en préstamo)
  *  Comprobante: Se puede revisar el comprobante de cada préstamo vencido
* Mis solicitudes: Las solicitudes que ha gestionado el bibliotecaio
* Mis préstamos: Los préstamos que ha gestionado el bibliotecario
  * Comprobante: En préstamos, puede acceder a ver el comprobante de cada préstamo. 
* Configuración: Modificar telefono, dirección, correo, foto de perfil, etc.
* Cerrar sesión: Cierra la sesión del bibliotecario