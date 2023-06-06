import { db } from "./connect.js";

export default class matakuliahModel {
  static daftarMatakuliah(next) {
    db.all("select * from MataKuliah", [], (err, rows) => {
      if (err) {
        return console.log(err);
      }
      next(rows);
    });
  }
  static cariMatakuliah(ID, next) {
    db.get(
      "select * from MataKuliah where idMataKuliah = ?",
      [ID],
      (err, rows) => {
        if (err) {
          return console.log(err);
        }
        next(rows);
      }
    );
  }
  static tambahMatakuliah(idMataKuliah, namaMataKuliah, sks, next) {
    db.run(
      "INSERT into MataKuliah (idMataKuliah, namaMataKuliah, sks) values (?, ?, ?)",
      [idMataKuliah, namaMataKuliah, sks],
      (err, rows) => {
        if (err) {
          return console.log(err);
        }
        next();
      }
    );
  }
  static hapusMatakuliah(ID, next) {
    db.run("delete from MataKuliah where idMataKuliah = ?", [ID], (err) => {
      if (err) {
        console.log("hapus data MataKuliah gagal");
      }
      next();
    });
  }
}
