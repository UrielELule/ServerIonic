const Role = require('../models/role');
const Usuario = require('../models/usuario');


const isRoleValido  =  async(role = '') => {
    //si existe
     const existeRol = await Role.findOne({ role });
    // si no existe
    if (!existeRol) {
        throw new Error(`El rol ${role} no existe en el sistema`);
    } 
}


const emailExiste = async(correo =  '') => {
    //verificamos si existe
    const existeCorreo = await Usuario.findOne({ correo });
    //si se llega a repetir el correo
    if( existeCorreo ) {
        throw new Error(`El correo: ${correo} ya existe! prueba con otro`);
    }

}


const usuarioExistePorId = async( id =  '') => {
    //verificamos si existe
    const existeUsuario = await Usuario.findById(id);
    //si no existe el id en la db
    if( !existeUsuario ) {
        throw new Error(`El id no existe! prueba con otro`);
    }

}

module.exports = {
    isRoleValido,
    emailExiste,
    usuarioExistePorId
}