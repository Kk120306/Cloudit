const { check } = require('express-validator');
const db = require("../db/queries");


const validationRules = [
    check("username")
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Username must be between 2 and 30 characters')
        .matches(/^[A-Za-zÀ-ÿ\s'-]+$/)
        .withMessage('Username can only contain letters, spaces, hyphens, and apostrophes')
    ,
    check("email")
        .trim()
        .isEmail()
        .withMessage('Enter a valid email address')
        .custom( async (email) => {
            const foundEmail = await db.getUserByEmail(email);
            console.log("Found email for validation:", foundEmail);

            if (foundEmail) {
                throw new Error("This email already exists. Please log in.");
            }
            return true;
        })
    ,
    check("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    check("passwordC")
        .trim()
        .notEmpty()
        .custom((passwordC, { req }) => {
            if (passwordC !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        })
        .withMessage("Passwords do not match"),
];

module.exports = validationRules;