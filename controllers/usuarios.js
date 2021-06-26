const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet = async(req = request, res = response) => {
    //paginamos resultados
    const { limite = 10, desde = 0 } = req.query; //la paginacion sera de 10 items
    const query = { estado: true };

    //juntamos los await para que se ejecuten al mismo tiempo
    //const resp = await Promise.all([
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query), //total de registros en collection
        Usuario.find(query) //indicamos que solo queremos los que tienen el estado en true
        .skip(Number(desde))
        .limit(Number(limite)) //como limit pide number y esta en string convertimos a number

    ]);


    res.status(200).json({
        ok: true,
        total,
        usuarios
    });
}


const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //validamos si existe en la base de datos
    if (password) {
        //Encriptar el password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        ok: true,
        id,
        usuario
    });

}

/////////////////////////////////////////////////////////////////////////POST POST POST POST POST POST POST POST
const usuariosPost = async(req, res = response) => {


        //const { nombre, edad } = req.body; //con esta constante extraemos solo datos requeridos//
        const { nombre, correo, password, role } = req.body;
        const usuario = new Usuario({ nombre, correo, password, role });

        //Encriptar el password
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //guardar en db
        await usuario.save();

        //

        res.status(200).json({
            ok: true,
            msg: 'Post api - controller',
            //nombre,
            //edad
            usuario
        });

    }
    /////////////////////////////////////////////////////////////////////////POST POST POST POST POST POST POST POST

const usuariosPatch = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Patch api - controller'
    });

}


const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        ok: true,
        usuario
    });

}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}