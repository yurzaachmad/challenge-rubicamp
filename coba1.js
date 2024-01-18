class Mobil {
  constructor(merk, tahun) {
    this.merk = merk;
    this.tahun = tahun;
    this.serialNumber = Mobil.generateSerialNumber();
  }

  static generateSerialNumber() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let serialNumber = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      serialNumber += characters[randomIndex];
    }
    return serialNumber;
  }

  static generateMultipleSerialNumbers(count) {
    const serialNumbers = [];
    for (let i = 0; i < count; i++) {
      serialNumbers.push(this.generateSerialNumber());
    }
    return serialNumbers;
  }
}

// Contoh penggunaan
const serialNumbers = Mobil.generateMultipleSerialNumbers(10);
console.log(serialNumbers);
