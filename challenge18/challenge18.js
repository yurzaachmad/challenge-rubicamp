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
            console.error(err);
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

function listHome() {
  console.log(`
  silahkan pilih opsi dibawah ini:
  [1] Mahasiswa
  [2] Jurusan
  [3] Dosen
  [4] Kuliah
  [5] Kontrak
  [6] Keluar`);

  // console.log("masukkan salah satu nomor diatas:");
  rl.question("masukkan salah satu nomor diatas: ", (index) => {
    // console.log(index);
    switch (index) {
      case "1":
        listMahasiswa();
        break;
      case "2":
        console.log("masuk");
        listJurusan();
        break;
      case "3":
        console.log("masuk");
        listDosen();
        break;
      case "4":
        console.log("masuk");
        listKuliah();
        break;
      case "5":
        console.log("masuk");
        listKontrak();
        break;
      case "6":
        console.log("masuk");
        login();
        break;
    }
  });
}
// menampilkan pilihan mahasiswa
function listMahasiswa() {
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
        daftarMahasiswa();
        break;
      case "2":
        matchingMahasiswa();
        break;
      case "3":
        addMahasiswa();
        break;
      // case "4":
      //   console.log("masuk");
      //   listKuliah();
      //   break;
      // case "5":
      //   console.log("masuk");
      //   listKontrak();
      //   break;
      // case "6":
      //   console.log("masuk");
      //   login();
      //   break;
    }
  });
}
function listJurusan() {
  console.log("masuk jurusan");
}
function listDosen() {
  console.log("masuk jurusan");
}
function listKuliah() {
  console.log("masuk jurusan");
}
function listKontrak() {
  console.log("masuk jurusan");
}

// Menampilkan daftar mahasiswa
function daftarMahasiswa() {
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
        listMahasiswa();
      }
    }
  );
}

//menampilkan pencarian mahasiswa berdasarkan nim
function matchingMahasiswa() {
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
          listMahasiswa();
        } else {
          console.log(`Mahasiswa dengan nim ${NIM}, tidak terdaftar`);
          listMahasiswa();
        }
      }
    );
  });
  // console.log("cari mahasiswa");
}

function addMahasiswa() {
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
                          daftarMahasiswa();
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
