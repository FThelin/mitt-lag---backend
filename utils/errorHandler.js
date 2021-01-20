module.exports = {
  errorMessage: function (body) {
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
};
