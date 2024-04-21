const express = require("express");
const router = express.Router();

const multer = require("multer");
const {
    storage
} = require("../cloudConfig.js");
const upload = multer({storage
}); 

const menuController = require("../controllers/menu.js");

// Define routes for menu functionality
router.get("/", menuController.index);
router.get("/new", menuController.renderNewForm);

router.get("/veg",menuController.veg);
router.get("/nonveg",menuController.nonveg);
router.get("/maharashtrian",menuController.maharashtrian);
router.post("/", upload.single('menu[image]'), menuController.createMenu);
router.get("/:id", menuController.showMenu);
router.put("/:id", upload.single('menu[image]'),menuController.updateMenu);
router.delete("/:id", menuController.destroyMenu);
router.get("/:id/edit", menuController.renderEditForm);


module.exports = router;
