const express = require("express");
const router = express.Router();
const validationRules = require("../validator/signupValidation");

router.use(express.urlencoded({ extended: true }));

const signUpController = require("../controllers/signupController");

router.get("/", signUpController.getSignUpForm);
router.post("/", validationRules, signUpController.handleSignUp);

module.exports = router;