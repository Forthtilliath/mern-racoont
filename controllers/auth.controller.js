import UserModel from '../models/user.model.js';

async function signUp(req, res) {
    const { pseudo, email, password } = req.body;

    try {
        const user = await UserModel.create({ pseudo, email, password })
        res.status(201).json({user:user._id})
    }
    catch (err) {
        res.status(400).send({err})
    }
}

export default { signUp };