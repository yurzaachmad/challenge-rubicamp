import Table from "cli-table";

export default class kontrakView {
  static printPembatas() {
    console.log("===========================================");
  }

  static viewKontrak(rows) {
    // console.log(rows);
    const table = new Table({
      head: [
        "ID",
        "NIM",
        "Nama Mahasiswa",
        "Nama Matakuliah",
        "Nama Dosen",
        "Nilai",
      ],
      colWidths: [10, 10, 20, 30, 15, 10],
    });

    rows.forEach((row) => {
      const rowData = [
        row.idKontrak,
        row.nim,
        row.nama_mahasiswa,
        row.nama_mataKuliah,
        row.nama_dosen,
        row.nilai || "",
      ];
      // console.log(row, "ini");
      table.push(rowData);
    });

    console.log(table.toString());
  }

  static matchingKontrak(rows, search) {
    // console.log(rows.length);
    // console.log(search);
    const table = new Table({
      head: ["ID", "NIM", "Kode Matkul", "NIP", "Nilai"],
      colWidths: [10, 10, 20, 15, 10],
    });

    rows.forEach((row) => {
      const rowData = [
        row.idKontrak,
        row.nim,
        row.idMataKuliah,
        row.nip,
        row.nilai || "",
      ];
      // console.log(row, "ini");
      table.push(rowData);
    });
    if (rows.length > 0) {
      console.log(
        `Daftar kontrak mahasiswa dengan NIM ${rows[0].nim} adalah :`
      );
      console.log(table.toString());
    }
  }
}
