const { check } = require('express-validator');

const validationRules = [
    check("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
]

module.exports = validationRules;