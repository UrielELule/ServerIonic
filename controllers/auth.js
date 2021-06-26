const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, resp = response) => {

    const { correo, password } = req.body;

    try {

        //veridicamos si el email existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return resp.status(400).json({
                msg: 'Usuario / Password No son los correctos'
            });
        }

        //verificar si el user esta activo en la d b
        if (!usuario.estado) {
            return resp.status(400).json({
                msg: 'Usuario dado de baja'
            });
        }

        //verificar el password

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        //si no es validad
        if (!validPassword) {
            return resp.status(400).json({
                msg: 'Error en tus contraseñas'
            });
        }

        //generar el JWT

        const token = await generarJWT(usuario.id);

        resp.json({
            ok: true,
            token,
            usuario
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Busque al administrador'
        });
    }


}


module.exports = {
    login
}