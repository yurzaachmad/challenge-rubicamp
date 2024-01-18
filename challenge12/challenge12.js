const fs = require("node:fs");
const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Jawaban: ",
});

let i = 0;
let j = 0;
const argv2 = process.argv[2];
if (argv2 === undefined) {
  console.log(
    'Tolong sertakan nama file sebagai inputan soalnya\nMisalnya "node solution.js data.json"'
  );
  rl.close();
} else {
  let data = fs.readFileSync(process.argv[2], "utf8");
  let myData = JSON.parse(data);
  console.log(`Selamat datang di permainan Tebak-tebakan, kamu akan diberi pertanyaan dari file ini ${process.argv[2]}. Untuk bermain,
jawablah dengan jawaban yang sesuai.\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.`);
  console.log(`\npertanyaan: ${myData[i].definition}`);
  rl.prompt();
  rl.on("line", (line) => {
    if (line.toLowerCase() == myData[i].term) {
      console.log(`Selamat Anda Benar!`);
      i++;
    } else {
      j++;
      console.log(
        `Anda kurang beruntung! anda telah salah ${j} kali, silahkan coba lagi`
      );
    }
    if (line === "skip") {
      myData.push(myData[i]);
      myData.splice(i, 1);
      j = 0;
    }
    if (i === myData.length) {
      rl.close();
    }

    console.log(`\npertanyaan: ${myData[i].definition}`);
    rl.prompt();
  });
}
rl.on("close", () => {
  process.exit(0);
});
