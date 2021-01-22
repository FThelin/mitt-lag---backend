module.exports = {
  errorMessageRegister: function (body) {
    const { firstname, lastname, password, email } = body;
    let errorMsg = "";

    if (firstname.length < 2) {
      errorMsg = "Förnamn saknas";
    } else if (lastname.length < 2) {
      errorMsg = "Efternamn saknas";
    } else if (email.length < 3) {
      errorMsg = "email saknas exempel@exempel.se";
    } else if (password.length < 6) {
      errorMsg = "Lösenord för kort";
    }
    return errorMsg;
  },
  errorMessageCreateGame: function (body) {
    const { opponent, date } = body;
    let errorMsg = "";

    if (opponent.length < 1) {
      errorMsg = "Motståndare saknas";
    } else if (date.length < 1) {
      errorMsg = "Datum saknas";
    }
    return errorMsg;
  },
  errorMessageCreateTeam: function (body) {
    const { name, city, sport } = body;
    let errorMsg = "";

    if (name.length < 1) {
      errorMsg = "Lagnamn saknas";
    } else if (city.length < 1) {
      errorMsg = "Stad saknas";
    } else if (sport.length < 1) {
      errorMsg = "Sport saknas";
    }
    return errorMsg;
  },
};
