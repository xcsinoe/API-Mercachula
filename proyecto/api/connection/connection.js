const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_CLOUD_KEY,
    api_secret: process.env.API_SECRET_CLOUD
});

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log("Conectado");
}).catch((err) => {
    console.log("Error en la conexion");
})

const connect = mongoose.connection
module.exports = {
    connect,
    cloudinary
};
