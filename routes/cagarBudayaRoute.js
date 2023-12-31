const express = require('express')
const router = express.Router()
const CagarBudayaController = require('../controllers/cagarBudayaController')
const {isAdmin} = require('../middlewares/authorization')
const {authUser} = require('../middlewares/authentication')
const {upload} = require('../middlewares/multer')

router.get('/', CagarBudayaController.getAllCagarBudaya)
router.get('/:id', CagarBudayaController.getCagarBudayaById)

router.use(authUser, isAdmin)

router.post('/', upload.single('foto'), CagarBudayaController.createCagarBudaya)
router.put('/:id', upload.single('foto'), CagarBudayaController.updateCagarBudaya)
router.delete('/:id', CagarBudayaController.deleteCagarBudaya)

module.exports = router