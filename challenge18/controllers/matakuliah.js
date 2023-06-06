import { printPembatas, rl } from "../views/util.js";
import jurusanModel from "../models/jurusan.js";
import jurusanView from "../views/jurusan.js";
import UserController from "./users.js";
import matakuliahModel from "../models/matakuliah.js";
import matakuliahView from "../views/matakuliah.js";

export default class MatakuliahController {
  static menuMatakuliah() {
    printPembatas();
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
          matakuliahModel.daftarMatakuliah((rows) => {
            matakuliahView.viewMatakuliah(rows);
            MatakuliahController.menuMatakuliah();
          });
          break;
        case "2":
          printPembatas();
          rl.question("Masukan ID Matakuliah : ", (ID) => {
            matakuliahModel.cariMatakuliah(ID, (row) => {
              if (row) {
                matakuliahView.viewMatakuliah([row]);
              } else {
                console.log(`Matakuliah dengan kode ${ID} tidak terdaftar!`);
              }
              MatakuliahController.menuMatakuliah();
            });
          });
          break;
        case "3":
          console.log("Lengkapi data dibawah ini : ");
          matakuliahModel.daftarMatakuliah((data) => {
            matakuliahView.viewMatakuliah(data);
            rl.question("Kode Matakuliah : ", (idMatakuliah) => {
              rl.question("Nama Matakuliah : ", (namaMataKuliah) => {
                rl.question("SKS : ", (sks) => {
                  matakuliahModel.tambahMatakuliah(
                    idMatakuliah,
                    namaMataKuliah,
                    sks,
                    () => {
                      console.log("Matakuliah telah ditambahkan");
                      MatakuliahController.menuMatakuliah();
                    }
                  );
                });
              });
            });
          });

          break;
        case "4":
          printPembatas();
          rl.question("Masukkan ID Matakuliah yang ingin dihapus : ", (ID) => {
            matakuliahModel.hapusMatakuliah(ID, () => {
              console.log(`Mahasiswa dengan ${ID} telah dihapus`);
              MatakuliahController.menuMatakuliah();
            });
          });
          break;
        case "5":
          UserController.mainMenu();
          break;
      }
    });
  }
}
