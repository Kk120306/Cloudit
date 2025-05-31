const multer = require("multer");
const { validationResult } = require('express-validator');
const db = require('../db/queries');
const path = require('path');
const fs = require('fs');

async function getRoot(req, res) {
    if (req.isUnauthenticated()) {
        return res.render("log-in-form", {
            errors: []
        });
    }

    const folderId = req.params.folderId || null

    const folderPath = `/library${folderId ? '/' + folderId : ''}/new-folder`;;
    const filePath = `/library${folderId ? '/' + folderId : ''}/upload`
    const userId = req.user.id;

    try {
        const folders = await db.getFolders(folderId, userId);
        const files = await db.getFiles(folderId, userId);
        res.render("library", {
            user: req.user,
            folders,
            files,
            showBack: folderId !== null,
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



const projectRoot = path.resolve(__dirname, '..');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderId = req.params.folderId || null;
        const uploadPath = folderId
            ? path.join(projectRoot, 'uploads', folderId)
            : path.join(projectRoot, 'uploads');

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); 
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
    const folderId = req.params.folderId || null;
    const actionPath = `/library${folderId ? '/' + folderId : ''}/upload`;
    if (req.isAuthenticated()) {
        res.render("upload-form", {
            actionPath
        });
    } else {
        res.render("log-in-form", {
            errors: []
        })
    }
}

async function uploadFilePost(req, res) {
    upload(req, res, async err => {
        if (err) {
            console.error("Upload error:", err); // Log full error for debugging
            return res.render("error-page", {
                errorMessage: "Upload error: " + err.message
            });
        }

        if (!req.file || !req.user) {
            return res.render("error-page", {
                errorMessage: "error2."
            });
        }

        try {
            const folderId = req.params.folderId || null;
            console.log("folder id", folderId);
            const name = req.file.originalname;
            const path = req.file.path;
            const size = req.file.size;
            const userId = req.user.id;

            await db.createFile(name, path, size, userId, folderId);

            console.log("Uploaded and saved to DB successfully!");

            if (folderId) {
                res.redirect(`/library/${folderId}`);
            } else {
                res.redirect("/library");
            }
        } catch (dbError) {
            console.error("DB insert error:", dbError);
            res.render("error-page", {
                errorMessage: "Failed to save file to the database."
            });
        }
    });
}





module.exports = {
    getRoot,
    uploadFilePost,
    uploadFileGet,
    newFolderGet,
    newFolderPost
}