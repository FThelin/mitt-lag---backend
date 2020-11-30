const jwt = require('jsonwebtoken')
const User = require('../user/model')

exports.login = async (req, res) => {
    const user = User.findOne({ email: req.body.email })

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json("Wrong email or password");
    }    
  
    const payload = 
    { 
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.json({ token })
}