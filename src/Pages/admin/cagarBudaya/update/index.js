import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarAdmin from '../../../../Components/Admin/NavbarAdmin';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllCategory } from '../../../../utils/category';
import { useParams } from 'react-router';
import { getSinggleCagarBudaya, updateCagarBudaya } from '../../../../utils/cagarBudaya';

const AdminUpdateCagarBudayaPage = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  const [nama, setNama] = useState('');
  const [foto, setFoto] = useState();
  const [img, setImg] = useState();
  const [deskripsi, setDeskripsi] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kategoriId, setKategoriId] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSinggleCagarBudaya(id).then(res =>{
      setNama(res.data.nama)
      if(res.data.foto) {
        setImg('http://localhost:4000/uploads/foto-1703602459264-73639375.jpg')
      }
      // setImg('http://localhost:4000' + res.data.foto)
      setDeskripsi(res.data.deskripsi)
      setAlamat(res.data.alamat)
      setKabupaten(res.data.kabupaten)
      setProvinsi(res.data.provinsi)
      setKategoriId(res.data.kategoriId)
    })
    
    getAllCategory().then(res => {
      setLoading(false)
      setCategories(res.data)
    });
  }, [id]);

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
    // insertCagarBudaya(cagarBudaya);
    console.log(cagarBudaya)
    updateCagarBudaya(cagarBudaya, id);
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
        <h2 className='fw-bold text-center mb-2'>Ubah Cagar Budaya</h2>
        <div className='container col-md-8'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nama Cagar Budaya</Form.Label>
              <Form.Control type="text" name='nama' value={nama} placeholder="Contoh: Barang" onChange={(ev) => setNama(ev.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Foto</Form.Label>
              {img && <img className="preview d-block mb-3" src={img} alt="preview" tabIndex="0" />}
              <Form.Control type="file" name='foto' placeholder="Contoh: Barang" onChange={(ev) => onImageUpload(ev)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control as="textarea" name='deskripsi' value={deskripsi} placeholder="Contoh: Barang" onChange={(ev) => setDeskripsi(ev.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Alamat</Form.Label>
              <Form.Control type="text" name='alamat' value={alamat} placeholder="Contoh: Barang" onChange={(ev) => setAlamat(ev.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kabupaten</Form.Label>
              <Form.Control type="text" name='kabupaten' value={kabupaten} placeholder="Contoh: Barang" onChange={(ev) => setKabupaten(ev.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Provinsi</Form.Label>
              <Form.Control type="text" name='provinsi' value={provinsi} placeholder="Contoh: Barang" onChange={(ev) => setProvinsi(ev.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kategori</Form.Label>  
              <Form.Select className='mb-3' value={kategoriId} onChange={(ev) => setKategoriId(ev.target.value)}>
                <option value={''}>Pilih Kategori</option>
                {
                  categories?.map((data) => <option key={data.id} value={data.id} >{data.nama}</option>)
                }
              </Form.Select>
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

export default AdminUpdateCagarBudayaPage