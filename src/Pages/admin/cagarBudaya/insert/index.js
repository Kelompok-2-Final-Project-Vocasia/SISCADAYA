import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarAdmin from '../../../../Components/Admin/NavbarAdmin';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { insertCagarBudaya } from '../../../../utils/cagarBudaya';
import { getAllCategory } from '../../../../utils/category';

const AdminInsertCagarBudayaPage = () => {
  const [nama, setNama] = useState('');
  const [foto, setFoto] = useState();
  const [img, setImg] = useState();
  const [deskripsi, setDeskripsi] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kategoriId, setKategoriId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllCategory().then(res => {
      setLoading(false)
      setCategories(res.data)
    })
  }, []);

  const onImageUpload = (ev) => {
    ev.preventDefault();
    const file = ev.target.files[0];
    setFoto(file);
    try {
        setImg(URL.createObjectURL(file));
    } catch (err) {
        console.log(err);
    }
}

  const onSubmit = (e) => {
    e.preventDefault()
    const cagarBudaya = { nama, foto, deskripsi, alamat, kabupaten, provinsi, kategoriId };
    insertCagarBudaya(cagarBudaya);
    // console.log(cagarBudaya)
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
        <h2 className='fw-bold text-center mb-2'>Tambah Cagar Budaya</h2>
        <div className='container col-md-8'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nama Cagar Budaya</Form.Label>
              <Form.Control type="text" name='nama' placeholder="Contoh: Barang" onChange={(ev) => setNama(ev.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Foto</Form.Label>
              {img && <img className="preview d-block mb-3" src={img} alt="preview" tabIndex="0" />}
              <Form.Control type="file" name='foto' placeholder="Contoh: Barang" onChange={(ev) => onImageUpload(ev)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control as="textarea" name='deskripsi' placeholder="Contoh: Barang" onChange={(ev) => setDeskripsi(ev.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Alamat</Form.Label>
              <Form.Control type="text" name='alamat' placeholder="Contoh: Barang" onChange={(ev) => setAlamat(ev.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kabupaten</Form.Label>
              <Form.Control type="text" name='kabupaten' placeholder="Contoh: Barang" onChange={(ev) => setKabupaten(ev.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Provinsi</Form.Label>
              <Form.Control type="text" name='provinsi' placeholder="Contoh: Barang" onChange={(ev) => setProvinsi(ev.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kategori</Form.Label>  
              <Form.Select className='mb-3' value={kategoriId} onChange={(ev) => setKategoriId(ev.target.value)}>
                <option value={''}>Pilih Kategori</option>
                {
                  categories?.map((data) => <option key={data.id} value={data.id}>{data.nama}</option>)
                }
              </Form.Select>
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

export default AdminInsertCagarBudayaPage;