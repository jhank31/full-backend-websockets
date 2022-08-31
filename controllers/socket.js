const Usuario = require('../models/user');
const Mensaje = require('../models/mensaje')

const usuarioConectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;

    await usuario.save();
    return usuario;
}
const usuarioDesconectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    usuario.online = false;

    await usuario.save();
    return usuario;
}

const grabarMensaje = async (payload ) => {
    /*
    {
        de: '',
        para:'',
        texto: ''
    }
    */


    try{
        const mensaje = Mensaje(payload);
        await mensaje.save();
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}