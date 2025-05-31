const express = require("express");
const router = express.Router();
const validationRules = require("../validator/folderValidation");

router.use(express.urlencoded({ extended: true }));

const libraryController = require("../controllers/libraryController");


router.get("/", libraryController.getRoot);

router.get("/new-folder", libraryController.newFolderGet); 
router.post("/new-folder", libraryController.newFolderPost);

router.get("/upload", libraryController.uploadFileGet);
router.post("/upload", libraryController.uploadFilePost);

router.get("/update-folder", libraryController.updateFolderGet);
router.post("/update-folder", libraryController.updateFolderPost);

router.post("/delete-folder", libraryController.deleteFolder);
router.post("/:folderId/delete-folder", libraryController.deleteFolder);

router.get("/:folderId/update-folder", libraryController.updateFolderGet);
router.post("/:folderId/update-folder", libraryController.updateFolderPost);

router.get("/:folderId/new-folder", libraryController.newFolderGet); 
router.post("/:folderId/new-folder", libraryController.newFolderPost);

router.get("/:folderId/upload", libraryController.uploadFileGet);
router.post("/:folderId/upload", libraryController.uploadFilePost);


router.get("/:folderId", libraryController.getRoot);


module.exports = router;
