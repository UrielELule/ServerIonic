const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async(req = request, resp = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        //validacion
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid); //leemos el usuario que esta solicitando

        //

        if (!usuario) { //si se elimina de la db el documento no se hace nada
            return resp.status(401).json({
                msg: 'Token no valido - usuario no existe el db'
            });
        }

        //validamos si un usuario esta eliminado no vulva hacer registros ala db
        if (!usuario.estado) {
            return resp.status(401).json({
                msg: 'Token no valido - previamente eliminado'
            });
        }

        req.usuario = usuario; //sobrescribimos la request
        next(); //para que continue con lo que sigue

    } catch (error) {
        console.log(error);
        resp.status(401).json({
            msg: 'Token no valido'
        })
    }


    console.log(token);
}

module.exports = {
    validarJWT
}