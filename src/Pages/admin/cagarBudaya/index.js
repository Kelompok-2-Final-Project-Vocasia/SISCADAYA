import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarAdmin from '../../../Components/Admin/NavbarAdmin';
import Table from 'react-bootstrap/Table';
import { deleteCagarBudaya, getAllCagarBudaya } from '../../../utils/cagarBudaya';
import swal from 'sweetalert';

const AdminCagarBudayaPage = () => {
  const [cagarBudaya, setCagarBudaya] = useState([]);
  const [loading, setLoading] = useState(true);
  let no = 1;

  useEffect(() => {
    getAllCagarBudaya().then(res => {
      setCagarBudaya(res.data)
      setLoading(false)
    })
  }, []);

  const handleClick = (id) => {
    swal({
      title: "Hapus Data Cagar Budaya?",
      text: "Data cagar budaya akan dihapus permanen",
      icon: "warning",
      buttons: ["Batal", "Ok"],
      dangerMode: true,
  })
      .then((deleteData) => {
          if (deleteData) {
              setLoading(true);
              deleteCagarBudaya(id);
              setLoading(false);
          }
      })
  }

  if(loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <NavbarAdmin />
      <div className='container my-4'>
        <h2 className='fw-bold text-center mb-2'>Daftar Cagar Budaya</h2>
        <a href='/admin/cagar-budaya/tambah' className='btn btn-primary float-end mb-2 btn-sm'>Tambah Cagar Budaya +</a>
        <Table striped bordered hover>
          <thead>
            <tr className='text-center'>
              <th style={{width: 50}}>#</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th style={{width: 200}}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {
              cagarBudaya?.map(data => (
              <tr key={data.id}>
                <th className='text-center'>{no++}</th>
                <td>{data.nama}</td>
                <td>{data.kategoris.nama}</td>
                <td className='text-center'>
                  <a href={`cagar-budaya/edit/${data.id}`} className='btn btn-warning me-4 btn-sm'>Edit</a>
                  <button className='btn btn-danger btn-sm' onClick={() => handleClick(data.id)}>Hapus</button>
                </td>
              </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default AdminCagarBudayaPage;