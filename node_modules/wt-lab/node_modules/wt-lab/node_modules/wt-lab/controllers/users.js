const User = require("../models/users");   



module.exports.renderSignUpForm = (req , resp)=>{   

    resp.render("users/signup.ejs");
};




module.exports.signUp = async (req, resp) => {
    try {
        const { username, email, password } = req.body;

        // Check if user with this email already exists
        console.log('Checking for existing user with email:', email);
        const existingUser = await User.findOne({ email });
        console.log('Existing user:', existingUser);

        if (existingUser) {
            console.log('User with this email already exists');
            req.flash("error", "User with this email already exists");
            return resp.redirect("/signup");
        }

        // Create a new user
        console.log('Creating new user...');
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Food & Fun!!");
            resp.redirect("/menu");
        });
    } catch (e) {
        console.error('Error during signup:', e);
        req.flash("error", e.message);
        resp.redirect("/signup");
    }
};






module.exports.renderLoginForm =  (req , resp)=>{      

    resp.render("users/login.ejs");
};


module.exports.login = async(req , resp)=>{ 

    req.flash("success","Welcome back to Food & Fun!");
    let redirectUrl = resp.locals.redirectUrl || "/"; 
    resp.redirect(redirectUrl); 
};



module.exports.logout = (req , resp , next)=>{       

    req.logout((err)=>{

        if(err){
            return next(err);
        }
        req.flash("success" , "You are logged out!");
        resp.redirect("/");
    });
};

module.exports.userinfo = async (req, resp) => {
    try {
        // Retrieve the current user's information
        const currentUser = await User.findById(req.user._id);

        if (!currentUser) {
            req.flash("error", "User not found");
            return resp.redirect("/");
        }

        // Render the userinfo.ejs view with the user's information
        resp.render("users/userinfo.ejs", { user: currentUser });
    } catch (error) {
        console.error("Error fetching user information:", error);
        req.flash("error", "Error fetching user information");
        resp.redirect("/");
    }
};




