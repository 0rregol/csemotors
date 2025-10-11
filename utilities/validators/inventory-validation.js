// File: utilities/validators/inventory-validation.js

const utilities = require("..")
const { body, validationResult } = require("express-validator")
const invModel = require("../../models/inventory-model")
const validate = {}

/* **********************************
 * Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a classification name.")
      .isAlpha()
      .withMessage("Classification name must contain only alphabetic characters.")
      .custom(async (classification_name) => {
        const classificationExists = await invModel.checkExistingClassification(classification_name)
        if (classificationExists){
          throw new Error("Classification with that name already exists. Please use a different name.")
        }
      }),
  ]
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}
// (Añade esto a utilities/validators/inventory-validation.js)

/* **********************************
 * Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
    return [
        // classification_id is required and must be a valid id
        body("classification_id")
            .trim()
            .isNumeric()
            .withMessage("Please select a valid classification."),

        // inv_make is required and must be a string with min 3 chars
        body("inv_make")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide a make."),

        // inv_model is required and must be a string with min 3 chars
        body("inv_model")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide a model."),

        // inv_description is required and must be a string
        body("inv_description")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a description."),

        // inv_image is required and must be a valid path
        body("inv_image")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide an image path."),

        // inv_thumbnail is required and must be a valid path
        body("inv_thumbnail")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a thumbnail path."),

        // inv_price is required and must be a number
        body("inv_price")
            .trim()
            .isNumeric()
            .withMessage("Price must be a valid number."),

        // inv_year is required and must be a 4-digit year
        body("inv_year")
            .trim()
            .isLength({ min: 4, max: 4 })
            .withMessage("Year must be a 4-digit number.")
            .isNumeric()
            .withMessage("Year must be a valid number."),

        // inv_miles is required and must be a number
        body("inv_miles")
            .trim()
            .isInt({ no_symbols: true })
            .withMessage("Miles must be a whole number using digits only."),

        // inv_color is required and must be a string
        body("inv_color")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a color."),
    ];
};

/* ******************************
 * Check inventory data and return errors or continue
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        let classificationList = await utilities.buildClassificationList(classification_id);
        res.render("inventory/add-inventory", {
            errors,
            title: "Add New Vehicle",
            nav,
            classificationList,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
        });
        return;
    }
    next();
};
module.exports = validate