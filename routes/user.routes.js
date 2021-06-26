const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { isRoleValido, emailExiste, usuarioExistePorId } = require('../helpers/db-validators');
/*
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validar-campos');
*/
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares/index');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
        check('id', 'No es un usuario valido').isMongoId(), //validamos que el id sea un idvalido de mongo
        check('id').custom(usuarioExistePorId), //verificamos que exista el id en la base de datos
        check('role').custom(isRoleValido), //verificamos que sea un role valido
        validarCampos,
    ],
    usuariosPut,
);

router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(), /// CON NOT negamos para indicar quue no tiene que estar vacio
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        check('password', 'El password es obligatorio y con 6 digitos').isLength({ min: 6, max: 15 }),
        check('role').custom(isRoleValido),
        validarCampos
    ],
    usuariosPost
    //check('role', 'No es un rol Permitido').isIn(['ADMIN_ROLE', 'DESPACHADOR_ROLE', 'OPERADOR_ROLE', 'OPERACIONES_ROLE']), //VALIDAR ROLE EN DURO POR DEFECTO
);

router.patch('/', usuariosPatch);

router.delete('/:id', [
        validarJWT,
        //esAdminRole, ESTE MIDDLEWARE INDICA QUE SOLO ADMINS PUEDEN HACER MOVIMIENTOS
        tieneRole('ADMIN_ROLE', 'OPERACION_ROLE'), //indicamos quien puede hacer esta opcion 
        check('id', 'No es un ID valido').isMongoId(), ///id valido de mongodb
        check('id').custom(usuarioExistePorId), //existe en la bd 
        validarCampos
    ],
    usuariosDelete);

module.exports = router;