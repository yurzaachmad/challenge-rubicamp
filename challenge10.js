// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   readline.question('Tulis kalimatmu disini >', name => {
//     console.log(`Hey there ${name}!`);
//     readline.close();
//   });
  
const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Tulis kalimatmu disini> ',
});

rl.prompt();

rl.on('line', (line) => {
  sentencesManipulation(line)
  console.log(sentencesManipulation(line));
  rl.prompt();
}).on('close', () => {
  console.log('Good bye!');
  process.exit(0);
});

function sentencesManipulation(sentence) {
    // my arr sekumpulan kalimat yang jadi array

    let myArr = sentence.split(" ");
    let arr = []
    
    
    for (let i = 0; i < myArr.length; i++) {
        if (myArr[i].charAt(0) === 'a' || myArr[i].charAt(0) === 'u' || myArr[i].charAt(0) === 'i' || myArr[i].charAt(0) === 'e' || myArr[i].charAt(0) === 'o') {
           arr.push(myArr[i])
        //    console.log(myArr);
        } else {
            
           let myConsonant = myArr[i].slice(1)+ myArr[i].charAt(0) + 'nyo';
            
           
        //    myConsonant.slice(1)
        //    console.log(myConsonant);
            arr.push(myConsonant) 
        }
       
    }

    return arr.join(" ")

    }


