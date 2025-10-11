// models/account-model.js

// Requerir el archivo de conexión a la base de datos
const pool = require("../database/");

/* *****************************
* Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
  try {
    // La consulta SQL para insertar los datos de la cuenta
    // Se usan placeholders ($1, $2, etc.) por seguridad (sentencia parametrizada)
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    
    // Ejecuta la consulta, esperando (await) la respuesta de la base de datos.
    // 'Client' es el valor por defecto para account_type.
    // RETURNING * devuelve el registro insertado para confirmar el éxito.
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    // Devuelve el mensaje de error si algo falla
    return error.message
  }
}

// Exportar la función para que pueda ser utilizada por el controlador
module.exports = {
  registerAccount,
};