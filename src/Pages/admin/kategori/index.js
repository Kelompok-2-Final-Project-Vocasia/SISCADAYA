import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../../Components/Admin/NavbarAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Table from 'react-bootstrap/Table';
import { getAllCategory } from '../../../utils/category';

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  let no = 1;

  useEffect(() => {
    getAllCategory().then(res => {
      setLoading(false)
      setCategories(res.data)
    })
  }, []);

  if(loading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <>
      <NavbarAdmin />
      <div className='container mt-4'>
        <h2 className='fw-bold text-center mb-2'>Daftar Kategori</h2>
        <Table striped bordered hover>
          <thead>
            <tr className='text-center'>
              <th style={{width: 50}}>#</th>
              <th>Nama Kategori</th>
              <th style={{width: 200}}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {
              categories?.map(data => (
              <tr key={data.id}>
                <td className='text-center'>{no++}</td>
                <td>{data.nama}</td>
                <td className='text-center'>
                  <a href={`/edit/${data.id}`} className='btn btn-warning me-4 btn-sm'>Edit</a>
                  <a  href={`/hapus/${data.id}`} className='btn btn-danger btn-sm'>Hapus</a>
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

export default AdminCategoryPage