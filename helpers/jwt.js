const jwt = require('jsonwebtoken');

const generarJWT =  (uid ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '24h',

        }, ( err, token ) => {
            if(err) {
                //no se pudo crear el toker
                reject("No se pudo generar el Token")
            } else {
                //se creo el TOKEN
                resolve( token );
            }
        } )
    });


}
const comprobarJWT = (token = '') => {
    try {
        //validando el JWT
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        return [true, uid];

    } catch (err) {
        return [false, null];
    }

}



module.exports = {
    generarJWT,
    comprobarJWT
}