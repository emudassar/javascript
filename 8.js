// 1. Define the generator function
function* numberGenerator() {
  console.log("Start");
  yield 10; // Pauses here on 1st next()
  console.log("Resumed");
  yield 20; // Pauses here on 2nd next()
  return 30; // Finishes here on 3rd next()
}

// 2. Initialize the generator object
const gen = numberGenerator(); 

// 3. Control execution manually
console.log(gen.next()); // Logs: "Start" then { value: 10, done: false }
console.log(gen.next()); // Logs: "Resumed" then { value: 20, done: false }
console.log(gen.next()); // Logs: { value: 30, done: true }
