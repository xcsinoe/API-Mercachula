const Auth = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();


class AuthServices {

    constructor() {};

    async getAuth(email) {
        return Auth.findOne({ CorreoElectronico : email });
    }

    //Alert callback Hell
    async login(auth_data) {
        const { CorreoElectronico, Contrasenia } = auth_data;

        if (CorreoElectronico &&  Contrasenia) {
            const user = await this.getAuth(CorreoElectronico);

            if (user) {

                if (bcrypt.compareSync(Contrasenia, user["Contrasenia"])) {
                    return [
                        {
                            token: jwt.sign(
                                {user_id: user["user"]},
                                process.env.SECRET_KEY,
                                { expiresIn: process.env.EXPIRE_TIME}
                            )
                        }, 200
                    ];
                }
                else {
                    return [{message: "Contraseña incorrecta"}, 401]
                }
            }
            else {
                return [{message: "El usuario no existe"}, 404]
            }
        }
        else {
            return [{message: "No mandaste las credenciales de autenticación"}, 403]
        }
    }
}

module.exports = AuthServices;
