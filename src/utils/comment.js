import axios from "axios";
import swal from "sweetalert";

const onAddComment = async (commentData, token) => {
    try {
        // Mengirim data ke API
        const response = await axios.post('http://localhost:4000/comment', commentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Tangani respons sesuai kebutuhan
        console.log(response.data);
        swal("Comment Added", "Komentar ditambahkan", "success"); // Jika menggunakan swal
    } catch (error) {
        console.error('Error saat mengirim komentar:', error);
        swal("Error", "Ada masalah", "error"); // ada masalah
    }
}

const getCommentById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/comment/${id}`);
      return response.data; // Mengembalikan data komentar
    } catch (error) {
      console.error('Error saat mengambil komentar:', error);
      throw error; // Dilemparkan untuk menangani di komponen induk
    }
  }

export { onAddComment, getCommentById };
