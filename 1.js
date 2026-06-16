function test() {
  if (true) {
    var x = 10;   
    let y = 20;   
  }
  console.log(x); // 10 ✅
  console.log(y); // ReferenceError ❌
}