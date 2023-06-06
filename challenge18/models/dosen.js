import { db } from "./connect.js";

export default class dosenModel {
  static daftarDosen(next) {
    db.all("select * from dosen", [], (err, rows) => {
      if (err) {
        return console.log(err);
      }
      next(rows);
    });
  }
  static cariDosen(ID, next) {
    db.get("select * from dosen where nip = ?", [ID], (err, rows) => {
      if (err) {
        return console.log(err);
      }
      next(rows);
    });
  }
  static tambahDosen(nip, namaDosen, alamat, next) {
    db.run(
      "INSERT into dosen (nip, namaDosen, alamat) values (?, ?, ?)",
      [nip, namaDosen, alamat],
      (err, rows) => {
        if (err) {
          return console.log(err);
        }
        next();
      }
    );
  }
  static hapusDosen(ID, next) {
    db.run("delete from dosen where nip = ?", [ID], (err) => {
      if (err) {
        console.log("hapus data dosen gagal");
      }
      next();
    });
  }
}
