import Table from "cli-table";

export default class MahasiswaView {
  static printPembatas() {
    console.log("===========================================");
  }

  static viewMahasiswa(rows) {
    const table = new Table({
      head: ["nim", "nama", "alamat", "jurusan", "tanggallahir"],
      colWidths: [10, 10, 20, 10, 20],
    });

    rows.forEach((row) => {
      table.push([
        row.nim,
        row.nama,
        row.alamat,
        row.idJurusan,
        row.tanggalLahir,
      ]);
    });

    console.log(table.toString());
  }
}
