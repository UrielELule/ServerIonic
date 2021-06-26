const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuarioPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //conexion a bd 
        this.conectardb();

        //middlewares
        this.middlewares();

        //rutas aplicacion
        this.routes();
    }

    middlewares() {

        //cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuarioPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server run in port', this.port)
        });
    }

    async conectardb() {
        await dbConnection();
    }

}

module.exports = Server;