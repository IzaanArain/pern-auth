const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user) {
    const payload = {
        user:user._id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRETE, {expiresIn:"1hr"})
    return token;
}

module.exports = {jwtGenerator};