const sqlite3 = require("sqlite3").verbose();

var Table = require("cli-table");
const readline = require("node:readline");
const db = new sqlite3.Database("university.db");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// Fungsi untuk melakukan proses login
function login() {
  rl.question("Username: ", (userName) => {
    rl.question("Password: ", (passWord) => {
      // Mengambil data user dari basis data berdasarkan username yang diberikan
      db.get(
        "SELECT * FROM logIn WHERE userName = ? AND passWord = ?",
        [userName, passWord],
        (err, row) => {
          if (err) {
            console.log(err);
            return;
          }

          if (row) {
            console.log(`selamat datang, ${row.userName}`);
            listHome();
          } else {
            console.log("Username atau password salah");
            return login();
          }
        }
      );
    });
  });
}

login();

// list home
function listHome() {
  console.log(`
  silahkan pilih opsi dibawah ini:
  [1] Mahasiswa
  [2] Jurusan
  [3] Dosen
  [4] Matakuliah
  [5] Kontrak
  [6] Keluar`);

  // console.log("masukkan salah satu nomor diatas:");
  rl.question("masukkan salah satu nomor diatas: ", (index) => {
    // console.log(index);
    switch (index) {
      case "1":
        mahasiswa.listMahasiswa();
        break;
      case "2":
        jurusan.listJurusan();
        break;
      case "3":
        console.log("masuk");
        dosen.listDosen();
        break;
      case "4":
        console.log("masuk");
        matkul.listMatkul();
        break;
      case "5":
        console.log("masuk");
        kontrak.listKontrak();
        break;
      case "6":
        console.log("masuk");
        login();
        break;
    }
  });
}
// menampilkan pilihan mahasiswa
class mahasiswa {
  static listMahasiswa() {
    console.log(`
    silahkan pilih opsi dibawah ini
    [1] Daftar Mahasiswa
    [2] Cari Mahasiswa
    [3] Tambah Mahasiswa
    [4] Hapus Mahasiswa
    [5] Kembali`);

    rl.question("masukkan salah satu nomor diatas: ", (index) => {
      // console.log(index);
      switch (index) {
        case "1":
          mahasiswa.daftarMahasiswa();
          break;
        case "2":
          mahasiswa.matchingMahasiswa();
          break;
        case "3":
          mahasiswa.addMahasiswa();
          break;
        case "4":
          mahasiswa.deleteMahasiswa();
          break;
        case "5":
          mahasiswa.backHome();
          break;
        // case "6":
        //   console.log("masuk");
        //   login();
        //   break;
      }
    });
  }

