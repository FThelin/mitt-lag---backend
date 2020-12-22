const Team = require("./model");

exports.createTeam = async (req, res) => {
  try {
    const { name, city, sport } = req.body;

    // Create team
    const team = await Team.create({
      name,
      city,
      sport,
      leaders: [req.user._id],
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(400).send(error);
  }
};
