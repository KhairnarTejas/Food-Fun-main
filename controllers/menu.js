const menu = require("../models/menu");
const mongoose = require("mongoose");


// Display a list of all menus
exports.index = async (req, res) => {
    try {
        const allMenus = await menu.find({});
        res.render("menus/menu", { allMenus });
    } catch (error) {
        console.error("Error fetching menus:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Render form to create a new menu
exports.renderNewForm = (req, res) => {
    res.render("menus/new");
};

// Create a new menu
// Create a new menu
exports.createMenu = async (req, res) => {
    try {
        const { name, description, foodType, speciality, price } = req.body;
        let url, filename;

        // Check if a file was uploaded with the request
        if (req.file) {
            url = req.file.path;
            filename = req.file.filename;
        } else {
            // Handle case where no file was uploaded
            throw new Error("No file uploaded");
        }

        const newMenu = new menu({
            name,
            description,
            foodType,
            speciality,
            price,
            // owner: req.user._id // Assuming you have user authentication and want to associate the menu with the current user
        });

        // Only set image properties if a file was uploaded
        if (url && filename) {
            newMenu.image = {
                url,
                filename
            };
        }
        else {
            // Set a default image path if no file was uploaded
            newMenu.image = {
                url: "menus/default_menu_image.jpg",
                filename: "default_menu_image.jpg"
            };
        }

        await newMenu.save();
        console.log("Menu created successfully");

        try {
            const allMenus = await menu.find({});
            res.render("menus/menu", { allMenus });
        } catch (error) {
            console.error("Error fetching menus:", error);
            res.status(500).send("Internal Server Error");
        }
    } catch (error) {
        console.error("Error creating menu:", error);
        res.status(500).send("Internal Server Error");
    }
};

// // Display details of a specific menu
exports.showMenu = async (req, res) => {
    try {
        const menuItem = await menu.findById(req.params.id);
        res.render("menus/show", {menuItem });
    } catch (error) {
        console.error("Error fetching menu details:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Render form to edit a menu
exports.renderEditForm = async (req, res) => {
    try {
        const Menu = await menu.findById(req.params.id);
        res.render("menus/edit", { Menu });
    } catch (error) {
        console.error("Error rendering edit form:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Update a menu
exports.updateMenu = async (req, res) => {
    try {
        const { name, description, price, speciality, foodType } = req.body;
        
        // Check if a file was uploaded with the request
        let imageUrl, imageName;
        if (req.file) {
            imageUrl = req.file.path;
            imageName = req.file.filename;
        }

        // Find the menu item by ID
        const menuId = req.params.id;
        const Menu = await menu.findById(menuId);

        // Update menu properties
        Menu.name = name;
        Menu.description = description;
        Menu.price = price;
        Menu.speciality = speciality;
        Menu.foodType = foodType;
        if (imageUrl && imageName) {
            Menu.image = {
                url: imageUrl,
                filename: imageName
            };
        }

        // Save the updated menu
        await Menu.save();

        // Redirect to the updated menu page or render it
        res.render("menus/show", { menuItem: Menu });
    } catch (error) {
        console.error("Error updating menu:", error);
        res.status(500).send("Internal Server Error");
    }
};
// Delete a menu
exports.destroyMenu = async (req, res) => {
    try {
        await menu.findByIdAndDelete(req.params.id);
        res.redirect("/menu");
    } catch (error) {
        console.error("Error deleting menu:", error);
        res.status(500).send("Internal Server Error");
    }
};


exports.veg = async (req, res) => {
    try {
        const allMenus = await menu.find({ foodType: 'veg' });
        res.render("menus/veg", { allMenus });
    } catch (error) {
        console.error("Error fetching menus:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.nonveg = async (req, res) => {
    try {
        const allMenus = await menu.find({ foodType: 'non-veg' });
        res.render("menus/nonveg", { allMenus });
    } catch (error) {
        console.error("Error fetching menus:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.maharashtrian = async (req, res) => {
    try {
        const allMenus = await menu.find({ foodType: 'maharashtrian' });
        res.render("menus/maharashtrian", { allMenus });
    } catch (error) {
        console.error("Error fetching menus:", error);
        res.status(500).send("Internal Server Error");
    }
};
