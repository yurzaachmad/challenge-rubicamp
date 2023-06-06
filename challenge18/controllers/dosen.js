import { printPembatas, rl } from "../views/util.js";
import mahasiswaModel from "../models/mahasiswa.js";
import mahasiswaView from "../views/mahasiswa.js";
import jurusanModel from "../models/jurusan.js";
import jurusanView from "../views/jurusan.js";
import UserController from "./users.js";
import dosenModel from "../models/dosen.js";
import dosenView from "../views/dosen.js";

export default class DosenController {
  static menuDosen() {
    printPembatas();
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
          dosenModel.daftarDosen((rows) => {
            dosenView.viewDosen(rows);
            DosenController.menuDosen();
          });
          break;
        case "2":
          printPembatas();
          rl.question("Masukan ID Dosen : ", (ID) => {
            dosenModel.cariDosen(ID, (row) => {
              if (row) {
                dosenView.viewDosen([row]);
              } else {
                console.log(`Dosen dengan kode ${ID} tidak terdaftar!`);
              }
              DosenController.menuDosen();
            });
          });
          break;
        case "3":
          console.log("Lengkapi data dibawah ini : ");
          dosenModel.daftarDosen((data) => {
            dosenView.viewDosen(data);
            rl.question("Kode Dosen : ", (nip) => {
              rl.question("Nama Dosen : ", (namaDosen) => {
                rl.question("Alamat : ", (alamat) => {
                  dosenModel.tambahDosen(nip, namaDosen, alamat, () => {
                    console.log("Dosen telah ditambahkan");
                    DosenController.menuDosen();
                  });
                });
              });
            });
          });

          break;
        case "4":
          printPembatas();
          rl.question("Masukkan ID Dosen yang ingin dihapus : ", (ID) => {
            dosenModel.hapusDosen(ID, () => {
              console.log(`Dosen dengan ${ID} telah dihapus`);
              DosenController.menuDosen();
            });
          });
          break;
        case "5":
          printPembatas();
          UserController.mainMenu();
          break;
      }
    });
  }
}
