// function test() {
//   if (true) {
//     var x = 10;   
//     let y = 20;   
//   }
//   console.log(x); // 10 ✅
//   console.log(y); // ReferenceError ❌
// }

console.log(a); // undefined (var is hoisted + initialized)
console.log(b); // ReferenceError (let is in TDZ)

var a = 5;
let b = 10;