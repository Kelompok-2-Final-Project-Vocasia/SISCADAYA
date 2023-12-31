const {Kategori, Cagarbudaya} = require('../models');

class KategoriController{
    static async createKategori(req,res){
        
        try{
            if(!req.authUser.isAdmin){
                return res.status(401).json({message: "akses hanya untuk admin"});
            }

            const {nama} = req.body;
            const newKategori = await Kategori.create({nama});
            return res.status(201).json(newKategori);
        }catch(err){
            console.log(err);
            return res.status(500).json({message: "internal server error"});
        }
    }

    static async getAllKategori(req,res){
        try{
            const kategoris = await Kategori.findAll();
            return res.status(200).json(kategoris);
        }catch(err){
            console.log(err);
            return res.status(500).json({message: "internal server error"});
        }
    }

    static async getKategoriById(req,res){
        const kategoriId = req.params.id;
        try{
            const kategori = await Kategori.findOne({
                where: {id: kategoriId},
                include: [{model: Cagarbudaya, as: 'cagarbudayas'}]
            });
            if(!kategori){
                return res.status(404).json({message: "kategori not found"});
            }
            return res.status(200).json(kategori);
        }catch(err){
            console.log(err);
            return res.status(500).json({message: "internal server error"});
        }
    }

    static async updateKategori(req,res){
        const kategoriId = req.params.id;
        try {
            if(!req.authUser.isAdmin){
                return res.status(401).json({message: "akses hanya untuk admin"});
            }
            const{nama} = req.body
            const existingKategori = await Kategori.findByPk(kategoriId);

            if(!existingKategori){
                return res.status(404).json({message: "kategori not found"});
            }

            existingKategori.nama = nama;

            await existingKategori.save();

            return res.status(200).json({message: "kategori updated"});
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});
        }
    }

    static async deleteKategori(req,res){
        const kategoriId = req.params.id;
        try {
            if(!req.authUser.isAdmin){
                return res.status(401).json({message: "akses hanya untuk admin"});
            }
            const existingKategori = await Kategori.findByPk(kategoriId);

            if(!existingKategori){
                return res.status(404).json({message: "kategori not found"});
            }
            await existingKategori.destroy();
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({message: "internal server error"});
        }
    }

}

module.exports = KategoriController