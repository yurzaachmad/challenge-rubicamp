//function sum

function sum() {
  var total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

sum(1, 2);

console.log(sum(1, 2, 5, 12));
