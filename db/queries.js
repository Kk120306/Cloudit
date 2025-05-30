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


module.exports = {
    findUserByUsername,
    findUserById,
    createUser,
    getUserByEmail
}