
const express = require("express");     
const router = express.Router();        
const User = require("../models/users.js");   
const passport = require("passport");   
const {saveRedirectUrl} = require("../middleware.js");  

const userController = require("../controllers/users.js");  




router
    .route("/signup")
    .get(userController.renderSignUpForm)
    .post(userController.signUp);

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(                  
        saveRedirectUrl ,
        passport.authenticate("local" ,{   
        failureRedirect: "/login",
        failureFlash: true,
        }),
        userController.login);

    
router.get("/logout" ,userController.logout);
router.get("/userinfo" ,userController.userinfo);

// router.get('/mycart', userController.renderMycart);
// router.post('/products/:id/addToCart', userController.addToCart);
module.exports = router;          