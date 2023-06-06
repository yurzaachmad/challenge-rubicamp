import { printPembatas, rl } from "../views/util.js";
import mahasiswaModel from "../models/mahasiswa.js";
import mahasiswaView from "../views/mahasiswa.js";
import jurusanModel from "../models/jurusan.js";
import jurusanView from "../views/jurusan.js";
import UserController from "./users.js";

export default class MahasiswaController {
  static menuMahasiswa() {
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
          mahasiswaModel.daftarMahasiswa((rows) => {
            mahasiswaView.viewMahasiswa(rows);
            MahasiswaController.menuMahasiswa();
          });
          break;
        case "2":
          printPembatas();
          rl.question("Masukan nim mahasiswa : ", (nim) => {
            mahasiswaModel.cariMahasiswa(nim, (row) => {
              if (row) {
                mahasiswaView.viewMahasiswa([row]);
              } else {
                console.log(`Mahasiswa dengan nim ${nim} tidak terdaftar!`);
              }
              MahasiswaController.menuMahasiswa();
            });
          });
          break;
        case "3":
          console.log("Lengkapi data dibawah ini : ");
          mahasiswaModel.daftarMahasiswa((rows) => {
            mahasiswaView.viewMahasiswa(rows);
            rl.question("NIM : ", (nim) => {
              rl.question("Nama : ", (nama) => {
                rl.question("Tanggal Lahir : ", (tanggalLahir) => {
                  rl.question("Alamat : ", (alamat) => {
                    jurusanModel.daftarJurusan((data) => {
                      jurusanView.viewJurusan(data);
                      rl.question("Kode Jurusan : ", (idJurusan) => {
                        mahasiswaModel.tambahMahasiswa(
                          nim,
                          nama,
                          tanggalLahir,
                          alamat,
                          idJurusan,
                          () => {
                            console.log("mahasiswa telah ditambahkan");
                            mahasiswaModel.daftarMahasiswa((rows) => {
                              mahasiswaView.viewMahasiswa(rows);
                              MahasiswaController.menuMahasiswa();
                            });
                          }
                        );
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
          rl.question("Masukkan nim yang ingin dihapus : ", (nim) => {
            mahasiswaModel.hapusMahasiswa(nim, () => {
              console.log(`Mahasiswa dengan ${nim} telah dihapus`);
              MahasiswaController.menuMahasiswa();
            });
          });
          break;
        case "5":
          UserController.mainMenu();
          break;
        default:
          console.log("Anda salah memasukkan opsi");
          MahasiswaController.menuMahasiswa();
          break;
      }
    });
  }
}
