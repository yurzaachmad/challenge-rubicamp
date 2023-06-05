//manipulation strings

function sentencesManipulation(sentence) {
  // my arr sekumpulan kalimat yang jadi array

  let myArr = sentence.split(" ");
  let arr = [];

  for (let i = 0; i < myArr.length; i++) {
    if (
      myArr[i].charAt(0) === "a" ||
      myArr[i].charAt(0) === "u" ||
      myArr[i].charAt(0) === "i" ||
      myArr[i].charAt(0) === "e" ||
      myArr[i].charAt(0) === "o"
    ) {
      arr.push(myArr[i]);
      //    console.log(myArr);
    } else {
      let myConsonant = myArr[i].slice(1) + myArr[i].charAt(0) + "nyo";
      arr.push(myConsonant);
    }
  }

  return arr.join(" ");
}

console.log(sentencesManipulation("ibu pergi ke pasar bersama aku"));
