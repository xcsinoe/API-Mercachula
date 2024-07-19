const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Nombres: {
        type: String,
        required: true
    },
    Apellidos: {
        type: String,
        required: true
    },
    NumeroCelular: {
        type: String,
        maxLength: 10,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);
