function romawi(n){
        var roman = {
          M: 1000,
          CM: 900,
          D: 500,
          CD: 400,
          C: 100,
          XC: 90,
          L: 50,
          XL: 40,
          X: 10,
          IX: 9,
          V: 5,
          IV: 4,
          I: 1
        };
        var str = '';

        for( var key in roman){
          // console.log(key)
          while (n >= roman[key]) {
            str += key;
            n -= roman[key];
            // console.log('ini', str)
            // console.log(n)
          }
        }
        return str;
}

console.log(romawi(99))