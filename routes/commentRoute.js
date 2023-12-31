const express = require("express");
const commentControllers = require("../controllers/commentController");
const { authUser } = require("../middlewares/authentication");
const { isUserOwn } = require("../middlewares/authorization");
const router = express.Router();

router.post('/', authUser,commentControllers.createComment);
router.get("/", commentControllers.getComment);
router.get("/:id", commentControllers.getCommentById);
router.put('/:id', authUser, isUserOwn,commentControllers.updateComment);
router.delete('/:id', authUser, isUserOwn,commentControllers.deleteComment);

module.exports = router;