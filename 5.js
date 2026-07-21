const myPromise = new Promise((resolve, reject) => {
  const success = true

  if (success){
    resolve("Operation successful");
  } else {
    reject("Operation failed")
  }
 })

 myPromise
  .then((result) => {
    console.log(result); // runs if fulfilled
  })
  .catch((error) => {
    console.log(error); // runs if rejected
  })
  .finally(() => {
    console.log("Always runs, regardless of outcome");
  });