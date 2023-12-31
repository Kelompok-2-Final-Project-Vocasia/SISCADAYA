const { Comment } = require("../models");

const isAdmin = async (req, res, next) => {
    try {
        const { isAdmin } = req.authUser;
        if (!isAdmin) {
            return res.status(403).json({ message: "akses hanya untuk admin" });
        }

        next();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const isUserOwn = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.id } });
        const user = req.authUser;
        if (!comment) {
            return res.status(404).json({ message: "komentar tidak ditemukan" });
        }

        if (comment.userId !== user.id) {
            return res.status(403).json({ message: "user tidak punya akses data ini" });
        }

        next();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
module.exports = { isAdmin, isUserOwn };