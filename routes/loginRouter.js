const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const loginController = require("../controllers/loginController");

router.get("/", loginController.getLogInForm);
router.post("/", loginController.handleLogin);

module.exports = router;
