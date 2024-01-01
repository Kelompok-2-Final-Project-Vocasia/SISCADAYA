const {Cagarbudaya, Kategori, Comment} = require ('../models');

class CagarBudayaController{

    //Function untuk Create CagarBudaya
    static async createCagarBudaya(req, res){
        try {
            //mengecek apakah user admin atau bukan
            if(!req.authUser.isAdmin){
                return res.status(401).json({message: "akses hanya untuk admin"});
            }

            //mengambil data dari body request
            const {nama, deskripsi, alamat, kabupaten, provinsi, kategoriId} = req.body;
            const foto = req.file.path //mengambil path file yang akan diunggah

            //mencari kategori berdasarkan id atau nama
            let kategori;
            if (kategoriId) {
                kategori = await Kategori.findByPk(kategoriId);
            } else {
                kategori = await Kategori.findOne({ where: { nama } });
            }

            //jika kategori tidak ditemukan mengembalikan error
            if (!kategori) {
                return res.status(404).json({ message: "Kategori not found" });
            }
          
            //membuat data CagarBudaya
            const newCagarBudaya = await Cagarbudaya.create({
                nama,
                deskripsi,
                alamat,
                kabupaten,
                provinsi,
                foto,
                kategoriId: kategori.id,
                userId: req.authUser.id
            })
            //jika berhasil buat cagar budaya memberikan respon berupa data CagarBudaya
            return res.status(201).json(newCagarBudaya)

        } catch (error) {
            //mengembalikan error jika terjadi kesalahan
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});
        }
    }

    //Function untuk mengambil semua data CagarBudaya
    static async getAllCagarBudaya(req, res){

        //mengambil semua data CagarBudaya
        try {
            const cagarBudayas = await Cagarbudaya.findAll({
                //mengambil semua relasi dari kategori dan comment
                include :[
                    {model: Kategori, as: 'kategoris'},
                    {model: Comment, as: 'comments'}
                ]
            });
            return res.status(200).json(cagarBudayas);
        } catch (error) {
            //mengembalikan error jika terjadi kesalahan
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});
        }
    }

    //Function untuk mengambil data CagarBudaya berdasarkan id
    static async getCagarBudayaById(req, res){
        const cagarBudayaId = req.params.id;

        try {
            //mengambil data CagarBudaya berdasarkan id
            const cagarBudaya = await Cagarbudaya.findOne({
                where: {id: cagarBudayaId},
                //mengambil semua relasi dari kategori dan comment
                include :[
                    {model: Kategori, as: 'kategoris'},
                    {model: Comment, as: 'comments'}
                ]
            });
            //jika data CagarBudaya tidak ditemukan mengembalikan error
            if (!cagarBudaya) {
                return res.status(404).json({message: "cagar budaya not found"});
            }

            //mengembalikan data CagarBudaya jika ditemukan
            return res.status(200).json(cagarBudaya);
        } catch (error) {

            //mengembalikan error jika terjadi kesalahan
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});
        }
    }

    //Function untuk update CagarBudaya
    static async updateCagarBudaya(req, res){
        const cagarBudayaId = req.params.id;

        //mengecek apakah user admin atau bukan
        try {
            if(!req.authUser.isAdmin){
                return res.status(401).json({message: "akses hanya untuk admin"});
            }

            //mengambil data dari body request untuk update cagar budaya
            const{nama, deskripsi, alamat, kabupaten, provinsi, kategoriId} = req.body;
            const existingCagarBudaya = await Cagarbudaya.findByPk(cagarBudayaId);

            //jika data CagarBudaya tidak ditemukan mengembalikan error
            if(!existingCagarBudaya){
                return res.status(404).json({message: "cagar budaya not found"});
            }

            //mengambil path file yang diunggah
            if(req.file){
                //menghapus file lama dan mengupload file baru
                const fs = require('fs');
                fs.unlinkSync(existingCagarBudaya.foto)
                existingCagarBudaya.foto = req.file.path
            }

            //mengupdate data CagarBudaya
            existingCagarBudaya.nama = nama;
            existingCagarBudaya.deskripsi = deskripsi;
            existingCagarBudaya.alamat = alamat;
            existingCagarBudaya.kabupaten = kabupaten;
            existingCagarBudaya.provinsi = provinsi;

            //menyimpan data yang diupdate
            await existingCagarBudaya.save();
            return res.status(200).json({message: "cagar budaya updated"});
        } catch (error) {
            //mengembalikan error jika terjadi kesalahan
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});
        }
    }

    //Function untuk delete CagarBudaya
    static async deleteCagarBudaya(req, res){
        const cagarBudayaId = req.params.id
        try {
            //mengecek apakah user admin atau bukan
            if(!req.authUser.isAdmin){
                return res.status(401).json({message: "akses hanya untuk admin"});
            }
            //mengambil data CagarBudaya berdasarkan id
            const existingCagarBudaya = await Cagarbudaya.findByPk(cagarBudayaId);

            if(!existingCagarBudaya){
                return res.status(404).json({message: "cagar budaya not found"});
            }
            //menghapus file lama
            const fs = require('fs');
            fs.unlinkSync(existingCagarBudaya.foto);

            //menghapus data CagarBudaya
            await Cagarbudaya.destroy({where: {id: cagarBudayaId}});
            return res.status(200).json({message: "cagar budaya deleted"});
        } catch (error) {
            //mengembalikan error jika terjadi kesalahan
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});            
        }
    }
}

module.exports = CagarBudayaController