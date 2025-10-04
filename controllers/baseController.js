const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

baseController.throwError = async function (req, res, next) {
  const error = new Error("Intentionally triggered error from baseController.js");
  error.status = 500;
  next(error); 
}


baseController.throwError = async function (req, res, next) {
 
  const error = new Error("Intentionally triggered error from the footer link.");
  error.status = 500;
  next(error); 
}
module.exports = baseController