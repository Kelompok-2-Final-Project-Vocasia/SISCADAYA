const express = require('express')
const router = express.Router()
const CagarBudayaController = require('../controllers/cagarBudayaController')
const {isAdmin} = require('../middlewares/authorization')
const {authUser} = require('../middlewares/authentication')
const {upload} = require('../middlewares/multer')

//route cagar budaya untuk user biasa dan admin
router.get('/', CagarBudayaController.getAllCagarBudaya)
router.get('/:id', CagarBudayaController.getCagarBudayaById)

//middleware untuk route cagar budaya yang hanya bisa diakses oleh admin
router.use(authUser, isAdmin)
router.post('/', upload.single('foto'), CagarBudayaController.createCagarBudaya)
router.put('/:id', upload.single('foto'), CagarBudayaController.updateCagarBudaya)
router.delete('/:id', CagarBudayaController.deleteCagarBudaya)

module.exports = router