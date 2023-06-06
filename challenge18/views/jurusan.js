import Table from "cli-table";

export default class jurusanView {
  static printPembatas() {
    console.log("===========================================");
  }

  static viewJurusan(rows) {
    const table = new Table({
      head: ["ID jurusan", "Nama Jurusan"],
      colWidths: [10, 20],
    });

    rows.forEach((row) => {
      table.push([row.idJurusan, row.namaJurusan]);
    });

    console.log(table.toString());
  }
}
