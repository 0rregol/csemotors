const utilities = require("..");
const { body, validationResult } = require("express-validator");
const accountModel = require("../../models/account-model")
const validate = {};


validate.loginRules = () => {
  return [
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required."),
    body("account_password")
      .trim()
      .isStrongPassword({ minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
      .withMessage("Password does not meet requirements."),
  ];
};


validate.checkLoginData = async (req, res, next) => {
    const { account_email } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        res.render("account/login", {
            errors,
            title: "Login",
            nav,
            account_email,
        });
        return;
    }
    next();
};
/* **********************************
 * Update Account Data Validation Rules
 * ********************************* */
validate.updateAccountRules = () => {
  return [
    body("account_firstname").trim().notEmpty().withMessage("First name is required."),
    body("account_lastname").trim().notEmpty().withMessage("Last name is required."),
    body("account_email").trim().isEmail().normalizeEmail().withMessage("A valid email is required.")
      .custom(async (account_email, { req }) => {
        const account_id = req.body.account_id
        const account = await accountModel.getAccountByEmail(account_email)
        if (account && account.account_id != account_id) {
          throw new Error("Email exists. Please use a different email.")
        }
      }),
  ]
}

/* **********************************
 * Update Password Validation Rules
 * ********************************* */
validate.updatePasswordRules = () => {
  return [
    // Reutilizamos la misma regla fuerte del registro
    body("account_password")
      .trim()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ]
}

/* ******************************
 * Check Update Data and return errors
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const { account_id, account_firstname, account_lastname, account_email } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/update-account", {
      title: "Update Account Information",
      nav,
      errors,
      account_firstname,
      account_lastname,
      account_email,
      account_id,
    })
    return
  }
  next()
}
module.exports = validate;