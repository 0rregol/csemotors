const express = require("express");
const router = new express.Router(); 
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");
router.get("/login", utilities.handleAsyncErrors(accountController.buildLogin));
router.post("/login", utilities.handleAsyncErrors(accountController.buildLogin)); 
router.get("/register", utilities.handleAsyncErrors(accountController.buildRegister)); 
router.post('/register', utilities.handleAsyncErrors(accountController.registerAccount))

module.exports = router;