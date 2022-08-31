
/*
 path:/api1/mensajes
*/


const  { Router } = require('express');
const { obtenerChat } = require('../controllers/mensajes');


const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();




router.get('/:de', validarJWT , obtenerChat )






module.exports = router;

