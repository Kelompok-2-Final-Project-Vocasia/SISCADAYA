const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

// Middleware untuk mengauthentikasi user
const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "user tidak terauthentikasi" }); // Jika token tidak ada
        }
        // Verifikasi token 
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "user tidak terauthentikasi" }); // Jika token tidak valid
        }
        // Cari user berdasarkan ID yang terdekripsi dari token
        const user = await User.findOne({ where: { id: decoded?.id } });
        if (!user) {
            return res.status(401).json({ message: "user tidak ditemukan" }); // Jika user tidak ditemukan
        }
        // Menyimpan data user terauthentikasi ke dalam objek req untuk useran selanjutnya
        req.authUser = user;
        next();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
module.exports = { authUser };