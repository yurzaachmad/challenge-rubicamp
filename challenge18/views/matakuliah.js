import Table from "cli-table";

export default class matakuliahView {
  static printPembatas() {
    console.log("===========================================");
  }

  static viewMatakuliah(rows) {
    const table = new Table({
      head: ["ID", "Nama Matakuliah", "SKS"],
      colWidths: [10, 30, 10],
    });

    rows.forEach((row) => {
      table.push([row.idMataKuliah, row.namaMataKuliah, row.sks]);
    });

    console.log(table.toString());
  }
}
