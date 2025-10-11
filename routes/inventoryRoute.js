
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/validators/inventory-validation")

router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.buildByInventoryId);
router.get("/", utilities.handleAsyncErrors(invController.buildManagementView));
router.get("/add-inventory", utilities.handleAsyncErrors(invController.buildAddInventoryView));
router.get("/add-classification", utilities.handleAsyncErrors(invController.buildAddClassificationView));
router.post("/add-classification", invValidate.classificationRules(),invValidate.checkClassificationData,utilities.handleAsyncErrors(invController.addNewClassification));
router.post("/add-inventory", invValidate.inventoryRules(), invValidate.checkInventoryData, utilities.handleAsyncErrors(invController.addNewInventory));
module.exports = router;