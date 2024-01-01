const express = require("express");
const userRoutes = require("./routes/userRoute");
const cagarbudayaRoutes = require("./routes/cagarBudayaRoute");
const kategoriRoutes = require("./routes/kategoriRoute"); 
const commentRoutes = require("./routes/commentRoute"); 
require("dotenv").config();
const cors = require("cors");

const app = express(); //Membuat instance aplikasi Express
app.use(cors());//mengaktifkan cors
const port = process.env.PORT || 4000; // Mendapatkan port dari variabel lingkungan atau menggunakan port 4000 jika tidak ada

app.use(express.json());// Menggunakan middleware untuk mengurai body request dengan format JSON
app.use(express.urlencoded({ extended: true }));// Menggunakan middleware untuk mengurai body request dengan format URL-encoded

app.use(userRoutes);// Menggunakan route userRoutes terkait pengguna
app.use('/cagarbudaya', cagarbudayaRoutes)// Menggunakan cagarbudayaRoutes untuk rute terkait cagar budaya
app.use('/comment', commentRoutes)// Menggunakan commentRoutes untuk rute terkait komentar
app.use('/kategori', kategoriRoutes)// Menggunakan kategoriRoutes untuk rute terkait kategori

// Menjalankan server pada port yang ditentukan
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
