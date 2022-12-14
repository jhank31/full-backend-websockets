const { response } = require("express");

const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");


const createUser = async (req, res = response) => {

    const {email, password} = req.body;
    
    try {

        const existeEmail = await Usuario.findOne({ email});
        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const  usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        await usuario.save();

        // Generar mi JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con al admin'
        })
    }
   
    
}

// login
const login = async ( req, res = response) => {
    
    const { email, password } = req.body;


    try {

        const usuario = await Usuario.findOne({email});
        if( !usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email  no encontrado'
            });
        } 

        //validar el password

        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'la contraseña no es valida'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (err) {
        console.log(err)
        return res.status(500).json ({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

const renewToken = async ( req, res = response ) => {

    const uid = req.uid;

    const token = await generarJWT( uid );

    const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        usuario,
        token
    });


}


module.exports = {
    createUser,
    login,
    renewToken
};