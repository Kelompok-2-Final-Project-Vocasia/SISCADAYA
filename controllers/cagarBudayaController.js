const {Cagarbudaya, Kategori, Comment} = require ('../models');

class CagarBudayaController{
    static async createCagarBudaya(req, res){
        try {
            if(!req.authUser.isAdmin){
                return res.status(401).json({message: "akses hanya untuk admin"});
            }

            const {nama, deskripsi, alamat, kabupaten, provinsi, kategoriId} = req.body;
            const foto = req.file.path

            let kategori;
            if (kategoriId) {
                kategori = await Kategori.findByPk(kategoriId);
            } else {
                kategori = await Kategori.findOne({ where: { nama } });
            }
    
            if (!kategori) {
                return res.status(404).json({ message: "Kategori not found" });
            }
          
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
            return res.status(201).json(newCagarBudaya)

        } catch (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});
        }
    }

    static async getAllCagarBudaya(req, res){
        try {
            const cagarBudayas = await Cagarbudaya.findAll({
                include :[
                    {model: Kategori, as: 'kategoris'},
                    {model: Comment, as: 'comments'}
                ]
            });
            return res.status(200).json(cagarBudayas);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});
        }
    }

    static async getCagarBudayaById(req, res){
        const cagarBudayaId = req.params.id;

        try {
            const cagarBudaya = await Cagarbudaya.findOne({
                where: {id: cagarBudayaId},
                include :[
                    {model: Kategori, as: 'kategoris'},
                    {model: Comment, as: 'comments'}
                ]
            });
            if (!cagarBudaya) {
                return res.status(404).json({message: "cagar budaya not found"});
            }

            return res.status(200).json(cagarBudaya);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});
        }
    }

    static async updateCagarBudaya(req, res){
        const cagarBudayaId = req.params.id;
        try {
            if(!req.authUser.isAdmin){
                return res.status(401).json({message: "akses hanya untuk admin"});
            }

            const{nama, deskripsi, alamat, kabupaten, provinsi, kategoriId} = req.body;
            const existingCagarBudaya = await Cagarbudaya.findByPk(cagarBudayaId);

            if(!existingCagarBudaya){
                return res.status(404).json({message: "cagar budaya not found"});
            }

            if(req.file){
                const fs = require('fs');
                fs.unlinkSync(existingCagarBudaya.foto)
                existingCagarBudaya.foto = req.file.path
            }

            existingCagarBudaya.nama = nama;
            existingCagarBudaya.deskripsi = deskripsi;
            existingCagarBudaya.alamat = alamat;
            existingCagarBudaya.kabupaten = kabupaten;
            existingCagarBudaya.provinsi = provinsi;

            await existingCagarBudaya.save();
            return res.status(200).json({message: "cagar budaya updated"});
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});
        }
    }

    static async deleteCagarBudaya(req, res){
        const cagarBudayaId = req.params.id
        try {
            if(!req.authUser.isAdmin){
                return res.status(401).json({message: "akses hanya untuk admin"});
            }

            const existingCagarBudaya = await Cagarbudaya.findByPk(cagarBudayaId);

            if(!existingCagarBudaya){
                return res.status(404).json({message: "cagar budaya not found"});
            }
            const fs = require('fs');
            fs.unlinkSync(existingCagarBudaya.foto);

            await Cagarbudaya.destroy({where: {id: cagarBudayaId}});
            return res.status(200).json({message: "cagar budaya deleted"});
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});            
        }
    }
}

module.exports = CagarBudayaController