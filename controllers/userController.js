const { User } = require("../models");
const bcrypt = require("bcrypt");
const { regisUser, loginUser } = require("../validations/userValidation");
const { generateToken } = require("../helpers/jwt");

class Controller {
    // Endpoint untuk mendaftarkan user baru (register)
    static async register (req, res) {
        try {
             // Melakukan validasi input data user yang ingin mendaftar
            const {error} = regisUser.validate(req.body);
            if(error){
                return res.status(400).json({ error: error.message });
            }

            const { username, nama, email, password } = req.body;

            // Memeriksa apakah email sudah terdaftar sebelumnya
            const isExist = await User.findOne({ where: { email } });
            if (isExist) {
                return res.status(400).json({ message: "Email sudah terdaftar" });
            }

            // Memeriksa apakah username sudah digunakan sebelumnya
            const existUsername = await User.findOne({ where: { username } });
            if (existUsername) {
                return res.status(400).json({ message: "Username sudah digunakan" });
            }
            // Membuat user baru jika email dan username tersedia
            await User.create({ username, nama, email, password });

            return res.status(201).json({ message: "Akun berhasil dibuat, silahkan login.",});
        } catch (error) {
            console.log(`Error : ${error}`);
        }
    };

     // Endpoint untuk proses login user
    static async login (req, res) {
        try {
            // Melakukan validasi input data pada proses login
            const {error} = loginUser.validate(req.body);
            if(error){
                return res.status(400).json({ error: error.message });
            }

            const { email, password } = req.body;

            // Mencari user berdasarkan email
            const users = await User.findOne({ where: { email } });
    
            if (!users) {
                return res.status(400).json({ message: "Email atau password salah" });
            }
            // Memeriksa kecocokan password yang diinput dengan password yang tersimpan dalam database
            const isValidPassword = await bcrypt.compare(password, users.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: "Email atau password salah" });
            }

            // Menyiapkan payload untuk pembuatan token
            const payload = {
                id: users.id,
                email: users.email,
                isAdmin: users.isAdmin,
            };
            // Membuat token menggunakan payload yang sudah disiapkan
            const token = generateToken(payload);
             // Mengembalikan token dan informasi user setelah berhasil login
            return res.status(200).json({ token, email: users.email, isAdmin: users.isAdmin });
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

}
module.exports = Controller;