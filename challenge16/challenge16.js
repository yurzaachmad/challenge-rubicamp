class Tyre {
  constructor(merk) {
    this.merk = merk;
  }
}

class Car {
  constructor(mesin, warna, merkban, pintu, tahun, garansi) {
    this.mesin = mesin;
    this.warna = warna;
    this.merkban = new Tyre(merkban);
    this.pintu = pintu;
    this.tahun = tahun;
    this.garansi = garansi;
    this.serialNumber = Car.generateSerialNumber();
  }
  static generateSerialNumber() {
    const serialNumberLength = 10;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let serialNumber = "";
    for (let i = 0; i < serialNumberLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      serialNumber += characters[randomIndex];
    }
    return serialNumber;
  }
}

class mobilion extends Car {
  constructor(tahun) {
    super("1500cc", "hitam", "Dunlop", "4", tahun);
    this.garansi = 4;
    this.varian = "Honda mobilio";
  }
}

class Mitsubishi extends Car {
  constructor(tahun) {
    super("2477cc", "silver", "achilles", "5", tahun);
    this.garansi = 5;
    this.varian = "Mitshubishi pajero sport";
  }
}

class toyota extends Car {
  constructor(tahun) {
    super("1198cc", "blue", "bridgestone", "3", tahun);
    this.garansi = 4;
    this.varian = "Toyota raize";
  }
}
class carFactory {
  constructor() {
    this.cars = [];
  }

  static random() {
    return Math.floor(Math.random() * 9);
  }

  produce(tahun) {
    for (let i = 0; i < carFactory.random(); i++) {
      this.cars.push(new toyota(tahun));
    }
    for (let i = 0; i < carFactory.random(); i++) {
      this.cars.push(new mobilion(tahun));
    }
    for (let i = 0; i < carFactory.random(); i++) {
      this.cars.push(new Mitsubishi(tahun));
    }
  }

  guaranteeSimulation(year) {
    console.log("Daftar mobil yang sudah di produksi: ");
    this.cars.forEach((content, i) => {
      console.log(`
      no.${i + 1}
      Nama mobil: ${content.varian}
      SN: ${content.serialNumber}
      Mesin: ${content.mesin}
      Warna: ${content.warna}
      Merk ban: ${content.merkban.merk}
      Jumlah pintu: ${content.pintu}
      Tahun pembuatan: ${content.tahun}
      Garansi: ${content.garansi}
      Masa berlaku garansi di tahun ${year}: ${
        year - content.tahun > content.garansi ? "active" : "expired"
      }
      =========================`);
    });
  }
}
const factory = new carFactory();
factory.produce(2020);
factory.guaranteeSimulation(2025);
// console.log(factory.cars.length);
// console.log(factory.cars);
