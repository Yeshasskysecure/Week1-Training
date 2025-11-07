// day2.js

// 1. ES6+ Variable Declaration (let and const)
let age = 25; // let allows reassignment
const name = "John"; // const doesn't allow reassignment
console.log(`Name: ${name}, Age: ${age}`);

// 2. Arrow Function
const greet = (person) => {
  return `Hello, ${person}!`;
};
console.log(greet(name)); // Using the arrow function to greet someone.

// 3. Template Literals
const greeting = `My name is ${name} and I am ${age} years old.`;
console.log(greeting);

// 4. Destructuring
const person = { name: "Alice", age: 30, location: "NY" };
const { name: personName, age: personAge, location } = person;
console.log(`${personName} is ${personAge} years old and lives in ${location}.`);

// 5. Spread Operator (for arrays and objects)
const oldArray = [1, 2, 3];
const newArray = [...oldArray, 4, 5]; // Creates a new array by spreading the old array
console.log(newArray);

const user = { name: "Jane", age: 35 };
const updatedUser = { ...user, location: "LA" }; // Adds a new property to the object
console.log(updatedUser);

// 6. Rest Parameters
const sumNumbers = (...numbers) => {
  return numbers.reduce((acc, num) => acc + num, 0); // sums all numbers passed as arguments
};
console.log(sumNumbers(1, 2, 3, 4, 5)); // Output: 15

// 7. Classes in JavaScript
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  bark() {
    console.log(`${this.name} says woof!`);
  }
}

const myDog = new Dog("Buddy", "Golden Retriever");
myDog.bark(); // Calling a method inside the Dog class

// 8. Modules in Node.js (import and export)

// Exporting a function (this part will be added later in a separate file)
// module.exports = greet; // Commented out because it's not in separate files yet.

