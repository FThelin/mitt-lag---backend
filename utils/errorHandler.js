exports.errorMessage = function () {
  const errorObject = {};
  if (err.name === "ValidationError") {
    Object.values(err.errors).forEach((val) => {
      errorObject[val.path] = val.kind;
    });
    return errorObject;
  }
};
