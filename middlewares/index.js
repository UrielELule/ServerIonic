const ValidaCampos = require('../middlewares/validar-jwt');
const validarJWT = require('../middlewares/validar-roles');
const validaRoles = require('../middlewares/validar-campos');

module.exports = {
    ...ValidaCampos,
    ...validarJWT,
    ...validaRoles
}