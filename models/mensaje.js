const {Schema, model} = require('mongoose');

const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref : 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref : 'Usuario',
        required: true
    },
    mensaje: {
        type : String,
        required : true
    }
   
   
}, {
    timestamps: true
});
/*de esta manera podemos sobreescribir que es lo que queremos que el post muestre, en este caso no nos intereza que muestre la contraseña ni el __v*/
MensajeSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
})



module.exports = model('Mensaje', MensajeSchema );