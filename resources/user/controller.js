const bcrypt = require("bcrypt");
const User = require("./model");

//Register new user
exports.register = async (req, res) => {
    const { firstname, lastname, email, role } = req.body

    const password = await bcrypt.hash(req.body.password, 10);

    // Create user
    const user = await User.create({
        firstname,
        lastname,
        email,
        role,
        password
    })

    res.status(201).json(user)
}

exports.getAllUsers = async (req, res) => {
    const users = await User.find()

    if (!users) {
        res.status(400).json("No users found")
    }

    res.status(200).json(users)
}