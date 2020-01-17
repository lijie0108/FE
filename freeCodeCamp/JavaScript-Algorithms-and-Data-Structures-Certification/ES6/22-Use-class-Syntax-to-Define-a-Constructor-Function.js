/* Alter code below this line */
class Vegetable {
    constructor(targetPlanet) {
        this.name = targetPlanet
    }
}
/* Alter code above this line */

const carrot = new Vegetable('carrot');
console.log(carrot.name); // => should be 'carrot'
