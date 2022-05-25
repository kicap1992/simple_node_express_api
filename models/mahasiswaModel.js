const mongoose = require('mongoose');

const mahasiswaSchema = new mongoose.Schema({
  nim: {
    type: String,
    required: true,
    unique: true,
    minlength: 9,
    maxlength: 10
  },
  nama: {
    type: String,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
  prodi: {
    type: String,
    required: true,
  },
  kelas: {
    type: String,
    required: true,
  },
  angkatan: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

const infoMahasiswaSchema = new mongoose.Schema({
  id_mahasiswa: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  tanggal_lahir: {
    type: Date,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  no_hp: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

const mahasiswaModel = mongoose.model('mahasiswa_col', mahasiswaSchema, 'mahasiswa_col');

const infoMahasiswaModel = mongoose.model('infoMahasiswa_col', infoMahasiswaSchema, 'infoMahasiswa_col');

module.exports = { mahasiswaModel, infoMahasiswaModel };