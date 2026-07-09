// ======================================================
//                JAVASCRIPT ARRAY METHODS
// ======================================================



// ======================================================
// 1. map() - Loop Through Every Element
// ======================================================

// Array of numbers
let numbers = [12, 23, 34, 45, 56];

// map() loops through every element of the array.
// value  = current element
// index  = current index
numbers.map((value, index) => {

    console.log("Value =", value, ", Index =", index);

});




// ======================================================
// 2. map() - Create a New Array
// ======================================================

// Original array
let names = ["Ahsan", "Nahid", "Limon", "Gopal", "Esha", "Toroi"];

// Create a new array by adding "Mr." before each name.
let names2 = names.map((value) => {

    return "Mr. " + value;

});

// Print the new array
console.log(names2);




// ======================================================
// 3. map() - Objects Example
// ======================================================

// Array of objects
let students = [

    {
        name: "Pathan",
        roll: 12,
        state: "Very Good"
    },

    {
        name: "Toroi",
        roll: 13,
        state: "Excellent"
    },

    {
        name: "Pamela",
        roll: 10,
        state: "Excellent"
    },

    {
        name: "Shimul",
        roll: 9,
        state: "Excellent"
    }

];

// Print every object
students.map((student) => {

    console.log(student);

});




// ======================================================
// 4. filter() - Remove Items From an Array
// ======================================================

// Student list
let studentsNew = [

    {
        name: "Nahid",
        roll: 12
    },

    {
        name: "Atif",
        roll: 13
    },

    {
        name: "Tama",
        roll: 15
    }

];

// Keep only students whose roll is NOT 15.
let studentFilter = studentsNew.filter((student) => {

    return student.roll != 15;

});

// Print filtered array
console.log(studentFilter);




// ======================================================
// 5. filter() vs find()
// ======================================================

// Sample data
let potayes = [

    {
        name: "PotayeSama",
        roll: 12
    },

    {
        name: "PotayeTama",
        roll: 12
    },

    {
        name: "PotayeToroi",
        roll: 13
    }

];

// filter() returns ALL matching objects.
let resultFilter = potayes.filter((student) => {

    return student.roll == 12;

});

console.log(resultFilter);


// find() returns ONLY the FIRST matching object.
let resultFind = potayes.find((student) => {

    return student.roll == 12;

});

console.log(resultFind);




// ======================================================
// 6. map() - Update Object Values
// ======================================================

// Array of players
let players = [

    {
        name: "PotayeSama",
        roll: 12
    },

    {
        name: "PotayeTama",
        roll: 12
    },

    {
        name: "Toroi",
        roll: 13
    }

];

// Change Toroi's roll from 13 to 12.
let newData = players.map((player) => {

    if (player.name === "Toroi") {

        player.roll = 12;

    }

    return player;

});

// Print updated array
console.log(newData);




// ======================================================
// 7. reduce() - Calculate Total
// ======================================================

// Array
let arr = [1, 2];

// Initial value = 6
//
// Step 1:
// accumulator = 6
// currentValue = 1
// Result = 7
//
// Step 2:
// accumulator = 7
// currentValue = 2
// Result = 9
let total = arr.reduce((accumulator, currentValue) => {

    return accumulator + currentValue;

}, 6);

// Output = 9
console.log(total);




// ======================================================
//                JAVASCRIPT TIMERS
// ======================================================




// ======================================================
// 8. setInterval()
// ======================================================

// Initial value
let i = 0;

// Runs repeatedly
let greeting = setInterval(() => {

    console.log(i);

    i = i + 1;

    // Stop condition
    if (i == 11) {

        clearTimeout(greeting);

    }

}, 1000);




// ======================================================
// 9. PROJECT COUNTER
// ======================================================

// Counter variable
let count = 0;

// Run repeatedly
let counter = setInterval(() => {

    // Call function
    funcCounter();

    // Stop condition
    if (count == 11) {

        clearTimeout(counter);

    }

}, 10);



// Function for increasing the counter
function funcCounter() {

    count = count + 1;

    console.log(count);

}