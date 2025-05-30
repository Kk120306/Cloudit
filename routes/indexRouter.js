const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const indexController = require("../controllers/indexController");

router.get("/", indexController.getIndex);

module.exports = router;
