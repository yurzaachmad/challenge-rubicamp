import Table from "cli-table";

export default class dosenView {
  static printPembatas() {
    console.log("===========================================");
  }

  static viewDosen(rows) {
    const table = new Table({
      head: ["NIP", "Nama Dosen", "Alamat"],
      colWidths: [10, 20, 20],
    });

    rows.forEach((row) => {
      table.push([row.nip, row.namaDosen, row.alamat]);
    });

    console.log(table.toString());
  }
}
