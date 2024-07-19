const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commerceSchema = new Schema({
    user_ID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    tipo: {
        type: String,
        enum: ["Restaurante", "Hotel"],
        required: true
    },
    NombreComercio: {
        type: String,
        required: true
    },
    Descripcion: {
        type: String,
        required: true
    },
    LinkUbicacion: {
        type: String,
        required: true
    },
    NumeroContacto: {
        type: String,
        maxLength: 10,
        required: true
    },
    image: {
        type: Object,
        required: true
    }
}, {
    versionKey: false
})

module.exports = mongoose.model("Commerce", commerceSchema);
