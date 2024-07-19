const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.hasToken = async (req, res, next) => {

    try {
        if (req.query.token) {
            const token = jwt.verify(req.query.token, process.env.SECRET_KEY);

            if (token) {
                req.id = token.user_id;
                next();
            }
            else {
                res.status(404).json({message: "No hay usuario"});
            }
        }
        else {
            res.status(401).json({message: "No me estás mandando el token"});
        }

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}
