const comprobante = {
    "data": {
      "getComprobante": {
        "id": "63367bd6b540cb5c4042614c",
        "fecha_prestamo": "2022-09-30T05:18:00.000Z",
        "usuario": {
          "rut": "1234567-8",
          "nombre": "ERNESTO EDUARDO",
          "apellido": "VIVANCO TAPIA",
          "direccion": "Vicuña Mackenna 3939, San Joaquín, Región Metropolitana",
        "telefono": 912345678,
        "correo": "eduardo.vivanco@gmail.com"
        },
        "bibliotecario": {
          "rut": "19867550-4",
          "nombre": "PEDRO DANTE",
          "apellido": "MÉRIDA ÁLVAREZ"
        },
        "prestamos": [
          {
            "id": "63367cc98a88db85a87d20d1",
            "fecha_devolucion": "2022-10-15T05:18:00.000Z",
            "fecha_devol_real": "2022-10-16T05:03:25.857Z",
            "lugar": "Casa",
            "ejemplar": {
              "id": "633671542436056ff7585878",
              "libro": {
                "titulo": "PRINCIPITO, EL",
                "autor": "DE SAINT-EXUPERY, ANTOINE",
                "tipo": "Libro"
              }
            }
          }
        ]
      }
    }
  }

export default comprobante;