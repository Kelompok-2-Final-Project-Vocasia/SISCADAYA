const multer = require("multer");
const path = require("path");

 // Mengonfigurasi local storage sebagai penyimpanan file yang diunggah
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Menentukan folder penyimpanan lokal
    },

    // Menentukan nama file yang diunggah
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);

      //menentukan nama file dengan waktu dan Acak untuk menghindari duplikasi
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
  });

  // Menentukan format file yang diizinkan
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        // Mengirimkan pesan error jika format file tidak diizinkan
        cb(new Error("Only .jpg and .png format allowed!"), false);
    }
}

// Membuat instance multer dengan opsi yang telah dikonfigurasi
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { upload };
