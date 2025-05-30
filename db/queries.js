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

module.exports = {
    findUserByUsername,
    findUserById
}