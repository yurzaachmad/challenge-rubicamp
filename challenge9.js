function spiral(param){
    let matrix = [];
    let count = 0;
    let myArr = [];

    for (let i = 0; i < param; i++) {
        matrix[i] = []
        for (let j = 0; j < param; j++) {
            matrix[i][j] = count;
            count++
        }
        
    }

    let x = 0;
    let y = 0;
    let atas = param
    let bawah = 0

    while(myArr.length < param * param){
    for (; x < atas; x++) {
        myArr.push(matrix[y][x]);
        
    }
    x--;
    y++;
    for (; y < atas; y++) {
        myArr.push(matrix[y][x]);
        
    }
    y--;
    x--;
    for (; x >= bawah; x--) {
        myArr.push(matrix[y][x]);
        
    }
    x++;
    y--
    for (; y > bawah; y--) {
        myArr.push(matrix[y][x]);
        
    }
    x++;
    y++;
    atas--;
    bawah++;
}
console.log(myArr);
}

spiral(4)
spiral(5)