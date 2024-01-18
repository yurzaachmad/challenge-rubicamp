function weirdMultiply(sentence) {
  let strNumber = sentence.toString();
  let result = 1;

  if (strNumber.length === 1) {
    return sentence;
  }
  for (let i = 0; i < strNumber.length; i++) {
    console.log(strNumber[i]);
    result = result * strNumber[i];
  }
  return weirdMultiply(result);
}

console.log(weirdMultiply(3));
console.log(weirdMultiply(999));
console.log(weirdMultiply(39));
