const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function findUserByUsername(username) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        return user;
    } catch (err) {
        console.log("Error finding user: ", err)
        throw err;
    }
}

async function findUserById(id) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        return user;
    } catch (err) {
        console.log("Error finding user: ", err)
        throw err;
    }
}

async function createUser(username, email, hashedPassword) {
    try {
        await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        });
    } catch (err) {
        console.log("There was an error: ", err);
        throw err;
    }
}

async function getUserByEmail(email) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user;
    } catch (err) {
        console.log("Error finding user: ", err)
        throw err;
    }
}

async function createFolder(userId, folderId, name) {
    try {
        const data = {
            name: name,
            userId: userId,
        };

        if (folderId) {
            data.parentId = folderId;
        }

        const folder = await prisma.folder.create({ data });
        return folder;
    } catch (err) {
        console.log("Error creating folder: ", err);
        throw err;
    }
}

async function getFolders(parentId, userId) {
    const folders = await prisma.folder.findMany({
        where: {
            parentId: parentId,
            userId: userId
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return folders;
}


async function getFiles(folderId, userId) {
    const files = await prisma.file.findMany({
        where: {
            folderId: folderId,
            userId: userId
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return files;
}

async function createFile(name, path, size, userId, folderId, cloudinaryUrl, publicId) {
    const data = {
        name,
        path,
        size,
        userId,
        ...(folderId ? { folderId } : {}),
        cloudinaryUrl,
        publicId
    };
    try {
        return await prisma.file.create({ data });
    } catch (err) {
        console.log("Error creating file: ", err);
        throw err;
    }
}

async function updateFolder(userId, folderId, name) {
    try {
        const folder = await prisma.folder.updateMany({
            where: {
                userId: userId,
                id: folderId
            },
            data: {
                name: name
            }
        });
        console.log("updated");
        return folder;
    } catch (err) {
        console.error("Error updating folder:", err);
        throw err;
    }
}

async function getParentId(folderId, userId) {
    try {
        const folder = await prisma.folder.findUnique({
            where: {
                id: folderId,
                userId: userId
            },
            select: {
                parentId: true
            }
        });

        return folder ? folder.parentId : null;
    } catch (error) {
        console.error("Error fetching parentId:", error);
        throw error;
    }
}

async function deleteFolder(folderId, userId) {
    const parentId = await getParentId(folderId, userId);

    try {
        await prisma.file.updateMany({
            where: {
                folderId: folderId,
                userId: userId
            },
            data: {
                folderId: parentId
            }
        });
    } catch (err) {
        console.error("Could not move files: ", err);
        throw err;
    }

    try {
        await prisma.folder.updateMany({
            where: {
                id: folderId,
                userId: userId
            },
            data: {
                parentId: parentId
            }
        });
    } catch (err) {
        console.error("Could not move folders: ", err);
        throw err;
    }

    try {
        await prisma.folder.delete({
            where: {
                id: folderId
            }
        });
    } catch (err) {
        console.error("Could not delete folder: ", err);
        throw err;
    }
}

async function getFile(userId, fileId) {
    try {
        const file = await prisma.file.findUnique({
            where: {
                id: fileId,
                userId: userId
            }
        });
        return file;
    } catch (err) {
        console.error("Could not get the file :", err);
        throw err
    }
}

async function deleteFile(fileId, userId) {
    try {
        const fileRecord = await prisma.file.findUnique({ where: { id: fileId } });

        if (!fileRecord) {
            throw new Error('File not found');
        }

        if (fileRecord.publicId) {
            await cloudinary.uploader.destroy(fileRecord.publicId);
        }
        
    } catch (err) {
        console.error("could not be deleted", err);
        throw err;
    }

    try {
        await prisma.file.delete({
            where: {
                id: fileId,
                userId: userId
            }
        })
    } catch (err) {
        console.err("File could not be deleted: ", err);
        throw err;
    }
}



module.exports = {
    findUserByUsername,
    findUserById,
    createUser,
    getUserByEmail,
    createFolder,
    getFolders,
    createFile,
    getFiles,
    updateFolder,
    deleteFolder,
    getFile,
    deleteFile
}