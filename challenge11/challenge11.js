const fs = require('node:fs');

let data = fs.readFileSync('data.json', 'utf8')

const myJson = JSON.parse(data)

// console.log(myJson[0].term);
const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Tebakan: ',
});
console.log('Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!')

let i = 0

console.log(`\npertanyaan: ${myJson[i].definition}`); 
rl.prompt()
rl.on('line', (line) => {
 
   if(line == myJson[i].term ){
     console.log(`Selamat Anda Benar!`);
     i++;
  
   }else{
    console.log(`Wkwkwkwk, Anda kurang beruntung!`);
  }
  if (i === myJson.length) {
    rl.close()
  }
  
console.log(`\npertanyaan: ${myJson[i].definition}`)
rl.prompt()

})

rl.on('close', () => {
  console.log('Hore anda menang!');
  process.exit(0)
}); 







