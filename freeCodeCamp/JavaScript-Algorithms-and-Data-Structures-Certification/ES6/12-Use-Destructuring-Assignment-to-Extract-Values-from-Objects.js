const user = { name: 'John', age: 34 };
const name = user.name;
const age = user.age;

const {name, age} = user;



const HIGH_TEMPERATURES = {
    yesterday: 75,
    today: 77,
    tomorrow: 80
};

// change code below this line
const { today, tomorrow } = HIGH_TEMPERATURES;
const yesterday = HIGH_TEMPERATURES.yesterday;

// change code above this line

console.log(yesterday) // should be not defined
console.log(today); // should be 77
console.log(tomorrow); // should be 80
