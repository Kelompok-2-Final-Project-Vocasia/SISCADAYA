const { Cagarbudaya, Comment, User } = require('../models');

class CommentController {

  // Endpoint untuk membuat komentar baru
  static async createComment(req, res, next) {
    try {
      const { body, rating, cagarbudayaId } = req.body;
      const user = req.authUser;

      // Mencari cagar budaya berdasarkan ID yang diberikan
      const cagarBudayas = await Cagarbudaya.findByPk(cagarbudayaId);
      if (!cagarBudayas) {
        return res.status(404).json({ message: "Cagar Budaya tidak ditemukan" }); // Jika cagar budaya tidak ditemukan
      }
      // Membuat komentar baru dengan data yang valid
      const comments = await Comment.create({
        body, rating, cagarbudayaId: cagarBudayas.id,
        userId: user?.id,
      });
      // Melakukan reload untuk mendapatkan informasi yang terkait dengan komentar yang baru dibuat
      await comments.reload({
        include: [
          {
            model: Cagarbudaya,
            as: "cagarbudayas",
          },
        ],
      });
      return res.status(201).json(comments); // Respon berhasi
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' }); // jika terjadi kesalahan server
    }
  };

  // Endpoint untuk mendapatkan semua komentar beserta data Cagarbudaya terkait
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
      res.status(200).json({ comment: comments }); // Respon berhasil
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' }); // jika terjadi kesalahan server
    }
  };

   // Endpoint untuk mendapatkan komentar berdasarkan ID Cagarbudaya beserta informasi user yang membuat komentar
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
        return res.status(404).json({ message: "Kategori not found" }); // Jika kategori tidak ditemukan
      }

      return res.status(200).json(comment); // Respon berhasil
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" }); // jika terjadi kesalahan server
    }
  }

   // Endpoint untuk memperbarui komentar berdasarkan ID yang diberikan
  static async updateComment(req, res) {
    try {
      const { body, rating } = req.body;
      const commentId = req.params.id;

      // Mencari komentar berdasarkan ID yang diberikan
      const comments = await Comment.findByPk(commentId);
      if (!comments) {
        return res.status(404).json({ error: 'komentar tidak tesedia' });
      }

      // Memperbarui data komentar berdasarkan input yang diberikan
      comments.body = body || comments.body;
      comments.rating = rating || comments.rating;

      await comments.save(); // Menyimpan perubahan pada komentar

      return res.status(200).json({
        body: comments.body,
        rating: comments.rating,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt
      }); // Respon berhasil
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' }); // jika terjadi kesalahan server
    }
  };

   // Endpoint untuk menghapus komentar berdasarkan ID yang diberikan
  static async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const comments = await Comment.findByPk(id);

      if (!comments) {
        return res.status(404).json({ error: 'komentar tidak tersedia' });
      }
      // Menghapus komentar berdasarkan ID yang diberikan
      await comments.destroy();
      return res.status(200).json({ message: `komentar dengan id ${id} telah dihapus` }); // Respon berhasil
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' }); // jika terjadi kesalahan server
    }
  };
}

module.exports = CommentController;