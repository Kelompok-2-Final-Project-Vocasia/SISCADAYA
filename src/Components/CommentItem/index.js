import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns'; // Mengimpor utilitas untuk format tanggal
import { getCommentById } from '../../utils/comment'; // Mengimpor fungsi untuk mengambil komentar
import './index.css';

const CommentItem = () => {
  const [comments, setComments] = useState([]); // State untuk menyimpan komentar
  const [error, setError] = useState(null); // State untuk menyimpan error
  const cagarbudayaId = localStorage.getItem("cagarbudayaId"); // Mengambil ID dari localStorage

  // useEffect hook untuk mengambil komentar saat komponen di-mount atau cagarbudayaId berubah
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentById(cagarbudayaId); // Mengambil komentar
        setComments(response); // Menetapkan komentar yang diambil ke state
      } catch (err) {
        setError(err.message); // Menangani error
      }
    };

    fetchComments();
  }, [cagarbudayaId]); // Array dependensi yang berisi cagarbudayaId

  // Menampilkan pesan error jika ada error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Menampilkan daftar komentar
  return (
    <ul>
      {comments.length > 0 ? ( // Memeriksa jika ada komentar
        comments.map(comment => { // Memetakan setiap komentar menjadi elemen JSX
          const initial = comment.body ? comment.body[0].toUpperCase() : ''; // Mendapatkan inisial dari isi komentar

          return (
            <li key={comment.id} className="comment-item"> // Item daftar untuk setiap komentar
              <div className="comment-container">
                <div className="initial-container">
                  <p className="initial">{initial}</p> // Menampilkan inisial
                </div>
                <div>
                  <div className="username-time-container">
                  <p className="username">{comment.user.username}</p> // Menampilkan nama pengguna
                  </div>
                  <p className="comment">{comment.body}</p> // Menampilkan isi komentar
                </div>
              </div>
              <hr className="comment-line" /> // Garis horizontal untuk memisahkan komentar
            </li>
          );
        })
      ) : (
        <div>Tidak ada komentar untuk ditampilkan</div> // Pesan yang ditampilkan ketika tidak ada komentar
      )}
    </ul>
  );
}

export default CommentItem;
