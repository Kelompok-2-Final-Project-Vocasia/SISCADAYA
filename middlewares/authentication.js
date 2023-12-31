const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "user tidak terauthentikasi" });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "user tidak terauthentikasi" });
        }

        const user = await User.findOne({ where: { id: decoded?.id } });
        if (!user) {
            return res.status(401).json({ message: "user tidak ditemukan" });
        }

        req.authUser = user;
        next();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
module.exports = { authUser };