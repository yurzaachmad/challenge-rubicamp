//bilangan prima

function indexPrime(param1) {
  let index = 0;
  let count = 2;

  while (index < param1) {
    let isPrime = true;
    for (let number = 2; number < count; number++) {
      if (count % number === 0) {
        isPrime = false;
      }
    }
    if (isPrime == true) {
      index++;
    }
    count++;
  }
  return count - 1;
}

console.log(indexPrime(10));
console.log(indexPrime(25));
console.log(indexPrime(13));
console.log(indexPrime(12));
