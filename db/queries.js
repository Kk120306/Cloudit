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

async function getFolders(parentId) {
    const folders = await prisma.folder.findMany({
        where: {
            parentId: parentId  
        }
    });
    return folders;
}





module.exports = {
    findUserByUsername,
    findUserById,
    createUser,
    getUserByEmail,
    createFolder,
    getFolders
}