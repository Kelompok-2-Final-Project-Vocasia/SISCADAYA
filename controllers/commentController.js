const { Cagarbudaya, Comment, User } = require('../models');

class CommentController {

    // Create Comment
    static async createComment(req, res, next) {
        try {
          const { body, rating, cagarbudayaId } = req.body;
          const user = req.authUser;
          const cagarBudayas = await Cagarbudaya.findByPk(cagarbudayaId);
          if (!cagarBudayas){
            return res.status(404).json({ message: "Cagar Budaya tidak ditemukan" });
          }
            const comments = await Comment.create({ 
              body, rating, cagarbudayaId: cagarBudayas.id, 
              userId: user?.id, 
            });
            await comments.reload ({
                include: [
                    {
                        model: Cagarbudaya,
                        as: "cagarbudayas",
                    },
                ],
            });
            return res.status(201).json(comments);
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      };

    // Get All Comment
    static async getComment(req, res) {
        try {
          const comments = await Comment.findAll({
            include: [
                {
                    model: Cagarbudaya,
                    as: "cagarbudayas",
                },
            ],
          });
          res.status(200).json({ comment: comments });
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      };

      
      static async getCommentById(req, res) {
        const cagarbudayaId = req.params.id;
        try {
            const comment = await Comment.findAll({
                where: { cagarbudayaId: cagarbudayaId },
                include: [
                    { model: Cagarbudaya, as: 'cagarbudayas' },
                    { model: User, as: 'user', attributes: ['username'] } // Menambahkan join ke tabel users
                ]
            });
    
            if (!comment) {
                return res.status(404).json({ message: "Kategori not found" });
            }
    
            return res.status(200).json(comment);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    
      
      // Update Comment
      static async updateComment(req, res) {
        try {
        const { body, rating } = req.body;
        const commentId = req.params.id;
        
        const comments = await Comment.findByPk(commentId);
        if (!comments) {
            return res.status(404).json({ error: 'komentar tidak tesedia' });
        }
        comments.body = body || comments.body;
        comments.rating = rating || comments.rating;

        await comments.save();

        return res.status(200).json({
            body: comments.body,
            rating: comments.rating,
            createdAt: comments.createdAt,
            updatedAt: comments.updatedAt
        });
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      };

      // Delete Comment
      static async deleteComment(req, res) {
        try {
            const { id } = req.params;
            const comments = await Comment.findByPk(id);

            if (!comments) {
                return res.status(404).json({ error: 'komentar tidak tersedia' });
              }
              await comments.destroy();
              return res.status(200).json({ message: `komentar dengan id ${id} telah dihapus` });
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      };
}

module.exports = CommentController;