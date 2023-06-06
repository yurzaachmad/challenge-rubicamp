import { printPembatas, rl } from "../views/util.js";
import jurusanModel from "../models/jurusan.js";
import jurusanView from "../views/jurusan.js";
import UserController from "./users.js";

export default class JurusanController {
  static menuJurusan() {
    printPembatas();
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
          jurusanModel.daftarJurusan((rows) => {
            jurusanView.viewJurusan(rows);
            JurusanController.menuJurusan();
          });
          break;
        case "2":
          printPembatas();
          rl.question("Masukan ID Jurusan : ", (ID) => {
            jurusanModel.cariJurusan(ID, (row) => {
              if (row) {
                jurusanView.viewJurusan([row]);
              } else {
                console.log(`Jurusan dengan kode ${ID} tidak terdaftar!`);
              }
              JurusanController.menuJurusan();
            });
          });
          break;
        case "3":
          console.log("Lengkapi data dibawah ini : ");
          jurusanModel.daftarJurusan((data) => {
            jurusanView.viewJurusan(data);
            rl.question("Kode Jurusan : ", (idJurusan) => {
              rl.question("Nama Jurusan : ", (namaJurusan) => {
                jurusanModel.tambahJurusan(idJurusan, namaJurusan, () => {
                  console.log("Jurusan telah ditambahkan");
                  JurusanController.menuJurusan();
                });
              });
            });
          });

          break;
        case "4":
          printPembatas();
          rl.question("Masukkan ID Jurusan yang ingin dihapus : ", (ID) => {
            jurusanModel.hapusJurusan(ID, () => {
              console.log(`Mahasiswa dengan ${ID} telah dihapus`);
              JurusanController.menuJurusan();
            });
          });
          break;
        case "5":
          UserController.mainMenu();
          break;
        default:
          console.log("Anda salah memasukkan opsi");
          JurusanController.menuJurusan();
          break;
      }
    });
  }
}
