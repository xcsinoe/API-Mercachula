const UserServices = require("../../services/userServices");


const user = new UserServices();

exports.createUser = async (req, res) => {
    try {
        await user.createUser(req.body);
        
        res.status(201).json({
            message: "Added user",
            data: req.body
        });
        
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

exports.getUser = async (req, res) => {
    try {
        res.status(200).json(await user.getUser(req.id));

    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

exports.updateUser = async (req, res) => {
    try {
        await user.updateUser(req.id, req.body);

        res.status(202).json({
            message: "Updated user",
            data: req.body
        });

    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await user.deleteUser(req.id);
        res.status(204).end();

    } catch(err) {
        res.status(500).json({message: err.message});
    }
}
