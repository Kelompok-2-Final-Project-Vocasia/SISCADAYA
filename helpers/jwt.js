const jwt = require("jsonwebtoken");

// Fungsi untuk menghasilkan token berdasarkan payload yang diberikan
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
};

// Fungsi untuk memverifikasi token yang diberikan
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };