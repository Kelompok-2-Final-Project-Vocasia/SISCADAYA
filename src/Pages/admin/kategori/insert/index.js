import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css'
import NavbarAdmin from '../../../../Components/Admin/NavbarAdmin';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { insertCategory } from '../../../../utils/category';

const AdminInsertCategoryPage = () => {
  const [nama, setNama] = useState('');

  const onSubmit = (e) => {
    e.preventDefault()
    const category = { nama };
    insertCategory(category);
    // console.log(localStorage.getItem("token"))
  }

  return (
    <>
      <NavbarAdmin />
      <div className='container mt-4'>
        <h2 className='fw-bold text-center mb-2'>Tambah Kategori</h2>
        <div className='container col-md-8'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control type="text" name='nama' placeholder="Contoh: Barang" onChange={(ev) => setNama(ev.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onSubmit}>
              Tambahkan
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default AdminInsertCategoryPage