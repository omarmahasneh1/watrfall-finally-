const express = require("express");
const path = require("path");
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const homeRouter = require("./routes/home.routes");
const productRouter = require("./routes/product.routes");
const authRouter = require("./routes/auth.routes");
const cartRouter = require("./routes/cart.route");
const adminRouter = require("./routes/admin.route");
const orderRouter = require("./routes/orders.route");

const app = express();
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(flash());

const STORE = new SessionStore({
    uri:"mongodb://localhost:27017",
        
    collection: "sessions"
});
app.use(
    session({
        secret: "......omar mohammad salameh almahasneh......",
        saveUninitialized: false,//defult for saveUninitialized is false
        store: STORE
        //defult off cookis when i close browser
    })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);
app.use("/", orderRouter);

app.get('/',(req,res,next)=>{
   // res.render('./index');
    res.render('./index.ejs',{message:'errorMessage'});
})
app.get("/error", (req, res, next) => {
    res.status(500);
    res.render("error.ejs", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "Error"
    });
});

app.get("/not-admin", (req, res, next) => {
    res.status(403);
    res.render("not-admin", {
        isUser: req.session.userId,
        isAdmin: false,
        pageTitle: "Not Allowed"
    });
});

app.use((req, res, next) => {
    res.status(404);
    res.render("not-found", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "Page Not Found"
    });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server listen on port " + port);
});
