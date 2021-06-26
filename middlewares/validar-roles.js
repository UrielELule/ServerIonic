const { response } = require("express")


const esAdminRole = async(req, resp = response, next) => {

    if (!req.usuario) {
        return resp.status(500).json({
            msg: 'Se desea validar el role sin pasar por el token primero'
        });
    }

    const { role, nombre } = req.usuario;

    if (role !== 'ADMIN_ROLE') {
        return resp.status(401).json({
            msg: `${nombre} no es un administrador`
        });
    }

    next();

}


const tieneRole = (...roles) => {

    return (req, resp = response, next) => {

        if (!req.usuario) {
            return resp.status(500).json({
                msg: 'Se desea validar el role sin pasar por el token primero'
            });
        }
        //si no esta incluido ahi el rol no hace nada
        if (!roles.includes(roles, req.usuario.role)) {
            return resp.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        console.log(roles, req.usuario.role);

        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}