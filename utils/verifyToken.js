const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      // Set token from header
      [, token] = req.headers.authorization.split(" ");
    }

    //Add next?
    if (!token) {
        return res.status(401).json("Not authorized");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
    } catch(err) {
        res.status(400).send("invalid token")
    }
}