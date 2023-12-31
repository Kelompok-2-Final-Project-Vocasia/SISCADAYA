const express = require("express");
const router = express.Router();
const KategoriController = require("../controllers/kategoriController");
const {isAdmin} = require('../middlewares/authorization')
const {authUser} = require('../middlewares/authentication')

router.get("/", KategoriController.getAllKategori);
router.get("/:id", KategoriController.getKategoriById);

router.use(authUser, isAdmin)
router.post("/", KategoriController.createKategori);
router.put("/:id", KategoriController.updateKategori);
router.delete("/:id", KategoriController.deleteKategori);

module.exports = router