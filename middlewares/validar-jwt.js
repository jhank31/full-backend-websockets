const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //Leer el token
    const token = req.header('x-token');


    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion'
        });
    }
    

    try {
        //validando el JWT
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;



        next();
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
    }

}


module.exports = {
    validarJWT
}