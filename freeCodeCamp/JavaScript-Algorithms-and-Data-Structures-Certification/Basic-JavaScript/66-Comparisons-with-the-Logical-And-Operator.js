function testLogicalAnd(val) {
    if(val >= 25 && val <= 50) {
        return "Yes";
    }
    return "No";
}

console.log(testLogicalAnd(10));