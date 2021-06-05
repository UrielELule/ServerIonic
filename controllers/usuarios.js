const { response } = require('express');


const usuariosGet = (req, res = response) => {

    const { q, nombre, apikey } = req.query;

    res.status(200).json({
        ok: true,
        msg: 'get Api',
        q,
        nombre,
        apikey
    });
}


const usuariosPut = ( req, res = response) => {

    const id = req.params.id;

    res.status(200).json({
        ok: true,
        msg: 'Put Api - controller',
        id
    });

}


const usuariosPost = ( req, res = response ) => {

    const { nombre, edad } = req.body;

    res.status(200).json({
        ok: true,
        msg: 'Post api - controller',
        nombre,
        edad
    });

}

const usuariosPatch = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
        msg: 'Patch api - controller'
    });

}


const usuariosDelete = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
        msg: 'Delete api - controller'
    });

}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}