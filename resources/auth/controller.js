const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

//Login function
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const password = await bcrypt.compare(req.body.password, user.password);

    if (user && password) {
      const payload = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        team: user.team,
        activeTeam: user.activeTeam,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      const options = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60
        ),
        httpOnly: false,
      };

      res.status(200).cookie("token", token, options).json(token);
    } else {
      throw error;
    }
  } catch (error) {
    res.status(400).json("Användare eller lösenord matchar inte");
  }
};

//Logout function
exports.logout = async (_, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
  });
};
