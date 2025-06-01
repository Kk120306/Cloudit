const express = require("express");
const router = express.Router();
const validationRules = require("../validator/folderValidation");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.use(express.urlencoded({ extended: true }));

const libraryController = require("../controllers/libraryController");


router.get("/", libraryController.getRoot);
router.get("/file/:fileId", libraryController.getFileDetails);

router.post("/file/:fileId/delete-file", libraryController.deleteFile);

router.get("/new-folder", libraryController.newFolderGet); 
router.post("/new-folder", libraryController.newFolderPost);

router.get("/upload", libraryController.uploadFileGet);
router.post("/upload", upload.single('file'), libraryController.uploadFilePost);

router.get("/update-folder", libraryController.updateFolderGet);
router.post("/update-folder",  libraryController.updateFolderPost);

router.get("/create-share", libraryController.shareLinkGet);
router.post("/create-share", libraryController.shareLinkPost);

router.get("/share/:shareId", libraryController.getShareFolder);

router.post("/delete-folder", libraryController.deleteFolder);
router.post("/:folderId/delete-folder", libraryController.deleteFolder);

router.get("/:folderId/update-folder", libraryController.updateFolderGet);
router.post("/:folderId/update-folder", libraryController.updateFolderPost);

router.get("/:folderId/new-folder", libraryController.newFolderGet); 
router.post("/:folderId/new-folder", libraryController.newFolderPost);

router.get("/:folderId/upload", libraryController.uploadFileGet);
router.post("/:folderId/upload", upload.single('file'), libraryController.uploadFilePost);

router.get("/:folderId/create-share", libraryController.shareLinkGet);
router.post("/:folderId/create-share", libraryController.shareLinkPost);

router.get("/:folderId", libraryController.getRoot);


module.exports = router;
