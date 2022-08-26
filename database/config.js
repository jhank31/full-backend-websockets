const mongoose = require('mongoose');


const dbConnection = async() => {


    try{
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB online')
    } catch (error) {
        console.log(error);
        throw new Error('error en la base de datos - hable con el admin')
    }


}

module.exports = {
    dbConnection
}