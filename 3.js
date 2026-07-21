console.log("1: Start");

setTimeout(() => {
  console.log("2: setTimeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Promise callback");
});

console.log("4: End");

// OUTPUT ORDER:
// 1: Start
// 4: End
// 3: Promise callback
// 2: setTimeout callback


setTimeout(() => console.log("Timeout"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"))
  .then(() => console.log("Promise 3"));

console.log("Sync code");

// OUTPUT:
// Sync code
// Promise 1
// Promise 2
// Promise 3
// Timeout
