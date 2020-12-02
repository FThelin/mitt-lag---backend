const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../user/model')

exports.login = async (req, res) => {
    
    const user = await User.findOne({ email: req.body.email })

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json("Wrong email or password");
    }    
    
    const payload = { 
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60),
        httpOnly: false,
    };

    res.status(200).cookie("token", token, options).json(token);   
}