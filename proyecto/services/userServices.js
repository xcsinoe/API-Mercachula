const User = require("../models/user");
const Auth = require("../models/auth");
const Commerce = require("../models/commerce");
const bcrypt = require("bcrypt");
const { connect, cloudinary} = require("../api/connection/connection");
const mongoose = require("mongoose");


class UserServices {

    constructor () {}

    async deleteImage(images) {
        if (images) {
            await cloudinary.api.delete_resources(images, { type: 'upload', resource_type: 'image' });
        }
    }

    async createUser(user_data) {
        const { Nombres, Apellidos, NumeroCelular, CorreoElectronico, Contrasenia } = user_data;
        const session = await connect.startSession();
        const passwordHashed = await bcrypt.hash(Contrasenia, 10);
        let output_data;

        await session.withTransaction(async () => {
            
            await User.create([
                {
                    Nombres: Nombres,
                    Apellidos: Apellidos,
                    NumeroCelular: NumeroCelular
                }
            
            ], { session })
            .then((user) => {
                output_data = user;
            });

            await Auth.create([
                {
                    CorreoElectronico: CorreoElectronico,
                    Contrasenia: passwordHashed,
                    user: output_data[0]["_id"]
                }
            ], { session });
        });
        await session.endSession();
    }

    async updateUser(id, data) {
        await User.findByIdAndUpdate(id,
            { $set: data },
            { runValidators: true }
        );
    }

    async getUser(id) {
        return User.findById(id);
    }

    async deleteUser(id) {
        const session = await connect.startSession();
        const array_urls = await Commerce.aggregate([
            {
                $match: {user_ID: new mongoose.Types.ObjectId(id)}
            },
            {
                $project: {
                    "Ids": "$image.id"
                }
            },
            {
                $unwind: "$Ids"
            },
            {
                $group: {
                    _id: null,
                    Ids: {$addToSet: "$Ids"}
                }
            },
            {
                $project: {
                    _id: 0,
                    Ids: 1
                }
            }
        ]);

        await session.withTransaction(async () => {
            await Promise.all([
                Auth.deleteOne({ user: id }, { session }),
                User.deleteOne({ _id: id }, { session }),
                Commerce.deleteMany({user_ID: id}, { session })
            ]);
        })
            .then(async () => {
                await this.deleteImage(array_urls[0]["Ids"]);
            });
            
        await session.endSession();
    }
}

module.exports = UserServices;
