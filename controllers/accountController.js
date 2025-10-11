
const utilities = require("../utilities/")
const accountModel = require("../models/account-model")

/* ****************************************
* Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
  
    errors: null,
  })
}
/* ****************************************
* Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
    // 👇 Agrega estas líneas para inicializar los valores
    account_firstname: "",
    account_lastname: "",
    account_email: "",
  })
}

/* ****************************************
* Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  // Recoge los datos del formulario del cuerpo de la petición (req.body)
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Llama a la función del modelo para insertar los datos en la base de datos
  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )

  // Verifica el resultado
  if (regResult) {
    // Éxito: Muestra un mensaje flash y redirige a la vista de login
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    // Fallo: Muestra un mensaje flash de error y vuelve a la vista de registro
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}

module.exports = { buildLogin, buildRegister,  registerAccount }