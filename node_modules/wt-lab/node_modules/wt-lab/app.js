const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const multer = require("multer");
const bodyParser     = require('body-parser');
const MongoStore = require("connect-mongo");

if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}


// for using passport
const passport=require("passport");// require passport for authentication
const LocalStrategy=require("passport-local");
const User=require("./models/users.js");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//for session setup
const session=require("express-session");// require session
const flash=require("connect-flash");//require flash

// sessionObject is parameter
const sessionOption={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,//millisecond of 7 days
        maxAge:1000*60*60*24*7,//
       httpOnly:true//for security purpose:to avoid cross scripting attack
    },
};
app.use(session(sessionOption)); // to use sessions
app.use(flash());



// for authentication using passport
app.use(passport.initialize())//middleware that initialize passport
app.use(passport.session());//app.use(session(sessionOption)); require for a passport to login once in the session
passport.use(new LocalStrategy(User.authenticate()));//all users should be authenticate through local strategy
passport.serializeUser(User.serializeUser());//store(serialize) information of user in session
passport.deserializeUser(User.deserializeUser());//remove(deserialize) information of user in session


app.use((req, res, next) => {
    res.locals.successMsg = req.flash('successMsg');
    next();
});

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;    
    next();//go for next
})

const menuRoutes = require("./routes/menu");
const userRouter = require("./routes/users");

dbUrl = process.env.ATLASDB_URL;
console.log("dbUrl:", dbUrl);

// MongoDB Connection (Keep the same as before)

main()
    .then(() => {
        console.log("Connected to db.");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}


const menuRouter = require("./routes/menu.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/menu", menuRouter);

// Routes
app.get("/", (req, res) => {
    res.render("home");
});

app.use("/menu", menuRoutes);
app.use("/",userRouter);//for user route


// Assuming you have a route handler like this in your Express application
app.get('/', (req, res) => {
    // Assuming you have the user object available in req.user after authentication
    const user = req.user;
    res.render('navbar', { User: user }); // Passing the User variable to the template
});


app.get("/stay", (req, res) => {
    res.render("stay");
});

app.get("/events", (req, res) => {
    res.render("event");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/orderfood", (req, res) => {
    res.render("orderfood");
});

app.get("/bookstay", (req, res) => {
    res.render("bookstay");
});


const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
});






app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});