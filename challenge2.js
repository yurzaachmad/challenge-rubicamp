function deretKaskus(n){
    let kaskus = [];
    let final = []
   for(let i = 1; i <= n; i++){
        if (i <= n) {
            kaskus.push(i * 3);
        } 
   }
   for (let j = 0; j < kaskus.length; j++) {
    if(kaskus[j] % 5 == 0 && kaskus[j] % 6 ==0){
        final.push('kaskus')
    }
   else if (kaskus[j]%6 == 0){
        final.push('kus')
    } else  if (kaskus[j]%5 == 0) {
        final.push('kas')
    } else {
        final.push(kaskus[j])
    }
   }
   return final

}

console.log(deretKaskus(25))