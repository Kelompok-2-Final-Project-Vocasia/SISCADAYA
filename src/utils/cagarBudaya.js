import axios from "axios";
import swal from "sweetalert";

const _checkInput = (CagarBudaya) => {
  const {nama, foto, deskripsi, alamat, kabupaten, provinsi, kategoriId} = CagarBudaya;
  if(!nama || !foto || !deskripsi || !alamat || !kabupaten || !provinsi || !kategoriId) {
    return swal({
      title: "Gagal!",
      text: "Mohon lengkapi semua data.",
      icon: "error",
      button: "Ok",
    })
  }
} 

const getAllCagarBudaya = async () => {
  const response = await axios.get(`http://localhost:4000/cagarbudaya`);
  return response;
}

const getSinggleCagarBudaya = async (id) => {
  const response = await axios.get(`http://localhost:4000/cagarbudaya/${id}`);
  return response;
}

const insertCagarBudaya = (CagarBudaya) => {
  _checkInput(CagarBudaya);
  const {nama, foto, deskripsi, alamat, kabupaten, provinsi, kategoriId} = CagarBudaya;
  const formData = new FormData();
  formData.append('nama', nama);
  formData.append('foto', foto);
  formData.append('deskripsi', deskripsi);
  formData.append('alamat', alamat);
  formData.append('kabupaten', kabupaten);
  formData.append('provinsi', provinsi);
  formData.append('kategoriId', kategoriId);

  axios.post(`http://localhost:4000/cagarbudaya`, formData, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token"),
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    if(res.status === 201) {
      swal({
        title: "Selamat!",
        text: `Data berhasil di tambahkan`,
        icon: "success",
        button: "Ok",
      }).then((result) => {
            window.location.href = `/admin/cagar-budaya`;
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

const updateCagarBudaya = (CagarBudaya, id) => {
  const {nama, foto, deskripsi, alamat, kabupaten, provinsi, kategoriId} = CagarBudaya;
  const formData = new FormData();
  formData.append('nama', nama);
  formData.append('foto', foto);
  formData.append('deskripsi', deskripsi);
  formData.append('alamat', alamat);
  formData.append('kabupaten', kabupaten);
  formData.append('provinsi', provinsi);
  formData.append('kategoriId', kategoriId);

  axios.put(`http://localhost:4000/cagarbudaya/${id}`, formData, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token"),
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    if(res.status === 200) {
      swal({
        title: "Selamat!",
        text: `Data berhasil di diubah`,
        icon: "success",
        button: "Ok",
      }).then((result) => {
            window.location.href = `/admin/cagar-budaya`;
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

const deleteCagarBudaya = (id) => {
  axios.delete(`http://localhost:4000/cagarbudaya/${id}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token")
    }
  }).then(res => {
    if (res.status === 200) {
      swal({
        title: "Selamat!",
        text: `Data cagar budaya berhasil dihapus`,
        icon: "success",
      }).then((res) => {
        window.location.href = `/admin/cagar-budaya`;
      });
    }
  }).catch(err => {
      swal({
          title: "Gagal!",
          text: `${err.response.data}`,
          icon: "error",
          button: "Ok",
      });
  })
}

export {getAllCagarBudaya, getSinggleCagarBudaya, insertCagarBudaya, updateCagarBudaya, deleteCagarBudaya};