  // Menampilkan daftar mahasiswa
  static daftarMahasiswa() {
    db.all(
      "SELECT * FROM mahasiswa JOIN jurusan using(idJurusan)",
      (err, rows) => {
        // console.log(rows);
        if (err) {
          console.error(err);
        } else {
          const table = new Table({
            head: ["NIM", "Nama", "Tanggal Lahir", "Alamat", "Jurusan"],
            colWidths: [10, 15, 15, 20, 20],
          });
          // console.log(rows);
          rows.forEach((row) => {
            // console.log(row);
            table.push([
              row.nim,
              row.nama,
              row.tanggalLahir,
              row.alamat,
              row.namaJurusan,
            ]);
          });
          console.log(table.toString());
          mahasiswa.listMahasiswa();
        }
      }
    );
  }
  //menampilkan pencarian mahasiswa berdasarkan nim
  static matchingMahasiswa() {
    rl.question("masukan nim: ", (NIM) => {
      db.get(
        "SELECT * from mahasiswa join jurusan using(idJurusan) where nim = ?",
        [NIM],
        (err, row) => {
          if (err) {
            return console.log(err);
          }
          if (row) {
            const table = new Table({
              head: ["NIM", "Nama", "Tanggal Lahir", "Alamat", "Jurusan"],
              colWidths: [10, 15, 15, 20, 20],
            });
            table.push([
              row.nim,
              row.nama,
              row.tanggalLahir,
              row.alamat,
              row.namaJurusan,
            ]);
            // console.log(row);
            console.log(table.toString());
            mahasiswa.listMahasiswa();
          } else {
            console.log(`Mahasiswa dengan nim ${NIM}, tidak terdaftar`);
            mahasiswa.listMahasiswa();
          }
        }
      );
    });
  }
  //menambahkan data mahasiswa
  static addMahasiswa() {
    console.log("Lengkapi data dibawah ini: ");
    db.all("SELECT * FROM mahasiswa", (err, rows) => {
      // console.log(rows);
      if (err) {
        console.error(err);
      } else {
        const table = new Table({
          head: ["NIM", "Nama", "Tanggal Lahir", "Alamat"],
          colWidths: [10, 15, 15, 20],
        });
        // console.log(rows);
        rows.forEach((row) => {
          // console.log(row);
          table.push([row.nim, row.nama, row.tanggalLahir, row.alamat]);
        });
        console.log(table.toString());
        // listMahasiswa();
        rl.question("NIM :", (nim) => {
          rl.question("Nama :", (nama) => {
            rl.question("Tanggal lahir :", (tanggalLahir) => {
              rl.question("Alamat :", (alamat) => {
                db.all("select * from jurusan", (err, rows) => {
                  if (err) {
                    return console.log(err);
                  } else {
                    const table = new Table({
                      head: ["ID", "Nama jurusan"],
                      colWidths: [10, 15],
                    });
                    // console.log(rows);
                    rows.forEach((row) => {
                      // console.log(row);
                      table.push([row.idJurusan, row.namaJurusan]);
                    });
                    console.log(table.toString());
                    // console.log(rows);
                    rl.question("Kode jurusan :", (idJurusan) => {
                      db.run(
                        "INSERT into mahasiswa (nim, nama, tanggalLahir, alamat, idJurusan) values ( ?, ?, ?, ?, ?)",
                        [nim, nama, tanggalLahir, alamat, idJurusan],
                        (err, rows) => {
                          if (err) {
                            return console.log(err);
                          } else {
                            // console.log(rows);
                            console.log("data insert sukses");
                            mahasiswa.daftarMahasiswa();
                          }
                        }
                      );
                      // console.log(nim, nama, tanggalLahir, alamat, idJurusan);
                    });
                  }
                });
              });
            });
          });
        });
      }
    });
    // listMahasiswa();
  }
  // menghapus data mahasiswa
  static deleteMahasiswa() {
    rl.question("Masukkan NIM mahasiswa :", (nim) => {
      db.run("DELETE FROM mahasiswa where nim = ?", [nim], function (err) {
        if (err) {
          console.log(err);
          return;
        }
        if (this.changes > 0) {
          console.log(`Mahasiswa dengan nim ${nim} telah dihapus`);
          mahasiswa.listMahasiswa();
        } else {
          console.log(`Mahasiswa dengan nim ${nim} tidak ada!`);
          mahasiswa.listMahasiswa();
        }
      });
    });
  }

  // kembali ke menu utama

  static backHome() {
    listHome();
  }
}

