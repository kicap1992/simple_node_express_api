const express = require('express');
const router = express.Router();

const { mahasiswaModel, infoMahasiswaModel } = require('../models/mahasiswaModel');

// create '/' get route
router.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to Kurir API' });
})

// create '/mahasiswa' post route
router.post('/mahasiswa', async (req, res) => {
  try {
    const body = req.body;

    if (!body.nim || !body.nama || !body.jurusan || !body.prodi || !body.kelas || !body.angkatan || !body.tanggal_lahir || !body.alamat || !body.no_hp) return res.status(400).send({ message: 'Please fill all required fields' });

    const cek_nim = await mahasiswaModel.exists({ nim: body.nim });
    if (cek_nim) return res.status(400).send({ message: 'NIM already exists' });

    

    let dataMahasiswa, dataInfoMahasiswa;

    // get nim,nama,jurusan,prodi,kelas,angkatan from body and save to dataMahasiswa 
    dataMahasiswa = {
      nim: body.nim,
      nama: body.nama,
      jurusan: body.jurusan,
      prodi: body.prodi,
      kelas: body.kelas,
      angkatan: body.angkatan
    }



    // create new dataMahasiswa and dataInfoMahasiswa
    const newMahasiswa = new mahasiswaModel(dataMahasiswa);

    dataInfoMahasiswa = {
      id_mahasiswa: newMahasiswa._id,
      tanggal_lahir: body.tanggal_lahir,
      alamat: body.alamat,
      no_hp: body.no_hp
    }

    const newInfoMahasiswa = new infoMahasiswaModel(dataInfoMahasiswa);

    // save dataMahasiswa and dataInfoMahasiswa to database
    await newMahasiswa.save();
    await newInfoMahasiswa.save();

    res.status(201).send({ message: 'Data mahasiswa berhasil ditambahkan', dataMahasiswa, dataInfoMahasiswa });
  } catch (error) {
    res.status(500).send({ message: error.message });


  }

})

// create '/mahasiswa' get route
router.get('/mahasiswa', async (req, res) => {
  try {
    const allMahasiswa = await mahasiswaModel.find();
    res.status(200).send({ message: 'Data mahasiswa berhasil ditampilkan', allMahasiswa });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
})

// create '/mahasiswa/:nim' get route
router.get('/mahasiswa/:nim', async (req, res) => {
  try {
    const nim = req.params.nim;
    const mahasiswa = await mahasiswaModel.findOne({ nim: nim });
    if (!mahasiswa) return res.status(404).send({ message: 'Mahasiswa not found' });
    res.status(200).send({ message: 'Data mahasiswa berhasil ditampilkan', mahasiswa });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
})

// create '/mahasiswa/:nim' put route
router.put('/mahasiswa/:nim', async (req, res) => {
  try {
    const nim = req.params.nim;
    const body = req.body;

    if (!body.nama || !body.jurusan || !body.prodi || !body.kelas || !body.angkatan || !body.tanggal_lahir || !body.alamat || !body.no_hp) return res.status(400).send({ message: 'Please fill all required fields' });

    const mahasiswa = await mahasiswaModel.findOne({ nim: nim });
    if (!mahasiswa) return res.status(404).send({ message: 'Mahasiswa not found' });

    const dataMahasiswa = {
      nama: body.nama,
      jurusan: body.jurusan,
      prodi: body.prodi,
      kelas: body.kelas,
      angkatan: body.angkatan
    }

    const dataInfoMahasiswa = {
      tanggal_lahir: body.tanggal_lahir,
      alamat: body.alamat,
      no_hp: body.no_hp
    }

    await mahasiswaModel.findOneAndUpdate({ nim: nim }, dataMahasiswa);
    await infoMahasiswaModel.findOneAndUpdate({ id_mahasiswa: mahasiswa._id }, dataInfoMahasiswa);

    res.status(200).send({ message: 'Data mahasiswa berhasil diubah', dataMahasiswa, dataInfoMahasiswa });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
})

// create '/mahasiswa/:nim' delete route
router.delete('/mahasiswa/:nim', async (req, res) => {
  try {
    const nim = req.params.nim;
    const mahasiswa = await mahasiswaModel.findOne({ nim: nim });
    if (!mahasiswa) return res.status(404).send({ message: 'Mahasiswa not found' });

    await mahasiswaModel.findOneAndDelete({ nim: nim });
    await infoMahasiswaModel.findOneAndDelete({ id_mahasiswa: mahasiswa._id });

    res.status(200).send({ message: 'Data mahasiswa berhasil dihapus' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
})

module.exports = router;