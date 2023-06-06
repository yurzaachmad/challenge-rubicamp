import User from "../models/user.js";
import { Awal, printPembatas, rl } from "../views/util.js";
import MahasiswaController from "./mahasiswa.js";
import JurusanController from "./jurusan.js";
import DosenController from "./dosen.js";
import MatakuliahController from "./matakuliah.js";
import KontrakController from "./kontrak.js";

export default class UserController {
  static start() {
    Awal();
    UserController.askUserName();
  }

  static askUserName() {
    rl.question("Username: ", (userName) => {
      User.username(userName, (rows) => {
        if (rows.length == 0) {
          console.log("username not found");
          UserController.askUserName();
        } else {
          UserController.askPassword(rows[0]);
        }
      });
    });
  }

  static askPassword(user) {
    rl.question("password: ", (answer) => {
      if (user.passWord === answer) {
        printPembatas();
        UserController.mainMenu();
      } else {
        console.log("password salah");
        UserController.askPassword(user);
      }
    });
  }

  static mainMenu() {
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
 `);
    printPembatas();
    rl.question("masukkan salah satu no. dari opsi di atas: ", (answer) => {
      switch (answer) {
        case "1":
          MahasiswaController.menuMahasiswa();
          break;

        case "2":
          JurusanController.menuJurusan();
          break;

        case "3":
          DosenController.menuDosen();
          break;

        case "4":
          MatakuliahController.menuMatakuliah();
          break;

        case "5":
          KontrakController.menuKontrak();
          break;

        case "6":
          printPembatas();
          console.log("Anda telah Keluar");
          printPembatas();
          process.exit(0);
        default:
          mainMenu();
          break;
      }
    });
  }
}
UserController.start();
