const express = require("express");
const commentControllers = require("../controllers/commentController");
const { authUser } = require("../middlewares/authentication");
const { isUserOwn } = require("../middlewares/authorization");
const router = express.Router();

router.post('/', authUser,commentControllers.createComment); // Route endpoint membuat comment
router.get("/", commentControllers.getComment); // Route endpoint mendapatkan semua comment
router.get("/:id", commentControllers.getCommentById); // Route endpoint mendapatkan comment berdasarkan id 
router.put('/:id', authUser, isUserOwn,commentControllers.updateComment); // Route endpoint update comment berdasarkan id
router.delete('/:id', authUser, isUserOwn,commentControllers.deleteComment); // Route endpoint delete comment berdasarkan id

module.exports = router;