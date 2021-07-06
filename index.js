const express = require('express');

//CORS ES PARA ACEPTAR PETICIONES DE DIFERENTES SITIOS
const cors = require('cors');

//para arreglar angular en node, el tema de las recargas de pagina
//const path = require('path');

//Base de datos creado archivo de configuracion database/config

const { dbConnection } = require('./database/config');


//para que use el archivo .env
require('dotenv').config();

//PARA LAS VARIABLES DE ENTORNO por eso instalamos el dotenv
process.env



// creacion del servidor // aplicacion express

const app = express();



//directorio publico, queremos que busque en la carpeta public
//app.use(express.static('public'));


//cors es otro middleware, se ejecutara secuencial, he bajado la dbconnection()

app.use(cors());

//lectura y parseo del body, otro middleware, va debajo de cors y antes de las rutas, cuidado
//-----es la parte de body/raw/json de postman -----------//

app.use(express.json());

//Conexion a  base de datos, tiene que ir despues de express!!!!
//viene de ser exportada en el config.js
dbConnection();

//Rutas (middleware) que vendran desde el archivo rutaUsuarios
//el use es el middleware, usa el require para importar las rutas
app.use('/api/usuarios', require('./routes/rutaUsuarios'));

app.use('/api/login', require('./routes/rutaAuth'));



//listen, puerto , callback
app.listen(process.env.PORT, () => {

    console.log(` Servidor ok, funcionando en el puerto ${process.env.PORT} `)
});