const user = {
    name: 'John',
    age: 34
}
// You may read it as "get the value of user.name and assign it to a new variable named userName" and so on.
const { name: userName, age: userAge } = user;


const HIGH_TEMPERATURES = {
    yesterday: 75,
    today: 77,
    tomorrow: 80
};

// change code below this line
const { today: highToday, tomorrow: highTomorrow } = HIGH_TEMPERATURES;


// change code above this line
const yesterday = HIGH_TEMPERATURES.yesterday
console.log(yesterday) // should be not defined
console.log(highToday); // should be 77
console.log(highTomorrow); // should be 80