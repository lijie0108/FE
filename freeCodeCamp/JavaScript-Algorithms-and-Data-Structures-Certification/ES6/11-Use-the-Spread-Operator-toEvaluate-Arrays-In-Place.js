var arr = [6, 89, 3, 45];
var maximus = Math.max.apply(null, arr);

const arr1 = [6, 89, 3, 45];
const maximus1 = Math.max(...arr1);

const arr2 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];
let arr3;

arr3 = [...arr2];  // change this line

console.log(arr3);
