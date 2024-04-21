const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const multer = require("multer");
const bodyParser     = require('body-parser');

if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const menuRoutes = require("./routes/menu");


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



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});