// masuk ke menu jurusan
class jurusan {
  static listJurusan() {
    console.log(`
    silahkan pilih opsi dibawah ini
    [1] Daftar Jurusan
    [2] Cari Jurusan
    [3] Tambah Jurusan
    [4] Hapus Jurusan
    [5] Kembali`);

    rl.question("masukkan salah satu nomor diatas: ", (index) => {
      // console.log(index);
      switch (index) {
        case "1":
          jurusan.daftarJurusan();
          break;
        case "2":
          jurusan.matchingJurusan();
          break;
        case "3":
          jurusan.addJurusan();
          break;
        case "4":
          jurusan.deleteJurusan();
          break;
        case "5":
          jurusan.homeJurusan();
          break;
      }
    });
  }
  static daftarJurusan() {
    db.all("SELECT * FROM jurusan", (err, rows) => {
      // console.log(rows);
      if (err) {
        console.error(err);
      } else {
        const table = new Table({
          head: ["Kode Jurusan", "Nama Jurusan"],
          colWidths: [20, 20],
        });
        // console.log(rows);
        rows.forEach((row) => {
          // console.log(row);
          table.push([row.idJurusan, row.namaJurusan]);
        });
        console.log(table.toString());
        jurusan.listJurusan();
      }
    });
  }
  static matchingJurusan() {
    rl.question("masukan kode Jurusan: ", (kode) => {
      db.get(
        "SELECT * from jurusan where idJurusan = ?",
        [kode],
        (err, row) => {
          if (err) {
            return console.log(err);
          }
          if (row) {
            const table = new Table({
              head: ["Kode jurusan", "Nama Jurusan"],
              colWidths: [20, 20],
            });
            table.push([row.idJurusan, row.namaJurusan]);
            // console.log(row);
            console.log(table.toString());
            jurusan.listJurusan();
          } else {
            console.log(`Jurusan dengan kode ${NIM}, tidak terdaftar`);
            jurusan.listJurusan();
          }
        }
      );
    });
  }
  static addJurusan() {
    console.log("Lengkapi data dibawah ini: ");
    db.all("SELECT * FROM jurusan", (err, rows) => {
      // console.log(rows);
      if (err) {
        console.error(err);
      } else {
        const table = new Table({
          head: ["Kode Jurusan", "Nama Jurusan"],
          colWidths: [15, 20],
        });
        // console.log(rows);
        rows.forEach((row) => {
          // console.log(row);
          table.push([row.idJurusan, row.namaJurusan]);
        });
        console.log(table.toString());
        // listMahasiswa();
        rl.question("Kode Jurusan :", (idJurusan) => {
          rl.question("Nama Jurusan :", (namaJurusan) => {
            db.all("select * from jurusan", (err, rows) => {
              if (err) {
                return console.log(err);
              } else {
                const table = new Table({
                  head: ["ID", "Nama jurusan"],
                  colWidths: [10, 15],
                });
                console.log(table.toString());
                // console.log(rows);
                db.run(
                  "INSERT into jurusan (idJurusan, namaJurusan) values (?, ?)",
                  [idJurusan, namaJurusan],
                  (err, rows) => {
                    console.log(rows);
                    if (err) {
                      return console.log(err);
                    } else {
                      // console.log(rows);
                      console.log("data insert sukses");
                      jurusan.daftarJurusan();
                    }
                  }
                );
                // console.log(nim, nama, tanggalLahir, alamat, idJurusan);
              }
            });
          });
        });
      }
    });
  }
  static deleteJurusan() {
    rl.question("Masukkan kode jurusan :", (idJurusan) => {
      db.run(
        "DELETE FROM jurusan where idJurusan = ?",
        [idJurusan],
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          if (this.changes > 0) {
            console.log(`Jurusan dengan ID ${idJurusan} telah dihapus`);
            jurusan.listJurusan();
          } else {
            console.log(`Jurusan dengan ID ${idJurusan} tidak ada!`);
            jurusan.listJurusan();
          }
        }
      );
    });
  }
  static homeJurusan() {
    listHome();
  }
}

// masuk ke menu dosen
class dosen {
  static listDosen() {
    console.log(`
    silahkan pilih opsi dibawah ini
    [1] Daftar Dosen
    [2] Cari Dosen
    [3] Tambah Dosen
    [4] Hapus Dosen
    [5] Kembali`);

    rl.question("masukkan salah satu nomor diatas: ", (index) => {
      // console.log(index);
      switch (index) {
        case "1":
          dosen.daftarDosen();
          break;
        case "2":
          dosen.matchingDosen();
          break;
        case "3":
          dosen.addDosen();
          break;
        case "4":
          dosen.deleteDosen();
          break;
        case "5":
          dosen.homeDosen();
          break;
      }
    });
  }
  static daftarDosen() {
    db.all("SELECT * FROM dosen", (err, rows) => {
      // console.log(rows);
      if (err) {
        console.error(err);
      } else {
        const table = new Table({
          head: ["NIP", "Nama dosen", "Alamat"],
          colWidths: [10, 10, 10],
        });
        // console.log(rows);
        rows.forEach((row) => {
          // console.log(row);
          table.push([row.nip, row.namaDosen, row.alamat]);
        });
        console.log(table.toString());
        dosen.listDosen();
      }
    });
  }
  static matchingDosen() {
    rl.question("masukan kode Dosen: ", (kode) => {
      db.get("SELECT * from dosen where nip = ?", [kode], (err, row) => {
        if (err) {
          return console.log(err);
        }
        if (row) {
          const table = new Table({
            head: ["NIP", "Nama dosen", "Alamat"],
            colWidths: [10, 10, 10],
          });
          table.push([row.nip, row.namaDosen, row.alamat]);
          // console.log(row);
          console.log(table.toString());
          dosen.listDosen();
        } else {
          console.log(`Dosen dengan nip ${kode}, tidak terdaftar`);
          dosen.listDosen();
        }
      });
    });
  }
  static addDosen() {
    console.log("Lengkapi data dibawah ini: ");
    db.all("SELECT * FROM dosen", (err, rows) => {
      // console.log(rows);
      if (err) {
        console.error(err);
      } else {
        const table = new Table({
          head: ["NIP", "Nama dosen", "Alamat"],
          colWidths: [10, 10, 10],
        });
        // console.log(rows);
        rows.forEach((row) => {
          // console.log(row);

          table.push([row.nip, row.namaDosen, row.alamat]);
        });
        console.log(table.toString());
        // listMahasiswa();
        rl.question("Kode NIP Dosen :", (nip) => {
          rl.question("Nama Dosen :", (namaDosen) => {
            rl.question("Alamat :", (alamat) => {
              db.all("select * from dosen", (err, rows) => {
                if (err) {
                  return console.log(err);
                } else {
                  const table = new Table({
                    head: ["NIP", "Nama Dosen", "Alamat"],
                    colWidths: [10, 10, 10],
                  });
                  console.log(table.toString());
                  // console.log(rows);
                  db.run(
                    "INSERT into dosen (nip, namaDosen, alamat) values (?, ?, ?)",
                    [nip, namaDosen, alamat],
                    (err, rows) => {
                      // console.log(rows);
                      if (err) {
                        return console.log(err);
                      } else {
                        // console.log(rows);
                        console.log("data insert sukses");
                        dosen.daftarDosen();
                      }
                    }
                  );
                  // console.log(nim, nama, tanggalLahir, alamat, idJurusan);
                }
              });
            });
          });
        });
      }
    });
  }
  static deleteDosen() {
    rl.question("Masukkan kode NIP dosen :", (nip) => {
      db.run("DELETE FROM dosen where nip = ?", [nip], function (err) {
        if (err) {
          console.log(err);
          return;
        }
        if (this.changes > 0) {
          console.log(`Dosen dengan NIP ${nip} telah dihapus`);
          dosen.listDosen();
        } else {
          console.log(`Dosen dengan NIP ${nip} tidak ada!`);
          dosen.listDosen();
        }
      });
    });
  }
  static homeDosen() {
    listHome();
  }
}

