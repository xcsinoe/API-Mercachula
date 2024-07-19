const AuthServices = require("../../services/authServices");

const auth = new AuthServices();

exports.login = async (req, res) => {
    try {
        const auth_data = await auth.login(req.body);
        res.status(auth_data[1]).json(auth_data[0]);

    } catch(err) {
        res.status(500).json({message: err.message});
    }
}
