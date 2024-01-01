const express = require("express");
const router = express.Router();
const KategoriController = require("../controllers/kategoriController");

//route Kategori untuk user biasa dan admin
router.get("/", KategoriController.getAllKategori);
router.get("/:id", KategoriController.getKategoriById);


module.exports = router