// masuk ke menu mata kuliah
class matkul {
  static listMatkul() {
    console.log(`
    silahkan pilih opsi dibawah ini
    [1] Daftar Matakuliah
    [2] Cari Matakuliah
    [3] Tambah Matakuliah
    [4] Hapus Matakuliah
    [5] Kembali`);

    rl.question("masukkan salah satu nomor diatas: ", (index) => {
      // console.log(index);
      switch (index) {
        case "1":
          matkul.daftarMatkul();
          break;
        case "2":
          matkul.matchingMatkul();
          break;
        case "3":
          matkul.addMatkul();
          break;
        case "4":
          matkul.deleteMatkul();
          break;
        case "5":
          matkul.homeMatkul();
          break;
      }
    });
  }
  static daftarMatkul() {
    db.all("SELECT * FROM mataKuliah", (err, rows) => {
      // console.log(rows);
      if (err) {
        console.error(err);
      } else {
        const table = new Table({
          head: ["Id Matakuliah", "Nama Matakuliah", "SKS"],
          colWidths: [15, 15, 10],
        });
        // console.log(rows);
        rows.forEach((row) => {
          // console.log(row);
          table.push([row.idMataKuliah, row.namaMataKuliah, row.sks]);
        });
        console.log(table.toString());
        matkul.listMatkul();
      }
    });
  }
  static matchingMatkul() {
    rl.question("masukan kode matakuliah: ", (kode) => {
      db.get(
        "SELECT * from mataKuliah where idMataKuliah = ?",
        [kode],
        (err, row) => {
          if (err) {
            return console.log(err);
          }
          if (row) {
            const table = new Table({
              head: ["ID matakuliah", "Nama Matakuliah", "SKS"],
              colWidths: [15, 15, 10],
            });
            table.push([row.idMataKuliah, row.namaMataKuliah, row.sks]);
            // console.log(row);
            console.log(table.toString());
            matkul.listMatkul();
          } else {
            console.log(`Matakuliah dengan id ${kode}, tidak terdaftar`);
            matkul.listMatkul();
          }
        }
      );
    });
  }
  static addMatkul() {
    console.log("Lengkapi data dibawah ini: ");
    db.all("SELECT * FROM mataKuliah", (err, rows) => {
      // console.log(rows);
      if (err) {
        console.error(err);
      } else {
        const table = new Table({
          head: ["ID matakuliah", "Nama Matakuliah", "SKS"],
          colWidths: [15, 15, 10],
        });
        // console.log(rows);
        rows.forEach((row) => {
          // console.log(row);

          table.push([row.idMataKuliah, row.namaMataKuliah, row.sks]);
        });
        console.log(table.toString());
        // listMahasiswa();
        // console.log(table);
        rl.question("ID matakuliah :", (id) => {
          rl.question("Nama Matakuliah :", (namaMataKuliah) => {
            rl.question("SKS :", (sks) => {
              db.all("select * from mataKuliah", (err, rows) => {
                if (err) {
                  return console.log(err);
                } else {
                  const table = new Table({
                    head: ["ID Matakuliah", "Nama Matakuliah", "SKS"],
                    colWidths: [15, 15, 10],
                  });
                  console.log(table.toString());
                  // console.log(rows);
                  db.run(
                    "INSERT into mataKuliah (idMataKuliah, namaMataKuliah, sks) values (?, ?, ?)",
                    [id, namaMataKuliah, sks],
                    (err, rows) => {
                      // console.log(rows);
                      if (err) {
                        return console.log(err);
                      } else {
                        // console.log(rows);
                        console.log("data insert sukses");
                        matkul.daftarMatkul();
                      }
                    }
                  );
                  // console.log(nim, nama, tanggalLahir, alamat, idJurusan);
                }
              });
            });
          });
        });
      }
    });
  }
  static deleteMatkul() {
    rl.question("Masukkan kode Matakuliah: ", (ID) => {
      db.run(
        "delete from mataKuliah where idMataKuliah = ?",
        [ID],
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          if (this.changes > 0) {
            console.log(`Matakuliah dengan ID ${ID} telah dihapus`);
            matkul.listMatkul();
          } else {
            console.log(`Matakuliah dengan ID ${ID} tidak ada!`);
            matkul.listMatkul();
          }
        }
      );
    });
  }

  static homeMatkul() {
    listHome();
  }
}

