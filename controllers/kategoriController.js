const {Kategori, Cagarbudaya} = require('../models');

class KategoriController{
    
    //funtion untuk mengambil semua data kategori
    static async getAllKategori(req,res){
        try{
            //mengambil semua data kategori
            const kategoris = await Kategori.findAll();
            return res.status(200).json(kategoris);
        }catch(err){
            //mengembalikan error jika terjadi kesalahan
            console.log(err);
            return res.status(500).json({message: "internal server error"});
        }
    }

    //function untuk mengambil data kategori berdasarkan id
    static async getKategoriById(req,res){
        const kategoriId = req.params.id;
        try{
            //mengambil data kategori berdasarkan id
            const kategori = await Kategori.findOne({
                where: {id: kategoriId},
                //mengambil semua relasi dari cagar budaya
                include: [{model: Cagarbudaya, as: 'cagarbudayas'}]
            });
            
            //jika data kategori tidak ditemukan mengembalikan error
            if(!kategori){
                return res.status(404).json({message: "kategori not found"});
            }

            return res.status(200).json(kategori);
        }catch(err){
            //mengembalikan error jika terjadi kesalahan
            console.log(err);
            return res.status(500).json({message: "internal server error"});
        }
    }
}

module.exports = KategoriController