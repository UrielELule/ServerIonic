const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Campo Obligatorio'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'OPERADOR_ROLE', 'OPERACION_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: String,
        default: false
    },

});


//METODOS
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject(); //sacamos la version y el password e unificamos los sobrantes en usuario para evitar verlos en las peticiones
    usuario.uid = _id; //asi cambiamos el nombre de dato de la peticion
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);