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


module.exports = { 
  getClassifications, 
  getInventoryByClassificationId, 
  getInventoryByInventoryId      
}