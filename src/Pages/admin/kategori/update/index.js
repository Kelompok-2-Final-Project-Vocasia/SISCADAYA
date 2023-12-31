import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css'
import NavbarAdmin from '../../../../Components/Admin/NavbarAdmin';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getSinggleCategory, updateCategory } from '../../../../utils/category';

const AdminUpdateCategoryPage = (props) => {
  const [nama, setNama] = useState('');

  useEffect(() => {
    const id = props.match.params.id;

    if (id) {
      getSinggleCategory(id).then(res => setNama(res.nama)).catch(err => console.log(err));
    }
  }, [props.match.params.id]);

  const onSubmit = () => {
    const category = { nama };
    const id = props.match.params.id;
    updateCategory(category, id);
  }

  return (
    <>
      <NavbarAdmin />
      <div className='container mt-4'>
        <h2 className='fw-bold text-center mb-2'>Ubah Kategori</h2>
        <div className='container col-md-8'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control type="text" name='nama' placeholder="Contoh: Barang" value={nama} onChange={(ev) => setNama(ev.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onSubmit}>
              Simpan
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default AdminUpdateCategoryPage;