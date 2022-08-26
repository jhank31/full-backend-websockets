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


module.exports = {
    generarJWT
}