const express = require("express");
const router = express.Router();
const validationRules = require("../validator/folderValidation");

router.use(express.urlencoded({ extended: true }));

const libraryController = require("../controllers/libraryController");

router.get("/", libraryController.getRoot);
router.get("/:folderId", libraryController.getRoot);

router.get("/new-folder", libraryController.newFolderGet); 
router.post("/new-folder", libraryController.newFolderPost);

router.get("/:folderId/new-folder", libraryController.newFolderGet); 
router.post("/:folderId/new-folder", libraryController.newFolderPost);


// router.get("/:folderId", libraryController.getFolderLibrary);


// router.get("/:folderId?/upload", libraryController.uploadFileGet)
// router.post("/:folderId?/upload", libraryController.uploadFilePost);

module.exports = router;
