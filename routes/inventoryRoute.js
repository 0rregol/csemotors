const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/"); 
const invValidate = require("../utilities/validators/inventory-validation");
router.get("/type/:classificationId", utilities.handleAsyncErrors(invController.buildByClassificationId));
router.get("/detail/:invId", utilities.handleAsyncErrors(invController.buildByInventoryId));
router.get("/", utilities.checkAccountType, utilities.handleAsyncErrors(invController.buildManagementView));
router.get("/add-classification", utilities.checkAccountType, utilities.handleAsyncErrors(invController.buildAddClassificationView));
router.get("/add-inventory", utilities.checkAccountType, utilities.handleAsyncErrors(invController.buildAddInventoryView));
router.post("/add-classification", utilities.checkAccountType, invValidate.classificationRules(), invValidate.checkClassificationData, utilities.handleAsyncErrors(invController.addNewClassification));
router.post("/add-inventory", utilities.checkAccountType, invValidate.inventoryRules(), invValidate.checkInventoryData, utilities.handleAsyncErrors(invController.addNewInventory));
router.get("/getInventory/:classification_id", utilities.checkAccountType, utilities.handleAsyncErrors(invController.getInventoryJSON));
router.get("/edit/:inv_id", utilities.checkAccountType, utilities.handleAsyncErrors(invController.buildEditView));
router.post("/update/", utilities.checkAccountType, invValidate.inventoryRules(), invValidate.checkUpdateData, utilities.handleAsyncErrors(invController.updateInventory));
router.get("/delete/:inv_id", utilities.checkAccountType, utilities.handleAsyncErrors(invController.buildDeleteConfirmationView));
router.post("/delete/", utilities.checkAccountType, utilities.handleAsyncErrors(invController.deleteVehicle));

module.exports = router;