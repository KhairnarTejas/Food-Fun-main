
//const ExpressError = require("./utils/ExpressError.js");   //57.(8)
// const { productSchema , reviewSchema }  = require("./schema.js"); //57.(8)
//const Listing = require("./models/products");  //57.(8)
// const Review = require("./models/reviews.js");  //57.(10)
const Menu=require('./models/menu.js')
//57.(1)

module.exports.isLoggedIn = (req ,resp ,next) =>{

    console.log(req.user);              //57.(1)
    if(!req.isAuthenticated()){         //57.(1)

        req.session.redirectUrl = req.originalUrl;  //57.(5)
        req.flash("error" , "you must be logged in to create listing!");
        return resp.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl = (req , resp ,next)=>{   //57.(5)

    if(req.session.redirectUrl){

        resp.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
