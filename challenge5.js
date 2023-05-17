function stringManipulation(word) {
    if(word[0] === 'a' || word[0] === 'i' || word[0] === 'u' || word[0] === 'e' || word[0] === 'o'){
        return word
        
    } else {
        const chars = word.split("")
        if(chars[0] != 'a' || chars[0] != 'i' || chars[0] != 'u' || chars[0] != 'e' || chars[0] != 'o'){
            chars.push(chars[0]);
            chars.shift();
            let sheaf = chars.join('') 
            return sheaf + 'nyo'
        }
    }
}

console.log(stringManipulation('ayam'))
console.log(stringManipulation('bebek'))