function isLess(a,b) {
    if(a < b) {
        return true;
    }else {
        return false;
    }
}
isLess(10,15);

function isLessPlus(a,b) {
    return a < b;
}

console.log(isLessPlus(10, 15));