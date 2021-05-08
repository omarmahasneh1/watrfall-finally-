const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;


const authGuard = require("./guards/auth.guard");

const authController = require("../controllers/auth.controller");

router.get("/signup", authGuard.notAuth, authController.getSignup);
//https://express-validator.github.io/docs/
router.post(
    "/signup",
    authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check("username")
        .not()
        .isEmpty()//.isLength({ min: 1 }
        .withMessage("username is required"),
    check("email")
        .not()//لاحظ بتشتغل على اللي جاي بعدها مباشره بس يعني على isEmpty()
        .isEmpty()
        .withMessage("email is required")
        .isEmail()//صيغة الايميل تكون صحيحه
        .withMessage("invalid format"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 charachters"),
    check("confirmPassword").custom((value, { req }) => {
        if (value === req.body.password) return true;
        else throw "passwords dont the same ";
    }),
    authController.postSignup
);

router.get("/login", authGuard.notAuth, authController.getLogin);

router.post(
    "/login",
    authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check("email")
        .not()
        .isEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid format"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 charachters"),
    authController.postLogin
);

router.all("/logout", authGuard.isAuth, authController.logout);

module.exports = router;
