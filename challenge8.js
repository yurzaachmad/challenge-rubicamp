function pola(str){
    let total = [];
    let algoritma = str;
    let myStr = algoritma.split(' ');
    let cres = myStr[4];
    let kali = myStr[2];
    let cres2 = myStr[0];
    let cresh2 = cres2.split('').join('');
    let cresh1 = cres.split('').join('');
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
        if(cresh2.replace('#', i) * kali == cresh1.replace('#', j)){
            total.push(i, j)
            return total
        }
        }
        
    }
    return total
}

console.log(pola('42#3 * 188 = 80#204'))
console.log(pola('8#61 * 895 = 78410#5'))
console.log(pola('12# * 15 = 18#5'))