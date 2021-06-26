const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid }; //grabamos en el jwt el uid del cualquier usuario se puede guardar lo que sea pero es peligroso

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { expiresIn: '9H' }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }

        })

    })

}

module.exports = {
    generarJWT
}