const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    //si hay errores
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors
        });
    }

    //si llega aca pasamo al siguiente middleware o en su caso controllador
    next();

}

module.exports = {
    validarCampos
}