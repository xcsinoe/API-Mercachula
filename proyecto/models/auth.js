const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    CorreoElectronico : {
        type: String,
        required: true,
        unique: true
    },
    Contrasenia: {
        type: String,
        required: true
    },
    user : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Auth', authSchema);
