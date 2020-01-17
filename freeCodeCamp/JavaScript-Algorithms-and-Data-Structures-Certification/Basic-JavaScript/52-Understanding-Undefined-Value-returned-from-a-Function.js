var sum = 0;
function addSum(num) {
    sum += num;
}
addSum(3); // sum will be modified but returned value is undefined
function addFive() {
    sum += 5;
}

console.log(addFive());