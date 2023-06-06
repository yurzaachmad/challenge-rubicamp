import { db } from "./connect.js";

export default class jurusanModel {
  static daftarJurusan(next) {
    db.all("select * from jurusan", [], (err, rows) => {
      if (err) {
        return console.log(err);
      }
      next(rows);
    });
  }
  static cariJurusan(ID, next) {
    db.get("select * from jurusan where idJurusan = ?", [ID], (err, rows) => {
      if (err) {
        return console.log(err);
      }
      next(rows);
    });
  }
  static tambahJurusan(idJurusan, namaJurusan, next) {
    db.run(
      "INSERT into jurusan (idJurusan, namaJurusan) values (?, ?)",
      [idJurusan, namaJurusan],
      (err, rows) => {
        if (err) {
          return console.log(err);
        }
        next();
      }
    );
  }
  static hapusJurusan(ID, next) {
    db.run("delete from jurusan where idJurusan = ?", [ID], (err) => {
      if (err) {
        console.log("hapus data jurusan gagal");
      }
      next();
    });
  }
}
