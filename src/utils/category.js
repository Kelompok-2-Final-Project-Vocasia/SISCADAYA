import axios from "axios";
import swal from "sweetalert";

const _checkInput = (category) => {
  const {nama} = category;
  if(!nama) {
    return swal({
      title: "Gagal!",
      text: "Mohon lengkapi semua data.",
      icon: "error",
      button: "Ok",
    })
  }
} 

const getAllCategory = async () => {
  const response = await axios.get(`http://localhost:4000/kategori`);
  return response;
}

const getSinggleCategory = async (id) => {
  const response = await axios.get(`http://localhost:4000/kategori/${id}`);
  return response;
}

const insertCategory = (category) => {
  _checkInput(category);
  const {nama} = category;
  const formData = new FormData();
  formData.append('nama', nama);

  axios.post(`http://localhost:4000/kategori`, formData, {headers: {Authorization: 'Bearer - ' + localStorage.getItem("token")}}).then(res => {
    if(res.status === 201) {
      swal({
        title: "Selamat!",
        text: `Data berhasil di tambahkan`,
        icon: "success",
        button: "Ok",
      }).then((result) => {
            window.location.href = `/admin/kategori`;
      });
    }
  }).catch(err => {
    swal({
      title: "Gagal!",
      text: `${err.response.data.message}`,
      icon: "error",
      button: "Ok",
  });
  })
}

const updateCategory = (category, id) => {
  _checkInput(category);
  const {nama} = category;
  const formData = new FormData();
  formData.append('nama', nama);

  axios.put(`http://localhost:4000/kategori/${id}`, formData).then(res => {
    if(res.status === 201) {
      swal({
        title: "Selamat!",
        text: `Data berhasil di tambahkan`,
        icon: "success",
        button: "Ok",
      }).then((result) => {
            window.location.href = `/admin/kategori`;
      });
    }
  }).catch(err => {
    swal({
      title: "Gagal!",
      text: `${err.response.data.message}`,
      icon: "error",
      button: "Ok",
  });
  })
}

export {getAllCategory, getSinggleCategory, insertCategory, updateCategory};