class kontrak {
  static listKontrak() {
    console.log(`
    silahkan pilih opsi dibawah ini
    [1] Daftar Kontrak
    [2] Cari Kontrak
    [3] Tambah Kontrak
    [4] Hapus Kontrak
    [5] Update Nilai
    [6] Kembali`);

    rl.question("masukkan salah satu nomor diatas: ", (index) => {
      // console.log(index);
      switch (index) {
        case "1":
          kontrak.daftarKontrak();
          break;
        case "2":
          kontrak.matchingKontrak();
          break;
        case "3":
          kontrak.addKontrak();
          break;
        case "4":
          kontrak.deleteKontrak();
          break;
        case "5":
          kontrak.UpdateKontrak();
          break;
        case "6":
          kontrak.homeKontrak();
          break;
      }
    });
  }
  static daftarKontrak() {
    db.all(
      `SELECT kontrak.idKontrak, mahasiswa.nim as nim, mahasiswa.nama AS nama_mahasiswa, mataKuliah.namaMataKuliah AS nama_mataKuliah, dosen.namaDosen as nama_dosen, kontrak.nilai
      FROM kontrak 
      JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
      JOIN dosen ON kontrak.nip = dosen.nip
      JOIN mataKuliah ON kontrak.idMataKuliah = mataKuliah.idMataKuliah`,
      (err, rows) => {
        // console.log(rows);
        if (err) {
          console.error(err);
        } else {
          const table = new Table({
            head: [
              "ID",
              "NIM",
              "Nama Mahasiswa",
              "Nama Matakuliah",
              "Nama Dosen",
              "Nilai",
            ],
            colWidths: [10, 10, 20, 25, 15, 10],
          });
          console.log(rows);
          rows.forEach((row) => {
            // console.log(row);
            table.push([
              row.idKontrak,
              row.nim,
              row.nama_mahasiswa,
              row.nama_mataKuliah,
              row.nama_dosen,
              row.nilai,
            ]);
          });
          console.log(table.toString());
          kontrak.listKontrak();
        }
      }
    );
  }

  static matchingKontrak() {
    db.all(
      `SELECT * FROM mahasiswa JOIN jurusan using(idJurusan)`,
      (err, rows) => {
        // console.log(rows);
        if (err) {
          console.error(err);
        } else {
          const table = new Table({
            head: [
              "NIM",
              "Nama Mahasiswa",
              "Tanggal lahir",
              "Alamat",
              "ID Jurusan",
              "Nama Jurusan",
            ],
            colWidths: [10, 15, 15, 15, 15, 15],
          });
          console.log(rows);
          rows.forEach((row) => {
            // console.log(row);
            table.push([
              row.nim,
              row.nama,
              row.tanggalLahir,
              row.alamat,
              row.idJurusan,
              row.namaJurusan,
            ]);
          });
          console.log(table.toString());
          //lanjut sini
          kontrak.listKontrak();
        }
      }
    );
  }
}
