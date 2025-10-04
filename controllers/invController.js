const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}
invCont.buildByInventoryId = async function (req, res, next) {
  try {
    const invId = req.params.invId;
    const data = await invModel.getInventoryByInventoryId(invId);

    if (!data) {
     
      throw new Error("Sorry, no vehicle details could be found.");
    }
    
   
    const detailHTML = await utilities.buildVehicleDetail(data); 
    
    
    let nav = await utilities.getNav();
    
  
    const pageTitle = `${data.inv_year} ${data.inv_make} ${data.inv_model} Details`;

    
    res.render("inventory/vehicle-detail", {
      title: pageTitle,
      nav,
      detailDisplay: detailHTML, 
      messages: res.locals.messages,
    });

  } catch (error) {
    console.error("Error in buildByInventoryId:", error.message);
   
    error.status = 404; 
    next(error); 
  }
};

module.exports = invCont;