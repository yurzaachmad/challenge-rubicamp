export const PI = 22 / 7;

export class Calculator {
  constructor() {
    this.value = 1;
  }
  get x() {
    return this.value;
  }

  set x(number) {
    this.value = number;
  }
  add(number) {
    this.value += number;
    return this;
  }
  substract(number) {
    this.value -= number;
    return this;
  }
  multiply(number) {
    this.value *= number;
    return this;
  }
  divide(number) {
    this.value /= number;
    return this;
  }
  squareRoot() {
    this.value = Math.sqrt(this.value);
    return this;
  }
  exponent(number) {
    this.value = Math.pow(this.value, number);
    return this;
  }
  square() {
    this.value = Math.pow(this.value, 2);
    return this;
  }
  result() {
    return console.log(this.value);
  }
}
