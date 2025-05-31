const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const libraryController = require("../controllers/libraryController");

router.get("/", libraryController.getRoot);

module.exports = router;
