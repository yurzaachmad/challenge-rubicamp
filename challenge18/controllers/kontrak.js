import { printPembatas, rl } from "../views/util.js";
import mahasiswaModel from "../models/mahasiswa.js";
import mahasiswaView from "../views/mahasiswa.js";
import UserController from "./users.js";
import kontrakModel from "../models/kontrak.js";
import kontrakView from "../views/kontrak.js";
import matakuliahModel from "../models/matakuliah.js";
import matakuliahView from "../views/matakuliah.js";
import dosenModel from "../models/dosen.js";
import dosenView from "../views/dosen.js";

export default class KontrakController {
  static menuKontrak() {
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
          kontrakModel.daftarKontrak((rows) => {
            kontrakView.viewKontrak(rows);
            KontrakController.menuKontrak();
          });
          break;
        case "2":
          printPembatas();
          mahasiswaModel.daftarMahasiswa((rows) => {
            mahasiswaView.viewMahasiswa(rows);
            rl.question("Masukan NIM mahasiswa : ", (nim) => {
              kontrakModel.cariKontrak(nim, (row) => {
                if (row) {
                  kontrakView.matchingKontrak(row);
                } else {
                  console.log(`Kontrak dengan nim ${nim} tidak terdaftar!`);
                }
                KontrakController.menuKontrak();
              });
            });
          });
          break;
        case "3":
          printPembatas();
          console.log("Lengkapi data dibawah ini : ");
          mahasiswaModel.daftarMahasiswa((rows) => {
            mahasiswaView.viewMahasiswa(rows);
            rl.question("Masukan NIM : ", (nim) => {
              matakuliahModel.daftarMatakuliah((row) => {
                matakuliahView.viewMatakuliah(row);
                rl.question("Masukan kode matakuliah : ", (idMataKuliah) => {
                  dosenModel.daftarDosen((data) => {
                    dosenView.viewDosen(data);
                    rl.question("Masukan NIP dosen : ", (nip) => {
                      kontrakModel.tambahKontrak(nim, idMataKuliah, nip, () => {
                        console.log("Kontrak telah ditambahkan");
                        kontrakModel.daftarKontrak((rows) => {
                          kontrakView.viewKontrak(rows);
                          KontrakController.menuKontrak();
                        });
                      });
                    });
                  });
                });
              });
            });
          });
          break;
        case "4":
          printPembatas();
          rl.question("Masukkan id yang ingin dihapus : ", (id) => {
            kontrakModel.hapusKontrak(id, () => {
              console.log(`Kontrak dengan nomer ${id} telah dihapus`);
              KontrakController.menuKontrak();
            });
          });
          break;
        case "5":
          kontrakModel.daftarKontrak((rows) => {
            kontrakView.viewKontrak(rows);
            rl.question("Masukan nim mahasiswa : ", (nim) => {
              kontrakModel.cariKontrak(nim, (row) => {
                if (row) {
                  kontrakView.matchingKontrak(row);
                } else {
                  console.log(`Kontrak dengan nim ${nim} tidak terdaftar!`);
                }
                rl.question("Masukan id yang akan dirubah : ", (id) => {
                  rl.question("Tulis nilai yang baru : ", (nilai) => {
                    kontrakModel.updateKontrak(id, nilai, () => {
                      console.log("Kontrak telah dirubah");
                      kontrakModel.daftarKontrak((rows) => {
                        kontrakView.viewKontrak(rows);
                        KontrakController.menuKontrak();
                      });
                    });
                  });
                });
              });
            });
          });
          //   kontrakModel.updateKontrak();
          break;
        case "6":
          UserController.mainMenu();
          break;
        default:
          console.log("Anda salah memasukkan opsi");
          KontrakController.menuKontrak();
          break;
      }
    });
  }
}
