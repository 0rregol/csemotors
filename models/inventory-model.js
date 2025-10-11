const pool = require("../database/") 

async function getClassifications(){
  return await pool.query("SELECT * FROM classification ORDER BY classification_name")
}

async function getInventoryByClassificationId(classification_id){
  try {
    const data = await pool.query(
      "SELECT * FROM inventory AS i " +
      "JOIN classification AS c ON i.classification_id = c.classification_id " +
      "WHERE i.classification_id = $1",
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error: " + error)
  }
}


async function getInventoryByInventoryId(inv_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM inventory AS i " + 
      "JOIN classification AS c ON i.classification_id = c.classification_id " +
      "WHERE inv_id = $1",
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getInventoryByInventoryId error: " + error)
    
    throw new Error("Failed to get vehicle data from model.")
  }
}

/* *****************************
 * Check for existing classification name
 * *************************** */
async function checkExistingClassification(classification_name){
  try {
    const sql = "SELECT * FROM public.classification WHERE classification_name = $1"
    const result = await pool.query(sql, [classification_name])
    return result.rowCount > 0
  } catch (error) {
    console.error("checkExistingClassification error: " + error)
    return false
  }
}

/* *****************************
 * Add new classification to the database
 * *************************** */
async function addClassification(classification_name){
  try {
    const sql = "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return { error: error.message }
  }
}

/* *****************************
 * Add new inventory item to the database
 * *************************** */
async function addInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id){
  try {
    const sql = "INSERT INTO public.inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
  } catch (error) {
    return { error: error.message }
  }
}
module.exports = { 
  getClassifications, 
  getInventoryByClassificationId, 
  getInventoryByInventoryId,
  checkExistingClassification,
  addClassification, 
  addInventory   
}