import { db } from "./connect.js";

export default class mahasiswaModel {
  static daftarMahasiswa(next) {
    db.all("select * from mahasiswa", [], (err, rows) => {
      if (err) {
        return console.log(err);
      }
      next(rows);
    });
  }
  static cariMahasiswa(nim, next) {
    db.get("select * from mahasiswa where nim = ?", [nim], (err, rows) => {
      if (err) {
        return console.log(err);
      }
      next(rows);
    });
  }
  static tambahMahasiswa(nim, nama, tanggalLahir, alamat, idJurusan, next) {
    db.run(
      "INSERT into mahasiswa (nim, nama, tanggalLahir, alamat, idJurusan) values ( ?, ?, ?, ?, ?)",
      [nim, nama, tanggalLahir, alamat, idJurusan],
      (err, rows) => {
        if (err) {
          return console.log(err);
        }
        next();
      }
    );
  }
  static hapusMahasiswa(nim, next) {
    db.run("delete from mahasiswa where nim = ?", [nim], (err) => {
      if (err) {
        console.log("hapus data mahasiswa gagal");
      }
      next();
    });
  }
}
