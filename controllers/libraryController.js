const multer = require("multer");
const { validationResult } = require('express-validator');
const db = require('../db/queries');

async function getRoot(req, res) {
    if (req.isUnauthenticated()) {
        return res.render("log-in-form", {
            errors: []
        });
    }

    const folderId = req.params.folderId || null

    const folderPath = `/library${folderId ? '/' + folderId : ''}/new-folder`;;
    const filePath = `/library${folderId ? '/' + folderId : ''}/upload`

    try {
        const folders = await db.getFolders(folderId);
        res.render("library", {
            user: req.user,
            folders,
            showBack: folderId !== null, // true if inside a subfolder
            parentId: folderId,
            folderPath,
            filePath
        });
    } catch (err) {
        console.error("Error loading folders: ", err);
        res.status(500).send("Server error");
    }
}


function newFolderGet(req, res) {
    if (req.isAuthenticated()) {
        const folderId = req.params.folderId || null;
        const actionPath = `/library${folderId ? '/' + folderId : ''}/new-folder`;

        res.render("new-folder-form", {
            errors: [],
            actionPath
        });
    } else {
        res.render("log-in-form", {
            errors: []
        });
    }
}


async function newFolderPost(req, res) {
    const errors = validationResult(req).array();

    if (errors.length > 0) {
        return res.render("new-folder-form", {
            errors: errors,
            folderId: req.params.folderId || null
        })
    }

    const folderId = req.params.folderId || null;
    const name = req.body.name;
    const userId = req.user.id;

    try {
        const newFolder = await db.createFolder(userId, folderId, name);
        res.redirect(`/library/${folderId || ""}`);
    } catch (err) {
        console.log("There was an error creating the folder: ", err);
        throw err;
    }
}




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderId = req.params.folderId || null;
        const uploadPath = folderId ? path.join(__dirname, 'uploads', folderId) : path.join(__dirname, 'uploads');

        if (!fs.existsSync(uploadPath)) {
            return cb(new Error("Upload folder does not exist"));
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10.5 * 1024 * 1024 },
}).single('myFile');

function uploadFileGet(req, res) {
    if (req.isAuthenticated()) {
        res.render("upload-form");
    } else {
        res.render("log-in-form", {
            errors: []
        })
    }
}

async function uploadFilePost(req, res) {
    upload(req, res, err => {
        if (err) {
            return res.render("error-page", {
                errorMessage: "File is too large!"
            })
        }
        if (!req.file) {
            return res.render("error-page", {
                errorMessage: "Something went wrong."
            })
        }
        console.log("uploaded successfully!");
        res.redirect("/library");
    });
}




module.exports = {
    getRoot,
    uploadFilePost,
    uploadFileGet,
    newFolderGet,
    newFolderPost
}