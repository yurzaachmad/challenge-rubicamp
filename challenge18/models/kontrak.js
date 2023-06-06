import { db } from "./connect.js";

export default class kontrakModel {
  static daftarKontrak(next) {
    db.all(
      `SELECT kontrak.idKontrak, mahasiswa.nim as nim, mahasiswa.nama AS nama_mahasiswa, mataKuliah.namaMataKuliah AS nama_mataKuliah, dosen.namaDosen as nama_dosen, kontrak.nilai
    FROM kontrak 
    JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
    JOIN dosen ON kontrak.nip = dosen.nip
    JOIN mataKuliah ON kontrak.idMataKuliah = mataKuliah.idMataKuliah`,
      [],
      (err, rows) => {
        if (err) {
          return console.log(err);
        }
        next(rows);
      }
    );
  }
  static cariKontrak(nim, next) {
    db.all(`SELECT * FROM kontrak WHERE nim = ?`, [nim], (err, rows) => {
      //   console.log(rows);
      if (err) {
        return console.log(err);
      }
      if (rows == 0) {
        console.log(`Kontrak dengan nim ${nim} tidak terdaftar`);
      }
      next(rows, nim);
    });
  }
  static tambahKontrak(nim, idMataKuliah, nip, next) {
    db.run(
      "INSERT into kontrak (nim, idMataKuliah, nip) values ( ?, ?, ?)",
      [nim, idMataKuliah, nip],
      (err, rows) => {
        if (err) {
          return console.log(err);
        }
        next();
      }
    );
  }
  static hapusKontrak(nim, next) {
    db.run("delete from kontrak where idKontrak = ?", [nim], (err) => {
      if (err) {
        console.log("hapus data Kontrak gagal");
      }
      next();
    });
  }
  static updateKontrak(idKontrak, nilai, next) {
    console.log(idKontrak, nilai);
    db.run(
      "UPDATE kontrak SET nilai = ? WHERE idKontrak = ?",
      [nilai, idKontrak],
      function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log("Nilai kontrak berhasil diperbarui.");
        }
        next();
      }
    );
  }
}
