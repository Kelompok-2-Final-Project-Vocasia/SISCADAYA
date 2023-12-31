const { Comment } = require("../models");

// Middleware untuk memeriksa apakah user memiliki status isAdmin (admin)
const isAdmin = async (req, res, next) => {
    try {
        const { isAdmin } = req.authUser;
        if (!isAdmin) {
            return res.status(403).json({ message: "akses hanya untuk admin" }); // Jika user bukan admin
        }

        next();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

// Middleware untuk memeriksa apakah user memiliki hak akses terhadap data komentar
const isUserOwn = async (req, res, next) => {
    try {
        // Cari komentar berdasarkan ID yang diberikan dalam params
        const comment = await Comment.findOne({ where: { id: req.params.id } });
        // Mendapatkan informasi user yang sedang terauthentikasi
        const user = req.authUser;
        if (!comment) {
            return res.status(404).json({ message: "komentar tidak ditemukan" }); // Jika komentar tidak ditemukan
        }

        // Memeriksa apakah user adalah pemilik komentar
        if (comment.userId !== user.id) {
            return res.status(403).json({ message: "user tidak punya akses data ini" });
        }

        next();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
module.exports = { isAdmin, isUserOwn };